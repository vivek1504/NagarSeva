import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma.js";
const surveyorRouter = Router();
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import fs from "fs";
import piexif from "piexifjs";
import axios from "axios";
import FormData from "form-data";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { requireAuth, requireRole } from "../middlewares/authMiddleware.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.cloudinary_cloud_name || "",
  api_key: process.env.cloudinary_api_key || "",
  api_secret: process.env.cloudinary_api_secret || "",
});

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/user-images/");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

const BASE_LAT = 22.307701;
const BASE_LON = 73.210394;

function randomAround(value: any, meters = 2000) {
  const maxOffset = meters / 111000;
  return value + (Math.random() * 2 - 1) * maxOffset;
}

function degToDmsRational(deg: any) {
  const absolute = Math.abs(deg);
  const degrees = Math.floor(absolute);
  const minutesFloat = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesFloat);
  const seconds = (minutesFloat - minutes) * 60;

  return [
    [degrees, 1],
    [minutes, 1],
    [Math.round(seconds * 10000), 10000],
  ];
}

async function sendToPotholeModel(imagePath: string) {
  const form = new FormData();
  form.append("file", fs.createReadStream(imagePath));

  const response = await axios.post(
    "https://mynkchnn-pothole-detection-api.hf.space/detect_with_visualization",
    form,
    {
      headers: {
        ...form.getHeaders(),
        Authorization: process.env.hf_token || "",
      },
      responseType: "arraybuffer",
    },
  );

  return response.data;
}

async function processImage(
  file: Express.Multer.File,
  surverySession: any,
  routeId: string,
  wardId: string,
) {
  const imagePath = file.path;
  console.log("uploading image");

  const latitude = randomAround(BASE_LAT, 20);
  const longitude = randomAround(BASE_LON, 20);

  const jpegData = await fs.promises.readFile(imagePath, "binary");
  const exifObj = {
    GPS: {
      [piexif.GPSIFD.GPSLatitudeRef]: latitude >= 0 ? "N" : "S",
      [piexif.GPSIFD.GPSLatitude]: degToDmsRational(latitude),
      [piexif.GPSIFD.GPSLongitudeRef]: longitude >= 0 ? "E" : "W",
      [piexif.GPSIFD.GPSLongitude]: degToDmsRational(longitude),
    },
  };
  const exifBytes = piexif.dump(exifObj);
  const newJpegData = piexif.insert(exifBytes, jpegData);
  await fs.promises.writeFile(imagePath, Buffer.from(newJpegData, "binary"));

  const modelResult = await sendToPotholeModel(imagePath);

  const detectedImagePath = `uploads/model-images/detected-${file.filename}`;
  await fs.promises.writeFile(detectedImagePath, modelResult);

  const uploadResult = await cloudinary.uploader.upload(detectedImagePath, {
    folder: "pothole-detections",
  });
  console.log("image uploaded");

  await prisma.issue.create({
    data: {
      latitude,
      longitude,
      type: "POTHOLE",
      status: "DETECTED",
      wardId,
      surveySessionId: surverySession.id,
      routeId,
      imageUrl: uploadResult.url,
    },
  });
}

surveyorRouter.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("login");
  if (!email || !password) {
    return res.json({
      success: false,
      message: "username or password not found",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res
        .status(401)
        .json({ success: false, message: "invalid credentials" });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
    );

    res.status(200).json({ token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "internal server error" });
  }
});

