import { AlertCircleIcon, Check, Clock, X } from 'lucide-react';

import { Alert, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { cn } from '@/lib/utils';

import { ApplicantCard } from './applicant-card';
import type { SpecificApplicants } from '../applicant.type';

export function ApplicantTabs({ applicants }: { applicants: SpecificApplicants }) {
  const scrollStyle =
    'overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground scrollbar-track-transparent h-[94%]';
  return (
    <div className="flex-1 p-6">
      <Tabs defaultValue="waiting" className="h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="waiting">
            <Clock className="h-4 w-4" /> Danh sách chờ ({applicants.waiting.length})
          </TabsTrigger>
          <TabsTrigger value="accepted" className="text-accepted">
            <Check className="h-4 w-4" /> Đã chấp nhận ({applicants.accepted.length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="text-destructive">
            <X className="h-4 w-4" /> Đã từ chối ({applicants.rejected.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="waiting" className={(cn('mt-4 space-y-3'), scrollStyle)}>
          {applicants.waiting.length > 0 ? (
            applicants.waiting.map((applicant) => (
              <ApplicantCard key={applicant.applicationId} applicant={applicant} status="waiting" />
            ))
          ) : (
            <Alert variant="default">
              <AlertCircleIcon />
              <AlertTitle> Không có ứng viên đang chờ.</AlertTitle>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="accepted" className={(cn('mt-4 space-y-3'), scrollStyle)}>
          {applicants.accepted.length > 0 ? (
            applicants.accepted.map((applicant) => (
              <ApplicantCard
                key={applicant.applicationId}
                applicant={applicant}
                status="accepted"
              />
            ))
          ) : (
            <Alert variant="default">
              <AlertCircleIcon />
              <AlertTitle> Không có ứng viên đã chấp nhận.</AlertTitle>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="rejected" className={(cn('mt-4 space-y-3'), scrollStyle)}>
          {applicants.rejected.length > 0 ? (
            applicants.rejected.map((applicant) => (
              <ApplicantCard
                key={applicant.applicationId}
                applicant={applicant}
                status="rejected"
              />
            ))
          ) : (
            <Alert variant="default">
              <AlertCircleIcon />
              <AlertTitle> Không có ứng viên đã từ chối</AlertTitle>
            </Alert>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
