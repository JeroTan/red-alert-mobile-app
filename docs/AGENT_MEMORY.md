# Agent Memory

This document serves as a persistent memory for AI agents working on the **red-alert-mobile-app** project. It tracks important architectural decisions, implementations, learnings, and project evolution to ensure continuity across different machines, agents, or sessions.

> **CRITICAL INSTRUCTION FOR ALL AI AGENTS:** 
> Whenever you complete a significant task, learn something new about the project, or implement a core feature, you **MUST** update this document. Keep it concise, structured, and focused on high-signal information.

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

### VS Code Integration (March 20, 2026)
- **Status:** Enhanced developer experience with IDE integration.
- **Key Changes:**
    - Installed **Gemini CLI Companion** extension for VS Code.
    - This enables IDE context sharing (open files, selection) and native diffing support within the CLI.

## 🧠 Learnings & Context
- The project uses a "Themed" approach for UI components to support dark/light modes out of the box.
- `expo-router` is used for navigation, favoring a flat file structure within `app/`.
- `app.config.ts` is now a TypeScript file, allowing for dynamic configuration based on environment variables if needed in the future.
- Domain-Driven Design (DDD) patterns are being applied with a focus on **atomic value objects**. Each property of a domain entity has its own dedicated value object class to ensure strict typing and validation.

## 📍 Current Focus / TODOs
- [ ] Implement Organization Entity using the atomic Value Objects.
- [ ] Define User domain logic in `domain/user/`.
- [ ] Determine the primary purpose/feature set of "Red Alert" (e.g., notifications, emergency alerts, etc.).

---
*Last Updated: March 20, 2026*
