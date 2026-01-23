import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { PieChart, Pie } from 'recharts';

interface IssueStatusChartProps {
  data?: {
    DETECTED: number;
    ASSIGNED: number;
    IN_PROGRESS: number;
    FIXED: number;
    RESOLVED: number;
    REJECTED: number;
  };
}

const statusColors = {
  DETECTED: 'hsl(var(--destructive))',
  ASSIGNED: 'hsl(var(--chart-4))',
  IN_PROGRESS: 'hsl(var(--chart-2))',
  FIXED: 'hsl(var(--chart-1))',
  RESOLVED: 'hsl(var(--chart-3))',
  REJECTED: 'hsl(var(--destructive) / 0.7)',
};

export const IssueStatusChart = ({ data }: IssueStatusChartProps) => {
  if (!data) return null;

  const chartData = [
    { name: 'Detected', value: data.DETECTED, color: statusColors.DETECTED },
    { name: 'Assigned', value: data.ASSIGNED, color: statusColors.ASSIGNED },
    { name: 'In Progress', value: data.IN_PROGRESS, color: statusColors.IN_PROGRESS },
    { name: 'Fixed', value: data.FIXED, color: statusColors.FIXED },
    { name: 'Resolved', value: data.RESOLVED, color: statusColors.RESOLVED },
    { name: 'Rejected', value: data.REJECTED, color: statusColors.REJECTED },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Issues by Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                width={80}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
