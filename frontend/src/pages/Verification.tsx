import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useIssues, useEngineers } from "@/hooks/useMockData";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckCircle, XCircle, Clock, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { getIssueTypeLabel } from "@/lib/issueUtils";
import type { Issue } from "@/types";
import { useTranslation } from 'react-i18next';

const Verification = () => {
  const { data: issues, verifyResolution } = useIssues();
  const { t } = useTranslation();
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [feedback, setFeedback] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const fixedIssues = issues?.filter((issue) => issue.status === "FIXED") || [];

  const handleVerify = (approved: boolean) => {
    if (selectedIssue) {
      verifyResolution(selectedIssue.id, approved, feedback);
      toast.success(
        approved ? t('verification.issueClosedSuccess') : t('verification.issueSentBack'),
      );
      setDialogOpen(false);
      setFeedback("");
      setSelectedIssue(null);
    }
  };

  const openVerifyDialog = (issue: Issue) => {
    setSelectedIssue(issue);
    setDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {t('verification.title')}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t('verification.subtitle')}
          </p>
        </div>

        {fixedIssues.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">
                {t('verification.pendingVerification')}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {fixedIssues.map((issue) => (
              <Card key={issue.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={issue.imageUrl}
                    alt={issue.type}
                    className="w-full h-full object-cover"
                  />

                  <Badge className="absolute top-2 right-2 bg-chart-1 text-primary-foreground">
                    FIXED
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    {getIssueTypeLabel(issue.type)}
                    <Badge variant="outline" className="text-xs">
                      ID: {issue.id}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {issue.wardName} - {issue.routeName}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {issue.description}
                  </p>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Fixed on: {new Date(issue.updatedAt).toLocaleDateString()}
                  </div>
                  {issue.assignedEngineerName && (
                    <div className="text-sm">
                      <strong>Engineer:</strong> {issue.assignedEngineerName}
                    </div>
                  )}
                  <Button
                    onClick={() => openVerifyDialog(issue)}
                    className="w-full"
                  >
                    {t('verification.verifyResolution')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                {t('verification.verifyResolution')}
              </DialogTitle>
            </DialogHeader>

            {selectedIssue && (
              <div className="space-y-6">
                {/* BEFORE / AFTER */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative rounded-lg overflow-hidden border">
                    <span className="absolute top-2 left-2 z-10 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
                      {t('verification.before')}
                    </span>
                    <img
                      src={selectedIssue.imageUrl}
                      alt="Before"
                      className="h-48 w-full object-cover"
                    />
                  </div>

                  <div className="relative rounded-lg overflow-hidden border">
                    <span className="absolute top-2 left-2 z-10 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
                      {t('verification.after')}
                    </span>
                    <img
                      src={selectedIssue.afterImageUrl}
                      alt="After"
                      className="h-48 w-full object-cover"
                    />
                  </div>
                </div>

                {/* DETAILS */}
                <div className="rounded-lg bg-muted/40 p-4 space-y-1">
                  <p className="font-medium">
                    {getIssueTypeLabel(selectedIssue.type)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedIssue.wardName} – {selectedIssue.routeName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t('verification.engineer')}: {selectedIssue.assignedEngineerName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t('verification.fixedOn')}:{" "}
                    {new Date(selectedIssue.updatedAt).toLocaleDateString()}
                  </p>
                </div>

                {/* FEEDBACK */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t('verification.feedback')}
                  </label>
                  <Textarea
                    placeholder={t('verification.addFeedback')}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={3}
                  />
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    variant="destructive"
                    onClick={() => handleVerify(false)}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    {t('verification.reject')}
                  </Button>

                  <Button
                    onClick={() => handleVerify(true)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {t('verification.approve')}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Verification;
