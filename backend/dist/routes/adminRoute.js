import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { requireAuth, requireRole } from "../middlewares/authMIddleware.js";
const adminRouter = Router();
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
    const { name, email, password, role, wardId, department } = req.body;
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
            data: {
                name,
                email,
                role,
                password: hashedPassword,
                wardId,
                department: role === "ENGINEER" ? department : null,
            },
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
adminRouter.get("/employees", requireAuth, requireRole("ADMIN"), async (req, res) => {
    try {
        const employees = await prisma.user.findMany({
            where: {
                role: { in: ["ENGINEER", "SURVEYOR"] },
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                wardId: true,
                department: true,
                createdAt: true,
            },
        });
        return res.json({ success: true, data: employees });
    }
    catch (error) {
        console.error("Error fetching employees:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
adminRouter.get("/issues", requireAuth, requireRole("ADMIN"), async (req, res) => {
    try {
        const issues = await prisma.issue.findMany({
            include: {
                ward: true,
                surveyor: {
                    select: { id: true, name: true },
                },
                assignment: {
                    include: {
                        engineer: { select: { id: true, name: true } },
                    },
                },
                resolution: true,
            },
            orderBy: { createdAt: "desc" },
        });
        return res.json({ success: true, data: issues });
    }
    catch (error) {
        console.error("Error fetching issues:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
adminRouter.get("/issues/:id", requireAuth, requireRole("ADMIN"), async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Issue ID is required",
        });
    }
    try {
        const issue = await prisma.issue.findUnique({
            where: { id: id },
            include: {
                ward: true,
                surveyor: true,
                assignment: {
                    include: { engineer: true },
                },
                resolution: true,
            },
        });
        if (!issue) {
            return res.status(404).json({
                success: false,
                message: "Issue not found",
            });
        }
        return res.json({ success: true, data: issue });
    }
    catch (error) {
        console.error("Error fetching issue:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
adminRouter.post("/issues/:id/verify", requireAuth, requireRole("ADMIN"), async (req, res) => {
    const { id } = req.params;
    const { approved, feedback } = req.body;
    const adminId = req.user.userId;
    try {
        const issue = await prisma.issue.findUnique({
            where: { id: id },
            include: { resolution: true },
        });
        if (!issue || !issue.resolution) {
            return res.status(400).json({
                success: false,
                message: "Issue or resolution not found",
            });
        }
        await prisma.issueResolution.update({
            where: { issueId: id },
            data: {
                approved,
                feedback,
                verifiedByAdminId: adminId,
                verifiedAt: new Date(),
            },
        });
        await prisma.issue.update({
            where: { id: id },
            data: {
                status: approved ? "RESOLVED" : "REJECTED",
            },
        });
        return res.json({
            success: true,
            message: approved
                ? "Issue approved and closed"
                : "Issue rejected and sent back",
        });
    }
    catch (error) {
        console.error("Error verifying issue:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
// Get all wards
adminRouter.get("/wards", requireAuth, requireRole("ADMIN"), async (req, res) => {
    try {
        const wards = await prisma.ward.findMany({
            orderBy: { number: "asc" },
        });
        return res.json({ success: true, data: wards });
    }
    catch (error) {
        console.error("Error fetching wards:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
// Get all routes with assignment information
adminRouter.get("/routes", requireAuth, requireRole("ADMIN"), async (req, res) => {
    try {
        const routes = await prisma.route.findMany({
            include: {
                ward: true,
                assignments: {
                    where: {
                        status: { in: ["PENDING", "IN_PROGRESS"] },
                    },
                    include: {
                        surveyor: { select: { id: true, name: true } },
                    },
                    orderBy: { assignedAt: "desc" },
                    take: 1,
                },
            },
            orderBy: { name: "asc" },
        });
        // Transform to match frontend expectations
        const transformedRoutes = routes.map((route) => ({
            id: route.id,
            name: route.name,
            wardId: route.wardId,
            wardName: route.ward.name,
            startLat: route.startLat,
            startLon: route.startLon,
            endLat: route.endLat,
            endLon: route.endLon,
            distance: route.distance,
            assignedSurveyorId: route.assignments[0]?.surveyorId,
            assignedSurveyorName: route.assignments[0]?.surveyor.name,
            status: route.assignments[0] ? "ASSIGNED" : "UNASSIGNED",
        }));
        return res.json({ success: true, data: transformedRoutes });
    }
    catch (error) {
        console.error("Error fetching routes:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
// Get surveyors only
adminRouter.get("/surveyors", requireAuth, requireRole("ADMIN"), async (req, res) => {
    try {
        const surveyors = await prisma.user.findMany({
            where: { role: "SURVEYOR" },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                wardId: true,
                department: true,
                createdAt: true,
            },
        });
        return res.json({ success: true, data: surveyors });
    }
    catch (error) {
        console.error("Error fetching surveyors:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
// Get engineers only
adminRouter.get("/engineers", requireAuth, requireRole("ADMIN"), async (req, res) => {
    try {
        const engineers = await prisma.user.findMany({
            where: { role: "ENGINEER" },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                wardId: true,
                department: true,
                createdAt: true,
            },
        });
        return res.json({ success: true, data: engineers });
    }
    catch (error) {
        console.error("Error fetching engineers:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
// Alias for /issues - frontend expects /allIssues
adminRouter.get("/allIssues", requireAuth, requireRole("ADMIN"), async (req, res) => {
    try {
        const issues = await prisma.issue.findMany({
            include: {
                ward: true,
                route: true,
                surveyor: {
                    select: { id: true, name: true },
                },
                assignment: {
                    include: {
                        engineer: { select: { id: true, name: true } },
                    },
                },
                resolution: true,
            },
            orderBy: { createdAt: "desc" },
        });
        // Transform to match frontend expectations
        const transformedIssues = issues.map((issue) => ({
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
            afterImageUrl: issue.afterImageUrl,
            assignedEngineerId: issue.assignment?.engineerId,
            assignedEngineerName: issue.assignment?.engineer.name,
            feedback: issue.resolution?.feedback,
            createdAt: issue.createdAt,
            updatedAt: issue.createdAt, // Using createdAt as updatedAt since there's no updatedAt field
        }));
        return res.json({ success: true, data: transformedIssues });
    }
    catch (error) {
        console.error("Error fetching all issues:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
// Assign route to surveyor
adminRouter.post("/assignRoute", requireAuth, requireRole("ADMIN"), async (req, res) => {
    const { surveyorId, routeId } = req.body;
    if (!surveyorId || !routeId) {
        return res.status(400).json({
            success: false,
            message: "surveyorId and routeId are required",
        });
    }
    try {
        // Verify surveyor exists and has SURVEYOR role
        const surveyor = await prisma.user.findUnique({
            where: { id: surveyorId },
        });
        if (!surveyor || surveyor.role !== "SURVEYOR") {
            return res.status(400).json({
                success: false,
                message: "Invalid surveyor",
            });
        }
        // Verify route exists
        const route = await prisma.route.findUnique({
            where: { id: routeId },
        });
        if (!route) {
            return res.status(400).json({
                success: false,
                message: "Route not found",
            });
        }
        // Create route assignment
        const assignment = await prisma.routeAssignment.create({
            data: {
                routeId,
                surveyorId,
                status: "PENDING",
            },
        });
        return res.json({
            success: true,
            data: assignment,
            message: "Route assigned successfully",
        });
    }
    catch (error) {
        console.error("Error assigning route:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
// Assign issue to engineer
adminRouter.post("/assignSolver", requireAuth, requireRole("ADMIN"), async (req, res) => {
    const { issueId, engineerId } = req.body;
    if (!issueId || !engineerId) {
        return res.status(400).json({
            success: false,
            message: "issueId and engineerId are required",
        });
    }
    try {
        // Verify engineer exists and has ENGINEER role
        const engineer = await prisma.user.findUnique({
            where: { id: engineerId },
        });
        if (!engineer || engineer.role !== "ENGINEER") {
            return res.status(400).json({
                success: false,
                message: "Invalid engineer",
            });
        }
        // Verify issue exists
        const issue = await prisma.issue.findUnique({
            where: { id: issueId },
        });
        if (!issue) {
            return res.status(400).json({
                success: false,
                message: "Issue not found",
            });
        }
        // Check if issue is already assigned
        const existingAssignment = await prisma.issueAssignment.findUnique({
            where: { issueId },
        });
        if (existingAssignment) {
            return res.status(400).json({
                success: false,
                message: "Issue already assigned",
            });
        }
        // Create issue assignment and update issue status
        const [assignment] = await prisma.$transaction([
            prisma.issueAssignment.create({
                data: {
                    issueId,
                    engineerId,
                },
            }),
            prisma.issue.update({
                where: { id: issueId },
                data: { status: "ASSIGNED" },
            }),
        ]);
        return res.json({
            success: true,
            data: assignment,
            message: "Issue assigned successfully",
        });
    }
    catch (error) {
        console.error("Error assigning issue:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
export { adminRouter };
//# sourceMappingURL=adminRoute.js.map