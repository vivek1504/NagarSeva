# 🏙️ NagarSeva — AI-Powered Civic Issue Monitoring System

**NagarSeva** is an end-to-end platform for municipal corporations to **detect, track, assign, and resolve** civic infrastructure issues like **potholes** and **garbage** across city wards. It uses **AI/ML-based computer vision** for automated detection and provides role-based workflows for Admins, Surveyors, and Engineers.

---

## 📐 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        NagarSeva Platform                          │
├──────────────┬──────────────┬──────────────┬────────────────────────┤
│   Frontend   │ Surveyor App │ Engineer App │    Microservices (AI)  │
│  (Admin Web  │  (React      │  (React      │  (FastAPI + YOLOv8     │
│   Dashboard) │   Native)    │   Native)    │   Pothole Detection)   │
├──────────────┴──────────────┴──────────────┴────────────────────────┤
│                       Backend (Express.js REST API)                 │
├─────────────────────────────────────────────────────────────────────┤
│               PostgreSQL (via Prisma ORM) + Cloudinary              │
├─────────────────────────────────────────────────────────────────────┤
│                   SQL Agent (LangChain + Groq LLM)                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🗂️ Project Structure

```
nagarseva/
├── backend/          # Express.js REST API with Prisma ORM
├── frontend/         # React (Vite) Admin Dashboard — web app
├── surveyorApp/      # React Native mobile app for Surveyors
├── engineerApp/      # React Native mobile app for Engineers
├── microservices/    # FastAPI AI microservice (YOLOv8 pothole detection)
├── models/           # Pre-trained YOLO model weights (.pt files)
├── sql-agent/        # LangChain SQL Agent for natural-language DB queries
└── README.md         # ← You are here
```

| Folder | Tech Stack | Purpose |
|---|---|---|
| `backend/` | Node.js, Express, Prisma, PostgreSQL, Cloudinary | Core REST API — auth, CRUD, file uploads, issue lifecycle |
| `frontend/` | React 18, Vite, TypeScript, TailwindCSS, shadcn/ui, Recharts, Leaflet | Admin dashboard — analytics, employee mgmt, map view, issue verification |
| `surveyorApp/` | React Native 0.83, TypeScript, Vision Camera | Mobile app — surveyors capture road footage, auto-upload frames |
| `engineerApp/` | React Native 0.83, TypeScript | Mobile app — engineers view assigned issues, mark as fixed with proof |
| `microservices/` | Python, FastAPI, PyTorch, YOLOv8 (Ultralytics) | AI — pothole detection on images & videos, returns annotated results |
| `models/` | — | Pre-trained YOLOv8 model weights for pothole and garbage detection |
| `sql-agent/` | Python, LangChain, Groq, SQLAlchemy, Flask | NL-to-SQL chatbot — query municipal data using natural language |

---

## 👥 User Roles & Workflows

### Admin (Web Dashboard)
- View analytics dashboard (issue counts, resolution rates, ward-wise breakdowns)
- Manage employees (create Surveyors & Engineers)
- Assign routes to Surveyors for patrol
- Assign detected issues to Engineers for resolution
- Verify engineer-submitted fixes (approve / reject with feedback)
- View all issues on an interactive map (Leaflet)
- Chat with the AI SQL Agent for data insights

### Surveyor (Mobile App)
- Login and view assigned route patrols
- Accept route assignments
- Start survey sessions — camera captures frames every second
- Frames are auto-uploaded, processed through AI detection, and issues are logged
- End survey sessions

### Engineer (Mobile App)
- Login and view assigned issues (potholes/garbage)
- Accept issue assignments
- Navigate to the issue location
- Upload after-fix photo as proof of resolution
- Mark issue as fixed — goes to admin for final verification

---

## 🔄 Issue Lifecycle

```
DETECTED → ASSIGNED → IN_PROGRESS → FIXED → RESOLVED
                                          ↘ REJECTED (back to engineer)
```

1. **DETECTED** — AI detects a pothole/garbage from surveyor camera feed
2. **ASSIGNED** — Admin (or auto-assignment) assigns the issue to an engineer
3. **IN_PROGRESS** — Engineer accepts the assignment
4. **FIXED** — Engineer uploads after-fix proof photo
5. **RESOLVED** — Admin verifies and approves the fix
6. **REJECTED** — Admin rejects the fix with feedback

