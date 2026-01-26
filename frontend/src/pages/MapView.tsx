import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useIssues } from '@/hooks/useMockData';
import { IssueMapView } from '@/components/map/IssueMapView';
import { IssueFilters } from '@/components/issues/IssueFilters';
import { useWards } from '@/hooks/useMockData';
import type { IssueType, IssueStatus, Issue } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock } from 'lucide-react';
import { getStatusColor, getIssueTypeLabel } from '@/lib/issueUtils';
import { useTranslation } from 'react-i18next';

const MapView = () => {
  const { data: issues } = useIssues();
  const { data: wards } = useWards();
  const { t } = useTranslation();

  const [filters, setFilters] = useState({
    wardId: 'all',
    type: 'all' as IssueType | 'all',
    status: 'all' as IssueStatus | 'all',
  });

  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const filteredIssues = useMemo(() => {
    return issues?.filter(issue => {
      const matchesWard = filters.wardId === 'all' || issue.wardId === filters.wardId;
      const matchesType = filters.type === 'all' || issue.type === filters.type;
      const matchesStatus = filters.status === 'all' || issue.status === filters.status;
      return matchesWard && matchesType && matchesStatus;
    }) || [];
  }, [issues, filters]);

  const handleMarkerClick = (issue: Issue) => {
    setSelectedIssue(issue);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('mapView.title')}</h1>
          <p className="text-muted-foreground mt-1">{t('mapView.subtitle')}</p>
        </div>

        <IssueFilters
          filters={filters}
          onFiltersChange={setFilters}
          wards={wards || []}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <IssueMapView
              issues={filteredIssues}
              selectedIssue={selectedIssue}
              onMarkerClick={handleMarkerClick}
            />
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('mapView.legend')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {(['DETECTED', 'ASSIGNED', 'IN_PROGRESS', 'FIXED', 'RESOLVED', 'REJECTED'] as IssueStatus[]).map(status => (
                  <div key={status} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${getStatusColor(status)}`} />
                    <span className="text-sm">{status.replace('_', ' ')}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {selectedIssue && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {t('mapView.issueDetails')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <img
                    src={selectedIssue.imageUrl}
                    alt={selectedIssue.type}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge>{getIssueTypeLabel(selectedIssue.type)}</Badge>
                      <Badge variant="outline">{selectedIssue.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {selectedIssue.description}
                    </p>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(selectedIssue.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-sm">
                      <strong>{t('mapView.ward')}:</strong> {selectedIssue.wardName}
                    </div>
                    <div className="text-sm">
                      <strong>{t('mapView.route')}:</strong> {selectedIssue.routeName}
                    </div>
                    <div className="text-xs font-mono text-muted-foreground">
                      {selectedIssue.latitude.toFixed(4)}, {selectedIssue.longitude.toFixed(4)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MapView;
