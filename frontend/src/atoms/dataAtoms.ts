import { atom } from 'jotai';
import type { Employee, Issue, Route, Ward, DashboardStats } from '@/types';

// Employees state
export const employeesAtom = atom<Employee[]>([]);
export const employeesLoadingAtom = atom<boolean>(false);
export const employeesErrorAtom = atom<string | null>(null as string | null);

// Derived atoms for surveyors and engineers
export const surveyorsAtom = atom((get) => {
    const employees = get(employeesAtom);
    return employees.filter((e) => e.role === 'SURVEYOR');
});

export const engineersAtom = atom((get) => {
    const employees = get(employeesAtom);
    return employees.filter((e) => e.role === 'ENGINEER');
});

// Issues state
export const issuesAtom = atom<Issue[]>([]);
export const issuesLoadingAtom = atom<boolean>(false);
export const issuesErrorAtom = atom<string | null>(null as string | null);

// Routes state
export const routesAtom = atom<Route[]>([]);
export const routesLoadingAtom = atom<boolean>(false);
export const routesErrorAtom = atom<string | null>(null as string | null);

// Wards state
export const wardsAtom = atom<Ward[]>([]);
export const wardsLoadingAtom = atom<boolean>(false);
export const wardsErrorAtom = atom<string | null>(null as string | null);

// Dashboard stats - computed from issues (NagarSeva workflow)
export const dashboardStatsAtom = atom((get): DashboardStats => {
    const employees = get(employeesAtom);
    const issues = get(issuesAtom);
    const routes = get(routesAtom);
    const wards = get(wardsAtom);

    const issuesByStatus = {
        DETECTED: issues.filter((i) => i.status === 'DETECTED').length,
        ASSIGNED: issues.filter((i) => i.status === 'ASSIGNED').length,
        IN_PROGRESS: issues.filter((i) => i.status === 'IN_PROGRESS').length,
        FIXED: issues.filter((i) => i.status === 'FIXED').length,
        RESOLVED: issues.filter((i) => i.status === 'RESOLVED').length,
        REJECTED: issues.filter((i) => i.status === 'REJECTED').length,
    };

    return {
        totalWards: wards.length,
        totalRoutes: routes.length,
        activeSurveyors: employees.filter((e) => e.role === 'SURVEYOR').length,
        openIssues: issues.filter((i) => i.status !== 'RESOLVED' && i.status !== 'REJECTED').length,
        issuesByStatus,
    };
});
