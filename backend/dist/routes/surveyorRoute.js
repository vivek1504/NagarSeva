import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import fs from "fs";
import piexif from "piexifjs";
import axios from "axios";
import FormData from "form-data";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { requireAuth, requireRole } from "../middlewares/authMIddleware.js";
dotenv.config();
const surveyorRouter = Router();
/* -------------------- Cloudinary -------------------- */
cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name || "",
    api_key: process.env.cloudinary_api_key || "",
    api_secret: process.env.cloudinary_api_secret || "",
});
/* -------------------- Multer -------------------- */
const upload = multer({
    storage: multer.diskStorage({
        destination: "uploads/user-images/",
        filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
    }),
    fileFilter: (_, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only images allowed"));
        }
        cb(null, true);
    },
});
/* -------------------- Helpers -------------------- */
const BASE_LAT = 22.307701;
const BASE_LON = 73.210394;
const randomAround = (v, meters = 20) => v + (Math.random() * 2 - 1) * (meters / 111000);
const degToDmsRational = (deg) => {
    const abs = Math.abs(deg);
    const d = Math.floor(abs);
    const mFloat = (abs - d) * 60;
    const m = Math.floor(mFloat);
    const s = (mFloat - m) * 60;
    return [
        [d, 1],
        [m, 1],
        [Math.round(s * 10000), 10000],
    ];
};
async function sendToPotholeModel(imagePath) {
    const form = new FormData();
    form.append("file", fs.createReadStream(imagePath));
    const res = await axios.post("https://mynkchnn-pothole-detection-api.hf.space/detect_with_visualization", form, {
        headers: {
            ...form.getHeaders(),
            Authorization: process.env.hf_token || "",
        },
        responseType: "arraybuffer",
    });
    return res.data;
}
/* -------------------- Image Processing -------------------- */
async function processImage(file, sessionId, routeId, wardId, surveyorId) {
    const imagePath = file.path;
    const detectedPath = `uploads/model-images/detected-${file.filename}`;
    try {
        const latitude = randomAround(BASE_LAT);
        const longitude = randomAround(BASE_LON);
        const jpeg = await fs.promises.readFile(imagePath, "binary");
        const exif = piexif.dump({
            GPS: {
                [piexif.GPSIFD.GPSLatitudeRef]: latitude >= 0 ? "N" : "S",
                [piexif.GPSIFD.GPSLatitude]: degToDmsRational(latitude),
                [piexif.GPSIFD.GPSLongitudeRef]: longitude >= 0 ? "E" : "W",
                [piexif.GPSIFD.GPSLongitude]: degToDmsRational(longitude),
            },
        });
        await fs.promises.writeFile(imagePath, Buffer.from(piexif.insert(exif, jpeg), "binary"));
        const modelResult = await sendToPotholeModel(imagePath);
        await fs.promises.writeFile(detectedPath, modelResult);
        const uploaded = await cloudinary.uploader.upload(detectedPath, {
            folder: "pothole-detections",
        });
        await prisma.issue.create({
            data: {
                clientCaptureId: crypto.randomUUID(),
                surveyorId,
                surveySessionId: sessionId,
                routeId,
                wardId,
                type: "POTHOLE",
                status: "DETECTED",
                latitude,
                longitude,
                imageUrl: uploaded.url,
            },
        });
    }
    finally {
        fs.unlink(imagePath, () => { });
        fs.unlink(detectedPath, () => { });
    }
}
/* -------------------- Auth -------------------- */
surveyorRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.role !== "SURVEYOR")
        return res.status(403).json({ success: false });
    if (!(await bcrypt.compare(password, user.password)))
        return res.status(401).json({ success: false });
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ success: true, token });
});
/* -------------------- Survey Flow -------------------- */
surveyorRouter.post("/startSurvey", requireAuth, requireRole("SURVEYOR"), async (req, res) => {
    const { routeAssignmentId } = req.body;
    const surveyorId = req.user.userId;
    const assignment = await prisma.routeAssignment.findUnique({
        where: { id: routeAssignmentId },
    });
    if (!assignment || assignment.surveyorId !== surveyorId)
        return res.status(403).json({ success: false });
    const active = await prisma.surveySession.findFirst({
        where: { routeAssignmentId, endedAt: null },
    });
    if (active)
        return res.status(400).json({ success: false });
    const session = await prisma.surveySession.create({
        data: { routeAssignmentId, startedAt: new Date() },
    });
    res.json({ success: true, surveySessionId: session.id });
});
surveyorRouter.put("/endSurvey", requireAuth, requireRole("SURVEYOR"), async (req, res) => {
    const { surveySessionId } = req.body;
    const surveyorId = req.user.userId;
    const session = await prisma.surveySession.findUnique({
        where: { id: surveySessionId },
        include: { routeAssignment: true },
    });
    if (!session ||
        session.endedAt ||
        session.routeAssignment.surveyorId !== surveyorId) {
        return res.status(403).json({ success: false });
    }
    await prisma.surveySession.update({
        where: { id: surveySessionId },
        data: { endedAt: new Date() },
    });
    await prisma.routeAssignment.update({
        where: { id: session.routeAssignmentId },
        data: { status: "COMPLETED", completedAt: new Date() },
    });
    res.json({ success: true });
});
/* -------------------- Upload -------------------- */
surveyorRouter.post("/upload", requireAuth, requireRole("SURVEYOR"), upload.array("frames"), async (req, res) => {
    const { routeId, wardId, surveySessionId } = req.body;
    const surveyorId = req.user.userId;
    const session = await prisma.surveySession.findUnique({
        where: { id: surveySessionId },
        include: { routeAssignment: true },
    });
    if (!session ||
        session.endedAt ||
        session.routeAssignment.surveyorId !== surveyorId) {
        return res.status(400).json({ success: false });
    }
    res.status(202).json({ success: true });
    (async () => {
        for (const file of req.files) {
            try {
                await processImage(file, surveySessionId, routeId, wardId, surveyorId);
            }
            catch (e) {
                console.error("Image processing failed", e);
            }
        }
    })();
});
surveyorRouter.get("/assignments", requireAuth, requireRole("SURVEYOR"), async (req, res) => {
    const surveyorId = req.user.userId;
    const assignments = await prisma.routeAssignment.findMany({
        where: { surveyorId },
        include: {
            route: { include: { ward: true } },
            sessions: { include: { issues: true } },
        },
    });
    res.json({ success: true, assignments });
});
surveyorRouter.put("/acceptAssignment/:id", requireAuth, requireRole("SURVEYOR"), async (req, res) => {
    const surveyorId = req.user.userId;
    const { id } = req.params;
    const assignment = await prisma.routeAssignment.findUnique({
        where: { id: id },
    });
    if (!assignment || assignment.surveyorId !== surveyorId) {
        return res.status(403).json({ success: false, message: "Unauthorized" });
    }
    if (assignment.status !== "PENDING") {
        return res.status(400).json({ success: false, message: "Invalid state" });
    }
    await prisma.routeAssignment.update({
        where: { id: id },
        data: { status: "IN_PROGRESS" },
    });
    res.json({ success: true });
});
export { surveyorRouter };
//# sourceMappingURL=surveyorRoute.js.map