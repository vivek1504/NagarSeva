/**
 * UX4G Design System 2.0 Theme
 * Government of India Design System
 */

export const Colors = {
    // Core palette
    primary: '#1A73E9',        // Government Blue - Main actions, links (HSL 214 84% 52%)
    primaryDark: '#1557B0',    // Darker shade for pressed states
    primaryLight: '#4A90ED',   // Lighter shade for hover states
    secondary: '#5A6370',      // Secondary actions (HSL 216 10% 40%)
    destructive: '#B3261D',    // Danger/Error states (HSL 3 74% 41%)

    // Background colors
    background: '#FFFFFF',     // Page background (HSL 0 0% 100%)
    backgroundSecondary: '#F8F9FA', // Secondary background

    // Text colors
    foreground: '#212529',     // Primary text (HSL 210 11% 15%)
    muted: '#6c757d',          // Muted text/elements (HSL 210 7% 46%)
    mutedForeground: '#868e96', // Lighter muted text

    // Border & accents
    border: '#dee2e6',         // Borders (HSL 210 14% 89%)
    borderDark: '#ced4da',     // Darker borders
    accent: '#F0F4F8',         // Light accent backgrounds (HSL 210 40% 96%)

    // Chart/Status colors
    success: '#2E8B57',        // Green (HSL 142 52% 49%)
    successLight: 'rgba(46, 139, 87, 0.12)',
    warning: '#FF9500',        // Orange (HSL 39 100% 50%)
    warningLight: 'rgba(255, 149, 0, 0.12)',
    info: '#00BFFF',           // Cyan (HSL 196 100% 50%)
    infoLight: 'rgba(0, 191, 255, 0.12)',

    // Status-specific colors
    assigned: '#FF9500',
    assignedLight: 'rgba(255, 149, 0, 0.12)',
    inProgress: '#1A73E9',
    inProgressLight: 'rgba(26, 115, 233, 0.12)',
    fixed: '#2E8B57',
    fixedLight: 'rgba(46, 139, 87, 0.12)',
    resolved: '#28a745',
    resolvedLight: 'rgba(40, 167, 69, 0.12)',
    rejected: '#B3261D',
    rejectedLight: 'rgba(179, 38, 29, 0.12)',
    detected: '#6c757d',
    detectedLight: 'rgba(108, 117, 125, 0.12)',

    // Type colors
    pothole: '#B3261D',
    garbage: '#2E8B57',

    // White and overlays
    white: '#FFFFFF',
    black: '#000000',
    overlay: 'rgba(0, 0, 0, 0.5)',
    cardShadow: 'rgba(0, 0, 0, 0.08)',
};

export const Typography = {
    fontFamily: {
        sans: 'Roboto',
        sansAlt: 'System',
        mono: 'Menlo',
    },
    fontSize: {
        xs: 11,
        sm: 13,
        base: 15,
        md: 16,
        lg: 18,
        xl: 20,
        '2xl': 24,
        '3xl': 28,
        '4xl': 32,
    },
    fontWeight: {
        normal: '400' as const,
        medium: '500' as const,
        semibold: '600' as const,
        bold: '700' as const,
        extrabold: '800' as const,
    },
    letterSpacing: {
        tight: -0.5,
        normal: 0,
        wide: 0.5,
        wider: 1,
    },
};

export const Spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    base: 16,
    lg: 20,
    xl: 24,
    '2xl': 28,
    '3xl': 32,
    '4xl': 40,
    '5xl': 48,
};

export const BorderRadius = {
    sm: 2,    // calc(--radius - 4px)
    md: 4,    // calc(--radius - 2px)
    base: 6,  // --radius (0.375rem = 6px)
    lg: 6,    // var(--radius)
    xl: 10,
    '2xl': 14,
    full: 999,
};

export const Shadows = {
    '2xs': {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    xs: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    sm: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },
    md: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    lg: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 6,
    },
    xl: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.2,
        shadowRadius: 24,
        elevation: 8,
    },
    '2xl': {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 0.25,
        shadowRadius: 32,
        elevation: 10,
    },
};

// Status configuration helper
export const getStatusConfig = (status: string) => {
    switch (status) {
        case 'DETECTED':
            return { color: Colors.muted, icon: '🔍', label: 'Detected', bg: Colors.detectedLight };
        case 'ASSIGNED':
            return { color: Colors.assigned, icon: '📋', label: 'Assigned', bg: Colors.assignedLight };
        case 'IN_PROGRESS':
            return { color: Colors.inProgress, icon: '🔧', label: 'In Progress', bg: Colors.inProgressLight };
        case 'FIXED':
            return { color: Colors.fixed, icon: '✅', label: 'Fixed', bg: Colors.fixedLight };
        case 'RESOLVED':
            return { color: Colors.resolved, icon: '🎉', label: 'Resolved', bg: Colors.resolvedLight };
        case 'REJECTED':
            return { color: Colors.rejected, icon: '❌', label: 'Rejected', bg: Colors.rejectedLight };
        default:
            return { color: Colors.muted, icon: '📌', label: status, bg: Colors.accent };
    }
};

// Type configuration helper
export const getTypeConfig = (type: string) => {
    return type === 'POTHOLE'
        ? { icon: '🕳️', label: 'Pothole', color: Colors.pothole }
        : { icon: '🗑️', label: 'Garbage', color: Colors.garbage };
};

export default {
    Colors,
    Typography,
    Spacing,
    BorderRadius,
    Shadows,
    getStatusConfig,
    getTypeConfig,
};
