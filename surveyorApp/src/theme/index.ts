// UX4G Design System 2.0 - Government of India Design Tokens

export const colors = {
  // Primary - Government Blue
  primary: '#1A73E9', // hsl(214, 84%, 52%)
  primaryDark: '#0F5CBC',
  primaryLight: '#4C9AF4',
  primaryFaded: 'rgba(26, 115, 233, 0.1)',

  // Secondary
  secondary: '#5A6370', // hsl(216, 10%, 40%)
  secondaryLight: '#6c757d',

  // Status Colors
  success: '#3CB371', // hsl(142, 52%, 49%) - Green
  warning: '#FFA500', // hsl(39, 100%, 50%) - Orange  
  danger: '#B3261D', // hsl(3, 74%, 41%) - Destructive Red
  destructive: '#B3261D',
  info: '#00BFFF', // hsl(196, 100%, 50%) - Cyan

  // Neutrals
  background: '#FFFFFF', // hsl(0, 0%, 100%)
  surface: '#FFFFFF',
  surfaceAlt: '#F0F4F8', // accent background
  accent: '#F0F4F8', // hsl(210, 40%, 96%)
  border: '#dee2e6', // hsl(210, 14%, 89%)
  borderLight: '#e9ecef',

  // Text
  textPrimary: '#212529', // hsl(210, 11%, 15%) - foreground
  textSecondary: '#495057',
  textMuted: '#6c757d', // hsl(210, 7%, 46%)
  textInverse: '#ffffff',

  // Status-specific backgrounds
  pendingBg: '#fff3cd', // warning light
  pendingText: '#856404',
  activeBg: '#cce5ff', // info light
  activeText: '#004085',
  completedBg: '#d4edda', // success light
  completedText: '#155724',

  // Chart colors (for future use)
  chart1: '#1A73E9', // Primary Blue
  chart2: '#3CB371', // Green (Success)
  chart3: '#00BFFF', // Cyan (Info)
  chart4: '#FFA500', // Orange (Warning)
  chart5: '#B3261D', // Destructive Red
};

export const typography = {
  // Font families - UX4G spec
  fontFamily: {
    sans: 'Roboto, "Open Sans", system-ui, -apple-system, sans-serif',
    serif: 'Georgia, Cambria, "Times New Roman", serif',
    mono: 'SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
  heading1: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 36,
    fontFamily: 'Roboto',
  },
  heading2: {
    fontSize: 22,
    fontWeight: '700' as const,
    lineHeight: 28,
    fontFamily: 'Roboto',
  },
  heading3: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
    fontFamily: 'Roboto',
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
    fontFamily: 'Roboto',
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
    fontFamily: 'Roboto',
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
    fontFamily: 'Roboto',
  },
  small: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
    fontFamily: 'Roboto',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// UX4G Border Radius - base: 0.375rem (6px)
export const borderRadius = {
  sm: 2, // calc(var(--radius) - 4px)
  md: 4, // calc(var(--radius) - 2px)
  lg: 6, // var(--radius) = 0.375rem = 6px
  xl: 12,
  full: 9999,
};

// UX4G Shadow System - subtle shadows with 0.05 to 0.25 opacity
export const shadows = {
  '2xs': {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  xs: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  '2xl': {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
};
