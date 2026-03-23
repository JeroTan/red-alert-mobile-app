export const layout = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
    '4xl': 96,
  },
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12, // Guideline says card-radius 12px
    lg: 16,
    xl: 20,
    full: 9999,
  },
  headerHeight: 64, // Guideline: 64px desktop, 56px mobile. Using 64px as a safe middle/high value.
  statusToggleHeight: 60,
  mapHeightPercent: 0.45, // 45% of viewport
  
  // Public App Specifics
  sosButtonSize: 200,
  sosPulseDuration: 2000,

  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
};
