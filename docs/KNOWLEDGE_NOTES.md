# Knowledge Notes (Learning React Native)

This document tracks high-level concepts, architectural patterns, and specialized React Native knowledge for the **red-alert-mobile-app** project.

---

## 🏗️ Core Architecture (Project Specific)

### 1. Atomic Value Objects (Domain-Driven Design)
- **Concept:** Every domain entity property (e.g., `OrganizationPhone`, `OrganizationAddress`) is its own class/object instead of a primitive string or number.
- **Why?** It ensures strict validation and prevents "primitive obsession." A phone number is not just a string; it must follow a specific format.
- **Reference:** See `domain/organization/value-objects/`.

### 2. File-Based Routing (Expo Router)
- **Concept:** Every file in the `app/` directory becomes a screen automatically.
- **`_layout.tsx`:** Acts as a wrapper for all screens in that directory. Perfect for theme providers or global headers.
- **`(tabs)`:** A folder name in parentheses means it won't affect the URL/path but will group screens (e.g., into a bottom tab navigator).

---

## 🎨 Styling with NativeWind (Tailwind for React Native)

### 3. Native vs. Web CSS
- **Concept:** NativeWind maps Tailwind utility classes (like `flex-1`, `bg-brand-primary`) to React Native's `StyleSheet` system.
- **Key Difference:** Many CSS properties (like `hover`, `grid`, `fixed`) don't exist in React Native. Use `flex`, `absolute`, and `z-index` carefully.
- **Native Context:** Use `className` just like in React (web), but remember it will be transformed for mobile.

---

## 🗺️ Maps & Interaction

### 4. `react-native-maps`
- **Concept:** A library that wraps native Google Maps (Android) and Apple Maps (iOS).
- **`<MapView />`:** The main container.
- **`<Marker />`:** Represents a point on the map.
- **Best Practice:** Use a `region` or `initialRegion` to center the map on a specific location (latitude/longitude).

### 5. `gorhom/bottom-sheet`
- **Concept:** A high-performance "drawer" that slides up from the bottom of the screen.
- **Why?** Very common in mobile apps (like Google Maps) to show details while keeping the map visible in the background.
- **Learn:** It uses `react-native-reanimated` for 60fps performance.

---

## ⚙️ Project Ecosystem Tools

### 6. `clsx` and `tailwind-merge`
- **`clsx`:** Helps conditionally apply classes (e.g., `clsx('bg-brand-primary', isActive && 'bg-green-500')`).
- **`tailwind-merge`:** Solves conflicts when multiple classes affect the same property (e.g., `px-2` vs `px-4`).

### 7. `date-fns`
- **Concept:** A lightweight library for formatting dates and times (e.g., `3 minutes ago`).

---

## 🚀 Advanced Mobile Concepts (Beyond Basic React)

### 8. Native Animations (`react-native-reanimated`)
- **Concept:** Animations in React Native should ideally run on the "UI Thread" rather than the "JS Thread" to avoid lag when the logic is busy.
- **Shared Values (`useSharedValue`):** Variables that can be changed on the UI thread.
- **Animated Styles (`useAnimatedStyle`):** Styles that automatically update based on a Shared Value.
- **Example:** Our SOS pulse uses `withRepeat` and `withSequence` to loop a scale change without touching the main React state.

### 9. Native Module Interop (`Linking`)
- **Concept:** Mobile apps don't use simple `<a>` tags for everything. We use the `Linking` API to talk to other apps.
- **Geo-URI:** Using `geo:lat,lng` triggers the OS to ask "Which map app should I open?".

### 10. Dimensions & Screen Ratios
- **Concept:** Mobile screens vary wildly. Using `Dimensions.get('window')` helps us set heights based on percentage (like our 45% map) rather than fixed pixels.

### 11. Safe Areas (`SafeAreaView`)
- **Concept:** Modern phones have "notches" and "home indicators." `SafeAreaView` ensures our content isn't hidden under the camera or the bottom swipe bar.

### 12. Gesture Handling (`react-native-gesture-handler`)
- **Concept:** Standard button taps are easy, but complex things like "swiping up a bottom sheet" require a separate gesture system that feels native and responsive.

### 13. Advanced Safe Area Management (`react-native-safe-area-context`)
- **Concept:** The built-in `SafeAreaView` is limited. The community-standard library provides a `SafeAreaProvider` at the root and a `useSafeAreaInsets` hook to get precise pixel values for notches, status bars, and home indicators.
- **Why?** It allows for more flexible layouts (e.g., drawing a background color into the notch while keeping text below it).

### 14. Bulletproof React (Feature-Based Architecture)
- **Concept:** Instead of grouping files by type (e.g., all components in one folder), files are grouped by **feature** (e.g., `features/auth`, `features/dispatch`).
- **Structure:** Each feature folder typically contains its own `components`, `hooks`, `types`, and `screens`.
- **Benefit:** Makes the codebase much easier to navigate and scale. A developer working on "Dispatch" only needs to look inside `features/dispatch`.
