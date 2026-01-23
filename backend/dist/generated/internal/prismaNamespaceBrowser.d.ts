import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Ward: "Ward";
    readonly Route: "Route";
    readonly RouteAssignment: "RouteAssignment";
    readonly SurveySession: "SurveySession";
    readonly Issue: "Issue";
    readonly IssueAssignment: "IssueAssignment";
    readonly IssueResolution: "IssueResolution";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly password: "password";
    readonly role: "role";
    readonly department: "department";
    readonly wardId: "wardId";
    readonly createdAt: "createdAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const WardScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly number: "number";
    readonly userId: "userId";
};
export type WardScalarFieldEnum = (typeof WardScalarFieldEnum)[keyof typeof WardScalarFieldEnum];
export declare const RouteScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly wardId: "wardId";
    readonly startLat: "startLat";
    readonly startLon: "startLon";
    readonly endLat: "endLat";
    readonly endLon: "endLon";
    readonly distance: "distance";
};
export type RouteScalarFieldEnum = (typeof RouteScalarFieldEnum)[keyof typeof RouteScalarFieldEnum];
export declare const RouteAssignmentScalarFieldEnum: {
    readonly id: "id";
    readonly routeId: "routeId";
    readonly surveyorId: "surveyorId";
    readonly status: "status";
    readonly assignedAt: "assignedAt";
    readonly completedAt: "completedAt";
};
export type RouteAssignmentScalarFieldEnum = (typeof RouteAssignmentScalarFieldEnum)[keyof typeof RouteAssignmentScalarFieldEnum];
export declare const SurveySessionScalarFieldEnum: {
    readonly id: "id";
    readonly routeAssignmentId: "routeAssignmentId";
    readonly startedAt: "startedAt";
    readonly endedAt: "endedAt";
};
export type SurveySessionScalarFieldEnum = (typeof SurveySessionScalarFieldEnum)[keyof typeof SurveySessionScalarFieldEnum];
export declare const IssueScalarFieldEnum: {
    readonly id: "id";
    readonly clientCaptureId: "clientCaptureId";
    readonly type: "type";
    readonly status: "status";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly wardId: "wardId";
    readonly routeId: "routeId";
    readonly surveySessionId: "surveySessionId";
    readonly surveyorId: "surveyorId";
    readonly imageUrl: "imageUrl";
    readonly afterImageUrl: "afterImageUrl";
    readonly createdAt: "createdAt";
};
export type IssueScalarFieldEnum = (typeof IssueScalarFieldEnum)[keyof typeof IssueScalarFieldEnum];
export declare const IssueAssignmentScalarFieldEnum: {
    readonly id: "id";
    readonly issueId: "issueId";
    readonly engineerId: "engineerId";
    readonly assignedAt: "assignedAt";
};
export type IssueAssignmentScalarFieldEnum = (typeof IssueAssignmentScalarFieldEnum)[keyof typeof IssueAssignmentScalarFieldEnum];
export declare const IssueResolutionScalarFieldEnum: {
    readonly id: "id";
    readonly issueId: "issueId";
    readonly approved: "approved";
    readonly feedback: "feedback";
    readonly verifiedByAdminId: "verifiedByAdminId";
    readonly verifiedAt: "verifiedAt";
    readonly createdAt: "createdAt";
};
export type IssueResolutionScalarFieldEnum = (typeof IssueResolutionScalarFieldEnum)[keyof typeof IssueResolutionScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map