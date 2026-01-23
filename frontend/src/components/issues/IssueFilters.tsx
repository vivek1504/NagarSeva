import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import type { Ward, IssueType, IssueStatus } from "@/types";

interface IssueFiltersProps {
  filters: {
    wardId: string;
    type: IssueType | "all";
    status: IssueStatus | "all";
  };
  onFiltersChange: (filters: {
    wardId: string;
    type: IssueType | "all";
    status: IssueStatus | "all";
  }) => void;
  wards: Ward[];
}

// NagarSeva tracks pothole and garbage civic issues
const issueTypes: { value: IssueType; label: string }[] = [
  { value: "POTHOLE", label: "Pothole" },
  { value: "GARBAGE", label: "Garbage Accumulation" },
];

// NagarSeva issue workflow statuses
const issueStatuses: { value: IssueStatus; label: string }[] = [
  { value: "DETECTED", label: "Detected" },
  { value: "ASSIGNED", label: "Assigned" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "FIXED", label: "Fixed" },
  { value: "RESOLVED", label: "Resolved" },
  { value: "REJECTED", label: "Rejected" },
];

export const IssueFilters = ({
  filters,
  onFiltersChange,
  wards,
}: IssueFiltersProps) => {
  return (
    <Card>
      <CardContent className="py-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select
            value={filters.wardId}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, wardId: value })
            }
          >
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by Ward" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Wards</SelectItem>
              {wards.map((ward) => (
                <SelectItem key={ward.id} value={ward.id}>
                  {ward.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.type}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, type: value as IssueType | "all" })
            }
          >
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {issueTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.status}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                status: value as IssueStatus | "all",
              })
            }
          >
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {issueStatuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
