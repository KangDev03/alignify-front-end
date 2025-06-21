// src/features/my-campaign/components/campaign-card.tsx

import { useState } from 'react';
import { Calendar, DollarSignIcon, Eye } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import type { Campaign } from '@/features/common/common.type.ts';
import { parseDateString } from '@/utils/format.ts';

import CampaignDetail from './campaign-detail.tsx';
import { StatusBadge } from './status-badge.tsx';

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  const [openDialog, setOpenDialog] = useState<string | null>(null);

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
          <Dialog
            open={openDialog === campaign.campaignId}
            onOpenChange={(open) => setOpenDialog(open ? campaign.campaignId : null)}
          >
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center w-full">
                <Eye className="h-4 w-4 mr-2" />
                Xem chi tiết
              </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="sm:max-w-[600px] h-[85%] pr-0">
              <CampaignDetail key={campaign.campaignId} campaign={campaign} />
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
