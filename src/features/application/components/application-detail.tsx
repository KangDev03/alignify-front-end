import {  Clock, RefreshCw, XCircle } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

import type { Application, Campaign } from '@/features/application/application.type';
import { StatusBadge } from '@/features/application/components/status-badge';

interface ApplicationDetailProps {
  application: Application;
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
  const [year, month, day] = application.createdAt;
  const appliedDate = new Date(year, month - 1, day);

  return (
    <>
      <DialogHeader>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={campaignInfo.imageUrl || '/placeholder.svg'}
              alt={campaignInfo.campaignId}
            />
            <AvatarFallback>{campaignInfo.imageUrl.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <DialogTitle className="text-xl">{campaignInfo.content}</DialogTitle>
            <DialogDescription className="flex items-center">{''} • {appliedDate.toLocaleDateString("vi-VN")}</DialogDescription>
          </div>
        </div>
      </DialogHeader>

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

        {/* <div className="grid grid-cols-2 gap-4"> 
        <div className="w-full">
          <h4 className="text-sm font-medium mb-1">Thông tin ứng tuyển</h4>
          <div className="space-y-2  grid grid-cols-2">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-blue-500 mr-2" />
              <div>
                <p className="text-sm text-muted-foreground">Ngày ứng tuyển:</p>
                <p className="text-sm ">
                  {appliedDate.toLocaleDateString("vi-VN")}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-blue-500 mr-2" />
              <div>
                <p className="text-sm text-muted-foreground">Phản hồi dự kiến:</p>
                <p className="text-sm ">27/1/2024</p>
              </div>
            </div>
          </div>
        </div>
        {/* <div>
            <h4 className="text-sm font-medium mb-2">Thời gian dự kiến</h4>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-blue-500 mr-1" />
              <span className="text-sm">
                {new Date(application.startDate).toLocaleDateString("vi-VN")} -{" "}
                {new Date(application.endDate).toLocaleDateString("vi-VN")}
              </span>
            </div>
          </div> */}
        {/* </div> */}

        <Accordion type="multiple" className="w-full mb-4">
          {campaignInfo.campaignRequirements &&
            Object.keys(campaignInfo.campaignRequirements).length > 0 && (
              <AccordionItem value="deliverables">
                <AccordionTrigger>
                  <span className="text-sm font-medium">Nội dung yêu cầu</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1">
                    {Object.entries(campaignInfo.campaignRequirements).map(
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
          {Array.isArray(campaignInfo.influencerRequirement) &&
            campaignInfo.influencerRequirement.length > 0 && (
              <AccordionItem value="deliverables">
                <AccordionTrigger>
                  <span className="text-sm font-medium">Yêu cầu đối với influencer</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1">
                    {campaignInfo.influencerRequirement.map((item: string, index: number) => (
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
        <div className="flex justify-end gap-2 pt-4">
          {application.status === 'Chờ duyệt' && (
            <Button variant="destructive">
              <XCircle className="h-4 w-4" />
              Hủy ứng tuyển
            </Button>
          )}
          {application.status === 'Đã chấp nhận' && (
            <Button variant="default" onClick={() => handleGoToCampaign(application.applicationId)}>
              <Clock className="h-4 w-4" />
              Đến trang chiến dịch
            </Button>
          )}
          {application.status === 'Bị từ chối' && (
            <Button variant="default" onClick={() => handleReapply(application.applicationId)}>
              <RefreshCw className="h-4 w-4" />
              Apply lại
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
