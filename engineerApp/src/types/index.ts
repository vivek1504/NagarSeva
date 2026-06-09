// Issue types as defined in the backend
export type IssueType = 'POTHOLE' | 'GARBAGE';

// Issue status workflow
export type IssueStatus =
  | 'DETECTED'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'FIXED'
  | 'RESOLVED'
  | 'REJECTED';

// Ward interface
export interface Ward {
  id: string;
  name: string;
  number: number;
}

// Route interface
export interface Route {
  id: string;
  name: string;
  wardId: string;
  startLat: number;
  startLon: number;
  endLat: number;
  endLon: number;
  distance: number;
}

// Issue interface based on backend schema
export interface Issue {
  id: string;
  type: IssueType;
  status: IssueStatus;
  latitude: number;
  longitude: number;
  imageUrl: string;
  wardId: string;
  routeId: string;
  surveySessionId: string;
  ward?: Ward;
  route?: Route;
  createdAt: string;
  // Assignment info (merged from IssueAssignment)
  assignmentId?: string;
  assignedAt?: string;
}

// Auth types
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user?: User;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
