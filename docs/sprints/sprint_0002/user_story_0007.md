# User Story: Brand Font Implementation

**As a** brand manager,  
**I want** the mobile application to use the official "Toyota Type" font for all text,  
**So that** the app is fully compliant with the Toyota Brand Guidelines and presents a consistent, professional appearance.

---

## Acceptance Criteria
- [x] All five `ToyotaType` font weights (Regular, Bold, Light, Semibold, Italic) are loaded into the application at startup.
- [x] The application's default font is set to `ToyotaType` globally.
- [x] All UI components (`ThemedText`, `Button`, etc.) correctly render using the `ToyotaType` font.
- [x] Tailwind CSS configuration is updated to recognize and apply the `ToyotaType` font family.
- [x] The app displays a splash screen while the fonts are loading to prevent a "flash of unstyled text" (FOUT).

## Implementation Notes
- **Font Source:** `./assets/fonts/toyota-type/`
- **Loading Mechanism:** `expo-font` `useFonts` hook in `app/_layout.tsx`.
- **Global Style:** Font is applied via `@layer base` in `style/global.css`.
- **Tailwind Config:** New `font-toyota` class created in `tailwind.config.js`.
