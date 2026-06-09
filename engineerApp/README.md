# 🔧 NagarSeva — Engineer Mobile App

The Engineer App is a **React Native** mobile application for field engineers to view assigned civic issues, accept assignments, navigate to issue locations, and submit proof-of-fix photos for admin verification.

---

## 🗂️ Folder Structure

```
engineerApp/
├── App.tsx                    # App entry point — providers and navigator
├── src/
│   ├── api/                   # API client layer (Axios-based)
│   ├── context/
│   │   └── AuthContext.tsx     # Authentication context (login state, JWT token)
│   ├── navigation/
│   │   └── AppNavigator.tsx   # React Navigation stack navigator
│   ├── screens/
│   │   ├── LoginScreen.tsx        # Engineer login
│   │   ├── IssuesScreen.tsx       # List of assigned issues with filters
│   │   ├── IssueDetailScreen.tsx  # Detailed issue view with map & actions
│   │   └── ConfirmationScreen.tsx # Fix submission confirmation
│   ├── theme.ts               # App theme (colors, typography, spacing)
│   ├── types/                 # TypeScript type definitions
│   └── utils/                 # Utility functions
├── android/                   # Android native project
├── ios/                       # iOS native project
├── package.json
├── tsconfig.json
├── metro.config.js
├── babel.config.js
└── jest.config.js
```

---

## 📱 Screens

| Screen | Description |
|---|---|
| **Login** | Email/password login for engineers. JWT token stored securely via `EncryptedStorage`. |
| **Issues List** | Displays all issues assigned to the logged-in engineer. Filterable by status (Assigned, In Progress, Fixed). |
| **Issue Detail** | Shows full issue details — type, ward, route, GPS location, before-image. Actions: Accept assignment, upload after-fix photo, submit fix. |
| **Confirmation** | Post-submission confirmation — shows success message after marking an issue as fixed. |

---

## 🔄 Engineer Workflow

```
Login → View Assigned Issues → Select Issue
              │
              ▼
      Issue Detail Screen
              │
    ┌─────────┼──────────┐
    │ Accept  │          │
    │ Assignment         │
    │ (ASSIGNED →        │
    │  IN_PROGRESS)      │
    │         │          │
    │   Navigate to      │
    │   Location         │
    │         │          │
    │   Take After-Fix   │
    │   Photo            │
    │         │          │
    │   Submit Fix       │
    │   (IN_PROGRESS →   │
    │    FIXED)          │
    │         │          │
    └─── Confirmation ───┘
              │
      Admin verifies →
      RESOLVED or REJECTED
```

1. Engineer logs in and sees a list of assigned issues
2. Selects an issue to see details (type, location, before-image)
3. Accepts the assignment (status: `ASSIGNED` → `IN_PROGRESS`)
4. Travels to the issue location
5. Takes an after-fix photo using the device camera
6. Submits the fix — photo is uploaded to Cloudinary, status changes to `FIXED`
7. Admin reviews and either approves (`RESOLVED`) or rejects (`REJECTED`) the fix

---

## 🚀 Local Setup

### Prerequisites
- Node.js ≥ 20
- Android Studio with SDK & Emulator (or physical device)
- JDK 17
- React Native CLI

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Start Metro bundler
npx react-native start

# 3. Run on Android
npx react-native run-android

# 4. (iOS — macOS only)
cd ios && pod install && cd ..
npx react-native run-ios
```

### Android Permissions

The app requires the following permissions:
- `CAMERA` — Taking after-fix photos
- `INTERNET` — API communication
- `READ_EXTERNAL_STORAGE` — Accessing captured photos

---

## 🔗 API Integration

The app communicates with the backend at `http://localhost:3000` (or your configured server URL):

| Action | API Endpoint | Method |
|---|---|---|
| Login | `/api/engineer/login` | POST |
| Get assigned issues | `/api/engineer/issues` | GET |
| Accept assignment | `/api/engineer/acceptAssignment` | PUT |
| Submit fix | `/api/engineer/solveIssue` | PUT (multipart) |

### Authentication

All API calls (except login) include the JWT token in the `Authorization` header:
```
Authorization: Bearer <jwt-token>
```

The token is stored securely using `react-native-encrypted-storage`.

---

## 📦 Key Dependencies

| Package | Purpose |
|---|---|
| `react-native` (0.83) | Mobile framework |
| `@react-navigation/native` | Navigation framework |
| `@react-navigation/native-stack` | Stack navigator |
| `react-native-safe-area-context` | Safe area handling |
| `react-native-screens` | Native screen optimization |
| `react-native-image-picker` | Camera access for after-fix photos |
| `react-native-encrypted-storage` | Secure JWT token storage |
| `axios` | HTTP client for API calls |

---

## 🎨 Theming

The app uses a centralized theme defined in `src/theme.ts`:
- **Colors**: Primary, secondary, surface, background, status-specific colors
- **Typography**: Font sizes, weights, line heights
- **Spacing**: Consistent spacing scale
- **Status Bar**: Custom styling with primary color background
