## Why

To establish a formal OpenSpec baseline for the ALERTAP platform, covering the Public (Citizen) and Responder apps. This change documents the current codebase and its architectural patterns to facilitate future development and maintenance. 

**Note**: The Responder features (Incident Selection, Tracking, Scene) are based on the initial AI-generated prototype and have not been fully verified; they are subject to change during the next development cycles.

## What Changes

Initial documentation of the existing ALERTAP platform, including:
- Core UI flows for Public and Responder applications.
- Clean Architecture implementation (Domain, Adapter, Application, Infrastructure).
- Shared design system based on Toyota Mobility guidelines.
- Authentication and session management system.

## Capabilities

### New Capabilities
- `public-app-core`: One-tap SOS reporting, profile management, and settings for citizens.
- `responder-app-core`: Incident management, real-time map tracking, and status updates for emergency responders.
- `auth-system`: Phone-based authentication and session management using Clean Architecture.
- `shared-ui-foundation`: Toyota Mobility inspired design system with modular styles and reusable components.

### Modified Capabilities
- None

## Impact

- `openspec/specs/`: New specifications for all core capabilities.
- `docs/`: Alignment of existing documentation with OpenSpec standards.
- Future development: Provides a clear contract for feature enhancements and refactors.
