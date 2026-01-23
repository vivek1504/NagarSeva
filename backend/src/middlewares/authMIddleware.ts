import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Response, Request, NextFunction } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No token" });

  const token = header.split(" ")[1];
  try {
    const payload = jwt.verify(
      token!,
      process.env.JWT_SECRET!,
    ) as JwtPayload & { userId: string; role: string };
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

export function requireRole(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user!.role !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
}