---

## 🛠️ Prerequisites

Make sure you have the following installed:

| Tool | Version | Purpose |
|---|---|---|
| **Node.js** | ≥ 20.x | Backend & frontend runtime |
| **npm** | ≥ 10.x | Package manager |
| **PostgreSQL** | ≥ 15.x | Primary database |
| **Python** | ≥ 3.10 | AI microservices & SQL agent |
| **Android Studio** | Latest | React Native Android builds |
| **JDK** | 17 | React Native Android builds |

---

## 🚀 Quick Start (Local Development)

### 1. Clone the repository

```bash
git clone https://github.com/vivek1504/NagarSeva.git
cd NagarSeva
```

### 2. Start the Backend

```bash
cd backend
npm install
cp .env.example .env          # Configure your DB URL, Cloudinary keys, JWT secret
npx prisma generate           # Generate Prisma client
npx prisma migrate deploy     # Run migrations
npx tsx src/seed.ts            # (Optional) Seed demo data
npm run dev                    # Starts on http://localhost:3000
```

### 3. Start the Frontend (Admin Dashboard)

```bash
cd frontend
npm install
npm run dev                    # Starts on http://localhost:8080
```

### 4. Start the AI Microservice

```bash
cd microservices
pip install -r requirements.txt
python app.py                  # Starts on http://localhost:7860
```

### 5. Start the SQL Agent

```bash
cd sql-agent
pip install langchain langchain-groq langchain-community sqlalchemy flask python-dotenv
python interface.py            # Starts on http://localhost:3000
```

### 6. Start Mobile Apps (Surveyor / Engineer)

```bash
# Surveyor App
cd surveyorApp
npm install
npx react-native run-android

# Engineer App
cd engineerApp
npm install
npx react-native run-android
```

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/nagarseva` |
| `JWT_SECRET` | Secret key for JWT token signing | `your-jwt-secret` |
| `cloudinary_cloud_name` | Cloudinary cloud name | `dsvgi3ehk` |
| `cloudinary_api_key` | Cloudinary API key | `363457628376739` |
| `cloudinary_api_secret` | Cloudinary API secret | `your-secret` |
| `hf_token` | HuggingFace API token (for AI model) | `Bearer hf_xxx` |

### SQL Agent (environment or `.env`)

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (same DB) |
| `GROQ_API_KEY` | Groq API key for LLM inference |

---

## 🧪 Default Credentials (Seed Data)

| Role | Email | Password |
|---|---|---|
| Admin | `admin@vmc.gov.in` | `admin123` |
| Surveyor | `amit.patel@vmc.gov.in` | `password` |
| Engineer | `suresh.pandya@vmc.gov.in` | `password` |

---

## 📚 Per-Component Documentation

Each folder has its own detailed README:

- [`backend/README.md`](./backend/README.md) — API routes, database schema, middleware
- [`frontend/README.md`](./frontend/README.md) — Pages, components, state management
- [`surveyorApp/README.md`](./surveyorApp/README.md) — Mobile app screens, camera flow
- [`engineerApp/README.md`](./engineerApp/README.md) — Mobile app screens, issue resolution flow
- [`microservices/README.md`](./microservices/README.md) — AI detection endpoints, model info
- [`sql-agent/README.md`](./sql-agent/README.md) — Natural language query agent

---

## 🧰 Tech Stack Summary

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, TailwindCSS, shadcn/ui, Recharts, Leaflet, i18next, Jotai, Zustand |
| **Mobile** | React Native 0.83, TypeScript, React Navigation, Vision Camera |
| **Backend** | Node.js, Express 5, TypeScript, Prisma 7, PostgreSQL, Cloudinary, JWT, bcrypt |
| **AI/ML** | Python, FastAPI, PyTorch, YOLOv8 (Ultralytics), OpenCV |
| **Data Agent** | Python, LangChain, Groq (LLM), SQLAlchemy, Flask |

---

## 📄 License

This project is for educational and municipal governance purposes.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
