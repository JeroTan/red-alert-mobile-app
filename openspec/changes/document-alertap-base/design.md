## Context

The ALERTAP platform is a mission-critical React Native mobile application built with Expo (SDK 54), designed for high-speed emergency reporting (Citizen) and dispatch response (Responder). The platform serves the specific operational context of Brgy. Zone 1, Tondo, Manila, prioritizing one-handed field use and high-contrast visual clarity.

The application adheres to a **Domain-Driven Clean Architecture** and a **Feature-Based UI Structure** (inspired by Bulletproof React), ensuring a strict separation between business logic, application orchestration, and external infrastructure.

## Goals / Non-Goals

**Goals:**
- **Documentation Baseline**: Establish an immutable OpenSpec baseline for the project foundation as of Sprint 0004.
- **Architectural Preservation**: Document the specific implementations of DDD, Hexagonal patterns, and Feature-based modularity.
- **Design System Fidelity**: Formalize the integration of Toyota Mobility branding and the "Toyota Type" typography system.
- **Operational Clarity**: Detail the core Citizen SOS flow and the (prototype-stage) Responder lifecycle.

**Non-Goals:**
- **New Feature Development**: Implementation of any logic beyond what exists in the current codebase.
- **Hardening for Production**: Security audits, advanced performance profiling, or multi-barangay scaling.

## Technical Decisions

### 1. Domain-Driven Clean Architecture (Hexagonal)
**Decision**: Pure Domain logic (`domain/`) isolated from Infrastructure (`adapter/infrastructure/`).
**Rationale**: Prevents "Primitive Obsession" and ensures data integrity via Atomic Value Objects (e.g., `UserPhone`, `OrganizationBarangay`).
**Implementation**:
- **Domain Layer**: Entities (`Session`, `User`, `EmergencyContact`) and repository interfaces.
- **Application Layer**: Use cases (e.g., `registerUser`, `signInWithPassword`) utilizing `Zod` for contract-based input validation (`zodPreset.ts`).
- **Infrastructure Layer**: Concrete implementations using `Axios` (`redAlrertApiAxios` with custom interceptors) and `expo-secure-store` for persistent session management.

### 2. Feature-Based UI & Expo Router v6
**Decision**: Modularize UI by feature (`features/`) and utilize file-based routing (`app/`).
**Rationale**: Prevents "Monolithic Index" syndrome and aligns with Expo's first-class routing structure.
**Key Pattern**: Screens in the `app/` directory are thin wrappers around components in the `features/` directory (e.g., `app/public/home.tsx` wraps `features/public/screens/HomeScreen.tsx`).

### 3. Advanced Navigation Guards
**Decision**: Custom `<Stack.Protected>` component in `features/stack-guard/StackGuardedRouting.tsx`.
**Rationale**: Centrally manages authentication and role-based (Citizen vs. Responder) access control.
**Context**: Uses `isLoggedIn` from `AuthContextProvider` and `isResponder` checks to dynamically render restricted stacks.

## Visual Identity & Design Tokens

### 1. Color Palette (Toyota Mobility Standard)
The platform uses a standardized color system to ensure brand fidelity and emergency clarity.

| Category | Token | Hex Code | Purpose |
| :--- | :--- | :--- | :--- |
| **Brand** | `primary` | `#EB0A1E` | Toyota Red - Primary actions, logos, and branding elements. |
| | `black` | `#000000` | High-contrast text and UI elements. |
| | `white` | `#FFFFFF` | Backgrounds and high-contrast text on brand colors. |
| | `gray` | `#58595B` | Secondary text and disabled states. |
| **Emergency** | `critical` | `#DC2626` | SOS triggers, immediate danger alerts. |
| | `warning` | `#F59E0B` | Status changes (En Route), pending alerts. |
| | `success` | `#10B981` | Completed incidents, resolution confirmations. |
| | `info` | `#3B82F6` | General system information and updates. |
| **Agency** | `police` | `#1E40AF` | Police-specific incidents and responder roles. |
| | `fire` | `#B91C1C` | Fire department incidents and responder roles. |
| | `medical` | `#059669` | Medical/Ambulance incidents and responder roles. |
| | `disaster` | `#EA580C` | Disaster/Local Government incidents and roles. |

### 2. Typography System (Toyota Type)
The "Toyota Type" (OTF) font family is strictly enforced for all UI text.

