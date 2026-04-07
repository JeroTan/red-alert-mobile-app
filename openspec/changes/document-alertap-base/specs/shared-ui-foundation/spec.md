## ADDED Requirements

### Requirement: Centralized Styling Engine (NativeWind/Tailwind)
The system SHALL use a standardized styling engine for universal design consistency across Native and Web platforms.

#### Scenario: Utility class integration
- **WHEN** a UI component is styled with NativeWind utility classes (e.g., `flex-row`, `bg-brand-primary`)
- **THEN** it SHALL resolve these classes to the corresponding styling tokens defined in `style/colors.ts`, `style/typography.ts`, and `style/layout.ts`.

### Requirement: Themed Primitive UI Components
The system SHALL provide a set of highly reusable primitive components that enforce the Toyota Mobility design tokens.

#### Scenario: ThemedButton interaction
- **WHEN** a `ThemedButton` is rendered with the `primary` variant
- **THEN** it SHALL:
    - Use the `brand-primary` background color.
    - Maintain a 56px (`h-14`) touch target.
    - Show high-contrast white, uppercase, and bold text.
    - Handle disabled states with 50% opacity and the `cursor-not-allowed` cursor on web.

### Requirement: Advanced Map Interaction UI
The system SHALL provide specialized UI components for precise geographic data handling.

#### Scenario: Selecting coordinates on a map
- **WHEN** the `MapMoveablePin` component is used within a `Map`
- **THEN** it SHALL:
    - Allow users to drag the map to align the pin with a specific location.
    - Provide real-time coordinate updates via the `onPinChange` callback.
    - Integrate with `expo-location` for initial coordinate detection and reverse geocoding.

### Requirement: Reanimated SOS Interaction
The system SHALL implement high-visibility emergency actions using optimized animations.

#### Scenario: SOS Button pulse
- **WHEN** the Citizen `HomeScreen` is rendered
- **THEN** the SOS button SHALL execute a continuous 2-second pulse animation using `react-native-reanimated` to emphasize its critical priority.