surveyorRouter.put(
  "/acceptAssignment/:routeAssignmentId",
  requireAuth,
  requireRole("SURVEYOR"),
  async (req, res) => {
    const { routeAssignmentId } = req.params;
    if (!routeAssignmentId)
      return res.json({
        success: false,
        message: "routeAssignment id not found",
      });
    try {
      const assignment = await prisma.routeAssignment.findUnique({
        where: { id: routeAssignmentId },
      });

      if (!assignment) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid assignment ID." });
      }

      if (assignment.status !== "PENDING") {
        return res.status(400).json({
          success: false,
          message: "Assignment is not in a pending state.",
        });
      }

      const updatedAssignment = await prisma.routeAssignment.update({
        where: { id: routeAssignmentId },
        data: { status: "IN_PROGRESS" },
      });
      return res.json({ success: true, data: updatedAssignment });
    } catch (error) {
      console.error("Error accepting assignment:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
  },
);

surveyorRouter.post(
  "/startSurvey",
  requireAuth,
  requireRole("SURVEYOR"),
  async (req: Request, res: Response) => {
    const { routeAssignmentId, startedAt } = req.body;

    if (!routeAssignmentId || !startedAt) {
      return res.json({
        success: false,
        messages: "routeAssingmentId or startedAt not found",
      });
    }
    try {
      const surverySession = await prisma.surveySession.create({
        data: {
          routeAssignmentId,
          startedAt,
        },
      });

      res
        .status(200)
        .json({ success: true, surverySessionId: surverySession.id });
    } catch (e) {
      console.error(e);
      res
        .status(500)
        .json({ success: false, message: "Internal server Error" });
    }
  },
);

surveyorRouter.put(
  "/endSurvey",
  requireAuth,
  requireRole("SURVEYOR"),
  async (req: Request, res: Response) => {
    const { surverySessionId, endedAt } = req.body;

    if (!surverySessionId) {
      return res.json({ success: false, message: "surveySessionId not found" });
    }

    try {
      const existingSession = await prisma.surveySession.update({
        where: {
          id: surverySessionId,
        },
        data: {
          endedAt,
        },
      });

      res
        .status(200)
        .json({ success: true, message: "sesson ended successfully" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ success: false, message: "intenal server error" });
    }
  },
);

surveyorRouter.post(
  "/upload",
  requireAuth,
  requireRole("SURVEYOR"),
  upload.array("frames"),
  async (req, res) => {
    const { routeId, wardId, surverySessionId, routeAssignmentId } = req.body;
    console.log(
      "--------------------------------request reached----------------------------------------------",
    );

    if (!surverySessionId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing surveySessionId" });
    }
    try {
      if (!req.files || !Array.isArray(req.files)) {
        return res.status(400).json({ success: false, message: "No files" });
      }

      const files = req.files as Express.Multer.File[];

      const surverySession = await prisma.surveySession.findFirst({
        where: {
          id: surverySessionId,
          endedAt: null,
        },
      });

      if (!surverySession) {
        return res.json({ success: false, message: "invalid surveySession" });
      }

      res.status(202).json({
        success: true,
        message: "images accepted ",
      });

      (async () => {
        for (const file of files) {
          try {
            await processImage(file, surverySession, routeId, wardId);
          } catch (e) {
            console.error("Processing failed", e);
          }
        }
      })();

      const updateAssignment = await prisma.routeAssignment.update({
        where: {
          id: routeAssignmentId,
        },
        data: {
          status: "COMPLETED",
        },
      });
    } catch (err) {
      console.error("Upload error:", err);
      return res.status(500).json({ success: false });
    }
  },
);

surveyorRouter.post(
  "/assignments",
  requireAuth,
  requireRole("SURVEYOR"),
  async (req: Request, res: Response) => {
    const { surveyorId } = req.body;
    if (!surveyorId) {
      return res.json({ success: false, message: "surveyorId not found" });
    }
    console.log(surveyorId);

    try {
      const surveyor = await prisma.user.findFirst({
        where: { email: surveyorId },
      });
      const assignments = await prisma.routeAssignment.findMany({
        where: {
          surveyorId: surveyor!.id,
        },
        include: {
          route: {
            include: {
              ward: true,
            },
          },
          sessions: {
            include: {
              issues: true,
            },
          },
        },
      });
      res.status(200).json({ success: true, assignments });
    } catch (e) {
      console.error(e);
      return res
        .status(500)
        .json({ success: true, message: "internal server error" });
    }
  },
);

export { surveyorRouter };
