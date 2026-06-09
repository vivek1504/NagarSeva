import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { storage } from '../utils/storage';
import { Issue, LoginCredentials, LoginResponse, ApiResponse } from '../types';

const BASE_URL = 'http://localhost:3000/api/engineer';

// Create axios instance
const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const token = await storage.getToken();
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('Request URL:', (config.baseURL || '') + (config.url || ''));
        return config;
    },
    (error) => {
        console.log('Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => {
        console.log('Response:', response.status);
        return response;
    },
    (error) => {
        console.log('Response Error:', error.message, error.response?.data);
        if (error.response?.status === 401) {
            console.log('Unauthorized - token may be expired');
        }
        return Promise.reject(error);
    }
);

// API functions
export const apiClient = {
    // Authentication
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        console.log('Attempting login with:', credentials.email);
        const response = await api.post<LoginResponse>('/login', credentials);
        return response.data;
    },

    // Engineer routes
    async getAssignedIssues(): Promise<Issue[]> {
        const response = await api.get<Issue[] | { issues: Issue[] } | ApiResponse<Issue[]>>('/issues');
        // Handle different response formats
        if (Array.isArray(response.data)) {
            return response.data;
        }
        if ('issues' in response.data && Array.isArray(response.data.issues)) {
            return response.data.issues;
        }
        if ('data' in response.data && Array.isArray(response.data.data)) {
            return response.data.data;
        }
        return [];
    },

    async acceptAssignment(issueId: string): Promise<ApiResponse<Issue>> {
        const response = await api.put<ApiResponse<Issue>>('/acceptAssignment', { issueId });
        return response.data;
    },

    async solveIssue(
        issueId: string,
        engineerId: string,
        imageUri: string,
        imageName: string
    ): Promise<ApiResponse<Issue>> {
        const formData = new FormData();
        formData.append('issueId', issueId);
        formData.append('engineerId', engineerId);
        formData.append('afterImage', {
            uri: imageUri,
            type: 'image/jpeg',
            name: imageName || 'fix_image.jpg',
        } as any);

        const token = await storage.getToken();
        const response = await axios.put<ApiResponse<Issue>>(
            `${BASE_URL}/solveIssue`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
                timeout: 60000,
            }
        );
        return response.data;
    },
};

export default api;
