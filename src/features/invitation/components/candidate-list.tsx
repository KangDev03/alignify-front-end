import { Alert, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

import { Icons } from '@/components/icons/icons';
import type { Campaign } from '@/features/common/common.type';

import { CandidateCard } from './candidate-card';
import { useGetInfluencersForInvitationQuery } from '../invitation.service';

interface CandidateListProps {
  influencerRoleId: string;
  selectedCampaign?: Campaign | undefined;
  selectedInfluencers?: string[] | undefined;
  handleInfluencerSelect: (id: string) => void;
  assistant: boolean;
}
export default function CandidateList({
  handleInfluencerSelect,
  selectedCampaign,
  selectedInfluencers,
  assistant,
}: CandidateListProps) {
  const {
    data: influencerRaw,
    isLoading,
    isFetching,
  } = useGetInfluencersForInvitationQuery(
    { assistant, pageNumber: 0, pageSize: 10, campaignId: selectedCampaign?.campaignId },
    { refetchOnFocus: true },
  );

  if (isLoading || isFetching) {
    return (
      <div className="flex flex-col gap-3">
        {[...Array(1)].map((_, idx) => (
          <Skeleton
            key={idx}
            className="border-2 border-primary/20 bg-card shadow-lg py-2 rounded-lg"
          >
            <div className="flex items-center justify-between gap-4 px-4 py-2">
              <Skeleton className="h-5 w-5 mr-2" />
              <div className="flex items-center space-x-4 flex-1">
                <Skeleton className="h-14 w-14 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <div className="flex items-center space-x-4 mt-2">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-10" />
                  </div>
                </div>
              </div>
              <Skeleton className="h-8 w-20" />
            </div>
          </Skeleton>
        ))}
      </div>
    );
  }

  if (influencerRaw && influencerRaw.data && influencerRaw.data.length > 0) {
    return (
      <>
        {influencerRaw.data.map((influencer) => {
          if (
            selectedCampaign?.joinedInfluencerIds.includes(influencer.userId) ||
            selectedCampaign?.invitedInfluencerIds?.includes(influencer.userId)
          ) {
            return null;
          }
          return (
            <CandidateCard
              key={influencer.userId}
              name={influencer.name}
              id={influencer.userId}
              avatarUrl={influencer.avatarUrl ?? ''}
              follower={influencer.follower}
              rating={influencer.rating}
              selectedCampaign={selectedCampaign}
              selectedInfluencers={selectedInfluencers}
              handleInfluencerSelect={handleInfluencerSelect}
            />
          );
        })}
      </>
    );
  }

  return (
    <Alert variant="default">
      <Icons.circleAlert className="h-4 w-4 mr-2" />
      <AlertTitle>Không có influencer nào</AlertTitle>
    </Alert>
  );
}
