import { useDashboardStats, useIssues } from '@/hooks/useMockData';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { IssueStatusChart } from '@/components/dashboard/IssueStatusChart';
import { RecentIssuesTable } from '@/components/dashboard/RecentIssuesTable';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Building2, Route, Users, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { data: stats } = useDashboardStats();
  const { data: issues } = useIssues();
  const { t } = useTranslation();

  const recentIssues = issues?.slice(0, 5) || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('dashboard.title')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('dashboard.overview')}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title={t('dashboard.totalWards')}
            value={stats?.totalWards || 0}
            icon={Building2}
            variant="primary"
          />
          <StatsCard
            title={t('dashboard.totalRoutes')}
            value={stats?.totalRoutes || 0}
            icon={Route}
            variant="secondary"
          />
          <StatsCard
            title={t('dashboard.activeSurveyors')}
            value={stats?.activeSurveyors || 0}
            icon={Users}
            variant="accent"
          />
          <StatsCard
            title={t('dashboard.openIssues')}
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
