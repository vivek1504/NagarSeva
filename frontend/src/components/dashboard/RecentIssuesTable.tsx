import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Issue } from '@/types';
import { getIssueTypeLabel, getStatusBadgeVariant } from '@/lib/issueUtils';

interface RecentIssuesTableProps {
  issues: Issue[];
}

export const RecentIssuesTable = ({ issues }: RecentIssuesTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Issues</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Ward</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {issues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell className="font-medium">
                  {getIssueTypeLabel(issue.type)}
                </TableCell>
                <TableCell>{issue.wardName}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(issue.status)}>
                    {issue.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(issue.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {issues.length === 0 && (
          <p className="text-center text-muted-foreground py-4">No recent issues</p>
        )}
      </CardContent>
    </Card>
  );
};
