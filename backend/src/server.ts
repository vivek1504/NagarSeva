import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { adminRouter } from "../src/routes/adminRoute";
import { surveyorRouter } from "./routes/surveyorRoutes.js";
import { engineerRouter } from "./routes/engineerRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/admin", adminRouter);
app.use("/api/surveyor", surveyorRouter);
app.use("/api/engineer", engineerRouter);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
