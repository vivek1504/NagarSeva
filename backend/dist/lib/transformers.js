// Data transformation utilities to map Prisma models to frontend types
/**
 * Transform a Prisma Route with relations to frontend Route type
 */
export function transformRoute(route) {
    const latestAssignment = route.assignments?.[route.assignments.length - 1];
    return {
        id: route.id,
        name: route.name,
        wardId: route.wardId,
        wardName: route.ward?.name || 'Unknown Ward',
        assignedSurveyorId: latestAssignment?.surveyorId,
        assignedSurveyorName: latestAssignment?.surveyor?.name,
        status: latestAssignment ? 'ASSIGNED' : 'UNASSIGNED',
    };
}
/**
 * Transform a Prisma Issue with relations to frontend Issue type
 */
export function transformIssue(issue) {
    return {
        id: issue.id,
        type: issue.type,
        status: issue.status,
        wardId: issue.wardId,
        wardName: issue.ward?.name || 'Unknown Ward',
        routeId: issue.routeId,
        routeName: issue.route?.name || 'Unknown Route',
        latitude: issue.latitude,
        longitude: issue.longitude,
        imageUrl: issue.imageUrl,
        description: issue.description,
        assignedEngineerId: issue.assignment?.engineerId,
        assignedEngineerName: issue.assignment?.engineer?.name,
        feedback: issue.resolution?.feedback,
        createdAt: issue.createdAt,
        updatedAt: issue.createdAt, // Use createdAt as updatedAt fallback
        afterImageUrl: issue.afterImageUrl,
    };
}
/**
 * Transform a Prisma Ward to frontend Ward type
 */
export function transformWard(ward) {
    return {
        id: ward.id,
        name: ward.name,
        code: `W${ward.number?.toString().padStart(2, '0') || '00'}`,
    };
}
//# sourceMappingURL=transformers.js.map