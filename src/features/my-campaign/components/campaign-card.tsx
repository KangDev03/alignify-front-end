import { useState } from 'react';
import { useLocation } from 'react-router';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Icons } from '@/components/icons/icons.tsx';
import type { Campaign, RoleName } from '@/features/common/common.type.ts';
import { applyForApplciation } from '@/features/home/home.slice.ts';
import {
  useApplyCampaignMutation,
  useChangeStatusMutation,
} from '@/features/my-campaign/campaign.service.ts';
import CampaignPopUp from '@/features/posting/components/popUp-campaign.tsx';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.ts';
import { useSendNotification } from '@/hooks/useSendNotification.ts';
import type { RootState } from '@/redux/store.ts';
import { formatDate } from '@/utils/format.ts';

import CampaignDetail from './campaign-detail.tsx';
import { StatusBadge } from './status-badge.tsx';
import { changeCampaignStatus } from '../campaign.slice.ts';

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  const dispatch = useAppDispatch();
  const { role, id, name, avatarUrl } = useAppSelector((state: RootState) => state.auth);
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const location = useLocation();
  const currentPath = location.pathname;
  const userRole: RoleName = role!;
  const sendNotification = useSendNotification();
  const isApplied = campaign.appliedInfluencerIds?.includes(id!);
  const [applyCampaign, { isLoading: isApplying }] = useApplyCampaignMutation();
  const handleApplyCampaign = async () => {
    try {
      await applyCampaign(campaign.campaignId).unwrap();
      sendNotification({
        userId: campaign.brandId,
        content: `${name!} đã ứng tuyển\n${campaign?.campaignName}`,
        avatarUrl: avatarUrl!,
        name: campaign.brandName!,
      });
      sendNotification({
        userId: id!,
        content: `Ứng tuyển thành công\n${campaign?.campaignName}`,
        avatarUrl: avatarUrl!,
        name: name!,
      });
      dispatch(applyForApplciation({ campaignId: campaign.campaignId, influencerId: id! }));
      toast.success('Ứng tuyển thành công.');
    } catch (error) {
      console.log(error);
      toast.error('Ứng tuyển thất bại. Vui lòng thử lại sau.');
    }
  };

  const [changeStatus] = useChangeStatusMutation();

  const sendNotificationForAll = (
    influencerIds: string[],
    notification: string,
    name: string,
    avatarUrl: string,
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

  const handleStartRecruit = async () => {
    try {
      await changeStatus({ campaignId: campaign.campaignId, newStatus: 'RECRUITING' }).unwrap();
      sendNotification({
        userId: id!,
        content: `${campaign?.campaignName} bắt đầu tuyển dụng`,
        name: name!,
        avatarUrl: avatarUrl!,
      });
      dispatch(changeCampaignStatus({ campaignId: campaign.campaignId, status: 'RECRUITING' }));
      toast.success('Chiến dịch bắt đầu tuyển!');
    } catch (error) {
      console.error(error);
      toast.error('Chuyển giai đoạn thất bại!');
    }
  };

  const handleEndRecuit = async () => {
    try {
      await changeStatus({ campaignId: campaign.campaignId, newStatus: 'PENDING' }).unwrap();
      sendNotificationForAll(
        campaign.appliedInfluencerIds ?? [],
        `Đã kết thúc tuyển chiến dịch\n${campaign?.campaignName}`,
        name!,
        avatarUrl!,
      );
      sendNotification({
        userId: id!,
        content: `Bạn đã kết thúc tuyển chiến dịch\n${campaign?.campaignName}`,
        name: name!,
        avatarUrl: avatarUrl!,
      });
      // setTimeout(() => {
      //   sendNotificationForAll(
      //     campaign.appliedInfluencerIds ?? [],
      //     `${campaign?.campaignName}\nĐang chờ ${campaign.brandName} bắt đầu`,
      //   );
      // }, 1000 * 60);

      dispatch(changeCampaignStatus({ campaignId: campaign.campaignId, status: 'PENDING' }));
      toast.success('Kết thúc tuyển thành công!');
    } catch (error) {
      console.error(error);
      toast.error('Chuyển giai đoạn thất bại!');
    }
  };

  const handleStartCampaign = async () => {
    try {
      await changeStatus({ campaignId: campaign.campaignId, newStatus: 'PARTICIPATING' }).unwrap();
      sendNotificationForAll(
        campaign.appliedInfluencerIds ?? [],
        `Đã bắt đầu chiến dịch\n${campaign?.campaignName}`,
        name!,
        avatarUrl!,
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

  const handleEndCampaign = async () => {
    try {
      await changeStatus({ campaignId: campaign.campaignId, newStatus: 'COMPLETED' }).unwrap();
      sendNotificationForAll(
        campaign.appliedInfluencerIds ?? [],
        `Đã hoàn thành chiến dịch\n${campaign?.campaignName}`,
        name!,
        avatarUrl!,
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
        );
      }, 1000 * 60);
      dispatch(changeCampaignStatus({ campaignId: campaign.campaignId, status: 'COMPLETED' }));
      toast.success('Chiến dịch đã kết thúc!');
    } catch (error) {
      console.error(error);
      toast.error('Chuyển giai đoạn thất bại!');
    }
  };

  const renderDialogButton = () => {
    const commonProps = {
      open: openDialog === campaign.campaignId,
      onOpenChange: (open: boolean) => setOpenDialog(open ? campaign.campaignId : null),
    };

    switch (campaign.status.toUpperCase()) {
      case 'DRAFT':
        return (
          <div className="w-full grid grid-cols-2 gap-2">
            <Dialog {...commonProps}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Icons.edit className="h-4 w-4 mr-1" />
                  Chỉnh sửa
                </Button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[600px] h-[85%] gap-0 p-0 pb-4"
                showCloseButton={false}
              >
                <DialogHeader className="h-fit border-b-2 border-border p-0 m-0 py-3">
                  <DialogTitle className="font-semibold text-xl text-center ">
                    Chiến dịch của {campaign.brandName}
                  </DialogTitle>
                  <DialogDescription className="hidden"></DialogDescription>
                </DialogHeader>
                <CampaignDetail key={campaign.campaignId} campaign={campaign} />
              </DialogContent>
              <CampaignPopUp campaignData={campaign} />
            </Dialog>

            <Button variant="default" size="sm" className="flex-1" onClick={handleStartRecruit}>
              <Icons.play className="h-4 w-4 mr-1" />
              Đăng tuyển
            </Button>
          </div>
        );
      case 'RECRUITING':
        if (currentPath === '/home') {
          return userRole === 'BRAND' ? (
            <Dialog {...commonProps}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center w-full">
                  <Icons.eye className="h-4 w-4 mr-2" />
                  Xem chi tiết
                </Button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[600px] h-[85%] gap-0 p-0 pb-4"
                showCloseButton={false}
              >
                <DialogHeader className="border-b-2 border-border p-0 m-0 py-3">
                  <DialogTitle className="font-semibold text-xl text-center">
                    Chiến dịch của {campaign.brandName}
                  </DialogTitle>
                  <DialogDescription className="hidden"></DialogDescription>
                </DialogHeader>
                <CampaignDetail key={campaign.campaignId} campaign={campaign} />
              </DialogContent>
            </Dialog>
          ) : (
            <div className="w-full grid grid-cols-2 gap-2">
              <Dialog {...commonProps}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center w-full">
                    <Icons.eye className="h-4 w-4 mr-2" />
                    Xem chi tiết
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className="sm:max-w-[600px] h-[85%] gap-0 p-0 pb-4"
                  showCloseButton={false}
                >
                  <DialogHeader className="border-b-2 border-border p-0 m-0 py-3">
                    <DialogTitle className="font-semibold text-xl text-center">
                      Chiến dịch của {campaign.brandName}
                    </DialogTitle>
                    <DialogDescription className="hidden"></DialogDescription>
                  </DialogHeader>
                  <CampaignDetail key={campaign.campaignId} campaign={campaign} />
                </DialogContent>
              </Dialog>

              <Button
                variant="default"
                size="sm"
                className="flex-1"
                onClick={handleApplyCampaign}
                disabled={isApplying || isApplied}
              >
                {isApplying ?
                  <>
                    <Icons.loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang đăng nhập...
                  </>
                  : isApplied ? 'Đã ứng tuyển' : 'Ứng tuyển'}
              </Button>
            </div>
          );
        }
        return userRole === 'BRAND' ? (
          <div className="w-full grid grid-cols-2 gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center w-full">
                  <Icons.eye className="h-4 w-4 mr-2" />
                  Xem chi tiết
                </Button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[600px] h-[85%] gap-0 p-0 pb-4"
                showCloseButton={false}
              >
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
              <DialogContent
                className="sm:max-w-[600px] h-[85%] gap-0 p-0 pb-4"
                showCloseButton={false}
              >
                <DialogHeader className="h-fit border-b-2 border-border p-0 m-0 py-3">
                  <DialogTitle className="font-semibold text-xl text-center">
                    Chiến dịch của {campaign.brandName}
                  </DialogTitle>
                  <DialogDescription className="hidden"></DialogDescription>
                </DialogHeader>
                <CampaignDetail key={campaign.campaignId} campaign={campaign} />
              </DialogContent>
            </Dialog>

            <Button
              variant="default"
              size="sm"
              className="col-span-2 w-full"
              onClick={handleEndRecuit}
            >
              <Icons.play className="h-4 w-4 mr-1" />
              Kết thúc tuyển
            </Button>
          </div>
        ) : (
          userRole == 'INFLUENCER' && (
            <Dialog {...commonProps}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center w-full">
                  <Icons.eye className="h-4 w-full" />
                  Xem chi tiết
                </Button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[600px] h-[85%] gap-0 p-0 pb-4"
                showCloseButton={false}
              >
                <DialogHeader className="h-fit border-b-2 border-border p-0 m-0 py-3">
                  <DialogTitle className="font-semibold text-xl text-center">
                    Chiến dịch của {campaign.brandName}
                  </DialogTitle>
                  <DialogDescription className="hidden"></DialogDescription>
                </DialogHeader>
                <CampaignDetail key={campaign.campaignId} campaign={campaign} />
              </DialogContent>
            </Dialog>
          )
        );
      case 'PENDING':
        return userRole === 'BRAND' ? (
          <div className="w-full grid grid-cols-2 gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center w-full">
                  <Icons.eye className="h-4 w-4 mr-2" />
                  Xem chi tiết
                </Button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[600px] h-[85%] gap-0 p-0 pb-4"
                showCloseButton={false}
              >
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
              <DialogContent
                className="sm:max-w-[600px] h-[85%] gap-0 p-0 pb-4"
                showCloseButton={false}
              >
                <DialogHeader className="h-fit border-b-2 border-border p-0 m-0 py-3">
                  <DialogTitle className="font-semibold text-xl text-center">
                    Chiến dịch của {campaign.brandName}
                  </DialogTitle>
                  <DialogDescription className="hidden"></DialogDescription>
                </DialogHeader>
                <CampaignDetail key={campaign.campaignId} campaign={campaign} />
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
          <Dialog {...commonProps}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center w-full">
                <Icons.eye className="h-4 w-4 mr-2" />
                Xem chi tiết
              </Button>
            </DialogTrigger>
            <DialogContent
              className="sm:max-w-[600px] h-[85%] gap-0 p-0 pb-4"
              showCloseButton={false}
            >
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
      case 'PARTICIPATING':
        return (
          <div className="w-full grid grid-cols-2 gap-2">
            <Dialog {...commonProps}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Icons.eye className="w-4 h-4 mr-2" />
                  Theo dõi chiến dịch
                </Button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[600px] h-[85%] gap-0 p-0 pb-4"
                showCloseButton={false}
              >
                <DialogHeader className="h-fit border-b-2 border-border p-0 m-0 py-3">
                  <DialogTitle className="font-semibold text-xl text-center">
                    Chiến dịch của {campaign.brandName}
                  </DialogTitle>
                  <DialogDescription className="hidden"></DialogDescription>
                </DialogHeader>
                <CampaignDetail key={campaign.campaignId} campaign={campaign} />
              </DialogContent>
            </Dialog>

            <Button variant="default" size="sm" className="flex-1" onClick={handleEndCampaign}>
              <Icons.play className="h-4 w-4 mr-1" />
              Kết thúc
            </Button>
          </div>
        );
      case 'COMPLETED':
        return (
          <Dialog {...commonProps}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center w-full">
                <Icons.eye className="h-4 w-4 mr-2" />
                Xem báo cáo
              </Button>
            </DialogTrigger>
            <DialogContent
              className="sm:max-w-[600px] h-[85%] gap-0 p-0 pb-4"
              showCloseButton={false}
            >
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
      default:
        return null;
    }
  };

  return (
    <Card
      key={campaign.campaignId}
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow pt-0"
    >
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

        <div className="flex justify-center">{renderDialogButton()}</div>
      </CardContent>
    </Card>
  );
}
