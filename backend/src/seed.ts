import {
  UserRole,
  IssueType,
  IssueStatus,
  RouteAssignmentStatus,
} from "./generated/prisma/client.js";
import { prisma } from "./lib/prisma.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

async function hashPassword(password: string) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

async function main() {
  console.log("🌱 Seeding VMC Civic Issue Monitoring System...");

  /* ===================== USERS ===================== */

  /* ===================== WARDS ===================== */
  // Create wards first since users have wardId FK

  await prisma.ward.createMany({
    data: [
      { name: "Alkapuri", number: 1 },
      { name: "Sayajigunj", number: 2 },
      { name: "Manjalpur", number: 3 },
      { name: "Karelibaug", number: 4 },
      { name: "Waghodia Road", number: 5 },
    ],
  });

  const wards = await prisma.ward.findMany({
    orderBy: { number: "asc" },
  });

  if (wards.length < 2) throw new Error("Wards not created");

  const ward1 = wards[0]!;
  const ward2 = wards[1]!;
  const ward3 = wards[2]!;

  /* ===================== USERS ===================== */

  const admin = await prisma.user.create({
    data: {
      name: "Rakesh Sharma",
      email: "admin@vmc.gov.in",
      password: await hashPassword("admin123"),
      role: UserRole.ADMIN,
      wardId: ward1.id,
    },
  });

  const SURVEYORS: Array<[string, string, string]> = [
    ["Amit Patel", "amit.patel@vmc.gov.in", ward1.id],
    ["Priya Desai", "priya.desai@vmc.gov.in", ward1.id],
    ["Rajesh Mehta", "rajesh.mehta@vmc.gov.in", ward2.id],
    ["Komal Shah", "komal.shah@vmc.gov.in", ward2.id],
    ["Vikram Joshi", "vikram.joshi@vmc.gov.in", ward3.id],
  ];

  await prisma.user.createMany({
    data: await Promise.all(
      SURVEYORS.map(async ([name, email, wardId]) => ({
        name,
        email,
        password: await hashPassword("password"),
        role: UserRole.SURVEYOR,
        wardId,
      })),
    ),
  });

  const ENGINEERS: Array<[string, string, string, "POTHOLE" | "GARBAGE"]> = [
    ["Suresh Pandya", "suresh.pandya@vmc.gov.in", ward1.id, "POTHOLE"],
    ["Hetal Trivedi", "hetal.trivedi@vmc.gov.in", ward1.id, "GARBAGE"],
    ["Mitesh Bhatt", "mitesh.bhatt@vmc.gov.in", ward2.id, "POTHOLE"],
    ["Sneha Raval", "sneha.raval@vmc.gov.in", ward2.id, "GARBAGE"],
    ["Darshan Parmar", "darshan.parmar@vmc.gov.in", ward3.id, "POTHOLE"],
  ];

  await prisma.user.createMany({
    data: await Promise.all(
      ENGINEERS.map(async ([name, email, wardId, department]) => ({
        name,
        email,
        password: await hashPassword("password"),
        role: UserRole.ENGINEER,
        wardId,
        department,
      })),
    ),
  });

  const surveyors = await prisma.user.findMany({
    where: { role: UserRole.SURVEYOR },
  });

  const engineers = await prisma.user.findMany({
    where: { role: UserRole.ENGINEER },
  });

  if (surveyors.length < 2) throw new Error("Not enough surveyors");
  if (engineers.length < 1) throw new Error("Not enough engineers");

  const surveyor1 = surveyors[0]!;
  const surveyor2 = surveyors[1]!;
  const engineer1 = engineers[0]!;



  /* ===================== ROUTES ===================== */

  const route1 = await prisma.route.create({
    data: {
      name: "RC Dutt Road",
      wardId: ward1.id,
      startLat: 22.3085,
      startLon: 73.1732,
      endLat: 22.3112,
      endLon: 73.1798,
      distance: 1.8,
    },
  });

  const route2 = await prisma.route.create({
    data: {
      name: "Sayaji Baug Road",
      wardId: ward2.id,
      startLat: 22.311,
      startLon: 73.1875,
      endLat: 22.3076,
      endLon: 73.181,
      distance: 2.1,
    },
  });

  const route3 = await prisma.route.create({
    data: {
      name: "Alkapuri Main Road",
      wardId: ward1.id,
      startLat: 22.3095,
      startLon: 73.172,
      endLat: 22.313,
      endLon: 73.176,
      distance: 2.5,
    },
  });

  const route4 = await prisma.route.create({
    data: {
      name: "Karelibaug Circle Road",
      wardId: ward2.id,
      startLat: 22.3102,
      startLon: 73.185,
      endLat: 22.3068,
      endLon: 73.182,
      distance: 1.9,
    },
  });

  const route5 = await prisma.route.create({
    data: {
      name: "Waghodia Road",
      wardId: ward2.id,
      startLat: 22.3102,
      startLon: 73.185,
      endLat: 22.3068,
      endLon: 73.182,
      distance: 1.9,
    },
  });

  console.log("✅ Seeding completed successfully");
}

main()
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
