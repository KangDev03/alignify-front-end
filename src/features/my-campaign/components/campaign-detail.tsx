import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Calendar, DollarSignIcon } from 'lucide-react';
import { toast } from 'sonner';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button.tsx';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { Icons } from '@/components/icons/icons.tsx';
import type { Campaign } from '@/features/common/common.type.ts';
import { cn } from '@/lib/utils.ts';
import type { RootState } from '@/redux/store.ts';
import { formatDate, formatNumber } from '@/utils/format.ts';

import { StatusBadge } from './status-badge.tsx';

export interface SelectRequirement {
  platform: string;
  post_type: string;
  index: number;
}

export default function CampaignDetail({ campaign }: { campaign: Campaign }) {
  const { id: userId } = useSelector((state: RootState) => state.auth);
  const initializeSelectRequirement = (campaignRequirements: Campaign['campaignRequirements']) => {
    return campaignRequirements.map((req) => ({
      platform: req.platform,
      post_type: req.post_type,
      index: 0,
    }));
  };
  const [selectRequirement, setSelectRequirement] = useState<SelectRequirement[]>(
    initializeSelectRequirement(campaign.campaignRequirements),
  );

  const campaignRequirementsArray = Array.isArray(campaign.campaignRequirements)
    ? campaign.campaignRequirements
    : Object.entries(campaign.campaignRequirements || {}).map(([platform, quantity]) => ({
        platform: platform as 'FACEBOOK' | 'TIKTOK' | 'YOUTUBE' | 'INSTAGRAM',
        quantity: quantity as number,
        post_type: '', // Placeholder, adjust if needed
        details: [], // Placeholder, adjust if needed
      }));

  const orderedCampaignRequirements = campaign.influencerRequirements
    .map((influencerReq) => {
      const req = campaignRequirementsArray.find(
        (campReq) => campReq.platform.toLowerCase() === influencerReq.platform.toLowerCase(),
      );
      return req || null;
    })
    .filter((req): req is NonNullable<typeof req> => req !== null);
  return (
    <div className="px-6 overflow-y-scroll scrollbar-small py-4">
      <div className="">
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
              {campaign.brandName} • {formatDate(campaign.createdAt)}
            </DialogDescription>
          </div>
        </div>
      </div>

      <div className="pt-2 space-y-3">
        <div className="w-full h-64 relative mt-4 rounded-lg overflow-hidden">
          <img
            src={campaign.imageUrl || '/placeholder.svg'}
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
        <div className="flex flex-wrap gap-2">
          <h4 className="text-sm font-medium">Nền tảng:</h4>
          {orderedCampaignRequirements.map((require, idx) => {
            let style = '';
            const platform = require.platform.toLowerCase();
            switch (platform) {
              case 'facebook': {
                style = 'bg-blue-500';
                break;
              }
              case 'youtube': {
                style = 'bg-red-500';
                break;
              }
              case 'instagram': {
                style = 'bg-gradient-to-br from-purple-700 via-pink-500 to-yellow-400';
                break;
              }
              case 'tiktok': {
                style = 'bg-black';
                break;
              }
              default:
                break;
            }
            const Icon = Icons[require.platform.toLowerCase() as keyof typeof Icons];
            return (
              <Badge
                key={require.platform + idx}
                variant="outline"
                className={cn('lowercase text-white', style)}
              >
                <Icon className={cn(platform === 'tiktok' && 'stroke-3')} />
                <span className="first-letter:capitalize text-white">{require.platform}</span>
              </Badge>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Ngân sách */}
          <div className="flex flex-col">
            <h4 className="text-sm font-medium mb-1">Ngân sách</h4>
            <div className="flex items-center w-fit mr-4">
              <DollarSignIcon className="w-4 h-4 mr-2 text-green-500" />
              <span>{`${Number(campaign.budget).toLocaleString('vi-VN')} VNĐ`}</span>
            </div>
          </div>

          {/* Thời gian */}
          <div className="flex flex-col">
            <h4 className="text-sm font-medium mb-1">Thời gian</h4>
            <div className="flex items-center w-fit">
              <Calendar className="w-4 h-4 mr-2 text-primary" />
              <p>{`${formatDate(campaign.startAt)} - ${formatDate(campaign.dueAt)}`}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-row gap-2 items-center">
          <p className="text-sm font-medium">Trạng thái:</p>
          {StatusBadge(campaign.status)}
        </div>

        {(campaign.joinedInfluencerIds.includes(userId!) ||
          campaign.brandId === userId ||
          campaign.appliedInfluencerIds?.includes(userId!)) && (
          <div className="flex flex-row gap-2 items-center">
            <p className="text-sm font-medium">Hợp đồng:</p>
            <Button
              size="sm"
              variant="outline"
              onClick={async (e) => {
                e.stopPropagation();
                if (campaign.contractUrl) {
                  try {
                    const response = await fetch(campaign.contractUrl);
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    const fileName =
                      campaign.contractUrl.split('/').pop() ||
                      (campaign.contractUrl.endsWith('.pdf') ? 'cv.pdf' : 'cv');
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    window.URL.revokeObjectURL(url);
                  } catch {
                    toast.error('Không thể tải file CV. Vui lòng thử lại sau.');
                  }
                }
              }}
            >
              <Icons.fileUser className="h-4 w-4 mr-1" />
              {campaign.contractUrl ? 'Đính kèm' : 'Chưa tải lên'}
            </Button>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <p className="font-semibold">Yêu cầu về influencer</p>
          <div className="flex gap-1 items-center">
            <Icons.circleAlert size={14} />
            <p className="text-sm">Lượt theo dõi</p>
          </div>
          <div
            className={cn(
              'flex items-start py-1',
              Array.isArray(campaign.influencerRequirements) &&
                campaign.influencerRequirements.length == 1
                ? 'w-1/3 justify-center'
                : 'justify-around',
            )}
          >
            {Array.isArray(campaign.influencerRequirements) &&
              campaign.influencerRequirements.map((require, idx) => {
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
          <div
            className={cn(
              'flex items-start flex-wrap',
              orderedCampaignRequirements && orderedCampaignRequirements.length == 1
                ? 'justify-start'
                : 'justify-around',
            )}
          >
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
                              <Tooltip>
                                <TooltipTrigger>
                                  <Icons.messageCircle size={14} className="text-blue-500 p-0" />
                                </TooltipTrigger>
                                <TooltipContent side="bottom" className="rounded-full text-xs py-1">
                                  <p>Lượt bình luận</p>
                                </TooltipContent>
                              </Tooltip>
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
      </div>
    </div>
  );
}
