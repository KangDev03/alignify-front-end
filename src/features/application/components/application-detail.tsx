import { useState } from 'react';
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
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { Icons } from '@/components/icons/icons';
import type { ApplicationByInfluencer } from '@/features/application/application.type';
import { StatusBadge } from '@/features/application/components/status-badge';
import type { Campaign } from '@/features/common/common.type';
import type { SelectRequirement } from '@/features/my-campaign/components/campaign-detail';
import { cn } from '@/lib/utils';
import { formatDate, formatNumber } from '@/utils/format';

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

  const initializeSelectRequirement = (campaignRequirements: Campaign['campaignRequirements']) => {
    return campaignRequirements.map((req) => ({
      platform: req.platform,
      post_type: req.post_type,
      index: 0,
    }));
  };
  const [selectRequirement, setSelectRequirement] = useState<SelectRequirement[]>(
    initializeSelectRequirement(campaignInfo.campaignRequirements),
  );

  const campaignRequirementsArray = Array.isArray(campaignInfo.campaignRequirements)
    ? campaignInfo.campaignRequirements
    : Object.entries(campaignInfo.campaignRequirements || {}).map(([platform, quantity]) => ({
        platform: platform as 'FACEBOOK' | 'TIKTOK' | 'YOUTUBE' | 'INSTAGRAM',
        quantity: quantity as number,
        post_type: '', // Placeholder, adjust if needed
        details: [], // Placeholder, adjust if needed
      }));

  const orderedCampaignRequirements = campaignInfo.influencerRequirements
    .map((influencerReq) => {
      const req = campaignRequirementsArray.find(
        (campReq) => campReq.platform.toLowerCase() === influencerReq.platform.toLowerCase(),
      );
      return req || null;
    })
    .filter((req): req is NonNullable<typeof req> => req !== null);

  return (
    <div className="px-6 overflow-auto scrollbar-small">
      <div className="pb-4 pt-1">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={campaignInfo.brandAvartar || '/placeholder.svg'}
              alt={campaignInfo.brandName}
              className="object-cover"
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

        <div className="flex flex-col gap-2">
          <p className="font-semibold">Yêu cầu về influencer</p>
          <div className="flex gap-1 items-center">
            <Icons.circleAlert size={14} />
            <p className="text-sm">Lượt theo dõi</p>
          </div>
          <div className="flex justify-around items-start py-1">
            {Array.isArray(campaignInfo.influencerRequirements) &&
              campaignInfo.influencerRequirements.map((require, idx) => {
                let bg = '';
                const platform = require.platform.toLowerCase();
                switch (platform) {
                  case 'facebook': {
                    bg = 'bg-blue-500';
                    break;
                  }
                  case 'youtube': {
                    bg = 'bg-red-500';
                    break;
                  }
                  case 'instagram': {
                    bg = 'bg-gradient-to-br from-purple-700 via-pink-500 to-yellow-400';
                    break;
                  }
                  case 'tiktok': {
                    bg = 'bg-black stroke-3';
                    break;
                  }
                  default:
                    break;
                }
                const Icon = Icons[require.platform.toLowerCase() as keyof typeof Icons];
                return (
                  <div
                    key={require.platform + idx}
                    className="flex flex-col items-center gap-1 text-sm"
                  >
                    <Icon
                      className={cn('size-10 rounded-xl bg-black border-2 p-1 text-white', bg)}
                    />
                    <p className="flex gap-2">
                      <span className="font-semibold text-primary">
                        {formatNumber(require.followers)}
                      </span>
                    </p>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold">Yêu cầu về các bài đăng trên các nền tảng</p>
          <div className="flex justify-around items-start flex-wrap">
            {orderedCampaignRequirements.map((require) => {
              let color = '';
              const platform = require.platform.toLowerCase();
              switch (platform) {
                case 'facebook': {
                  color = 'text-blue-500';
                  break;
                }
                case 'youtube': {
                  color = 'text-red-500';
                  break;
                }
                case 'instagram': {
                  color = 'text-pink-500';
                  break;
                }
                case 'tiktok': {
                  color = 'text-black stroke-3';
                  break;
                }
                default:
                  break;
              }
              const Icon = Icons[require.platform.toLowerCase() as keyof typeof Icons];
              const selected = selectRequirement.find(
                (sel) => sel.platform === require.platform && sel.post_type === require.post_type,
              );
              const selectedIndex = selected ? selected.index : 0;
              return (
                <div
                  key={require.platform + require.post_type}
                  className="flex flex-col gap-2 text-sm w-1/3 px-2"
                >
                  <div className="flex items-center justify-center text-lg gap-1">
                    <Icon size={20} className={color} />
                    <p className={cn('first-letter:capitalize font-semibold', color)}>
                      {require.platform.toLowerCase()}
                    </p>
                  </div>
                  <Accordion type="single" collapsible>
                    <AccordionItem
                      value={require.post_type}
                      className="border-2 border-black rounded-xl last:border-b-2 px-2 py-1"
                    >
                      <AccordionTrigger className="font-semibold gap-1 hover:no-underline justify-between p-1 cursor-pointer">
                        <div className="flex gap-2">
                          {/* <p>{require.quantity}</p> */}
                          <p className="capitalize">{require.post_type + 's'}</p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-1 flex flex-col gap-2">
                        {require.details.map((_, idx) => (
                          <Button
                            variant="outline"
                            className={cn(
                              'p-1 m-0 h-fit text-black',
                              require.details[idx].post_type === selected?.post_type &&
                                require.platform === selected.platform &&
                                idx === selectedIndex &&
                                'text-primary',
                            )}
                            key={require.post_type + idx}
                            onClick={() => {
                              setSelectRequirement((prev) => {
                                const platformIdx = prev.findIndex(
                                  (sel) =>
                                    sel.platform === require.platform &&
                                    sel.post_type === require.post_type,
                                );
                                if (platformIdx >= 0) {
                                  const newState = [...prev];
                                  newState[platformIdx] = {
                                    ...newState[platformIdx],
                                    index: idx,
                                  };
                                  return newState;
                                } else {
                                  return [
                                    ...prev,
                                    {
                                      platform: require.platform,
                                      post_type: require.post_type,
                                      index: idx,
                                    },
                                  ];
                                }
                              });
                            }}
                          >
                            <p className="font-xs font-semibold p-0 capitalize">
                              {require.post_type} {idx + 1}
                            </p>
                          </Button>
                        ))}
                        <div className="flex justify-around border-black border-2 rounded-full">
                          {require.details[selectedIndex].like > 0 && (
                            <div className="flex items-center gap-1">
                              {require.platform.toLowerCase() === 'tiktok' && (
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Icons.heart size={14} className="text-red-500 fill-red-500" />
                                  </TooltipTrigger>
                                  <TooltipContent
                                    side="bottom"
                                    className="rounded-full text-xs py-1"
                                  >
                                    <p>Lượt thích</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                              {require.platform.toLowerCase() === 'facebook' && (
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Icons.thumbsUp
                                      size={14}
                                      className="text-blue-500 fill-blue-500"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent
                                    side="bottom"
                                    className="rounded-full text-xs py-1"
                                  >
                                    <p>Lượt thích</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                              {require.platform.toLowerCase() === 'youtube' && (
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Icons.thumbsUp
                                      size={14}
                                      className="text-blue-500 fill-blue-500"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent
                                    side="bottom"
                                    className="rounded-full text-xs py-1"
                                  >
                                    <p>Lượt thích</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                              {require.platform.toLowerCase() === 'instagram' && (
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Icons.heart size={14} className="text-red-500 fill-red-500" />
                                  </TooltipTrigger>
                                  <TooltipContent
                                    side="bottom"
                                    className="rounded-full text-xs py-1"
                                  >
                                    <p>Lượt thích</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                              <p>{require.details[selectedIndex].like}</p>
                            </div>
                          )}
                          {require.details[selectedIndex].comment > 0 && (
                            <div className="flex items-center gap-1">
                              <Icons.messageCircle size={14} className="text-blue-500 p-0" />
                              <p>{require.details[selectedIndex].comment}</p>
                            </div>
                          )}
                          {/* {require.details[selectedIndex].share > 0 && (
                          <div className="flex items-center gap-1">
                            <Icons.share size={14} className="text-blue-500 p-0" />
                            <p>{require.details[selectedIndex].share}</p>
                          </div>
                        )} */}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          {application.status.toUpperCase() === 'PENDING' && (
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
