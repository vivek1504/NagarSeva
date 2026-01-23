import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth, requireRole } from "../middlewares/authMIddleware.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.cloudinary_cloud_name || "",
  api_key: process.env.cloudinary_api_key || "",
  api_secret: process.env.cloudinary_api_secret || "",
});

import multer from "multer";
import path from "path";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/issues/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuid()}${ext}`);
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const engineerRouter = Router();

engineerRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.role !== "ENGINEER") {
    return res.status(403).json({ success: false, message: "Access denied" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" },
  );

  res.json({ success: true, token });
});

engineerRouter.get(
  "/issues",
  requireAuth,
  requireRole("ENGINEER"),
  async (req, res) => {
    const engineerId = req.user!.userId;

    const assignments = await prisma.issueAssignment.findMany({
      where: { engineerId },
      include: {
        issue: {
          include: {
            ward: true,
            route: true,
            surveyor: { select: { id: true, name: true } },
          },
        },
      },
    });

    const issues = assignments.map((a) => ({
      ...a.issue,
      assignmentId: a.id,
      assignedAt: a.assignedAt,
    }));

    res.json({ success: true, issues });
  },
);

engineerRouter.put(
  "/acceptAssignment",
  requireAuth,
  requireRole("ENGINEER"),
  async (req, res) => {
    const engineerId = req.user!.userId;
    const { issueId } = req.body;

    const assignment = await prisma.issueAssignment.findUnique({
      where: { issueId },
      include: { issue: true },
    });

    if (!assignment || assignment.engineerId !== engineerId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    if (assignment.issue.status !== "ASSIGNED") {
      return res.status(400).json({
        success: false,
        message: "Issue not in ASSIGNED state",
      });
    }

    await prisma.issue.update({
      where: { id: issueId },
      data: { status: "IN_PROGRESS" },
    });

    res.json({ success: true });
  },
);

engineerRouter.put(
  "/solveIssue",
  requireAuth,
  requireRole("ENGINEER"),
  upload.single("afterImage"),
  async (req, res) => {
    const engineerId = req.user!.userId;
    const { issueId } = req.body;
    const file = req.file;

    if (!issueId || !file) {
      return res.status(400).json({ success: false });
    }

    const assignment = await prisma.issueAssignment.findUnique({
      where: { issueId },
      include: { issue: true },
    });

    if (!assignment || assignment.engineerId !== engineerId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    if (assignment.issue.status !== "IN_PROGRESS") {
      return res.status(400).json({
        success: false,
        message: "Issue not in progress",
      });
    }

    const uploaded = await cloudinary.uploader.upload(file.path);

    await prisma.$transaction([
      prisma.issue.update({
        where: { id: issueId },
        data: {
          status: "FIXED",
          afterImageUrl: uploaded.secure_url,
        },
      }),
      prisma.issueResolution.create({
        data: {
          issueId,
        },
      }),
    ]);

    res.json({ success: true });
  },
);

export { engineerRouter };
