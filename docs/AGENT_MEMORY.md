# Agent Memory

This document serves as a persistent memory for AI agents working on the **red-alert-mobile-app** project. It tracks important architectural decisions, implementations, learnings, and project evolution to ensure continuity across different machines, agents, or sessions.

> **CRITICAL INSTRUCTION FOR ALL AI AGENTS:** 
> Whenever you complete a significant task, learn something new about the project, or implement a core feature, you **MUST** update this document. Keep it concise, structured, and focused on high-signal information.
>
> **Memory Update Strategy:**
> Prioritize incremental updates. When modifying the memory, locate the most relevant existing entry and add specific details. Avoid creating entirely new, dated entries for minor changes unless architecturally significant. Focus on surgical additions and corrections to existing points.

---

## 🚀 Project Overview
- **Name:** red-alert-mobile-app
- **Stack:** Expo (React Native), TypeScript, Expo Router (File-based routing).
- **Architecture:** Transitioning towards a domain-driven structure (see `domain/` folder).

## 🛠️ Key Implementations & Happenings

### Initial Setup (March 18, 2026)
- **Status:** Project is in its early stages, initialized with `create-expo-app`.
- **Structure:** 
    - `app/`: Contains Expo Router pages (`(tabs)`, `_layout.tsx`, `modal.tsx`).
    - `components/`: UI components including `themed-view.tsx`, `themed-text.tsx`, and `ui/` primitives.
    - `domain/`: Created to house business logic. `domain/user/` is currently initialized but empty.
    - `hooks/`: Custom hooks for color schemes and theme management.
    - `constants/`: Theme definitions.
- **Key Changes:**
    - Converted `app.json` to a dynamic and typed `app.config.ts` using `ExpoConfig`.
    - Refactored Organization domain value objects to be atomic (each in its own file) and organized into subfolders:
      - `contact/`: `OrganizationPhone`, `OrganizationWebsite`
      - `location/`: `OrganizationAddress`, `OrganizationBarangay`, `OrganizationCity`, `OrganizationProvince`, `OrganizationRegion`
      - `status/`: `OrganizationIsActive`
      - `timestamp/`: `OrganizationCreatedAt`, `OrganizationUpdatedAt`
      - Root: `OrganizationId`, `OrganizationName`, `OrganizationShortName`, `OrganizationCode`, `OrganizationType`, `OrganizationLevel`
- **Dependencies:** React 19, React Native 0.81, Expo 54.

### Architectural Refactor & Modularization (March 23, 2026)
- **Status:** **REFACTORED** to Bulletproof React architecture.
- **Key Changes:**
    - **Safe Area Fix:** Replaced deprecated/limited `SafeAreaView` with `react-native-safe-area-context`. Added `SafeAreaProvider` to `app/_layout.tsx` and utilized `useSafeAreaInsets` hook in screens for precise notch handling.
    - **Atomic UI Components:** Created `./components/ui/` with reusable primitives:
        - `Button` (with icon support), `Badge`, `Card`, `IconButton`, `Map`, `ThemedText`, `ThemedView`.
    - **Feature-Based Architecture:** Logic and UI split into:
        - `features/responder/`: Dashboard, Incident Management, Bottom Sheets.
        - `features/public/`: SOS, Type Selection, Reporting, Tracking simulation.
    - **Self-Correction & Best Practices:** Acknowledged a significant previous failure where logic was incorrectly consolidated into a monolithic `index.ts` file in the `app/` directory. This violated Expo's file-based routing and modular programming principles. The user has since corrected this by:
        - Properly utilizing Expo Router's directory structure (e.g., `app/public/`, `app/responder/`).
        - Separating feature logic into the `features/` directory following the Bulletproof React pattern.
        - Ensuring screens in `app/` are thin wrappers around feature-based components.
    - **TypeScript Support:** Resolved all type errors in the modular components and hooks.
- **Learnings:**
    - **CRITICAL:** Avoid "Monolithic Index" syndrome. Logic must be distributed across modular features to maintain scalability.
    - Expo Router's directory-based routing is a first-class citizen; respect it by organizing routes into meaningful sub-folders.
    - Always prioritize `SafeAreaProvider` at the root for modern mobile layouts.

