## 1. Foundation: Technical Infrastructure & Tooling (Sprint 0001-0002)

- [x] 1.1 **Environment Setup & Core Config**
    - [x] 1.1.1 Document dynamic `app.config.ts` integration with `ExpoConfig` and typed environment variables.
    - [x] 1.1.2 Document dependency baseline: Expo 54, React Native 0.81, React 19.
- [x] 1.2 **Modular Styling Engine (NativeWind/Tailwind v4)**
    - [x] 1.2.1 Document `style/colors.ts`: Toyota Red (#EB0A1E), agency-specific (Police #1E40AF, Fire #B91C1C, Medical #059669).
    - [x] 1.2.2 Document `style/typography.ts` & Font Assets: OTF files in `assets/fonts/toyota-type/` and `useFonts` loading with `SWAP` display.
    - [x] 1.2.3 Document **Vanilla Style Overrides**: Preferring standard `style` props for `fontFamily` and `pointerEvents` per `AGENT_MEMORY.md`.
    - [x] 1.2.4 Document `style/layout.ts`: 4px spacing tokens and 12px card border-radius.
- [x] 1.3 **Atomic UI Primitives** (`components/ui/`)
    - [x] 1.3.1 Document `ThemedButton`: Variant-based styling (`primary`, `secondary`, `critical`, etc.) and `cn()` utility integration.
    - [x] 1.3.2 Document `ThemedText` & `ThemedView`: High-fidelity brand wrappers for text and layout.
    - [x] 1.3.3 Document `Badge` & `Card`: Shadow-based elevation tokens and pill-shaped status UI.

## 2. Architecture: Domain-Driven Clean Architecture (DDD)

- [x] 2.1 **Domain Layer: Pure Logic & Entities** (`domain/`)
    - [x] 2.1.1 Document **Value Objects**: Atomic classes for `UserPhone`, `OrganizationAddress`, etc., organized into subfolders (contact, location, status).
    - [x] 2.1.2 Document **Entities**: `User`, `Session`, `EmergencyContact`, and `OrganizationLite`.
- [x] 2.2 **Adapter/Application Layer: Orchestration** (`adapter/application/`)
    - [x] 2.2.1 Document Use Cases: `registerUser.ts`, `signInWithPassword.ts`, and validation logic.
    - [x] 2.2.2 Document **Zod Validation Presets**: `zodEmail`, `zodPassword`, `zodAddress`, and `zodFile` (Expo Asset) schemas in `zodPreset.ts`.
- [x] 2.3 **Adapter/Infrastructure Layer: Implementation** (`adapter/infrastructure/`)
    - [x] 2.3.1 Document `AuthRepositoryApi.ts`: Axios implementation for REST authentication.
    - [x] 2.3.2 Document `SessionRepositoryApi.ts`: `expo-secure-store` for encrypted session persistence.
- [x] 2.4 **Feature-Based UI Structure (Bulletproof React)**
    - [x] 2.4.1 Document `features/` directory architecture, separating screens, components, and hooks for each module (Auth, Public, Responder).

## 3. Citizen (Public) App: High-Priority Emergency Flow (Sprint 0003)

- [x] 3.1 **One-Tap Emergency UI**
    - [x] 3.1.1 Document `HomeScreen.tsx` and 200px SOS button with `react-native-reanimated` 60fps pulse animation.
    - [x] 3.1.2 Document `IncidentSelectionScreen.tsx`: Agency-coded emergency type grid.
- [x] 3.2 **Advanced Reporting Flow**
    - [x] 3.2.1 Document `ReportForm.tsx`: Multi-step form with conditional additional information checkbox.
    - [x] 3.2.2 Document `ReportLocationInput.tsx`: Automatic GPS detection with manual map selection using "Center Crosshair" pattern.
    - [x] 3.2.3 Document `ImageInput.tsx`: Custom multi-media selection/capture using `expo-image-picker`.
- [x] 3.3 **Custom Map Infrastructure**
    - [x] 3.3.1 Document `LeafletView.tsx`: `WebView`-based bridge for consistent cross-platform map rendering.
    - [x] 3.3.2 Document `MapMoveablePin.tsx`: `React.cloneElement` pattern for capturing map center coordinates during movement.
- [x] 3.4 **Incident Lifecycle Visualization**
    - [x] 3.4.1 Document `TrackingView` and `ResolutionSummary` screens.

## 4. Responder App: Incident Management Prototype

- [x] 4.1 **Situational Awareness Dashboard**
    - [x] 4.1.1 Document `ResponderDashboard.tsx`: Map-centric view using `react-native-maps` for native performance.
- [x] 4.2 **Field Operations Components**
    - [x] 4.2.1 Document `IncidentBottomSheet.tsx`: Multi-stage interactive detail panel using `@gorhom/bottom-sheet`.
    - [x] 4.2.2 Document `IncidentCard.tsx`: Summary alerts for nearby emergencies.
    - [x] 4.2.3 Document `StatusToggle.tsx`: Operational state machine (Available -> En Route -> On Scene).

## 5. Security & System Core (Sprint 0004)

- [x] 5.1 **Navigation Guards & Routing**
    - [x] 5.1.1 Document `StackGuardedRouting.tsx`: Custom `<Stack.Protected>` guard system for auth and role-based access.
    - [x] 5.1.2 Document `AppModeContext.tsx`: Core state machine for Public vs. Responder mode switching.
- [x] 5.2 **Authentication UI Implementation**
    - [x] 5.2.1 Document `LoginForm` & `RegistrationForm` components in `features/auth/registration/`.
    - [x] 5.2.2 Document `LoginScreen` & `RegistrationScreen` layouts with branding-consistent headers.
- [x] 5.3 **Utilities & Error Handling**
    - [x] 5.3.1 Document `Result.ts` & `LogicError.ts` patterns for typed error propagation.
    - [x] 5.3.2 Document Lucide Icon spread pattern: `{...{ color: colors.primary }}`.

## 6. Project Verification & Final Baseline

- [x] 6.1 Audit all documentation artifacts against the current `AGENT_MEMORY.md` and codebase for total synchronization.
- [x] 6.2 Ensure all design guidelines from `DESIGN_GUIDELINES.md` are reflected in the OpenSpec components.
- [x] 6.3 Finalize the OpenSpec change to establish the immutable technical baseline for the ALERTAP platform.
