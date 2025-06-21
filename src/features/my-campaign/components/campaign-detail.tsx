import { Calendar, DollarSignIcon } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

import { parseDateString } from '@/utils/format.ts';

import { StatusBadge } from './status-badge.tsx';
import type { Campaign } from '../campaign.type.ts';

export default function CampaignDetail({ campaign }: { campaign: Campaign }) {
  return (
    <div className='h-full'>
      <DialogHeader className='pr-6'>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={campaign.brandAvartar || '/placeholder.svg'}
              alt={campaign.brandName}
            />
            <AvatarFallback>{campaign.brandName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <DialogTitle className="text-lg">{campaign.campaignName}</DialogTitle>
            <DialogDescription>
              {campaign.brandName} •{' '}
              {parseDateString(campaign.createdAt)}
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>


      <div className="pt-2 pr-6 h-[70%] space-y-3 overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground scrollbar-track-transparent">
        <div className="w-full h-64 relative mt-4 rounded-lg overflow-hidden">
          <img
            src={campaign.imageUrl || "/placeholder.svg"}
            alt={campaign.campaignName}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h4 className="text-sm font-medium mb-1">Mô tả chiến dịch:</h4>
          <p className="text-sm text-muted-foreground">{campaign.content}</p>
        </div>

        {campaign.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <h4 className="text-sm font-medium">Danh mục:</h4>
            {campaign.categories.map((cat: any, i: number) => (
              <Badge key={cat.categoryId ?? i} variant="outline">
                {cat.categoryName ?? cat}
              </Badge>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {/* Ngân sách */}
          <div className="flex flex-col">
            <h4 className="text-sm font-medium mb-1">Ngân sách</h4>
            <div className="flex items-center w-fit mr-4">
              <DollarSignIcon className="w-4 h-4 mr-2 text-green-500" />
              <span>{`${Number(campaign.budget).toLocaleString("vi-VN")} VNĐ`}</span>
            </div>
          </div>

          {/* Thời gian */}
          <div className="flex flex-col">
            <h4 className="text-sm font-medium mb-1">Thời gian</h4>
            <div className="flex items-center w-fit">
              <Calendar className="w-4 h-4 mr-2 text-primary" />
              <p>{`${parseDateString(campaign.startAt)} - ${parseDateString(campaign.dueAt)}`}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-row gap-2">
          <p className="text-sm font-medium">Trạng thái:</p>
          {StatusBadge(campaign.status)}
        </div>

        <Accordion type="multiple" className="w-full mb-4">
          {campaign.campaignRequirements &&
            Object.keys(campaign.campaignRequirements).length > 0 && (
              <AccordionItem value="deliverables">
                <AccordionTrigger>
                  <span className="text-sm font-medium">Nội dung yêu cầu</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1">
                    {Object.entries(campaign.campaignRequirements).map(
                      ([requirement, quantity], index) => (
                        <div key={index} className="flex items-center">
                          <span className="mr-2 text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">
                            {requirement}: {quantity}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
        </Accordion>

        <Accordion type="multiple" className="w-full mb-4">
          {Array.isArray(campaign.influencerRequirements) &&
            campaign.influencerRequirements.length > 0 && (
              <AccordionItem value="deliverables">
                <AccordionTrigger>
                  <span className="text-sm font-medium">Yêu cầu đối với influencer</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1">
                    {campaign.influencerRequirements.map((item: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <span className="mr-2 text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
        </Accordion>
      </div>
    </div>
  );
}
