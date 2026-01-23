import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import fs from "fs";
import piexif from "piexifjs";
import { prisma } from "./lib/prisma.js";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import axios from "axios";
import FormData from "form-data";
import { adminRouter } from "./routes/adminRoutes.js";
import { surveyorRouter } from "./routes/surveyorRoutes.js";
import { engineerRouter } from "./routes/engineerRoutes.js";
import { requireAuth, requireRole } from "./middlewares/authMiddleware.js";
dotenv.config();
cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name || "",
    api_key: process.env.cloudinary_api_key || "",
    api_secret: process.env.cloudinary_api_secret || "",
});
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/admin", adminRouter);
app.use("/api/surveyor", surveyorRouter);
app.use("/api/engineer", engineerRouter);
app.listen(3000, () => {
    console.log("listening on port 3000");
});
//# sourceMappingURL=server.js.map