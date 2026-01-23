/**
 * Transform a Prisma Route with relations to frontend Route type
 */
export declare function transformRoute(route: any): {
    id: any;
    name: any;
    wardId: any;
    wardName: any;
    assignedSurveyorId: any;
    assignedSurveyorName: any;
    status: string;
};
/**
 * Transform a Prisma Issue with relations to frontend Issue type
 */
export declare function transformIssue(issue: any): {
    id: any;
    type: any;
    status: any;
    wardId: any;
    wardName: any;
    routeId: any;
    routeName: any;
    latitude: any;
    longitude: any;
    imageUrl: any;
    description: any;
    assignedEngineerId: any;
    assignedEngineerName: any;
    feedback: any;
    createdAt: any;
    updatedAt: any;
    afterImageUrl: any;
};
/**
 * Transform a Prisma Ward to frontend Ward type
 */
export declare function transformWard(ward: any): {
    id: any;
    name: any;
    code: string;
};
//# sourceMappingURL=transformers.d.ts.map