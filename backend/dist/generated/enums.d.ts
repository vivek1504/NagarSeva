export declare const UserRole: {
    readonly ADMIN: "ADMIN";
    readonly SURVEYOR: "SURVEYOR";
    readonly ENGINEER: "ENGINEER";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const IssueType: {
    readonly POTHOLE: "POTHOLE";
    readonly GARBAGE: "GARBAGE";
};
export type IssueType = (typeof IssueType)[keyof typeof IssueType];
export declare const IssueStatus: {
    readonly DETECTED: "DETECTED";
    readonly ASSIGNED: "ASSIGNED";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly FIXED: "FIXED";
    readonly RESOLVED: "RESOLVED";
    readonly REJECTED: "REJECTED";
};
export type IssueStatus = (typeof IssueStatus)[keyof typeof IssueStatus];
export declare const RouteAssignmentStatus: {
    readonly PENDING: "PENDING";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly COMPLETED: "COMPLETED";
};
export type RouteAssignmentStatus = (typeof RouteAssignmentStatus)[keyof typeof RouteAssignmentStatus];
//# sourceMappingURL=enums.d.ts.map