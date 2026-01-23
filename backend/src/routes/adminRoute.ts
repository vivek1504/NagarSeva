import { Router } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { requireAuth, requireRole } from "../middlewares/authMIddleware";

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

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
    );

    const { password: _, ...safeUser } = user;

    return res.status(200).json({
      success: true,
      data: {
        user: safeUser,
        token,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

adminRouter.post(
  "/createEmployee",
  requireAuth,
  requireRole("ADMIN"),
  async (req, res) => {
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
    } catch (error) {
      console.error("Error creating employee:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
  },
);

adminRouter.get(
  "/employees",
  requireAuth,
  requireRole("ADMIN"),
  async (req, res) => {
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
    } catch (error) {
      console.error("Error fetching employees:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
);

adminRouter.get(
  "/issues",
  requireAuth,
  requireRole("ADMIN"),
  async (req, res) => {
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
    } catch (error) {
      console.error("Error fetching issues:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
);

adminRouter.get(
  "/issues/:id",
  requireAuth,
  requireRole("ADMIN"),
  async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Issue ID is required",
      });
    }

    try {
      const issue = await prisma.issue.findUnique({
        where: { id: id as string },
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
    } catch (error) {
      console.error("Error fetching issue:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
);

adminRouter.post(
  "/issues/:id/verify",
  requireAuth,
  requireRole("ADMIN"),
  async (req, res) => {
    const { id } = req.params;
    const { approved, feedback } = req.body;
    const adminId = req.user!.userId;

    try {
      const issue = await prisma.issue.findUnique({
        where: { id: id as string },
        include: { resolution: true },
      });

      if (!issue || !issue.resolution) {
        return res.status(400).json({
          success: false,
          message: "Issue or resolution not found",
        });
      }

      await prisma.issueResolution.update({
        where: { issueId: id as string },
        data: {
          approved,
          feedback,
          verifiedByAdminId: adminId,
        },
      });

      await prisma.issue.update({
        where: { id: id as string },
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
    } catch (error) {
      console.error("Error verifying issue:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
);

export { adminRouter };