## 🧠 Learnings & Context
...
- The "Task -> Review -> Proceed" workflow ensures architectural alignment and high-quality surgical edits.
- NativeWind's `rounded-full` combined with equal width/height is the standard for circular UI elements in this project.
- Animations must prioritize `react-native-reanimated` for 60fps performance on the UI thread.
- **CRITICAL:** NEVER suppress, ignore, or hide warnings (e.g., via `LogBox.ignoreLogs` or `console.warn` overrides) without explicit user authorization. Always prioritize fixing the root cause in the implementation. If the warning comes from a third-party dependency, inform the user rather than hiding it.
- **Styling Preference:** For React Native, **Vanilla Styles (StyleSheet/style prop)** are preferred over TailwindCSS/NativeWind classes when defining font families or cross-platform props like `pointerEvents` to ensure maximum reliability and maintainability.
- **Icon Styling:** For `lucide-react-native` (and potentially other icon libraries), use the **spread pattern** for the `color` prop (e.g., `{...{ color: colors.primary }}`) and always reference theme colors from `@/style/colors` instead of hardcoding hex values. This ensures consistent color application and better compatibility with certain JSX parsers/transformers used in the project.

### UI/UX Refinements & Font Integration (March 23, 2026)
- **Status:** **REFACTORED**
- **Key Changes Implemented:**
    - **"Switch to Responder" Button Relocation:** Moved from `features/public/components/SOSButton.tsx` to the top-right of `features/public/components/PublicHeader.tsx`.
    - **Proper Custom Font Integration ("Toyota Type"):**
        - Font files (OTF) added to `assets/fonts/toyota-type/`.
        - `app.config.ts` updated with comprehensive `expo-font` configuration for both Android and iOS, including `fontDefinitions` for weight/style mapping.
        - `app/_layout.tsx` updated to use `expo-font`'s `useFonts` with OTF files and object configuration (`uri` and `display: FontDisplay.SWAP`).
        - **Splash Screen Fix:** Refactored `SplashScreen.hideAsync()` to trigger on either `fontsLoaded` or `fontError`.
        - **Vanilla Style Preference:** `components/ui/ThemedText.tsx` updated to apply `fontFamily: typography.fontFamily.toyota` via vanilla `style` prop instead of Tailwind. This ensures maximum reliability for custom fonts in React Native.
        - `tailwind.config.js` and `style/typography.ts` updated to maintain consistency.
- **Resolved Issues:**
    - **`lucide-react-native` Icon Props:** (fixed by user)
    - **`MapProps` Definition:** (fixed by user, confirmed by `npm run check`)
### Maps & Media Enhancements (March 25, 2026)
- **Status:** **IN PROGRESS** (Sprint 3)
- **Key Changes Implemented:**
    - **Web Map Implementation:** Refactored `components/ui/Map.web.tsx` to use Google Maps Embed API via `iframe`. It now supports single markers and route visualization (two markers) using the `q` parameter.
    - **Reusable `ImageInput` Component:** Created `components/form/ImageInput.tsx` utilizing `expo-image-picker`.
    - **Interactive Location Selection:**
        - Integrated `expo-location` for cross-platform geolocation and reverse geocoding.
        - Refactored `features/public/components/ReportLocationInput.tsx` to auto-detect user location.
        - Added interactive Map selection mode in the report form, allowing users to move the map to pinpoint incidents (Center Crosshair pattern).
        - Updated `Map.native.tsx` to support `onRegionChangeComplete` and children for overlays.
    - **Incident Report Refactor:** Updated `features/public/components/ReportPhotoInput.tsx` to use the new `ImageInput` component with `multiInput` enabled.
- **Technical Decisions:**
    - **Map Platform Divergence:** Used `iframe` for Web and `react-native-maps` for Native to provide the best possible experience on each platform without complex polyfills.
    - **Center Crosshair Pattern:** Implemented for location picking to avoid the UX complexity of dragging markers, especially on smaller screens.
    - **State Management:** Added `userAddress` and `userCoordinates` to `PublicContext` to persist the detected/selected location throughout the reporting flow.
    - **Web Geocoding Fix:** Implemented a direct fetch to the **Nominatim (OpenStreetMap)** API in `ReportLocationInput.tsx` for Web platforms. This bypasses the `expo-location` limitation/removal of the bundled Google Geocoding service on Web (SDK 49+), ensuring the app remains functional without requiring a Google Maps API key for basic address detection during prototyping.
---
*Last Updated: March 25, 2026*