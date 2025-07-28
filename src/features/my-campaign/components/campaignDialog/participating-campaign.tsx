import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Icons } from '@/components/icons/icons';
import type { Campaign } from '@/features/common/common.type';
import type { NotificationSending } from '@/features/notification/notification.type';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type { RootState } from '@/redux/store';

import ProgressUpdateDialog from './progess-update';
import { useChangeStatusMutation } from '../../campaign.service';
import { changeCampaignStatus } from '../../campaign.slice';
import { sendNotificationForAll } from '../campaign-card';
import CampaignDetail from '../campaign-detail';
import ViewProgressDialog from '../view-progress';

interface ParticipatingCampaignDialogProps {
  campaign: Campaign;
  sendNotification: (notification: NotificationSending) => void;
}
export default function ParticipatingCampaignDialog({
  campaign,
  sendNotification,
}: ParticipatingCampaignDialogProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { role: userRole, id, name, avatarUrl } = useAppSelector((state: RootState) => state.auth);
  const [changeStatus] = useChangeStatusMutation();

  const handleEndCampaign = async () => {
    try {
      await changeStatus({ campaignId: campaign.campaignId, newStatus: 'COMPLETED' }).unwrap();
      sendNotificationForAll(
        campaign.appliedInfluencerIds ?? [],
        `${t("campaignCard.completedCampaign")}\n${campaign?.campaignName}`,
        name!,
        avatarUrl!,
        sendNotification,
      );
      sendNotification({
        userId: id!,
        content: `${t("campaignCard.endCampaign")}\n${campaign?.campaignName}`,
        name: name!,
        avatarUrl: avatarUrl!,
      });
      setTimeout(() => {
        sendNotificationForAll(
          campaign.appliedInfluencerIds ?? [],
          `${t("campaignCard.completedCampaign")}\n${campaign?.campaignName}`,
          '',
          '',
          sendNotification,
        );
      }, 1000 * 60);
      dispatch(changeCampaignStatus({ campaignId: campaign.campaignId, status: 'COMPLETED' }));
      toast.success(t("campaignCard.endedCampaign"));
    } catch (error) {
      console.error(error);
      toast.error(t("campaignCard.failedPhaseChange"));
    }
  };
  return (
    <div className="w-full grid grid-cols-2 gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Icons.eye className="w-4 h-4 mr-2" />
            {t("campaignCard.trackCampaignButton")}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] h-[85%] gap-0 p-0 pb-4" showCloseButton={false}>
          <DialogHeader className="h-fit border-b-2 border-border p-0 m-0 py-3">
            <DialogTitle className="font-semibold text-xl text-center">
              {t("campaignCard.campaignPostBy")} {campaign.brandName}
            </DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
          </DialogHeader>
          <CampaignDetail key={campaign.campaignId} campaign={campaign} />
        </DialogContent>
      </Dialog>
      {userRole === 'BRAND' && (
        <>
          <ViewProgressDialog campaign={campaign} />
          <Button
            variant="default"
            size="sm"
            className="col-span-2 w-full"
            onClick={handleEndCampaign}
          >
            <Icons.play className="h-4 w-4 mr-1" />
            {t("campaignCard.endButton")}
          </Button>
        </>
      )}
      {userRole === 'INFLUENCER' && (
        <>
          <ProgressUpdateDialog campaign={campaign} />
        </>
      )}
    </div>
  );
}
