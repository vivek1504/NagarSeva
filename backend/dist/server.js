import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { adminRouter } from "./routes/adminRoute.js";
import { surveyorRouter } from "./routes/surveyorRoute.js";
import { engineerRouter } from "./routes/engineerRoute.js";
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
//# sourceMappingURL=server.js.map