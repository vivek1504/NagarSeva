# 🖥️ NagarSeva — Admin Dashboard (Frontend)

The frontend is a **React 18** web application built with **Vite**, **TypeScript**, **TailwindCSS**, and **shadcn/ui**. It serves as the **Admin Dashboard** for municipal corporation staff to monitor civic issues, manage employees, assign tasks, verify resolutions, and interact with an AI chatbot.

---

## 🗂️ Folder Structure

```
frontend/
├── public/                    # Static assets
├── src/
│   ├── App.tsx                # Root component — routing setup
│   ├── main.tsx               # React DOM entry point
│   ├── index.css              # Global styles + TailwindCSS
│   ├── App.css                # App-level styles
│   ├── i18n.ts                # i18next internationalization config
│   ├── atoms/                 # Jotai atoms (global state)
│   ├── components/
│   │   ├── ui/                # shadcn/ui primitives (buttons, dialogs, etc.)
│   │   ├── dashboard/         # Dashboard-specific components (charts, stats)
│   │   ├── issues/            # Issue list & detail components
│   │   ├── layout/            # Sidebar, header, layout wrappers
│   │   ├── map/               # Leaflet map components
│   │   ├── ChatBot.tsx        # Full-page AI chatbot component
│   │   ├── ChatBotWidget.tsx  # Floating chatbot widget (global)
│   │   ├── LanguageSwitcher.tsx # EN/HI language toggle
│   │   └── NavLink.tsx        # Navigation link component
│   ├── hooks/
│   │   ├── useAuth.tsx        # Authentication hook (token, login/logout)
│   │   ├── useMockData.ts     # Mock data for development
│   │   ├── use-mobile.tsx     # Mobile breakpoint detection
│   │   └── use-toast.ts      # Toast notification hook
│   ├── lib/                   # Utility functions (cn, etc.)
│   ├── locales/
│   │   ├── en.json            # English translations
│   │   └── hi.json            # Hindi translations
│   ├── pages/
│   │   ├── Login.tsx          # Admin login page
│   │   ├── Dashboard.tsx      # Analytics dashboard (charts, KPIs)
│   │   ├── Employees.tsx      # Employee management (create, list)
│   │   ├── Routes.tsx         # Route management & surveyor assignment
│   │   ├── Issues.tsx         # Issue listing & engineer assignment
│   │   ├── MapView.tsx        # Interactive Leaflet map with issue markers
│   │   ├── Verification.tsx   # Fix verification (approve/reject with feedback)
│   │   ├── ChatBotPage.tsx    # Full-page chatbot view
│   │   ├── Index.tsx          # Index redirect
│   │   └── NotFound.tsx       # 404 page
│   └── types/                 # TypeScript type definitions
├── components.json            # shadcn/ui configuration
├── tailwind.config.ts         # TailwindCSS configuration
├── vite.config.ts             # Vite config (proxy, aliases)
├── tsconfig.json              # TypeScript configuration
├── eslint.config.js           # ESLint configuration
├── postcss.config.js          # PostCSS configuration
└── package.json
```

---

## 📄 Pages

| Page | Route | Description |
|---|---|---|
| **Login** | `/` | Admin authentication form |
| **Dashboard** | `/dashboard` | KPI cards, charts (issue trends, resolution rates), ward-wise stats |
| **Employees** | `/employees` | List, search, and create Surveyors & Engineers |
| **Routes** | `/routes` | View all patrol routes, assign surveyors to routes |
| **Issues** | `/issues` | Browse all detected issues, assign engineers, filter by status |
| **Map View** | `/map` | Interactive Leaflet map showing issue locations with markers |
| **Verification** | `/verification` | Review engineer-submitted fixes — compare before/after images, approve/reject |
| **ChatBot** | `/chat` | Full-page AI chatbot for natural-language database queries |
| **404** | `*` | Not found page |

---

## 🧩 Key Components

### ChatBot (`ChatBot.tsx` / `ChatBotWidget.tsx`)
- AI-powered chatbot that queries the municipal database using natural language
- Connects to the SQL Agent backend via `/api/chat` proxy
- Renders markdown responses with `react-markdown` and `remark-gfm`
- `ChatBotWidget` is a floating button that appears on all pages

### Dashboard Charts
- Built with **Recharts** (bar charts, pie charts, area charts)
- Displays issue statistics, resolution rates, ward-wise breakdowns

### Map View
- Uses **React Leaflet** for interactive map rendering
- Issue markers with popups showing issue type, status, and images
- Clustered markers for dense areas

### Language Switcher
- Supports **English** and **Hindi** via `i18next`
- Translations stored in `src/locales/en.json` and `src/locales/hi.json`

---

## 🌐 API Proxy Configuration

The Vite dev server proxies API requests to avoid CORS issues:

```typescript
// vite.config.ts
proxy: {
  '/api/chat': {
    target: 'https://sql-agent-vmc-1.onrender.com',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api\/chat/, ''),
    secure: true,
  },
}
```

The backend API (Express) is expected to run on `http://localhost:3000` and is called directly from frontend code via Axios.

---

## 🏗️ State Management

| Library | Purpose |
|---|---|
| **Jotai** | Lightweight atomic state (global atoms in `src/atoms/`) |
| **Zustand** | Store-based state management |
| **TanStack React Query** | Server state caching and async data fetching |
| **React Hook Form + Zod** | Form state management with schema validation |

---

## 🚀 Local Setup

### Prerequisites
- Node.js ≥ 20
- npm or bun

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
# Dashboard starts on http://localhost:8080

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

### Environment

The frontend expects the backend API to be running at `http://localhost:3000`. Update API base URLs in the source code if different.

---

## 🛠️ Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `vite` | Start Vite dev server with HMR |
| `build` | `vite build` | Production build |
| `build:dev` | `vite build --mode development` | Development build |
| `lint` | `eslint .` | Run ESLint |
| `preview` | `vite preview` | Preview production build locally |

---

## 📦 Key Dependencies

| Package | Purpose |
|---|---|
| `react` / `react-dom` | UI framework |
| `react-router-dom` | Client-side routing |
| `@tanstack/react-query` | Async data fetching & caching |
| `tailwindcss` / `tailwind-merge` | Utility-first CSS |
| `@radix-ui/*` | Accessible UI primitives (via shadcn/ui) |
| `recharts` | Data visualization charts |
| `leaflet` / `react-leaflet` | Interactive maps |
| `i18next` / `react-i18next` | Internationalization (EN/HI) |
| `jotai` / `zustand` | State management |
| `axios` | HTTP client |
| `react-hook-form` / `zod` | Form handling + validation |
| `lucide-react` | Icon library |
| `sonner` | Toast notifications |
| `react-markdown` / `remark-gfm` | Markdown rendering (chatbot) |
