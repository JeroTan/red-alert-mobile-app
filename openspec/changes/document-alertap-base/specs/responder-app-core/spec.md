## ADDED Requirements

### Requirement: Situational Awareness Dashboard
The system SHALL provide a map-centric dashboard for responders to view active emergencies in their vicinity.

#### Scenario: Responder views nearby alerts
- **WHEN** the responder enters the dashboard
- **THEN** the system SHALL:
    - Center the map on the responder's current location via `expo-location`.
    - Render interactive markers for each active incident using agency-coded icons.
    - Display compact `IncidentCard` components for immediate summary access.

### Requirement: Progressive Incident Detail (Bottom Sheet)
The system SHALL provide a multi-stage detail view for incidents to maximize map visibility while accessing critical information.

#### Scenario: Responder expands incident details
- **WHEN** the responder taps an `IncidentCard` or map marker
- **THEN** the system SHALL animate a `@gorhom/bottom-sheet` from its collapsed state to show:
    - Incident ID and Type (Medical, Fire, Police).
    - Precise address and reporter contact details.
    - "Accept" and "Decline" action buttons.

### Requirement: Status Lifecycle Management
The system SHALL allow responders to transition through a predefined operational lifecycle with visual confirmation.

#### Scenario: Responder updates status to En Route
- **WHEN** the responder accepts an incident and toggles the `StatusToggle` to "En Route"
- **THEN** the system SHALL:
    - Update the local incident state to "En Route".
    - Update the UI theme to the corresponding status color (e.g., Warning Amber).
    - (API Mock) Simulate an update to the dispatch backend.

### Requirement: Interactive Routing Feedback
The system SHALL provide visual routing cues when a responder is en route to an incident.

#### Scenario: Responder tracks destination
- **WHEN** the responder is in "En Route" status
- **THEN** the map SHALL display a visual line or route between the responder's live location and the incident coordinates.

**Note**: All Responder features are currently in **Prototype Status** (as of Sprint 0004) and utilize simulated API interactions. Final implementation behavior is subject to field verification and backend integration.
