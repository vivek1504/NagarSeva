# ⚙️ NagarSeva — Backend API

The backend is a **REST API** built with **Express.js 5** and **TypeScript**, using **Prisma ORM** with **PostgreSQL** as the database. It handles authentication, CRUD operations for all entities, image uploads to Cloudinary, and AI-based pothole detection via an external HuggingFace-hosted model.

---

## 🗂️ Folder Structure

```
backend/
├── prisma/
│   ├── schema.prisma         # Database schema (models, enums, relations)
│   └── migrations/           # Prisma migration history
├── prisma.config.ts          # Prisma configuration (datasource URL)
├── src/
│   ├── server.ts             # Express app entry point (port 3000)
│   ├── lib/
│   │   ├── prisma.ts         # Prisma client singleton
│   │   └── prisma.js         # Compiled Prisma client
│   ├── middlewares/
│   │   └── authMiddleware.ts # JWT auth + role-based access control
│   ├── routes/
│   │   ├── adminRoutes.ts    # Admin-only endpoints
│   │   ├── surveyorRoutes.ts # Surveyor endpoints (upload, survey sessions)
│   │   └── engineerRoutes.ts # Engineer endpoints (issues, fix submission)
│   ├── types/                # TypeScript type declarations
│   ├── generated/            # Auto-generated Prisma client code
│   ├── seed.ts               # Database seeder (demo wards, users, routes)
│   └── seed.js               # Compiled seed script
├── uploads/                  # Temporary file storage for uploads
├── package.json
├── tsconfig.json
└── .env                      # Environment variables (DO NOT COMMIT)
```

---

## 🗄️ Database Schema

The database uses **PostgreSQL** managed via **Prisma ORM**. Below is the entity relationship overview:

### Enums

| Enum | Values |
|---|---|
| `UserRole` | `ADMIN`, `SURVEYOR`, `ENGINEER` |
| `IssueType` | `POTHOLE`, `GARBAGE` |
| `IssueStatus` | `DETECTED`, `ASSIGNED`, `IN_PROGRESS`, `FIXED`, `REJECTED`, `RESOLVED` |
| `RouteAssignmentStatus` | `PENDING`, `IN_PROGRESS`, `COMPLETED` |
| `Department` | `POTHOLE`, `GARBAGE` |

### Models

| Model | Description |
|---|---|
| `User` | All users — role determines access. Has ward assignment and optional department. |
| `Ward` | Geographic ward divisions (e.g., Alkapuri, Sayajigunj). Has a unique ward number. |
| `Route` | Defined survey routes within wards. Includes start/end GPS coordinates and distance. |
| `RouteAssignment` | Links a `Route` to a `Surveyor`. Tracks assignment status. |
| `SurveySession` | Active survey sessions. Tied to a route assignment. Contains start/end timestamps. |
| `Issue` | Detected civic issues (pothole/garbage). Includes GPS, image URL, status, and relations. |
| `IssueAssignment` | Links an `Issue` to an `Engineer` for resolution. |
| `IssueResolution` | Admin verification of an engineer's fix. Tracks approval status and feedback. |

### Entity Relationships

```
Ward ──┬── has many Users
       ├── has many Routes
       └── has many Issues

Route ──┬── has many RouteAssignments
        └── has many Issues

RouteAssignment ── has many SurveySessions

SurveySession ── has many Issues

Issue ──┬── has many IssueAssignments
        └── has many IssueResolutions
```

---

## 🔌 API Endpoints

### Authentication

