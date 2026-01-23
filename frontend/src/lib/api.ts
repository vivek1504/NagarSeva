// API service for the NagarSeva Civic Issue Monitoring System using axios
import api from './axiosClient';
import type { Employee, Issue, Route, Ward } from '@/types';
import type { AuthUser } from '@/atoms/authAtom';

// API response types
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post<ApiResponse<{ user: AuthUser; token: string }>>(
      '/api/admin/login',
      { email, password }
    );
    return response.data;
  },
};

// Employee API
export const employeeApi = {
  getAll: async () => {
    const response = await api.get<ApiResponse<Employee[]>>('/api/admin/employees');
    return response.data;
  },

  getSurveyors: async () => {
    const response = await api.get<ApiResponse<Employee[]>>('/api/admin/surveyors');
    return response.data;
  },

  getEngineers: async () => {
    const response = await api.get<ApiResponse<Employee[]>>('/api/admin/engineers');
    return response.data;
  },

  create: async (data: { name: string; email: string; password: string; role: string }) => {
    const response = await api.post<ApiResponse<Employee>>('/api/admin/createEmployee', data);
    return response.data;
  },
};

// Ward API
export const wardApi = {
  getAll: async () => {
    const response = await api.get<ApiResponse<Ward[]>>('/api/admin/wards');
    return response.data;
  },
};

// Route API
export const routeApi = {
  getAll: async () => {
    const response = await api.get<ApiResponse<Route[]>>('/api/admin/routes');
    return response.data;
  },

  assignSurveyor: async (surveyorId: string, routeId: string) => {
    const response = await api.post<ApiResponse<any>>('/api/admin/assignRoute', {
      surveyorId,
      routeId,
    });
    return response.data;
  },
};

// Issue API
export const issueApi = {
  getAll: async () => {
    const response = await api.get<ApiResponse<Issue[]>>('/api/admin/allIssues');
    return response.data;
  },

  getByStatus: async (status: string) => {
    const response = await api.get<ApiResponse<Issue[]>>('/api/admin/issues', {
      params: { status },
    });
    return response.data;
  },

  assignEngineer: async (issueId: string, engineerId: string) => {
    const response = await api.post<ApiResponse<any>>('/api/admin/assignSolver', {
      issueId,
      engineerId,
    });
    return response.data;
  },

  verifyResolution: async (issueId: string, resolution: 'APPROVED' | 'REJECTED', feedback?: string) => {
    const response = await api.put<ApiResponse<any>>(`/api/admin/issueResolution/${issueId}`, {
      resolution,
      feedback,
    });
    return response.data;
  },
};

// Dashboard API - computed from other endpoints
export const dashboardApi = {
  getStats: async () => {
    // Fetch all required data
    const [employeesRes, issuesRes, routesRes, wardsRes] = await Promise.all([
      employeeApi.getAll(),
      issueApi.getAll(),
      routeApi.getAll(),
      wardApi.getAll(),
    ]);

    const employees = employeesRes.data;
    const issues = issuesRes.data;
    const routes = routesRes.data;
    const wards = wardsRes.data;

    const stats = {
      totalWards: wards.length,
      totalRoutes: routes.length,
      activeSurveyors: employees.filter((e) => e.role === 'SURVEYOR').length,
      openIssues: issues.filter((i) => !['CLOSED', 'RESOLVED', 'REJECTED'].includes(i.status)).length,
      issuesByStatus: {
        DETECTED: issues.filter((i) => i.status === 'DETECTED').length,
        ASSIGNED: issues.filter((i) => i.status === 'ASSIGNED').length,
        IN_PROGRESS: issues.filter((i) => i.status === 'IN_PROGRESS').length,
        FIXED: issues.filter((i) => i.status === 'FIXED').length,
        CLOSED: issues.filter((i) => ['CLOSED', 'RESOLVED', 'REJECTED'].includes(i.status)).length,
      },
    };

    return { success: true, data: { stats, employees, issues, routes, wards } };
  },
};
