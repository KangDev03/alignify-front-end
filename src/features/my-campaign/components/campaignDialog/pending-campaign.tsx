import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
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

interface PendingCampaignDialogProps {
  campaign: Campaign;
  sendNotification: (notification: NotificationSending) => void;
}
export default function PendingCampaignDialog({
  campaign,
  sendNotification,
}: PendingCampaignDialogProps) {
  const dispatch = useAppDispatch();
  const { role: userRole, id, name, avatarUrl } = useAppSelector((state: RootState) => state.auth);
  const [changeStatus] = useChangeStatusMutation();

  const handleStartCampaign = async () => {
    try {
      await changeStatus({ campaignId: campaign.campaignId, newStatus: 'PARTICIPATING' }).unwrap();
      sendNotificationForAll(
        campaign.appliedInfluencerIds ?? [],
        `Đã bắt đầu chiến dịch\n${campaign?.campaignName}`,
        name!,
        avatarUrl!,
        sendNotification,
      );
      sendNotification({
        userId: id!,
        content: `Bạn đã bắt đầu chiến dịch\n${campaign?.campaignName}`,
        name: name!,
        avatarUrl: avatarUrl!,
      });
      dispatch(changeCampaignStatus({ campaignId: campaign.campaignId, status: 'PARTICIPATING' }));
      toast.success('Chiến dịch đã bắt đầu!');
    } catch (error) {
      console.error(error);
      toast.error('Chuyển giai đoạn thất bại!');
    }
  };
  const handleMoveToDraft = async () => {
    try {
      await changeStatus({ campaignId: campaign.campaignId, newStatus: 'DRAFT' }).unwrap();
      sendNotificationForAll(
        campaign.appliedInfluencerIds ?? [],
        `Đã xóa chiến dịch\n${campaign?.campaignName}`,
        name!,
        avatarUrl!,
        sendNotification,
      );
      sendNotification({
        userId: id!,
        content: `Chiến dịch đã về dạng nháp\n${campaign?.campaignName}`,
        name: name!,
        avatarUrl: avatarUrl!,
      });

      dispatch(changeCampaignStatus({ campaignId: campaign.campaignId, status: 'DRAFT' }));
    } catch (error) {
      console.error(error);
      toast.error('Chuyển giai đoạn thất bại!');
    }
  };
  return userRole === 'BRAND' ? (
    <div className="w-full grid grid-cols-2 gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center w-full bg-transparent">
            <Icons.eye className="h-4 w-4 mr-2" />
            Xem chi tiết
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

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Icons.edit className="h-4 w-4 mr-1" />
            Chỉnh sửa
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] " showCloseButton={false}>
          <DialogHeader className="border-b-2 border-border py-3">
            <DialogTitle className="font-semibold text-xl text-center">
              Chiến dịch của {campaign.brandName}
            </DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn chỉnh sửa chiến dịch không? Hành động này sẽ đưa chiến dịch của
              bạn về trạng thái nháp. Mọi đơn ứng tuyển và lời mời sẽ bị xóa. Hãy đảm bảo rằng chính
              bạn là người thực hiện!
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-between">
            <DialogClose>
              <Button variant={'destructive'}>Hủy</Button>
            </DialogClose>
            <Button variant={'default'} onClick={handleMoveToDraft}>
              Xác nhận
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Button
        variant="default"
        size="sm"
        className="col-span-2 w-full"
        onClick={handleStartCampaign}
      >
        <Icons.play className="h-4 w-4 mr-1" />
        Bắt đầu
      </Button>
    </div>
  ) : (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center w-full bg-transparent">
          <Icons.eye className="h-4 w-4 mr-2" />
          Xem chi tiết
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
  );
}
