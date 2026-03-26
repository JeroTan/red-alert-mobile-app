# Prototype PRD: Responder Mobile App (Emergency Response Platform)

---

## 1. Role Definition

You are a world-class UI/UX engineer and frontend developer, specializing in mobile app design for emergency services and field operations using **React Native (Expo)** and **NativeWind (Tailwind CSS)**.

---

## 2. Task Description

Create a **responder mobile app prototype** for the ALERTAP Platform - a mobile interface used by Police, Ambulance, and Fire responders to receive emergency dispatch notifications, view incident details, navigate to locations, and communicate with dispatchers.

**Scope:** Single barangay operation - MVP pilot for Brgy. Zone 1, Tondo, Manila

**Design Style:** Toyota Mobility Style - simple, professional, Toyota Red primary color (#EB0A1E), clear information hierarchy, optimized for one-handed field use.

**Core Keywords:** Field ops, Quick response, Map-focused, One-tap actions, Professional

---

## 3. Tech Stack Specifications

- **Framework:** React Native (Expo SDK 54+)
- **CSS/Styling:** NativeWind (Tailwind CSS for Native)
- **Navigation:** Expo Router (File-based)
- **Maps:** `react-native-maps`
- **Bottom Sheet:** `@gorhom/bottom-sheet`
- **Icons:** `lucide-react-native` or Material Icons
- **Utilities:** `clsx`, `tailwind-merge`, `date-fns`
- **Viewport:** Mobile-focused (iPhone/Android standard)
- **Font:** System sans-serif (San Francisco on iOS, Roboto on Android)
- **Orientation:** Portrait only

---

## 4. Visual Design Requirements

### 4.1 Color Palette (To be modularized in `./style/colors.ts`)

```
Primary Colors:
- Toyota Red: #EB0A1E (primary actions, active states)
- Link Blue: #576B95 (secondary elements)
- Critical Red: #DC2626 (urgent, emergency button)
- Warning Amber: #F59E0B (warnings, delayed status)
- Medical Green: #059669 (available, resolved)

Neutral Colors:
- Title Black: #191919 (headings)
- Text Gray: #333333 (body text)
- Secondary Text: #666666 (subtitles)
- Light Text: #999999 (captions, timestamps)
- Divider: #E5E5E5 (borders)
- Background: #F7F8FA (page background)
- Card Background: #FFFFFF (cards)

Emergency Type Colors:
- Police: #1E40AF (Police Blue)
- Ambulance: #059669 (Medical Green)
- Fire: #B91C1C (Fire Red)
- Other: #EA580C (Disaster Orange)
```

---

## 5. Screen Structure (UI Prototype Blueprints)

### 5.1 Main Screen Layout (Default View - Available)

```
┌─────────────────────────────────────────┐
│ ≡  Emergency Response    [⚙️] [🔔 2]   │ <- Header (56px)
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │         🗺️ MAP VIEW             │   │
│  │                                 │   │
│  │    📍 Your Location (Toyota Red)     │   │
│  │                                 │   │
│  │   🚑 2 nearby emergencies      │   │
│  │      • Quezon Ave - 0.8km      │   │
│  │      • Mabini St - 1.2km       │   │
│  │                                 │   │
│  └─────────────────────────────────┘   │ <- Map (45%)
│                                         │
├─────────────────────────────────────────┤
│  🚨 NEARBY EMERGENCY                    │
│  ┌─────────────────────────────────┐   │
│  │ 🚑 Medical Emergency            │   │
│  │ 📍 Quezon Ave, Cubao           │   │
│  │ ⏰ 3 min ago | 👤 Maria Santos  │   │
│  │ 📏 0.8 km away                  │   │
│  │                                 │   │
│  │ [ACCEPT]  [DECLINE]            │   │
│  └─────────────────────────────────┘   │
├─────────────────────────────────────────┤
│  Available  │  En Route  │  On Scene   │ <- Status Toggle (60px)
└─────────────────────────────────────────┘
```

### 5.2 En Route View (After Accepting)

```
┌─────────────────────────────────────────┐
│ ←  En Route to Emergency        [🔔]   │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────┐   │
│  │         🗺️ MAP VIEW             │   │
│  │                                 │   │
│  │   🚑 ← You (moving)             │   │
│  │        ════════                 │   │
│  │              📍                 │   │
│  │           Destination           │   │
│  │                                 │   │
│  │   ETA: 5 min | 2.3 km          │   │
│  └─────────────────────────────────┘   │
├─────────────────────────────────────────┤
│  🚑 MEDICAL EMERGENCY                   │
│  #EMG-2026-0142                         │
│  📍 Juan Luna St, Brgy. 105, Tondo      │
│  👤 Maria Santos | 📱 0912-345-6789    │
│  ─────────────────────────────────────  │
│  "Patient having chest pain,           │
│   conscious but difficulty breathing"  │
├─────────────────────────────────────────┤
│  ┌───────────────┐ ┌───────────────┐    │
│  │    📞 CALL    │ │    💬 CHAT   │    │
│  └───────────────┘ └───────────────┘    │
├─────────────────────────────────────────┤
│  Available  │  En Route  │  On Scene   │
└─────────────────────────────────────────┘
```

### 5.3 On Scene View

```
┌─────────────────────────────────────────┐
│ ←  On Scene                 [🔔]       │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────┐   │
│  │         🗺️ MAP VIEW             │   │
│  │                                 │   │
│  │           📍                    │   │
│  │        You & Patient            │   │
│  │                                 │   │
│  │   ✅ Arrived at location        │   │
│  └─────────────────────────────────┘   │
├─────────────────────────────────────────┤
│  🚑 ON SCENE - MEDICAL                  │
│  Patient: Maria Santos                  │
│  Status: Receiving treatment            │
│  ─────────────────────────────────────  │
│  [REQUEST BACKUP] [UPDATE STATUS]       │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────┐   │
│  │  Dispatch: 0917-111-2233       │   │
│  │  Reporter: 0912-345-6789       │   │
│  └─────────────────────────────────┘   │
├─────────────────────────────────────────┤
│  Available  │  En Route  │  On Scene   │
└─────────────────────────────────────────┘
```

---

## 6. Page Content & Data (API Simulation)

### 6.1 Sample Emergency Data

```json
{
  "emergencies": [
    {
      "id": "EMG-2026-0142",
      "type": "medical",
      "location": "Juan Luna St, Brgy. 105, Tondo, Manila",
      "landmark": "Near 7-Eleven",
      "reporter": "Maria Santos",
      "phone": "0912-345-6789",
      "description": "Patient having chest pain, conscious but difficulty breathing",
      "timestamp": "2026-03-23T08:30:00Z",
      "distance": 0.8
    }
  ]
}
```

---

## 7. Implementation Guidelines

### 7.1 Styling Strategy
- Use NativeWind for all UI.
- Modularize styles in `./style/`: `colors.ts`, `typography.ts`, `layout.ts`, `theme.ts`.
- Support Dark Mode using `dark:` prefix in Tailwind classes.

### 7.2 Component Architecture
- Atomic components in `./components/ui`.
- Feature-specific logic (Auth, Dispatch, Maps) in `./features`.
- Map interaction using `react-native-maps` and incident details via `gorhom/bottom-sheet`.

### 7.3 API Communication
- For all API requests, include a comment and an empty async closure:
  `// TODO: Fetch emergency data from API`
  `(async () => { /* implementation here */ })();`
