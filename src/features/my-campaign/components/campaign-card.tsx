// src/features/my-campaign/components/campaign-card.tsx

import { useState } from 'react';
import { Calendar, DollarSignIcon, Edit, Eye, Play } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import type { Campaign, RoleName } from '@/features/common/common.type.ts';
import { useAppSelector } from '@/hooks/redux.ts';
import type { RootState } from '@/redux/store.ts';
import { parseDateString } from '@/utils/format.ts';

import CampaignDetail from './campaign-detail.tsx';
import { StatusBadge } from './status-badge.tsx';

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  const { role } = useAppSelector((state: RootState) => state.auth);
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const userRole: RoleName = role;

  const renderDialogButton = () => {
    const commonProps = {
      open: openDialog === campaign.campaignId,
      onOpenChange: (open: boolean) => setOpenDialog(open ? campaign.campaignId : null),
    };

    switch (campaign.status) {
      case 'DRAFT':
        return (
          <div className='w-full grid grid-cols-2 gap-2'>
            <Dialog {...commonProps}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Chỉnh sửa
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] h-[85%] pr-0">
                {/* <DraftDialog campaign={campaign} /> */}
              </DialogContent>
            </Dialog>

            <Button
              variant="default"
              size="sm"
              className="flex-1"
            >
              <Play className="h-4 w-4 mr-1" />
              Đăng tuyển
            </Button>
          </div>
        );
      case 'RECRUITING':
        return (
          <Dialog {...commonProps}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center w-full">
                <Eye className="h-4 w-4 mr-2" />
                Xem chi tiết
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] h-[85%] pr-0">
              <CampaignDetail key={campaign.campaignId} campaign={campaign} />
            </DialogContent>
          </Dialog>
        );
      case 'PENDING':
        return userRole === 'BRAND' ? (
          <div className='w-full grid grid-cols-2 gap-2'>
            <Dialog {...commonProps}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Chỉnh sửa
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] h-[85%] pr-0">
                {/* <PendingDialog campaign={campaign} /> */}
              </DialogContent>
            </Dialog>

            <Button
              variant="default"
              size="sm"
              className="flex-1"
            >
              <Play className="h-4 w-4 mr-1" />
              Bắt đầu
            </Button>
          </div>
        ) : (
          <Dialog {...commonProps}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center w-full">
                <Eye className="h-4 w-4 mr-2" />
                Xem chi tiết
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] h-[85%] pr-0">
              <CampaignDetail key={campaign.campaignId} campaign={campaign} />
            </DialogContent>
          </Dialog>
        );
      case 'PARTICIPATING':
        return (
          <Dialog {...commonProps}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Theo dõi chiến dịch
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] h-[85%] pr-0">
              {/* <ParticipatingDialog campaign={campaign} /> */}
            </DialogContent>
          </Dialog>
        );
      case 'COMPLETED':
        return (
          <Dialog {...commonProps}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center w-full">
                <Eye className="h-4 w-4 mr-2" />
                Xem chi tiết
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] h-[85%] pr-0">
              <CampaignDetail key={campaign.campaignId} campaign={campaign} />
            </DialogContent>
          </Dialog>
        );
      default:
        return null;
    }
  }

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
              {campaign.brandName} • {parseDateString(campaign.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex items-start w-fit mb-4 h-12">
          <p className="line-clamp-2">{`${campaign.content}`}</p>
        </div>

        <div className="flex justify-between mb-4 text-sm text-muted-foreground">
          <div className="flex items-center w-fit mr-4">
            <DollarSignIcon className="w-4 h-4 mr-2 text-green-500" />
            <span>{`${Number(campaign.budget).toLocaleString('vi-VN')} VNĐ`}</span>
          </div>

          <div className="flex items-center w-fit">
            <Calendar className="w-4 h-4 mr-2 text-primary" />
            <span>{`${parseDateString(campaign.startAt)} - ${parseDateString(campaign.dueAt)}`}</span>
          </div>
        </div>

        <div className="flex justify-center">
          {renderDialogButton()}
        </div>
      </CardContent>
    </Card>
  );
}
