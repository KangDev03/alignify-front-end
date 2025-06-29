import { Calendar, Clock, RefreshCw, XCircle } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

import type { ApplicationByInfluencer } from '@/features/application/application.type';
import { StatusBadge } from '@/features/application/components/status-badge';
import type { Campaign } from '@/features/common/common.type';
import { formatDate } from '@/utils/format';

interface ApplicationDetailProps {
  application: ApplicationByInfluencer;
  campaignInfo: Campaign;
}

export default function ApplicationDetail({ application, campaignInfo }: ApplicationDetailProps) {
  const handleGoToCampaign = (applicationId: string) => {
    console.log(`Chuyển đến chiến dịch từ đơn ứng tuyển ${applicationId}`);
  };

  const handleReapply = (applicationId: string) => {
    console.log(`Apply lại chiến dịch từ đơn ứng tuyển ${applicationId}`);
    alert('Đã gửi lại đơn ứng tuyển thành công!');
  };
  return (
    <div className="px-6 overflow-auto scrollbar-small">
      <div className='pb-4 pt-1'>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={campaignInfo.brandAvartar || '/placeholder.svg'}
              alt={campaignInfo.brandName}
              className='object-cover'
            />
            <AvatarFallback>
              {campaignInfo.imageUrl ? campaignInfo.imageUrl.charAt(0) : 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <DialogTitle className="text-lg pr-1">{campaignInfo.campaignName}</DialogTitle>
            <DialogDescription className="flex items-center">
              {campaignInfo.brandName} • {formatDate(application.createdAt)}
            </DialogDescription>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium mb-1">Mô tả chiến dịch:</h4>
          <p className="text-sm text-muted-foreground">{campaignInfo.content}</p>
        </div>

        {campaignInfo.categories && (
          <div className="flex flex-row gap-2">
            <h4 className="text-sm font-medium mb-2">Danh mục:</h4>
            <div className="flex flex-wrap gap-2">
              {campaignInfo.categories.map((category, index) => (
                <Badge key={category.categoryId ?? index} variant="outline">
                  {category.categoryName ?? category}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Separator />

        <div className="flex flex-row gap-2">
          <p className="text-sm font-medium ">Trạng thái:</p>
          {StatusBadge(application.status)}
        </div>
        <h4 className="text-sm font-medium mb-1">Thông tin ứng tuyển</h4>

        <div className="grid grid-cols-2 gap-4">
          <div className="w-full">
            <div className="flex items-center ">
              <Calendar className="h-4 w-4 text-blue-500 mr-2" />
              <div>
                <p className="text-muted-foreground text-sm whitespace-nowrap">Ngày ứng tuyển:</p>
                <p className="text-sm ">{formatDate(application.createdAt)}</p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-blue-500 mr-2" />
              <span className="text-sm">
                <p className="text-muted-foreground text-sm whitespace-nowrap">Phản hồi dự kiến:</p>
                <p className="text-sm ">{formatDate(application.createdAt)}</p>
              </span>
            </div>
          </div>
        </div>

        <Accordion type="multiple" className="w-full">
          {campaignInfo.campaignRequirements &&
            Object.keys(campaignInfo.campaignRequirements).length > 0 && (
              <AccordionItem value="deliverables">
                <AccordionTrigger className='p-0 cursor-pointer'>
                  <span className="text-sm font-medium">Nội dung yêu cầu</span>
                </AccordionTrigger>
                <AccordionContent className='p-0'>
                  <div className="flex flex-col gap-1">
                    {Object.entries(campaignInfo.campaignRequirements).map(
                      ([requirement, quantity], index) => (
                        <div key={index} className="flex items-center">
                          <span className="mr-2 text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground first-letter:uppercase">
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

        <Accordion type="multiple" className="w-full">
          {Array.isArray(campaignInfo.influencerRequirements) &&
            campaignInfo.influencerRequirements.length > 0 && (
              <AccordionItem value="deliverables">
                <AccordionTrigger className='p-0 cursor-pointer'>
                  <span className="text-sm font-medium">Yêu cầu đối với influencer</span>
                </AccordionTrigger>
                <AccordionContent className='p-0'>
                  <div className="flex flex-col gap-1">
                    {campaignInfo.influencerRequirements.map((item: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <span className="mr-2 text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground first-letter:uppercase">{item}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
        </Accordion>
        <div className="flex justify-end gap-2 pt-4">
          {application.status.toUpperCase() === "PENDING" && (
            <Button variant="destructive">
              <XCircle className="h-4 w-4" />
              Hủy ứng tuyển
            </Button>
          )}
          {application.status.toUpperCase() === 'ACCEPTED' && (
            <Button variant="default" onClick={() => handleGoToCampaign(application.applicationId)}>
              <Clock className="h-4 w-4" />
              Đến trang chiến dịch
            </Button>
          )}
          {application.status === 'REJECTED' && (
            <Button variant="default" onClick={() => handleReapply(application.applicationId)}>
              <RefreshCw className="h-4 w-4" />
              Apply lại
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
