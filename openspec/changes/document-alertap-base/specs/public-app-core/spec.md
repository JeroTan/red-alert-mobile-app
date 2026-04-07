## ADDED Requirements

### Requirement: One-Tap SOS Reporting
The system SHALL provide a prominent, high-contrast SOS button for citizens to immediately report an emergency.

#### Scenario: Citizen initiates emergency report
- **WHEN** the citizen taps the large circular SOS button on the Home screen
- **THEN** the system SHALL trigger the emergency reporting flow and notify relevant responders

### Requirement: Profile Management
The system SHALL allow citizens to view and manage their personal information and emergency settings.

#### Scenario: View profile
- **WHEN** the citizen navigates to the Profile tab
- **THEN** the system SHALL display their name, contact details, and account status

### Requirement: App Mode Switching
The system SHALL provide a temporary mechanism to switch between Public and Responder modes for testing and demonstration purposes.

#### Scenario: Switch to Responder mode
- **WHEN** the citizen taps the "Switch to Responder" button
- **THEN** the system SHALL update the application state to Responder mode and navigate to the Responder Home screen
