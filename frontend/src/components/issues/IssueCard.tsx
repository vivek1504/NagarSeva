import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Issue } from '@/types';
import { getIssueTypeLabel, getStatusBadgeVariant, getIssueTypeIcon } from '@/lib/issueUtils';
import { MapPin, Clock, User, Wrench } from 'lucide-react';

interface IssueCardProps {
  issue: Issue;
  onAssignClick: (issue: Issue) => void;
  onVerifyClick: (issue: Issue) => void;
}

export const IssueCard = ({ issue, onAssignClick, onVerifyClick }: IssueCardProps) => {
  const canAssign = issue.status === 'DETECTED';
  const canVerify = issue.status === 'FIXED';

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-video relative">
        <img
          src={issue.imageUrl}
          alt={issue.type}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          <Badge className="bg-background/90 text-foreground">
            {getIssueTypeIcon(issue.type)} {getIssueTypeLabel(issue.type)}
          </Badge>
        </div>
        <Badge
          variant={getStatusBadgeVariant(issue.status)}
          className="absolute top-2 right-2"
        >
          {issue.status.replace('_', ' ')}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          {issue.wardName}
        </CardTitle>
        <CardDescription>{issue.routeName}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {issue.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {issue.description}
          </p>
        )}

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {new Date(issue.createdAt).toLocaleDateString()}
          </span>
          <span className="font-mono">
            {issue.latitude.toFixed(4)}, {issue.longitude.toFixed(4)}
          </span>
        </div>

        {issue.assignedEngineerName && (
          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-muted-foreground" />
            <span>{issue.assignedEngineerName}</span>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          {canAssign && (
            <Button
              variant="default"
              size="sm"
              className="flex-1"
              onClick={() => onAssignClick(issue)}
            >
              <Wrench className="w-4 h-4 mr-1" />
              Assign Engineer
            </Button>
          )}
          {canVerify && (
            <Button
              variant="default"
              size="sm"
              className="flex-1"
              onClick={() => onVerifyClick(issue)}
            >
              Verify Resolution
            </Button>
          )}
          {!canAssign && !canVerify && (
            <Button variant="outline" size="sm" className="flex-1" disabled>
              {issue.status === 'RESOLVED' ? 'Resolved' : issue.status === 'REJECTED' ? 'Needs Rework' : 'In Progress'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
