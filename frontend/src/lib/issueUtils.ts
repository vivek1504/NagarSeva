import type { IssueType, IssueStatus } from '@/types';

// Status colors for NagarSeva issue workflow
export const getStatusColor = (status: IssueStatus): string => {
  switch (status) {
    case 'DETECTED':
      return 'bg-destructive';
    case 'ASSIGNED':
      return 'bg-chart-4';
    case 'IN_PROGRESS':
      return 'bg-chart-2';
    case 'FIXED':
      return 'bg-chart-1';
    case 'RESOLVED':
      return 'bg-chart-3';
    case 'REJECTED':
      return 'bg-destructive/70';
    default:
      return 'bg-muted';
  }
};

export const getStatusBadgeVariant = (status: IssueStatus): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status) {
    case 'DETECTED':
      return 'destructive';
    case 'RESOLVED':
      return 'secondary';
    case 'REJECTED':
      return 'destructive';
    default:
      return 'default';
  }
};

// NagarSeva civic issue types - currently pothole and garbage
export const getIssueTypeLabel = (type: IssueType): string => {
  switch (type) {
    case 'POTHOLE':
      return 'Pothole';
    case 'GARBAGE':
      return 'Garbage Accumulation';
    default:
      return type;
  }
};

export const getIssueTypeIcon = (type: IssueType): string => {
  switch (type) {
    case 'POTHOLE':
      return '🕳️';
    case 'GARBAGE':
      return '🗑️';
    default:
      return '⚠️';
  }
};
