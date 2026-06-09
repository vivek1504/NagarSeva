// Assignment Status
export type AssignmentStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

// Issue Types and Status
export type IssueType = 'POTHOLE' | 'GARBAGE';
export type IssueStatus = 'DETECTED' | 'ASSIGNED' | 'IN_PROGRESS' | 'FIXED' | 'RESOLVED' | 'REJECTED';

// Ward
export interface Ward {
    id: string;
    name: string;
    city: string;
}

// Route
export interface Route {
    id: string;
    name: string;
    wardId: string;
    ward?: Ward;
    startLat: number;
    startLon: number;
    endLat: number;
    endLon: number;
    distance?: number;
}

// Route Assignment
export interface RouteAssignment {
    id: string;
    routeId: string;
    route?: Route;
    surveyorId: string;
    assignedAt: string;
    status: AssignmentStatus;
    completedAt?: string;
}

// Survey Session
export interface SurveySession {
    id: string;
    routeAssignmentId: string;
    startedAt: string;
    endedAt?: string;
}

// Issue / Pothole Detection
export interface Issue {
    id: string;
    latitude: number;
    longitude: number;
    type: IssueType;
    status: IssueStatus;
    wardId: string;
    surveySessionId?: string;
    routeId?: string;
    imageUrl?: string;
    createdAt: string;
}

// User / Surveyor
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'SURVEYOR' | 'ENGINEER' | 'ADMIN';
}

// API Response Types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
}

// Navigation Types
export type RootStackParamList = {
    Login: undefined;
    Dashboard: undefined;
    AssignmentDetail: { assignment: RouteAssignment };
    Survey: { assignment: RouteAssignment };
    SurveyComplete: {
        frameCount: number;
        assignmentId: string;
        routeName?: string;
        duration?: number;
        issuesDetected?: number;
    };
};
