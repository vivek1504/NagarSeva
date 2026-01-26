import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { requireAuth, requireRole } from "../middlewares/authMiddleware.js";
const adminRouter = Router();
// Login endpoint
adminRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials.",
            });
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials.",
            });
        }
        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET);
        // IMPORTANT: don't send password to frontend
        const { password: _, ...safeUser } = user;
        return res.status(200).json({
            success: true,
            data: {
                user: safeUser,
                token,
            },
        });
    }
    catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
});
adminRouter.post("/createEmployee", requireAuth, requireRole("ADMIN"), async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    try {
        const existingEmployee = await prisma.user.findUnique({
            where: { email },
        });
        if (existingEmployee) {
            return res.status(400).json({
                success: false,
                message: "Employee with this email already exists.",
            });
        }
        const newEmployee = await prisma.user.create({
            data: { name, email, role, password: hashedPassword },
        });
        return res.json({ success: true, data: newEmployee });
    }
    catch (error) {
        console.error("Error creating employee:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error." });
    }
});
adminRouter.post("/assignRoute", requireAuth, requireRole("ADMIN"), async (req, res) => {
    const { surveyorId, routeId } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { id: surveyorId } });
        const route = await prisma.route.findUnique({ where: { id: routeId } });
        if (!user || user.role !== "SURVEYOR") {
            return res
                .status(400)
                .json({ success: false, message: "Invalid surveyor ID." });
        }
        if (!route) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid route ID." });
        }
        const routeAssigned = await prisma.routeAssignment.create({
            data: {
                surveyorId,
                routeId,
            },
        });
        return res.json({
            success: true,
            message: "Route assigned successfully.",
        });
    }
    catch (error) {
        console.error("Error assigning route:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error." });
    }
});
adminRouter.post("/assignSolver", requireAuth, requireRole("ADMIN"), async (req, res) => {
    const { engineerId, issueId } = req.body;
    try {
        const issue = await prisma.issue.findUnique({ where: { id: issueId } });
        const engineer = await prisma.user.findUnique({
            where: { id: engineerId },
        });
        if (!issue) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid issue ID." });
        }
        if (!engineer || engineer.role !== "ENGINEER") {
            return res
                .status(400)
                .json({ success: false, message: "Invalid engineer ID." });
        }
        const issueAssigned = await prisma.issueAssignment.create({
            data: {
                issueId,
                engineerId,
            },
        });
        await prisma.issue.update({
            where: { id: issueId },
            data: {
                status: "ASSIGNED",
            },
        });
        return res.json({
            success: true,
            message: "Solver assigned successfully.",
        });
    }
    catch (error) {
        console.error("Error assigning solver:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error." });
    }
});
adminRouter.put("/issueResolution/:issueId", requireAuth, requireRole("ADMIN"), async (req, res) => {
    const { issueId } = req.params;
    const { resolution, feedback } = req.body;
    if (!issueId)
        return res.json({ message: "issueId not found" });
    try {
        const issue = await prisma.issue.findUnique({ where: { id: issueId } });
        if (!issue) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid issue ID." });
        }
        const issueResolution = await prisma.issueResolution.create({
            data: {
                issueId,
                approved: resolution === "APPROVED" ? true : false,
                feedback: feedback || null,
            },
        });
        const updatedStatus = resolution === "APPROVED" ? "RESOLVED" : "REJECTED";
        await prisma.issue.update({
            where: { id: issueId },
            data: {
                status: updatedStatus,
            },
        });
        console.log(issueResolution);
        return res.json({ success: true, data: issueResolution });
    }
    catch (error) {
        console.error("Error updating issue resolution:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error." });
    }
});
adminRouter.get("/surveyors", requireAuth, requireRole("ADMIN"), async (req, res) => {
    try {
        const surveyors = await prisma.user.findMany({
            where: { role: "SURVEYOR" },
        });
        return res.json({ success: true, data: surveyors });
    }
    catch (error) {
        console.error("Error fetching surveyors:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error." });
    }
});
adminRouter.get("/engineers", requireAuth, requireRole("ADMIN"), async (req, res) => {
    try {
        const engineers = await prisma.user.findMany({
            where: { role: "ENGINEER" },
        });
        return res.json({ success: true, data: engineers });
    }
    catch (error) {
        console.error("Error fetching engineers:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error." });
    }
});
adminRouter.get("/issues", requireAuth, requireRole("ADMIN"), async (req, res) => {
    const { status } = req.query;
    if (status !== "DETECTED" &&
        status !== "ASSIGNED" &&
        status !== "IN_PROGRESS" &&
        status !== "FIXED" &&
        status !== "REJECTED" &&
        status !== "RESOLVED") {
        return res
            .status(400)
            .json({ success: false, message: "Invalid status." });
    }
    try {
        const issues = await prisma.issue.findMany({
            where: { status: status },
        });
        console.log(issues);
        return res.json({ success: true, data: issues });
    }
    catch (error) {
        console.error("Error fetching issues:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error." });
    }
});
// Get all wards
adminRouter.get("/wards", requireAuth, requireRole("ADMIN"), async (req, res) => {
    try {
        const wards = await prisma.ward.findMany();
        return res.json({ success: true, data: wards });
    }
    catch (error) {
        console.error("Error fetching wards:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error." });
    }
});
// Get all routes with ward info
adminRouter.get("/routes", requireAuth, requireRole("ADMIN"), async (req, res) => {
    try {
        const routes = await prisma.route.findMany({
            include: {
                ward: true,
                assignments: {
                    include: {
                        surveyor: true,
                    },
                    orderBy: {
                        assignedAt: "desc",
                    },
                    take: 1,
                },
            },
        });
        const formattedRoutes = routes.map((route) => {
            const latestAssignment = route.assignments[0];
            return {
                id: route.id,
                name: route.name,
                wardId: route.wardId,
                wardName: route.ward.name,
                assignedSurveyorId: latestAssignment?.surveyorId || null,
                assignedSurveyorName: latestAssignment?.surveyor.name || null,
                status: latestAssignment ? "ASSIGNED" : "UNASSIGNED",
            };
        });
        return res.json({ success: true, data: formattedRoutes });
    }
    catch (error) {
        console.error("Error fetching routes:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error." });
    }
});
// Get all employees (surveyors + engineers)
adminRouter.get("/employees", requireAuth, requireRole("ADMIN"), async (req, res) => {
    try {
        const employees = await prisma.user.findMany({
            where: {
                role: {
                    in: ["SURVEYOR", "ENGINEER"],
                },
            },
        });
        const formattedEmployees = employees.map((emp) => ({
            id: emp.id,
            name: emp.name,
            email: emp.email,
            role: emp.role,
            createdAt: emp.createdAt.toISOString().split("T")[0],
        }));
        return res.json({ success: true, data: formattedEmployees });
    }
    catch (error) {
        console.error("Error fetching employees:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error." });
    }
});
// Get all issues (without status filter)
adminRouter.get("/allIssues", requireAuth, requireRole("ADMIN"), async (req, res) => {
    try {
        const issues = await prisma.issue.findMany({
            include: {
                ward: true,
                route: true,
                assignments: {
                    include: {
                        engineer: true,
                    },
                    orderBy: {
                        assignedAt: "desc",
                    },
                    take: 1,
                },
            },
        });
        const formattedIssues = issues.map((issue) => {
            const latestAssignment = issue.assignments[0];
            return {
                id: issue.id,
                type: issue.type,
                status: issue.status,
                wardId: issue.wardId,
                wardName: issue.ward.name,
                routeId: issue.routeId,
                routeName: issue.route.name,
                latitude: issue.latitude,
                longitude: issue.longitude,
                imageUrl: issue.imageUrl,
                afterImageUrl: issue.afterUrl,
                assignedEngineerId: latestAssignment?.engineerId || null,
                assignedEngineerName: latestAssignment?.engineer.name || null,
                createdAt: issue.createdAt.toISOString(),
                updatedAt: issue.createdAt.toISOString(),
            };
        });
        console.log(formattedIssues);
        return res.json({ success: true, data: formattedIssues });
    }
    catch (error) {
        console.error("Error fetching all issues:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error." });
    }
});
export { adminRouter };
//# sourceMappingURL=adminRoutes.js.map