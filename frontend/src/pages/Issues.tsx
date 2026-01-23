import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useIssues, useEngineers, useWards } from "@/hooks/useMockData";
import { IssueCard } from "@/components/issues/IssueCard";
import { IssueFilters } from "@/components/issues/IssueFilters";
import { AssignEngineerDialog } from "@/components/issues/AssignEngineerDialog";
import { VerifyResolutionDialog } from "@/components/issues/VerifyResolutionDialog";
import type { Issue, IssueType, IssueStatus } from "@/types";
import { AlertTriangle } from "lucide-react";

const Issues = () => {
  const { data: issues, assignEngineer, verifyResolution } = useIssues();
  const { data: engineers } = useEngineers();
  const { data: wards } = useWards();

  const [filters, setFilters] = useState({
    wardId: "all",
    type: "all" as IssueType | "all",
    status: "DETECTED" as IssueStatus | "all",
  });

  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const filteredIssues =
    issues?.filter((issue) => {
      const matchesWard =
        filters.wardId === "all" || issue.wardId === filters.wardId;
      const matchesType = filters.type === "all" || issue.type === filters.type;
      const matchesStatus =
        filters.status === "all" || issue.status === filters.status;
      return matchesWard && matchesType && matchesStatus;
    }) || [];

  const handleAssignClick = (issue: Issue) => {
    setSelectedIssue(issue);
    setAssignDialogOpen(true);
  };

  const handleVerifyClick = (issue: Issue) => {
    setSelectedIssue(issue);
    setVerifyDialogOpen(true);
  };

  const handleAssignEngineer = (engineerId: string, engineerName: string) => {
    if (selectedIssue) {
      assignEngineer(selectedIssue.id, engineerId, engineerName);
    }
  };

  const handleVerifyResolution = (approved: boolean, feedback?: string) => {
    if (selectedIssue) {
      verifyResolution(selectedIssue.id, approved, feedback);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Issue Management
          </h1>
          <p className="text-muted-foreground mt-1">
            View and manage detected civic issues
          </p>
        </div>

        <IssueFilters
          filters={filters}
          onFiltersChange={setFilters}
          wards={wards || []}
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredIssues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              onAssignClick={handleAssignClick}
              onVerifyClick={handleVerifyClick}
            />
          ))}
        </div>

        {filteredIssues.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">
              No issues found matching your filters
            </p>
          </div>
        )}

        <AssignEngineerDialog
          open={assignDialogOpen}
          onOpenChange={setAssignDialogOpen}
          engineers={engineers || []}
          onAssign={handleAssignEngineer}
        />

        <VerifyResolutionDialog
          open={verifyDialogOpen}
          onOpenChange={setVerifyDialogOpen}
          issue={selectedIssue}
          onVerify={handleVerifyResolution}
        />
      </div>
    </DashboardLayout>
  );
};

export default Issues;
