# User Story 0010: Leaflet Migration & Moveable Pin

## Title
Migrate from Google Maps to Leaflet and Implement Moveable Pin Selection

## Status
- **Status:** COMPLETED
- **Sprint:** Sprint 0003
- **Priority:** HIGH

## Description
As a user (both Public and Responder), I want a consistent, high-performance map experience across Web and Native platforms that doesn't rely on external proprietary embeds, and I want to easily select a precise location for incident reports using a moveable pin.

## Acceptance Criteria
- [x] Replace `react-native-maps` and Google Maps Embed with `react-native-leaflet-view`.
- [x] Ensure `leaflet.html` is bundled locally for offline/performance benefits.
- [x] Implement `MapMoveablePin` component to handle center-based location selection.
- [x] Refactor `ReportLocationInput` to use the new `MapMoveablePin`.
- [x] Update all existing map markers to be compatible with the Leaflet WebView environment.

## Technical Notes
- **Library:** `react-native-leaflet-view`
- **Pattern:** Using `React.cloneElement` in `MapMoveablePin` to inject `onRegionChangeComplete` into any `Map` child.
- **Marker Strategy:** Switched from React nodes to string-based icons (emojis) for WebView compatibility.
- **Asset Management:** `leaflet.html` must be manually copied from `node_modules` to `assets/`.
