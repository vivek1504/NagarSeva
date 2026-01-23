export function transformRoute(route: any) {
  const latestAssignment = route.assignments?.[route.assignments.length - 1];

  return {
    id: route.id,
    name: route.name,
    wardId: route.wardId,
    wardName: route.ward?.name || "Unknown Ward",
    assignedSurveyorId: latestAssignment?.surveyorId,
    assignedSurveyorName: latestAssignment?.surveyor?.name,
    status: latestAssignment ? "ASSIGNED" : "UNASSIGNED",
  };
}

export function transformIssue(issue: any) {
  return {
    id: issue.id,
    type: issue.type,
    status: issue.status,
    wardId: issue.wardId,
    wardName: issue.ward?.name || "Unknown Ward",
    routeId: issue.routeId,
    routeName: issue.route?.name || "Unknown Route",
    latitude: issue.latitude,
    longitude: issue.longitude,
    imageUrl: issue.imageUrl,
    description: issue.description,
    assignedEngineerId: issue.assignment?.engineerId,
    assignedEngineerName: issue.assignment?.engineer?.name,
    feedback: issue.resolution?.feedback,
    createdAt: issue.createdAt,
    updatedAt: issue.createdAt,
    afterImageUrl: issue.afterImageUrl,
  };
}

export function transformWard(ward: any) {
  return {
    id: ward.id,
    name: ward.name,
    code: `W${ward.number?.toString().padStart(2, "0") || "00"}`,
  };
}
