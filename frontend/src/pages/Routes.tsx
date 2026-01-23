import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useRoutes, useSurveyors, useWards } from "@/hooks/useMockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Route as RouteIcon, MapPin } from "lucide-react";
import { toast } from "sonner";

const Routes = () => {
  const { data: routes, assignSurveyor } = useRoutes();
  const { data: surveyors } = useSurveyors();
  const { data: wards } = useWards();
  const [filterWard, setFilterWard] = useState<string>("all");
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [selectedSurveyor, setSelectedSurveyor] = useState<string>("");

  const filteredRoutes =
    routes?.filter((route) => {
      return filterWard === "all" || route.wardId === filterWard;
    }) || [];

  // Group routes by ward
  const groupedRoutes = filteredRoutes.reduce(
    (acc, route) => {
      if (!acc[route.wardName]) {
        acc[route.wardName] = [];
      }
      acc[route.wardName].push(route);
      return acc;
    },
    {} as Record<string, typeof filteredRoutes>,
  );

  const handleAssign = () => {
    if (!selectedRoute || !selectedSurveyor) {
      toast.error("Please select a surveyor");
      return;
    }
    const surveyor = surveyors?.find((s) => s.id === selectedSurveyor);
    if (surveyor) {
      assignSurveyor(selectedRoute, surveyor.id, surveyor.name);
      toast.success("Surveyor assigned successfully");
    }
    setAssignDialogOpen(false);
    setSelectedRoute(null);
    setSelectedSurveyor("");
  };

  const openAssignDialog = (routeId: string) => {
    setSelectedRoute(routeId);
    setAssignDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Route Assignment
            </h1>
            <p className="text-muted-foreground mt-1">
              Assign surveyors to survey routes
            </p>
          </div>
          <Select value={filterWard} onValueChange={setFilterWard}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by ward" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Wards</SelectItem>
              {wards?.map((ward) => (
                <SelectItem key={ward.id} value={ward.id}>
                  {ward.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {Object.entries(groupedRoutes).map(([wardName, wardRoutes]) => (
          <Card key={wardName}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                {wardName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route Name</TableHead>
                    <TableHead>Assigned Surveyor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wardRoutes.map((route) => (
                    <TableRow key={route.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <RouteIcon className="w-4 h-4 text-muted-foreground" />
                          {route.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        {route.assignedSurveyorName || (
                          <span className="text-muted-foreground italic">
                            Unassigned
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            route.status === "ASSIGNED" ? "default" : "outline"
                          }
                        >
                          {route.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={route.status === "ASSIGNED"}
                          onClick={() => openAssignDialog(route.id)}
                        >
                          <UserPlus className="w-4 h-4 mr-1" />
                          {route.status === "ASSIGNED" ? "Assigned" : "Assign"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}

        {Object.keys(groupedRoutes).length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <RouteIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No routes found</p>
            </CardContent>
          </Card>
        )}

        <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Surveyor</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Surveyor</label>
                <Select
                  value={selectedSurveyor}
                  onValueChange={setSelectedSurveyor}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a surveyor" />
                  </SelectTrigger>
                  <SelectContent>
                    {surveyors?.map((surveyor) => (
                      <SelectItem key={surveyor.id} value={surveyor.id}>
                        {surveyor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAssign} className="w-full">
                Confirm Assignment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Routes;
