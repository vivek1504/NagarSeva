# 📱 NagarSeva — Surveyor Mobile App

The Surveyor App is a **React Native** mobile application for field surveyors to patrol assigned routes, capture road footage using the device camera, and automatically upload frames for AI-based pothole detection.

---

## 🗂️ Folder Structure

```
surveyorApp/
├── App.tsx                    # App entry point — providers and navigator
├── CameraCapture.tsx          # Standalone camera capture component
├── src/
│   ├── components/            # Reusable UI components
│   ├── contexts/
│   │   └── AuthContext.tsx     # Authentication context (login state, token)
│   ├── navigation/
│   │   └── AppNavigator.tsx   # React Navigation stack navigator
│   ├── screens/
│   │   ├── LoginScreen.tsx    # Surveyor login
│   │   ├── DashboardScreen.tsx # Assignment dashboard with stats
│   │   ├── AssignmentDetailScreen.tsx # Route assignment details
│   │   ├── SurveyScreen.tsx   # Active survey — camera capture + upload
│   │   ├── SurveyCompleteScreen.tsx # Survey completion summary
│   │   └── index.ts          # Screen exports
│   ├── services/              # API service layer
│   ├── theme/                 # App theme (colors, typography, spacing)
│   └── types/                 # TypeScript type definitions
├── android/                   # Android native project
├── ios/                       # iOS native project (CocoaPods)
├── package.json
├── tsconfig.json
├── metro.config.js            # Metro bundler config
├── babel.config.js
└── jest.config.js
```

---

## 📱 Screens

| Screen | Description |
|---|---|
| **Login** | Email/password login for surveyors. Stores JWT token securely. |
| **Dashboard** | Lists all assigned routes with status (Pending / In Progress / Completed). Shows survey statistics. |
| **Assignment Detail** | Shows route details — ward name, start/end coordinates, distance. Option to accept and start survey. |
| **Survey** | Active survey mode — opens camera, captures frames every 1 second, uploads batch to backend for AI processing. |
| **Survey Complete** | Post-survey summary — shows number of frames captured and issues detected. |

---

## 📸 Camera & Survey Flow

```
Accept Assignment → Start Survey → Camera Opens
       │                              │
       │                    Capture frame every 1 sec
       │                              │
       │                    Batch upload frames
       │                    to POST /api/surveyor/upload
       │                              │
       └── End Survey → Survey Complete Screen
```

1. Surveyor accepts a route assignment
2. Starts a survey session (creates `SurveySession` in DB)
3. Camera opens using `react-native-vision-camera`
4. Frames are captured every ~1 second automatically
5. Captured frames are batch-uploaded to the backend
6. Backend processes each frame through the AI model
7. Detected issues are automatically created in the database
8. Surveyor ends the session

### Camera Component (`CameraCapture.tsx`)
- Uses `react-native-vision-camera` for high-performance camera access
- Captures photos at 1-second intervals using `setInterval`
- Provides Start/Stop/Close controls
- Returns captured frame URIs via `onFrameCaptured` callback

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

The app requires the following permissions (configured in `AndroidManifest.xml`):
- `CAMERA` — Camera access for photo capture
- `ACCESS_FINE_LOCATION` — GPS location for surveys
- `READ_EXTERNAL_STORAGE` / `WRITE_EXTERNAL_STORAGE` — File access
- `INTERNET` — API communication

---

## 🔗 API Integration

The app communicates with the backend at `http://localhost:3000` (or your configured server URL):

| Action | API Endpoint | Method |
|---|---|---|
| Login | `/api/surveyor/login` | POST |
| Get assignments | `/api/surveyor/assignments` | POST |
| Accept assignment | `/api/surveyor/acceptAssignment/:id` | PUT |
| Start survey | `/api/surveyor/startSurvey` | POST |
| Upload frames | `/api/surveyor/upload` | POST (multipart) |
| End survey | `/api/surveyor/endSurvey` | PUT |

---

## 📦 Key Dependencies

| Package | Purpose |
|---|---|
| `react-native` (0.83) | Mobile framework |
| `react-native-vision-camera` | High-performance camera |
| `@react-navigation/native` | Navigation framework |
| `@react-navigation/native-stack` | Stack navigator |
| `react-native-safe-area-context` | Safe area handling |
| `react-native-screens` | Native screen optimization |
| `react-native-image-picker` | Image picker fallback |
| `@react-native-async-storage/async-storage` | Local storage (token persistence) |
| `@react-native-community/geolocation` | GPS location access |
