import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

import { Icons } from '@/components/icons/icons';
import { formatCurrency, formatDate } from '@/utils/format';

import type { Invitation } from '../invitation.type';

const InvitationCard = ({ invitation }: { invitation: Invitation }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return (
          <Badge variant="pending">
            <Icons.clock4 size={12} className="mt-0.5" />
            <p className="leading-6">Chờ phản hồi</p>
          </Badge>
        );
      case 'ACCEPTED':
        return (
          <Badge variant="accepted">
            <Icons.circleCheckBig size={12} className="mt-0.5" />
            <p className="leading-6">Đã chấp nhận</p>
          </Badge>
        );
      case 'REJECTED':
        return (
          <Badge variant="rejected">
            <Icons.circleX size={12} className="mt-0.5" />
            <p className="leading-6">Bị từ chối</p>
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <Avatar className="h-10 w-10">
              <AvatarImage src={invitation.influencerAvatar || '/placeholder.svg'} />
              <AvatarFallback>{invitation.influencerName[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">{invitation.influencerName}</h4>
                {getStatusBadge(invitation.status)}
              </div>

              <p className="text-sm text-gray-600 mt-1">{invitation.campaignTitle}</p>

              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <span>Ngân sách: {formatCurrency(invitation.budget)}</span>
                <span>Gửi: {formatDate(invitation.sentAt)}</span>
                {invitation.respondedAt && (
                  <span>Phản hồi: {formatDate(invitation.respondedAt)}</span>
                )}
              </div>

              <p className="text-xs text-gray-500 mt-1">
                Deadline: {new Date(invitation.deadline).toLocaleDateString('vi-VN')}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvitationCard;
