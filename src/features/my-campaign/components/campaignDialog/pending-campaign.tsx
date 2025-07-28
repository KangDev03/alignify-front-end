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

import ConfirmMoveDraftDialog from './confirm-dialog';
import { useChangeStatusMutation } from '../../campaign.service';
import { changeCampaignStatus } from '../../campaign.slice';
import { sendNotificationForAll } from '../campaign-card';
import CampaignDetail from '../campaign-detail';

interface PendingCampaignDialogProps {
  campaign: Campaign;
  sendNotification: (notification: NotificationSending) => void;
}
export default function PendingCampaignDialog({
  campaign,
  sendNotification,
}: PendingCampaignDialogProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { role: userRole, id, name, avatarUrl } = useAppSelector((state: RootState) => state.auth);
  const [changeStatus] = useChangeStatusMutation();

  const handleStartCampaign = async () => {
    try {
      await changeStatus({ campaignId: campaign.campaignId, newStatus: 'PARTICIPATING' }).unwrap();
      sendNotificationForAll(
        campaign.appliedInfluencerIds ?? [],
        `${t("campaignCard.startedCampaign")}\n${campaign?.campaignName}`,
        name!,
        avatarUrl!,
        sendNotification,
      );
      sendNotification({
        userId: id!,
        content: `${t("campaignCard.youStartCampaign")}\n${campaign?.campaignName}`,
        name: name!,
        avatarUrl: avatarUrl!,
      });
      dispatch(changeCampaignStatus({ campaignId: campaign.campaignId, status: 'PARTICIPATING' }));
      toast.success(t("campaignCard.startCampaign"));
    } catch (error) {
      console.error(error);
      toast.error(t("campaignCard.failedPhaseChange"));
    }
  };
  const handleMoveToDraft = async () => {
    try {
      await changeStatus({ campaignId: campaign.campaignId, newStatus: 'DRAFT' }).unwrap();
      sendNotificationForAll(
        campaign.appliedInfluencerIds ?? [],
        `${t("campaignCard.deletedCampaign")}\n${campaign?.campaignName}`,
        name!,
        avatarUrl!,
        sendNotification,
      );
      sendNotification({
        userId: id!,
        content: `${t("campaignCard.draftCampaign")}\n${campaign?.campaignName}`,
        name: name!,
        avatarUrl: avatarUrl!,
      });

      dispatch(changeCampaignStatus({ campaignId: campaign.campaignId, status: 'DRAFT' }));
    } catch (error) {
      console.error(error);
      toast.error(t("campaignCard.failedPhaseChange"));
    }
  };
  return (
    <div className="w-full grid grid-cols-2 gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center w-full bg-transparent">
            <Icons.eye className="h-4 w-4 mr-2" />
            {t("campaignCard.viewCampaignDetails")}
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
          <ConfirmMoveDraftDialog campaign={campaign} handleMoveToDraft={handleMoveToDraft} />
          <Button
            variant="default"
            size="sm"
            className="col-span-2 w-full"
            onClick={handleStartCampaign}
          >
            <Icons.play className="h-4 w-4 mr-1" />
            {t("campaignCard.startCampaignButton")}
          </Button>
        </>
      )}
    </div>
  );
}
