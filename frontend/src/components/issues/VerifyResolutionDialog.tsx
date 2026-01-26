import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { Issue } from '@/types';
import { getIssueTypeLabel } from '@/lib/issueUtils';
import { CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface VerifyResolutionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  issue: Issue | null;
  onVerify: (approved: boolean, feedback?: string) => void;
}

export const VerifyResolutionDialog = ({
  open,
  onOpenChange,
  issue,
  onVerify,
}: VerifyResolutionDialogProps) => {
  const [feedback, setFeedback] = useState('');

  const handleVerify = (approved: boolean) => {
    onVerify(approved, feedback);
    toast.success(approved ? 'Issue closed successfully' : 'Issue sent back for rework');
    onOpenChange(false);
    setFeedback('');
  };

  if (!issue) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verify Resolution</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-4">
            <img
              src={issue.imageUrl}
              alt={issue.type}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div>
              <p className="font-medium">{getIssueTypeLabel(issue.type)}</p>
              <p className="text-sm text-muted-foreground">
                {issue.wardName} - {issue.routeName}
              </p>
              {issue.assignedEngineerName && (
                <p className="text-sm text-muted-foreground">
                  Engineer: {issue.assignedEngineerName}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Feedback (Optional)</Label>
            <Textarea
              placeholder="Add feedback for the resolution..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={3}
            />
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => handleVerify(true)}
              className="flex-1 bg-chart-1 hover:bg-chart-1/90"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve & Close
            </Button>
            <Button
              onClick={() => handleVerify(false)}
              variant="destructive"
              className="flex-1"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
