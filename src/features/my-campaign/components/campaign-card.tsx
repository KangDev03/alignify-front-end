import { useLocation } from 'react-router';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge.tsx';
import { Card, CardContent } from '@/components/ui/card';

import { Icons } from '@/components/icons/icons.tsx';
import type { Campaign } from '@/features/common/common.type.ts';
import type { NotificationSending } from '@/features/notification/notification.type.ts';
import { useSendNotification } from '@/hooks/useSendNotification.ts';
import { formatDate } from '@/utils/format.ts';

import CompletedCampaignDialog from './campaignDialog/completed-campaign.tsx';
import DraftDialog from './campaignDialog/draft-campaign.tsx';
import HomeCampaignDialog from './campaignDialog/home-campaign.tsx';
import ParticipatingCampaignDialog from './campaignDialog/participating-campaign.tsx';
import PendingCampaignDialog from './campaignDialog/pending-campaign.tsx';
import RecruitingCampaignDialog from './campaignDialog/recruiting-campaign.tsx';
import HotCampaignBadge from './hot-campaign-badge.tsx';
import { StatusBadge } from './status-badge.tsx';

export const sendNotificationForAll = (
  influencerIds: string[],
  notification: string,
  name: string,
  avatarUrl: string,
  sendNotification: (notification: NotificationSending) => void,
) => {
  influencerIds.forEach((influencerId) => {
    sendNotification({
      userId: influencerId!,
      content: notification,
      name: name,
      avatarUrl: avatarUrl,
    });
  });
};

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const sendNotification = useSendNotification();
  const isHotCampaign =
    (campaign.applicationTotal || campaign.appliedInfluencerIds?.length || 0) > 0;

  const renderDialogCampaign = () => {
    switch (campaign.status.toUpperCase()) {
      case 'DRAFT':
        return <DraftDialog campaign={campaign} sendNotification={sendNotification} />;
      case 'RECRUITING':
        if (currentPath === '/home') {
          return <HomeCampaignDialog campaign={campaign} sendNotification={sendNotification} />;
        }
        return <RecruitingCampaignDialog campaign={campaign} sendNotification={sendNotification} />;
      case 'PENDING':
        return <PendingCampaignDialog campaign={campaign} sendNotification={sendNotification} />;
      case 'PARTICIPATING':
        return (
          <ParticipatingCampaignDialog campaign={campaign} sendNotification={sendNotification} />
        );
      case 'COMPLETED':
        return <CompletedCampaignDialog campaign={campaign} />;
      default:
        return null;
    }
  };

  return (
    <Card
      key={campaign.campaignId}
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow pt-0 relative"
    >
      {isHotCampaign && <HotCampaignBadge />}

      <div className="w-full h-80 relative">
        <img
          src={campaign.imageUrl || '/placeholder.svg'}
          alt={campaign.campaignName}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="px-6 w-full">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={campaign.brandAvartar || '/placeholder.svg'}
              alt={campaign.brandName}
            />
            <AvatarFallback>{campaign.brandName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex flex-row items-center justify-center">
              <h3 className="flex-1 font-semibold text-lg line-clamp-1">{campaign.campaignName}</h3>
              {StatusBadge(campaign.status)}
            </div>
            <p className="text-sm text-muted-foreground">
              {campaign.brandName} • {formatDate(campaign.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex items-start w-fit mb-3 h-12">
          <p className="line-clamp-2">{`${campaign.content}`}</p>
        </div>

        {campaign.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            <h4 className="text-sm font-medium">Danh mục:</h4>
            {campaign.categories.map((cat: any, i: number) => (
              <Badge key={cat.categoryId ?? i} variant="outline">
                {cat.categoryName ?? cat}
              </Badge>
            ))}
          </div>
        )}

        {isHotCampaign && (
          <div className="flex items-center gap-2 mb-3 text-sm">
            <div className="flex items-center gap-1 text-blue-600">
              <Icons.users className="h-4 w-4" />
              <span className="font-medium">
                {campaign.applicationTotal || campaign.appliedInfluencerIds?.length || 0} ứng viên
              </span>
            </div>
            <Badge
              variant="secondary"
              className="bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200 dark:hover:bg-orange-200"
            >
              Phổ biến
            </Badge>
          </div>
        )}

        <div className="flex justify-between mb-4 text-sm text-muted-foreground">
          <div className="flex items-center w-fit mr-4">
            <Icons.DollarSign className="w-4 h-4 mr-2 text-green-500" />
            <span>{`${Number(campaign.budget).toLocaleString('vi-VN')} VNĐ`}</span>
          </div>

          <div className="flex items-center w-fit">
            <Icons.calendar className="w-4 h-4 mr-2 text-primary" />
            <span>{`${formatDate(campaign.startAt)} - ${formatDate(campaign.dueAt)}`}</span>
          </div>
        </div>

        <div className="flex justify-center">{renderDialogCampaign()}</div>
      </CardContent>
    </Card>
  );
}
