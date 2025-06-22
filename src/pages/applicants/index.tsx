'use client';

import { useEffect } from 'react';
import { AlertCircleIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { useGetApplicantsByBrandQuery } from '@/features/applicants/applicant.service';
import { setApplicant, setSelectedCampaign } from '@/features/applicants/applicant.slice';
import type { ApplicantByBrand, SpecificApplicants } from '@/features/applicants/applicant.type';
import { ApplicantTabs } from '@/features/applicants/components/applicant-tabs';
import { CampaignList } from '@/features/applicants/components/campaign-list';
import { CampaignOverview } from '@/features/applicants/components/campaign-overview';
import { SkeletonApplicants } from '@/features/applicants/components/skeleton-applicants';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type { RootState } from '@/redux/store';

export function Applicants() {
  const dispatch = useAppDispatch();
  const { data: rawData, isLoading } = useGetApplicantsByBrandQuery(
    {},
    { refetchOnMountOrArgChange: true },
  );
  const applicationPlusCampaign = rawData?.data;
  const { applicants, selectCapaignId } = useAppSelector((state: RootState) => state.applicant);

  useEffect(() => {
    if (!rawData) return;
    if (!applicationPlusCampaign || applicationPlusCampaign.length === 0) {
      return;
    }
    dispatch(setApplicant(rawData));
    dispatch(setSelectedCampaign(applicationPlusCampaign[0].campaignResponse.campaignId));
  }, [applicationPlusCampaign, dispatch, rawData]);

  if (!applicants || applicants.length === 0) {
    return (
      <div className="flex gap-6 h-[633px] justify-center">
        <Alert variant="default">
          <AlertCircleIcon />
          <AlertTitle>Bạn chưa có bài đăng chiến dịch nào</AlertTitle>
          <AlertDescription>
            Bạn có thể quay lại đây sau khi đăng chiến dịch thành công.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const selectedCampaignData = applicants!.find(
    (appPlusCam) => appPlusCam.campaignResponse.campaignId === selectCapaignId,
  );
  let currentApplicants: SpecificApplicants | undefined = undefined;
  if (selectedCampaignData) {
    const applicants: ApplicantByBrand[] = selectedCampaignData.applications || [];
    currentApplicants = {
      waiting: applicants.filter((applicant) => applicant.status === 'PENDING'),
      accepted: applicants.filter((applicant) => applicant.status === 'ACCEPTED'),
      rejected: applicants.filter((applicant) => applicant.status === 'REJECTED'),
    };
  }

  if (isLoading) {
    return <SkeletonApplicants />;
  }

  return (
    <div className="flex gap-6 h-[633px]">
      <CampaignList applicationPlusCampaign={applicants!} />
      <div className="flex-1 border rounded-lg bg-card">
        {selectedCampaignData ? (
          <div className="h-full flex flex-col">
            <CampaignOverview campaign={selectedCampaignData.campaignResponse} />
            <ApplicantTabs applicants={currentApplicants!} />
          </div>
        ) : (
          <Alert variant="default">
            <AlertCircleIcon />
            <AlertTitle>Chọn một chiến dịch để xem ứng viên</AlertTitle>
          </Alert>
        )}
      </div>
    </div>
  );
}
