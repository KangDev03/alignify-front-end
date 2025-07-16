import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { Icons } from '@/components/icons/icons';
import { useSendNotification } from '@/hooks/useSendNotification';
import type { RootState } from '@/redux/store';
import { formatCurrency, formatDate, isApiResponseError } from '@/utils/format';

import { useConfirmInvitationMutation } from '../invitation.service';
import type { Invitation } from '../invitation.type';

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'PENDING':
      return (
        <Badge className="py-0.5" variant="pending">
          <Icons.clock4 size={12} className="" />
          <p className="leading-6">Chờ phản hồi</p>
        </Badge>
      );
    case 'ACCEPTED':
      return (
        <Badge className="py-0.5" variant="accepted">
          <Icons.circleCheckBig size={12} className="" />
          <p className="leading-6">Đã chấp nhận</p>
        </Badge>
      );
    case 'REJECTED':
      return (
        <Badge className="py-0.5" variant="rejected">
          <Icons.circleX size={12} className="" />
          <p className="leading-6">Bị từ chối</p>
        </Badge>
      );
    default:
      return (
        <Badge className="py-0.5" variant="outline">
          {status}
        </Badge>
      );
  }
};

const InvitationCard = ({ invitation }: { invitation: Invitation }) => {
  const { role, id: userId, avatarUrl, name } = useSelector((state: RootState) => state.auth);
  const [confirmInvitation, { isSuccess, isLoading }] = useConfirmInvitationMutation();
  const [loadingType, setLoadingType] = useState<'ACCEPT' | 'REJECT' | null>(null);
  const sendNotification = useSendNotification();
  const handleConfirmInvitation = async (accepted: boolean) => {
    try {
      setLoadingType(accepted ? 'ACCEPT' : 'REJECT');
      await confirmInvitation({
        invitationId: invitation.invitationId,
        accepted,
        campaignId: invitation.campaign.campaignId,
      });
    } catch (error) {
      if (isApiResponseError(error)) toast.error(error.data.error);
      else toast.error('Xác nhận lời mời thất bại. Vui lòng thử lại!');
    } finally {
      setLoadingType(null);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      sendNotification({
        userId: userId!,
        content: `Bạn đã chấp nhận lời mời của ${invitation.campaign.brandName}\n${invitation.campaign.campaignName}`,
        avatarUrl: avatarUrl!,
        name: name!,
      });
      sendNotification({
        userId: invitation.campaign.brandId,
        content: `Đã chấp nhận lời mời của bạn\n${invitation.campaign.campaignName}`,
        avatarUrl: avatarUrl!,
        name: name!,
      });
    }
  }, [isSuccess, avatarUrl, invitation.campaign, name, userId, sendNotification]);

  return (
    <Card className="hover:shadow-md transition-shadow ">
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={
                  role === 'INFLUENCER'
                    ? (invitation.campaign.brandAvartar ?? invitation.campaign.brandName[0])
                    : (invitation.user?.avatarUrl ?? invitation.campaign.brandName[0])
                }
              />
              <AvatarFallback>
                {role === 'INFLUENCER'
                  ? invitation.campaign.brandName[0]
                  : (invitation.user?.name?.[0] ?? '')}
              </AvatarFallback>
            </Avatar>
            <h4 className="font-semibold text-lg">
              {role === 'INFLUENCER'
                ? invitation.campaign.brandName
                : (invitation.user?.name ?? '')}
            </h4>
          </div>
          {getStatusBadge(invitation.status)}
        </div>
        <p className="mt-1 text-center">{invitation.campaign.campaignName}</p>
        <div className="flex items-center text-center justify-center gap-2 text-[#666]">
          <span>Ngân sách: {formatCurrency(invitation.campaign.budget)}</span>
          <span>|</span>
          <span>Giới hạn: {formatDate(invitation.createdAt)}</span>
          {/* {invitation.respondedAt && (
                  <span>Phản hồi: {formatDate(invitation.respondedAt)}</span>
                )} */}

          {/* <p className="text-xs text-gray-500 mt-1">
                Deadline: {formatDate(invitation.deadline).toLocaleDateString('vi-VN')}
              </p> */}
        </div>
        {role === 'INFLUENCER' && invitation.status === 'PENDING' && (
          <div className="flex justify-center gap-10">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="w-24"
              onClick={() => handleConfirmInvitation(false)}
              disabled={isLoading}
            >
              {isLoading && loadingType === 'REJECT' && (
                <Icons.loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Từ chối
            </Button>
            <Button
              type="button"
              size="sm"
              className="w-24"
              onClick={() => handleConfirmInvitation(true)}
              disabled={isLoading}
            >
              {isLoading && loadingType === 'ACCEPT' && (
                <Icons.loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Chấp nhận
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InvitationCard;
