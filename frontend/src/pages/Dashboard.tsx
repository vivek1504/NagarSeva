import { useDashboardStats, useIssues } from '@/hooks/useMockData';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { IssueStatusChart } from '@/components/dashboard/IssueStatusChart';
import { RecentIssuesTable } from '@/components/dashboard/RecentIssuesTable';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Building2, Route, Users, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const { data: stats } = useDashboardStats();
  const { data: issues } = useIssues();

  const recentIssues = issues?.slice(0, 5) || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of civic issue monitoring system
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Wards"
            value={stats?.totalWards || 0}
            icon={Building2}
            variant="primary"
          />
          <StatsCard
            title="Total Routes"
            value={stats?.totalRoutes || 0}
            icon={Route}
            variant="secondary"
          />
          <StatsCard
            title="Active Surveyors"
            value={stats?.activeSurveyors || 0}
            icon={Users}
            variant="accent"
          />
          <StatsCard
            title="Open Issues"
            value={stats?.openIssues || 0}
            icon={AlertTriangle}
            variant="warning"
          />
        </div>

        {/* Charts and Tables */}
        <div className="grid gap-6 lg:grid-cols-2">
          <IssueStatusChart data={stats?.issuesByStatus} />
          <RecentIssuesTable issues={recentIssues} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
