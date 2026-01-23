import { prisma } from "./lib/prisma.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

async function hashPassword(password: string) {
    return bcrypt.hashSync(password, SALT_ROUNDS);
}

async function main() {
    console.log("🌱 Seeding NagarSeva database...");

    // Clean existing data
    await prisma.issueResolution.deleteMany();
    await prisma.issueAssignment.deleteMany();
    await prisma.issue.deleteMany();
    await prisma.surveySession.deleteMany();
    await prisma.routeAssignment.deleteMany();
    await prisma.route.deleteMany();
    await prisma.ward.deleteMany();
    await prisma.user.deleteMany();

    console.log("✨ Creating admin user...");
    const admin = await prisma.user.create({
        data: {
            name: "Admin User",
            email: "admin@nagarseva.gov.in",
            password: await hashPassword("admin123"),
            role: "ADMIN",
        },
    });

    console.log("👷 Creating surveyors...");
    const surveyors = await Promise.all([
        prisma.user.create({
            data: {
                name: "Amit Patel",
                email: "amit.patel@nagarseva.gov.in",
                password: await hashPassword("surveyor123"),
                role: "SURVEYOR",
            },
        }),
        prisma.user.create({
            data: {
                name: "Priya Desai",
                email: "priya.desai@nagarseva.gov.in",
                password: await hashPassword("surveyor123"),
                role: "SURVEYOR",
            },
        }),
        prisma.user.create({
            data: {
                name: "Rajesh Mehta",
                email: "rajesh.mehta@nagarseva.gov.in",
                password: await hashPassword("surveyor123"),
                role: "SURVEYOR",
            },
        }),
    ]);

    console.log("🔧 Creating engineers...");
    const engineers = await Promise.all([
        prisma.user.create({
            data: {
                name: "Suresh Pandya",
                email: "suresh.pandya@nagarseva.gov.in",
                password: await hashPassword("engineer123"),
                role: "ENGINEER",
                department: "POTHOLE",
            },
        }),
        prisma.user.create({
            data: {
                name: "Hetal Trivedi",
                email: "hetal.trivedi@nagarseva.gov.in",
                password: await hashPassword("engineer123"),
                role: "ENGINEER",
                department: "GARBAGE",
            },
        }),
        prisma.user.create({
            data: {
                name: "Mitesh Bhatt",
                email: "mitesh.bhatt@nagarseva.gov.in",
                password: await hashPassword("engineer123"),
                role: "ENGINEER",
                department: "POTHOLE",
            },
        }),
    ]);

    console.log("🗺️  Creating wards...");
    const wards = await Promise.all([
        prisma.ward.create({ data: { name: "Alkapuri", number: 1 } }),
        prisma.ward.create({ data: { name: "Sayajigunj", number: 2 } }),
        prisma.ward.create({ data: { name: "Manjalpur", number: 3 } }),
        prisma.ward.create({ data: { name: "Karelibaug", number: 4 } }),
        prisma.ward.create({ data: { name: "Waghodia Road", number: 5 } }),
    ]);

    console.log("🛣️  Creating routes...");
    const routes = await Promise.all([
        prisma.route.create({
            data: {
                name: "RC Dutt Road",
                wardId: wards[0].id,
                startLat: 22.3085,
                startLon: 73.1732,
                endLat: 22.3112,
                endLon: 73.1798,
                distance: 1.8,
            },
        }),
        prisma.route.create({
            data: {
                name: "Sayaji Baug Road",
                wardId: wards[1].id,
                startLat: 22.311,
                startLon: 73.1875,
                endLat: 22.3076,
                endLon: 73.181,
                distance: 2.1,
            },
        }),
        prisma.route.create({
            data: {
                name: "OP Road",
                wardId: wards[2].id,
                startLat: 22.3025,
                startLon: 73.1815,
                endLat: 22.3048,
                endLon: 73.1892,
                distance: 1.5,
            },
        }),
        prisma.route.create({
            data: {
                name: "Productivity Road",
                wardId: wards[3].id,
                startLat: 22.2985,
                startLon: 73.1915,
                endLat: 22.3012,
                endLon: 73.1972,
                distance: 1.9,
            },
        }),
        prisma.route.create({
            data: {
                name: "Waghodia Main Road",
                wardId: wards[4].id,
                startLat: 22.2945,
                startLon: 73.1985,
                endLat: 22.2978,
                endLon: 73.2042,
                distance: 2.3,
            },
        }),
    ]);

    console.log("📋 Creating route assignments...");
    const routeAssignments = await Promise.all([
        prisma.routeAssignment.create({
            data: {
                routeId: routes[0].id,
                surveyorId: surveyors[0].id,
                status: "IN_PROGRESS",
            },
        }),
        prisma.routeAssignment.create({
            data: {
                routeId: routes[1].id,
                surveyorId: surveyors[1].id,
                status: "PENDING",
            },
        }),
        prisma.routeAssignment.create({
            data: {
                routeId: routes[2].id,
                surveyorId: surveyors[2].id,
                status: "COMPLETED",
                completedAt: new Date(),
            },
        }),
    ]);

    console.log("📸 Creating survey sessions...");
    const sessions = await Promise.all([
        prisma.surveySession.create({
            data: {
                routeAssignmentId: routeAssignments[0].id,
                startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
            },
        }),
        prisma.surveySession.create({
            data: {
                routeAssignmentId: routeAssignments[1].id,
                startedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
            },
        }),
        prisma.surveySession.create({
            data: {
                routeAssignmentId: routeAssignments[2].id,
                startedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
                endedAt: new Date(Date.now() - 20 * 60 * 60 * 1000),
            },
        }),
    ]);

    console.log("🚧 Creating issues...");
    const issues = await Promise.all([
        // DETECTED issues
        prisma.issue.create({
            data: {
                clientCaptureId: "CAPTURE-001",
                type: "POTHOLE",
                status: "DETECTED",
                latitude: 22.309,
                longitude: 73.175,
                wardId: wards[0].id,
                routeId: routes[0].id,
                surveySessionId: sessions[0].id,
                surveyorId: surveyors[0].id,
                imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400",
            },
        }),
        prisma.issue.create({
            data: {
                clientCaptureId: "CAPTURE-002",
                type: "GARBAGE",
                status: "DETECTED",
                latitude: 22.308,
                longitude: 73.186,
                wardId: wards[1].id,
                routeId: routes[1].id,
                surveySessionId: sessions[1].id,
                surveyorId: surveyors[1].id,
                imageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400",
            },
        }),
        // ASSIGNED issues
        prisma.issue.create({
            data: {
                clientCaptureId: "CAPTURE-003",
                type: "POTHOLE",
                status: "ASSIGNED",
                latitude: 22.3025,
                longitude: 73.1825,
                wardId: wards[2].id,
                routeId: routes[2].id,
                surveySessionId: sessions[2].id,
                surveyorId: surveyors[2].id,
                imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400",
            },
        }),
        prisma.issue.create({
            data: {
                clientCaptureId: "CAPTURE-004",
                type: "GARBAGE",
                status: "ASSIGNED",
                latitude: 22.3,
                longitude: 73.193,
                wardId: wards[3].id,
                routeId: routes[3].id,
                surveySessionId: sessions[2].id,
                surveyorId: surveyors[2].id,
                imageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400",
            },
        }),
        // IN_PROGRESS issues
        prisma.issue.create({
            data: {
                clientCaptureId: "CAPTURE-005",
                type: "POTHOLE",
                status: "IN_PROGRESS",
                latitude: 22.2955,
                longitude: 73.2,
                wardId: wards[4].id,
                routeId: routes[4].id,
                surveySessionId: sessions[0].id,
                surveyorId: surveyors[0].id,
                imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400",
            },
        }),
        // FIXED issues
        prisma.issue.create({
            data: {
                clientCaptureId: "CAPTURE-006",
                type: "POTHOLE",
                status: "FIXED",
                latitude: 22.3095,
                longitude: 73.176,
                wardId: wards[0].id,
                routeId: routes[0].id,
                surveySessionId: sessions[0].id,
                surveyorId: surveyors[0].id,
                imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400",
                afterImageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&sat=-100",
            },
        }),
        prisma.issue.create({
            data: {
                clientCaptureId: "CAPTURE-007",
                type: "GARBAGE",
                status: "FIXED",
                latitude: 22.3085,
                longitude: 73.188,
                wardId: wards[1].id,
                routeId: routes[1].id,
                surveySessionId: sessions[1].id,
                surveyorId: surveyors[1].id,
                imageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400",
                afterImageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&sat=-100",
            },
        }),
        // RESOLVED issues
        prisma.issue.create({
            data: {
                clientCaptureId: "CAPTURE-008",
                type: "POTHOLE",
                status: "RESOLVED",
                latitude: 22.303,
                longitude: 73.183,
                wardId: wards[2].id,
                routeId: routes[2].id,
                surveySessionId: sessions[2].id,
                surveyorId: surveyors[2].id,
                imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400",
                afterImageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&sat=-100",
            },
        }),
    ]);

    console.log("👤 Creating issue assignments...");
    await Promise.all([
        prisma.issueAssignment.create({
            data: {
                issueId: issues[2].id,
                engineerId: engineers[0].id,
            },
        }),
        prisma.issueAssignment.create({
            data: {
                issueId: issues[3].id,
                engineerId: engineers[1].id,
            },
        }),
        prisma.issueAssignment.create({
            data: {
                issueId: issues[4].id,
                engineerId: engineers[0].id,
            },
        }),
        prisma.issueAssignment.create({
            data: {
                issueId: issues[5].id,
                engineerId: engineers[0].id,
            },
        }),
        prisma.issueAssignment.create({
            data: {
                issueId: issues[6].id,
                engineerId: engineers[1].id,
            },
        }),
        prisma.issueAssignment.create({
            data: {
                issueId: issues[7].id,
                engineerId: engineers[2].id,
            },
        }),
    ]);

    console.log("✅ Creating issue resolutions...");
    await Promise.all([
        prisma.issueResolution.create({
            data: {
                issueId: issues[5].id,
                approved: false,
                feedback: "Issue marked as fixed, pending admin verification",
            },
        }),
        prisma.issueResolution.create({
            data: {
                issueId: issues[6].id,
                approved: false,
                feedback: "Garbage cleared, awaiting verification",
            },
        }),
        prisma.issueResolution.create({
            data: {
                issueId: issues[7].id,
                approved: true,
                feedback: "Pothole repaired with asphalt, verified and approved",
                verifiedByAdminId: admin.id,
                verifiedAt: new Date(),
            },
        }),
    ]);

    console.log("✅ Seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   - Admin: ${admin.email} / admin123`);
    console.log(`   - Surveyors: ${surveyors.length}`);
    console.log(`   - Engineers: ${engineers.length}`);
    console.log(`   - Wards: ${wards.length}`);
    console.log(`   - Routes: ${routes.length}`);
    console.log(`   - Issues: ${issues.length}`);
}

main()
    .catch((e) => {
        console.error("❌ Seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