| Element | Size | Weight | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **H1** | 48px | Bold (700) | 1.1 | Large hero headlines, landing screens. |
| **H2** | 36px | Bold (700) | 1.2 | Section titles, prominent headers. |
| **H3** | 24px | Semibold (600) | 1.3 | Card titles, subsection headers. |
| **H4** | 20px | Semibold (600) | 1.4 | Small headers, form group labels. |
| **Body Large** | 18px | Regular (400) | 1.6 | High-readability description text. |
| **Body** | 16px | Regular (400) | 1.6 | Default UI text, input values. |
| **Body Small** | 14px | Regular (400) | 1.5 | Metadata, supporting text. |
| **Caption** | 12px | Regular (400) | 1.4 | Timestamps, micro-copy. |
| **Button** | 16px | Bold (700) | 1 | Call to action labels. |

### 3. Layout & Elevation
The layout follows a 4px-base spacing system to ensure consistent alignment.

| Token | Value | Purpose |
| :--- | :--- | :--- |
| `spacing.xs` | 4px | Tight internal padding (text to icon). |
| `spacing.sm` | 8px | Grouped element spacing. |
| `spacing.md` | 16px | Default screen and card padding. |
| `spacing.lg` | 24px | Large section spacing. |
| `spacing.xl` | 32px | Massive whitespace for separation. |
| `radius.md` | 12px | Primary border radius for cards and buttons. |
| `radius.full` | 9999px | SOS button and status pills. |

**Elevation Strategy**:
- `cardShadow`: `shadowOffset: { width: 0, height: 1 }`, `shadowOpacity: 0.1`, `shadowRadius: 3`.
- `elevation`: `2` (Android baseline).

## Core UI Components Detailed Design

### 1. ThemedButton (Interactive Primitives)
- **Primary**: Brand Red background, White text.
- **Critical**: Critical Red background, White text.
- **Secondary**: White background, Gray-800 border and text.
- **Disabled**: Gray background (Muted), 50% opacity, non-interactive.
- **Touch Target**: Minimum 44px (Standard) or 56px (SOS/Primary) to ensure field accessibility with gloves or shaky hands.

### 2. SOS Button (One-Tap Emergency)
- **Size**: 200px diameter (circular).
- **Color**: Brand Primary Red (`#EB0A1E`).
- **Animation**: 2000ms "Pulse" effect using `react-native-reanimated`.
- **UX**: Single tap triggers the incident selection grid; no long-press required to minimize response time.

### 3. Custom Map Infrastructure (Leaflet Bridge)
- **Architecture**: `WebView` hosting a local `leaflet/index.html` asset.
- **Interaction**: "Center Crosshair" pattern. Instead of dragging markers, users drag the map itself to align the fixed center crosshair with the incident location.
- **Synchronization**: Two-way communication via `injectJavaScript` (Native to JS) and `onMessage` (JS to Native).

### 4. Incident Management Dashboard (Responder Only)
- **Map View**: Full-screen or 45% viewport map centering on live GPS location.
- **Bottom Sheet**: Uses `@gorhom/bottom-sheet` with three snap points:
  - **Collapsed (60px)**: Shows active status toggle only.
  - **Medium (35%)**: Shows incident summary card.
  - **Expanded (90%)**: Shows full incident details and action buttons (Accept/Decline).


### 5. Maps: Custom Leaflet Bridge
**Decision**: Custom `LeafletView` via `react-native-webview` instead of third-party libraries.
**Rationale**: Bypasses Metro bundling issues with hardcoded asset paths and provides granular control over the JS-Native bridge (`onMoveEnd`, `MAP_READY`).
**Pattern**: "Center Crosshair" for location selection in `ReportLocationInput.tsx` to optimize mobile UX over marker dragging.

### 6. High-Performance Animations
**Decision**: Standardize on `react-native-reanimated` for all UI-thread animations.
**Implementation**: The 200px SOS button pulse uses `useSharedValue` and `useAnimatedStyle` for 60fps performance, ensuring the JS thread remains free for reporting logic.

## Risks / Trade-offs

- **Clean Architecture Boilerplate**: High file count for simple features.
  - [Risk] → Increased cognitive load for new developers.
  - [Mitigation] → Clear documentation in `AGENT_MEMORY.md` and `KNOWLEDGE_NOTES.md`.
- **Responder Prototype Status**: Responder flows are AI-generated and not field-tested.
  - [Risk] → Structural redesign likely during Sprint 0005+.
  - [Mitigation] → Explicitly mark responder specs as "Subject to Change."
- **Web/Native Map Divergence**: `iframe` (Web) vs `WebView` (Native).
  - [Risk] → Potential UI inconsistencies in map rendering.
  - [Mitigation] → Unified `Map.tsx` interface to abstract platform differences.
