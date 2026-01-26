import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import type { Ward, IssueType, IssueStatus } from "@/types";
import { useTranslation } from 'react-i18next';

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


export const IssueFilters = ({
  filters,
  onFiltersChange,
  wards,
}: IssueFiltersProps) => {
  const { t } = useTranslation();

  // Use translation keys for issue types
  const issueTypes: { value: IssueType; labelKey: string }[] = [
    { value: "POTHOLE", labelKey: "issues.pothole" },
    { value: "GARBAGE", labelKey: "issues.garbage" },
  ];

  // Use translation keys for issue statuses
  const issueStatuses: { value: IssueStatus; labelKey: string }[] = [
    { value: "DETECTED", labelKey: "issues.detected" },
    { value: "ASSIGNED", labelKey: "issues.assigned" },
    { value: "IN_PROGRESS", labelKey: "issues.inProgress" },
    { value: "FIXED", labelKey: "issues.fixed" },
    { value: "RESOLVED", labelKey: "issues.resolved" },
    { value: "REJECTED", labelKey: "issues.rejected" },
  ];
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
              <SelectValue placeholder={t('routesPage.filterByWard')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('mapView.allWards')}</SelectItem>
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
              <SelectValue placeholder={t('common.filter')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('mapView.allTypes')}</SelectItem>
              {issueTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {t(type.labelKey)}
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
              <SelectValue placeholder={t('common.filter')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('mapView.allStatuses')}</SelectItem>
              {issueStatuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {t(status.labelKey)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