All protected routes require a `Bearer` token in the `Authorization` header.

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/admin/login` | ❌ | Admin login — returns JWT token + user data |
| `POST` | `/api/surveyor/login` | ❌ | Surveyor login — returns JWT token |
| `POST` | `/api/engineer/login` | ❌ | Engineer login — returns JWT token |

### Admin Routes (`/api/admin/*`)

All require `ADMIN` role.

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/createEmployee` | Create a new Surveyor or Engineer |
| `POST` | `/assignRoute` | Assign a route to a surveyor |
| `POST` | `/assignSolver` | Assign an issue to an engineer |
| `PUT` | `/issueResolution/:issueId` | Approve or reject an engineer's fix |
| `GET` | `/surveyors` | List all surveyors |
| `GET` | `/engineers` | List all engineers |
| `GET` | `/employees` | List all employees (surveyors + engineers) |
| `GET` | `/wards` | List all wards |
| `GET` | `/routes` | List all routes with ward info and assignment status |
| `GET` | `/issues?status=` | List issues filtered by status |
| `GET` | `/allIssues` | List all issues with full details |

### Surveyor Routes (`/api/surveyor/*`)

All (except login) require `SURVEYOR` role.

| Method | Endpoint | Description |
|---|---|---|
| `PUT` | `/acceptAssignment/:routeAssignmentId` | Accept a pending route assignment |
| `POST` | `/startSurvey` | Start a new survey session |
| `PUT` | `/endSurvey` | End an active survey session |
| `POST` | `/upload` | Upload captured frames (multipart `frames[]`) — processes through AI, creates issues |
| `POST` | `/assignments` | Get all assignments for a surveyor (by email) |

### Engineer Routes (`/api/engineer/*`)

All (except login) require `ENGINEER` role.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/issues` | Get all issues assigned to the logged-in engineer |
| `PUT` | `/acceptAssignment` | Accept an assigned issue (status → IN_PROGRESS) |
| `PUT` | `/solveIssue` | Submit after-fix photo and mark issue as FIXED |

---

## 🔒 Middleware

### `requireAuth`
- Extracts JWT from `Authorization: Bearer <token>` header
- Verifies token using `JWT_SECRET`
- Attaches `{ userId, role }` to `req.user`

### `requireRole(role)`
- Checks `req.user.role` against the required role
- Returns `403 Forbidden` if role doesn't match

---

## 📸 Image Processing Pipeline (Surveyor Upload)

1. Surveyor's mobile app captures frames every 1 second
2. Frames are uploaded as multipart `frames[]` to `/api/surveyor/upload`
3. Backend injects random GPS EXIF data (around Vadodara coordinates)
4. Each frame is sent to the **HuggingFace-hosted YOLOv8 pothole detection model**
5. Annotated (detected) image is uploaded to **Cloudinary**
6. An `Issue` record is created in the database with status `DETECTED`
7. If a matching engineer exists for that ward + department, auto-assignment happens

---

## 🚀 Local Setup

### Prerequisites
- Node.js ≥ 20
- PostgreSQL running locally (or a Neon/Supabase connection string)

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your DATABASE_URL, Cloudinary keys, JWT_SECRET, HF token

# 3. Generate Prisma client
npx prisma generate

# 4. Run database migrations
npx prisma migrate deploy

# 5. (Optional) Seed demo data
npx tsx src/seed.ts

# 6. Ensure upload directories exist
mkdir -p uploads/user-images uploads/model-images uploads/issues

# 7. Start development server
npm run dev
# Server starts on http://localhost:3000
```

### Build

```bash
# The dev script already compiles TypeScript before running:
npm run dev    # Runs: tsc -b && node dist/server.js
```

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/nagarseva?schema=public"

# JWT
JWT_SECRET="your-jwt-secret-key"

# Cloudinary (image hosting)
cloudinary_cloud_name="your-cloud-name"
cloudinary_api_key="your-api-key"
cloudinary_api_secret="your-api-secret"

# HuggingFace (AI model)
hf_token="Bearer hf_your-token"
```

---

## 🧪 Seed Data

The seed script (`src/seed.ts`) creates:

- **5 Wards**: Alkapuri, Sayajigunj, Manjalpur, Karelibaug, Waghodia Road
- **1 Admin**: `admin@vmc.gov.in` / `admin123`
- **5 Surveyors**: `amit.patel@vmc.gov.in`, etc. / `password`
- **5 Engineers**: `suresh.pandya@vmc.gov.in`, etc. / `password` (with department assignments)
- **5 Routes**: RC Dutt Road, Sayaji Baug Road, Alkapuri Main Road, etc.

---

## 📦 Key Dependencies

| Package | Purpose |
|---|---|
| `express` (v5) | Web framework |
| `@prisma/client` | Database ORM |
| `bcrypt` | Password hashing |
| `jsonwebtoken` | JWT auth tokens |
| `multer` | File upload handling |
| `cloudinary` | Cloud image storage |
| `piexifjs` | EXIF GPS metadata injection |
| `axios` + `form-data` | HTTP client for AI model calls |
