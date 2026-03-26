# UI Prototype Specifications: Public App (Citizen)

---

## 1. Project Overview
- **Name:** ALERTAP Public (Citizen)
- **Platform:** iOS & Android (Expo)
- **Primary Goal:** A high-speed, one-tap emergency reporting interface for citizens in Brgy. Zone 1, Tondo, Manila.
- **Design Style:** Toyota Mobility Style - simple, professional, high-contrast actions.

---

## 2. Technical Stack (Aligned with Responder App)
- **Framework:** React Native (Expo SDK 54+)
- **Styling:** NativeWind (Tailwind CSS)
- **Navigation:** Expo Router
- **Icons:** `lucide-react-native`
- **Animations:** `react-native-reanimated` (for the SOS pulse)

---

## 3. Screen Flow & UI Prototype Blueprints

### SCREEN 1: HOME (One-Tap SOS)
**Purpose:** Immediate access to report an emergency.

```
┌─────────────────────────────────────────┐
│  ALERTAP                              │
│                                         │
│  [Switch to Responder 🔄] (Temporary)   │
│                                         │
│                                         │
│           ┌───────────────┐             │
│           │               │             │
│           │     🚨        │             │
│           │   TAP TO      │             │
│           │   REPORT     │             │
│           │  EMERGENCY   │             │
│           │               │             │
│           └───────────────┘             │
│                                         │
│                                         │
│  Recent: No active emergencies          │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ [Profile]    [Home 🏠]   [Settings ⚙️]│ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

**Layout Specifications:**
- **Header (Top Left):** "ALERTAP" text only.
- **Top Right:** Empty (Settings moved to bottom).
- **Responder Toggle:** Temporary button to switch between Public and Responder modes for UI testing.
- **Bottom Navigation:** Three-tab layout: Profile (Left), Home (Center), Settings (Right).

---

## 4. Visual Design Requirements (Aligned with Responder App)
- **SOS Button:** #EB0A1E (Toyota Red), 200px **circular** button with a 2s pulse animation.
- **Background:** #F7F8FA (Light), #121212 (Dark).
- **Type Colors:** Police (#1E40AF), Ambulance (#059669), Fire (#B91C1C).

---

## 5. Implementation Roadmap
- **Sprint 0002:** Implementation of the Public App UI.
- **Component Reuse:** Utilize the same `./style/` modular constants and `./components/ui` primitives as the Responder app.
