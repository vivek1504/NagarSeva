// Core types for the NagarSeva Civic Issue Monitoring System

export type UserRole = "ADMIN" | "SURVEYOR" | "ENGINEER";

// NagarSeva currently tracks potholes and garbage issues
export type IssueType = "POTHOLE" | "GARBAGE";

// Issue workflow: DETECTED -> ASSIGNED -> IN_PROGRESS -> FIXED -> RESOLVED/REJECTED
export type IssueStatus =
  | "DETECTED"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "FIXED"
  | "RESOLVED"
  | "REJECTED";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export interface Ward {
  id: string;
  name: string;
  code: string;
}

export interface Route {
  id: string;
  name: string;
  wardId: string;
  wardName: string;
  assignedSurveyorId?: string;
  assignedSurveyorName?: string;
  status: "UNASSIGNED" | "ASSIGNED";
}

export interface Issue {
  id: string;
  type: IssueType;
  status: IssueStatus;
  wardId: string;
  wardName: string;
  routeId: string;
  routeName: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  description?: string;
  assignedEngineerId?: string;
  assignedEngineerName?: string;
  feedback?: string;
  createdAt: string;
  updatedAt: string;
  afterImageUrl: string;
}

export interface DashboardStats {
  totalWards: number;
  totalRoutes: number;
  activeSurveyors: number;
  openIssues: number;
  issuesByStatus: {
    DETECTED: number;
    ASSIGNED: number;
    IN_PROGRESS: number;
    FIXED: number;
    RESOLVED: number;
    REJECTED: number;
  };
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: "SURVEYOR" | "ENGINEER";
  createdAt: string;
}
