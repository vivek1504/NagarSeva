import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://localhost:3000/api';

// Response types
interface LoginResponse {
    success?: boolean;
    token?: string;
    message?: string;
}

interface AssignmentsResponse {
    success: boolean;
    assignments?: any[];
    message?: string;
}

interface StartSurveyResponse {
    success: boolean;
    surverySessionId?: string;
    message?: string;
}

interface GenericResponse {
    success: boolean;
    message?: string;
    data?: any;
}

class ApiService {
    private token: string | null = null;

    async init() {
        this.token = await AsyncStorage.getItem('authToken');
    }

    setToken(token: string | null) {
        this.token = token;
        if (token) {
            AsyncStorage.setItem('authToken', token);
        } else {
            AsyncStorage.removeItem('authToken');
        }
    }

    getToken(): string | null {
        return this.token;
    }

    private getHeaders(isFormData = false) {
        const headers: Record<string, string> = {};
        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        return headers;
    }

    async get<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        return response.json();
    }

    async post<T>(endpoint: string, data?: any): Promise<T> {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
        return response.json();
    }

    async put<T>(endpoint: string, data?: any): Promise<T> {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: data ? JSON.stringify(data) : undefined,
        });
        return response.json();
    }

    // ==================== AUTH ====================

    async login(email: string, password: string): Promise<LoginResponse> {
        return this.post<LoginResponse>('/surveyor/login', { email, password });
    }

    // ==================== ASSIGNMENTS ====================

    async getAssignments(surveyorId: string): Promise<AssignmentsResponse> {
        return this.post<AssignmentsResponse>('/surveyor/assignments', { surveyorId });
    }

    async acceptAssignment(routeAssignmentId: string): Promise<GenericResponse> {
        return this.put<GenericResponse>(`/surveyor/acceptAssignment/${routeAssignmentId}`);
    }

    // ==================== SURVEY SESSION ====================

    async startSurvey(routeAssignmentId: string, startedAt: string): Promise<StartSurveyResponse> {
        return this.post<StartSurveyResponse>('/surveyor/startSurvey', {
            routeAssignmentId,
            startedAt,
        });
    }

    async endSurvey(surverySessionId: string, endedAt: string): Promise<GenericResponse> {
        return this.put<GenericResponse>('/surveyor/endSurvey', {
            surverySessionId,
            endedAt,
        });
    }

    // ==================== ENGINEER ====================

    async engineerLogin(email: string, password: string): Promise<LoginResponse> {
        return this.post<LoginResponse>('/engineer/login', { email, password });
    }

    async engineerAcceptAssignment(issueId: string): Promise<GenericResponse> {
        return this.put<GenericResponse>('/engineer/acceptAssignment', { issueId });
    }

    async engineerSolveIssue(issueId: string, engineerId: string): Promise<GenericResponse> {
        return this.put<GenericResponse>('/engineer/solveIssue', { issueId, engineerId });
    }

    // ==================== FRAME UPLOAD ====================

    async uploadFrames(
        frames: string[],
        routeId: string,
        wardId: string,
        surverySessionId: string,
        routeAssignmentId: string
    ): Promise<{ success: boolean }> {
        console.log('=== uploadFrames called ===');
        console.log('Frames count:', frames.length);
        console.log('routeId:', routeId);
        console.log('wardId:', wardId);
        console.log('surverySessionId:', surverySessionId);
        console.log('routeAssignmentId:', routeAssignmentId);
        console.log('Token present:', !!this.token);

        const formData = new FormData();

        formData.append('routeId', routeId);
        formData.append('wardId', wardId);
        formData.append('surverySessionId', surverySessionId);
        formData.append("routeAssignmentId", routeAssignmentId);

        frames.forEach((uri, index) => {
            console.log(`Adding frame ${index}:`, uri);
            formData.append('frames', {
                uri,
                name: `frame_${index}.jpg`,
                type: 'image/jpeg',
            } as any);
        });

        console.log('Making fetch request to:', `${BASE_URL}/surveyor/upload`);

        try {
            const response = await fetch(`${BASE_URL}/surveyor/upload`, {
                method: 'POST',
                headers: this.getHeaders(true),
                body: formData,
            });

            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);

            const result = await response.json();
            console.log('Response body:', result);
            return result;
        } catch (error: any) {
            console.error('=== Upload fetch error ===');
            console.error('Error name:', error?.name);
            console.error('Error message:', error?.message);
            console.error('Full error:', error);
            throw error;
        }
    }
}

export const api = new ApiService();
export default api;
