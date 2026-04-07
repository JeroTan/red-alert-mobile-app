## ADDED Requirements

### Requirement: Phone-Based Authentication with Secure Registration
The system SHALL provide a secure login and registration mechanism based on the user's phone number, email, and password.

#### Scenario: Register new citizen account with validation
- **WHEN** the user provides:
    - `phone`: Valid string per `UserPhone` value object
    - `email`: Valid per `zodEmail` preset (5-100 characters)
    - `password`: Valid per `zodPassword` preset (min 8 chars, 1 uppercase, 1 lowercase, 1 digit)
    - `first_name`, `last_name`: Valid per `zodName` preset (2-64 characters)
- **THEN** the system SHALL validate the input via Zod in the application layer, create the account, and establish an authenticated session.

### Requirement: Robust Session Persistence
The system SHALL maintain user sessions securely using `expo-secure-store` across application restarts.

#### Scenario: Automatic session restoration
- **WHEN** the user launches the application
- **THEN** the system SHALL retrieve the `access_token` and `refresh_token` from secure storage, verify the session validity, and automatically navigate the user to their appropriate app mode if valid.

### Requirement: Role-Based Stack Guarding
The system SHALL strictly enforce access control to feature stacks based on the user's authenticated roles and the selected application mode.

#### Scenario: Unauthorized access to Responder stack
- **WHEN** a user with only the `Citizen` role attempts to navigate to the `/responder` route
- **THEN** the `StackGuardedRouting` system SHALL block access and redirect the user back to the Public home screen or index.

### Requirement: Domain-Driven Security (Value Objects)
The system SHALL use immutable Value Objects in the domain layer to encapsulate and validate all security-critical data.

#### Scenario: Attempt to create invalid email object
- **WHEN** an invalid email string is passed to the `UserEmail` constructor
- **THEN** the domain object SHALL throw a validation error, preventing the data from entering the application logic.
