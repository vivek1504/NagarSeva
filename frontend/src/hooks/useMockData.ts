import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";
import {
  employeesAtom,
  employeesLoadingAtom,
  employeesErrorAtom,
  surveyorsAtom,
  engineersAtom,
  issuesAtom,
  issuesLoadingAtom,
  issuesErrorAtom,
  routesAtom,
  routesLoadingAtom,
  routesErrorAtom,
  wardsAtom,
  wardsLoadingAtom,
  wardsErrorAtom,
  dashboardStatsAtom,
} from "@/atoms/dataAtoms";
import { employeeApi, issueApi, routeApi, wardApi } from "@/lib/api";
import type { Employee, Issue, Route, IssueStatus } from "@/types";

// Dashboard Stats Hook
export function useDashboardStats() {
  const [stats] = useAtom(dashboardStatsAtom);
  const { data: employees, isLoading: empLoading } = useEmployees();
  const { data: issues, isLoading: issueLoading } = useIssues();
  const { data: routes, isLoading: routeLoading } = useRoutes();
  const { data: wards, isLoading: wardLoading } = useWards();

  return {
    data: stats,
    isLoading: empLoading || issueLoading || routeLoading || wardLoading,
  };
}

// Employees Hook
export function useEmployees() {
  const [employees, setEmployees] = useAtom(employeesAtom);
  const [isLoading, setIsLoading] = useAtom(employeesLoadingAtom);
  const [error, setError] = useAtom(employeesErrorAtom);

  const fetchEmployees = useCallback(async () => {
    if (employees.length > 0) return; // Already loaded

    setIsLoading(true);
    setError(null);
    try {
      const response = await employeeApi.getAll();
      if (response.success) {
        setEmployees(response.data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch employees");
    } finally {
      setIsLoading(false);
    }
  }, [employees.length, setEmployees, setIsLoading, setError]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const addEmployee = useCallback(
    async (employee: {
      name: string;
      email: string;
      role: "SURVEYOR" | "ENGINEER";
      password: string;
    }) => {
      try {
        const response = await employeeApi.create(employee);
        if (response.success) {
          setEmployees((prev) => [...prev, response.data]);
          return response.data;
        }
      } catch (err: any) {
        console.error("Failed to add employee:", err);
      }
      return null;
    },
    [setEmployees]
  );

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await employeeApi.getAll();
      if (response.success) {
        setEmployees(response.data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch employees");
    } finally {
      setIsLoading(false);
    }
  }, [setEmployees, setIsLoading, setError]);

  return { data: employees, isLoading, error, addEmployee, refetch };
}

// Wards Hook
export function useWards() {
  const [wards, setWards] = useAtom(wardsAtom);
  const [isLoading, setIsLoading] = useAtom(wardsLoadingAtom);
  const [error, setError] = useAtom(wardsErrorAtom);

  const fetchWards = useCallback(async () => {
    if (wards.length > 0) return; // Already loaded

    setIsLoading(true);
    setError(null);
    try {
      const response = await wardApi.getAll();
      if (response.success) {
        // Map backend data to frontend Ward type
        const mappedWards = response.data.map((ward: any) => ({
          id: ward.id,
          name: ward.name,
          code: `W${ward.number?.toString().padStart(2, "0") || "00"}`,
        }));
        setWards(mappedWards);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch wards");
    } finally {
      setIsLoading(false);
    }
  }, [wards.length, setWards, setIsLoading, setError]);

  useEffect(() => {
    fetchWards();
  }, [fetchWards]);

  return { data: wards, isLoading, error };
}

// Routes Hook
export function useRoutes() {
  const [routes, setRoutes] = useAtom(routesAtom);
  const [isLoading, setIsLoading] = useAtom(routesLoadingAtom);
  const [error, setError] = useAtom(routesErrorAtom);

  const fetchRoutes = useCallback(async () => {
    if (routes.length > 0) return; // Already loaded

    setIsLoading(true);
    setError(null);
    try {
      const response = await routeApi.getAll();
      if (response.success) {
        setRoutes(response.data as Route[]);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch routes");
    } finally {
      setIsLoading(false);
    }
  }, [routes.length, setRoutes, setIsLoading, setError]);

  useEffect(() => {
    fetchRoutes();
  }, [fetchRoutes]);

  const assignSurveyor = useCallback(
    async (routeId: string, surveyorId: string, surveyorName: string) => {
      try {
        const response = await routeApi.assignSurveyor(surveyorId, routeId);
        if (response.success) {
          // Update local state optimistically
          setRoutes((prev) =>
            prev.map((r) =>
              r.id === routeId
                ? {
                    ...r,
                    assignedSurveyorId: surveyorId,
                    assignedSurveyorName: surveyorName,
                    status: "ASSIGNED" as const,
                  }
                : r
            )
          );
          return true;
        }
      } catch (err: any) {
        console.error("Failed to assign surveyor:", err);
      }
      return false;
    },
    [setRoutes]
  );

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await routeApi.getAll();
      if (response.success) {
        setRoutes(response.data as Route[]);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch routes");
    } finally {
      setIsLoading(false);
    }
  }, [setRoutes, setIsLoading, setError]);

  return { data: routes, isLoading, error, assignSurveyor, refetch };
}

// Issues Hook
export function useIssues() {
  const [issues, setIssues] = useAtom(issuesAtom);
  const [isLoading, setIsLoading] = useAtom(issuesLoadingAtom);
  const [error, setError] = useAtom(issuesErrorAtom);

  const fetchIssues = useCallback(async () => {
    if (issues.length > 0) return; // Already loaded

    setIsLoading(true);
    setError(null);
    try {
      const response = await issueApi.getAll();
      if (response.success) {
        setIssues(response.data as Issue[]);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch issues");
    } finally {
      setIsLoading(false);
    }
  }, [issues.length, setIssues, setIsLoading, setError]);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  const assignEngineer = useCallback(
    async (issueId: string, engineerId: string, engineerName: string) => {
      try {
        const response = await issueApi.assignEngineer(issueId, engineerId);
        if (response.success) {
          // Update local state optimistically
          setIssues((prev) =>
            prev.map((i) =>
              i.id === issueId
                ? {
                    ...i,
                    assignedEngineerId: engineerId,
                    assignedEngineerName: engineerName,
                    status: "ASSIGNED" as IssueStatus,
                  }
                : i
            )
          );
          return true;
        }
      } catch (err: any) {
        console.error("Failed to assign engineer:", err);
      }
      return false;
    },
    [setIssues]
  );

  const verifyResolution = useCallback(
    async (issueId: string, approved: boolean, feedback?: string) => {
      try {
        const response = await issueApi.verifyResolution(
          issueId,
          approved ? "APPROVED" : "REJECTED",
          feedback
        );
        if (response.success) {
          // Update local state
          setIssues((prev) =>
            prev.map((i) =>
              i.id === issueId
                ? {
                    ...i,
                    status: (approved ? "RESOLVED" : "REJECTED") as IssueStatus,
                    feedback,
                  }
                : i
            )
          );
          return true;
        }
      } catch (err: any) {
        console.error("Failed to verify resolution:", err);
      }
      return false;
    },
    [setIssues]
  );

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await issueApi.getAll();
      if (response.success) {
        setIssues(response.data as Issue[]);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch issues");
    } finally {
      setIsLoading(false);
    }
  }, [setIssues, setIsLoading, setError]);

  return {
    data: issues,
    isLoading,
    error,
    assignEngineer,
    verifyResolution,
    refetch,
  };
}

// Engineers Hook (derived from employees)
export function useEngineers() {
  const [engineers] = useAtom(engineersAtom);
  const { isLoading, error } = useEmployees();

  return { data: engineers, isLoading, error };
}

// Surveyors Hook (derived from employees)
export function useSurveyors() {
  const [surveyors] = useAtom(surveyorsAtom);
  const { isLoading, error } = useEmployees();

  return { data: surveyors, isLoading, error };
}
