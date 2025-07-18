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

import { useChangeStatusMutation } from '../../campaign.service';
import { changeCampaignStatus } from '../../campaign.slice';
import { sendNotificationForAll } from '../campaign-card';
import CampaignDetail from '../campaign-detail';
import ProgressUpdateDialog from '../progess-update';
import ViewProgressDialog from '../view-progress';

interface ParticipatingCampaignDialogProps {
  campaign: Campaign;
  sendNotification: (notification: NotificationSending) => void;
}
export default function ParticipatingCampaignDialog({
  campaign,
  sendNotification,
}: ParticipatingCampaignDialogProps) {
  const dispatch = useAppDispatch();
  const { role: userRole, id, name, avatarUrl } = useAppSelector((state: RootState) => state.auth);
  const [changeStatus] = useChangeStatusMutation();

  const handleEndCampaign = async () => {
    try {
      await changeStatus({ campaignId: campaign.campaignId, newStatus: 'COMPLETED' }).unwrap();
      sendNotificationForAll(
        campaign.appliedInfluencerIds ?? [],
        `Đã hoàn thành chiến dịch\n${campaign?.campaignName}`,
        name!,
        avatarUrl!,
        sendNotification,
      );
      sendNotification({
        userId: id!,
        content: `Bạn đã kết thúc chiến dịch\n${campaign?.campaignName}`,
        name: name!,
        avatarUrl: avatarUrl!,
      });
      setTimeout(() => {
        sendNotificationForAll(
          campaign.appliedInfluencerIds ?? [],
          `Đã hoàn thành chiến dịch\n${campaign?.campaignName}`,
          '',
          '',
          sendNotification,
        );
      }, 1000 * 60);
      dispatch(changeCampaignStatus({ campaignId: campaign.campaignId, status: 'COMPLETED' }));
      toast.success('Chiến dịch đã kết thúc!');
    } catch (error) {
      console.error(error);
      toast.error('Chuyển giai đoạn thất bại!');
    }
  };
  return (
    <div className="w-full grid grid-cols-2 gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Icons.eye className="w-4 h-4 mr-2" />
            Theo dõi chiến dịch
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] h-[85%] gap-0 p-0 pb-4" showCloseButton={false}>
          <DialogHeader className="h-fit border-b-2 border-border p-0 m-0 py-3">
            <DialogTitle className="font-semibold text-xl text-center">
              Chiến dịch của {campaign.brandName}
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
            Kết thúc
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
