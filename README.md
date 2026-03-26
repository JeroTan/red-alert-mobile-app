# ALERTAP Mobile App

A cross-platform mobile application for emergency reporting and response, designed for Brgy. Zone 1, Tondo, Manila.

## Project Overview
ALERTAP is a high-speed emergency response platform that connects citizens with Police, Ambulance, and Fire services.

## Technical Stack
- **Framework:** Expo (React Native)
- **Language:** TypeScript
- **Styling:** NativeWind (Tailwind CSS)
- **Navigation:** Expo Router
- **Maps:** Custom Leaflet WebView Bridge
- **Architecture:** Modular / Bulletproof React

## Current Status
- **Sprint 0003:** Maps & Media Enhancements (Completed)
- **Migration:** Successfully migrated from Google Maps to a custom Leaflet implementation for consistent cross-platform performance.

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the App**
   ```bash
   npx expo start
   ```

## Development
- Feature logic is located in the `features/` directory.
- UI primitives are in `components/ui/`.
- Domain business logic is in `domain/`.
