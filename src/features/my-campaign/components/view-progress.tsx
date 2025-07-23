import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';

import { Icons } from '@/components/icons/icons';
import { type Campaign } from '@/features/common/common.type';
import { cn } from '@/lib/utils';
import type { RootState } from '@/redux/store';

import PostDetailConfirmation from './post-detail-confirmation';
import { useGetCampaignTrackingByBrandQuery } from '../campaign.service';
import { setCampaignTrackings } from '../campaign.slice';

interface ViewProgressDialogProps {
  campaign: Campaign;
}
const ViewProgressDialog = ({ campaign }: ViewProgressDialogProps) => {
  const dispatch = useDispatch();
  const { data: trackingRaw } = useGetCampaignTrackingByBrandQuery(campaign.campaignId);
  const { campaignTrackings } = useSelector((state: RootState) => state.campaignTracking);
  console.log(
    trackingRaw?.data.find((item) => item.campaignTrackingId === '6880a29a82c38d7891ea6867'),
  );

  useEffect(() => {
    if (trackingRaw) {
      dispatch(setCampaignTrackings(trackingRaw));
    }
  });

  const campaignProgress = campaignTrackings.filter(
    (tracking) => tracking.campaignId === campaign.campaignId,
  );
  const totalRequirements =
    (campaign.campaignRequirements?.reduce((sum, req) => sum + req.quantity, 0) || 0) *
    campaignProgress.length;
  const completedCount =
    (campaignProgress && campaignProgress.filter((p) => p.status === 'ACCEPTED').length) ?? 0;
  const completedPostByCampaignTracking = campaignProgress.reduce(
    (sum, req) =>
      sum +
      req.platformRequirementTracking.reduce(
        (_sum, post) => _sum + post.details.filter((detail) => detail.status === 'ACCEPTED').length,
        0,
      ),
    0,
  );
  const progressPercentage =
    totalRequirements > 0 ? (completedPostByCampaignTracking / totalRequirements) * 100 : 0;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Icons.users className="h-4 w-4 mr-2" />
          Xem tiến độ
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] h-[85%] pr-3">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icons.users className="h-5 w-5" />
            Tiến độ chiến dịch
          </DialogTitle>
          <DialogDescription>{campaign.campaignName}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 overflow-y-auto scrollbar-thin pr-3">
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Tiến độ tổng quan</h3>
              <span className="text-sm text-muted-foreground">
                {completedCount}/{totalRequirements} nội dung
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-sm text-muted-foreground mt-1">
              {progressPercentage.toFixed(1)}% hoàn thành
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Chi tiết tiến độ</h3>

            {!campaignProgress || !campaignProgress.length || campaignProgress.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Icons.inbox className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Chưa có cập nhật tiến độ nào</p>
              </div>
            ) : (
              <Carousel opts={{ loop: true }} className="mx-12">
                <CarouselContent>
                  {campaignProgress.map((progress) => (
                    <CarouselItem key={progress.campaignTrackingId} className="basis-full">
                      {progress.platformRequirementTracking.map((req, reqIndex) => {
                        let style = '';
                        const platform = req.platform.toLowerCase();
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
                        const Icon = Icons[req.platform.toLowerCase() as keyof typeof Icons];
                        return (
                          <div
                            key={req.platform + req.post_type + reqIndex}
                            className="border rounded-lg p-4 space-y-4"
                          >
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className={cn('lowercase text-white', style)}
                              >
                                <Icon className={cn(platform === 'tiktok' && 'stroke-3')} />
                                <span className="first-letter:capitalize text-white">
                                  {req.platform}
                                </span>
                              </Badge>
                              <Badge variant="secondary" className="capitalize">
                                {req.post_type}
                              </Badge>
                              <span>•</span>
                              <span className="text-sm text-muted-foreground">
                                {req.quantity} nội dung
                              </span>
                            </div>

                            {req.details.map((content, contentIndex) => {
                              return (
                                <PostDetailConfirmation
                                  key={req.platform + req.post_type + reqIndex + '_' + contentIndex}
                                  campaignId={campaign.campaignId}
                                  campaignTrackingId={progress.campaignTrackingId}
                                  content={content}
                                  contentIndex={contentIndex}
                                  reqIndex={reqIndex}
                                  req={req}
                                  campaign={campaign}
                                />
                              );
                            })}
                          </div>
                        );
                      })}
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {campaignProgress.length > 1 && (
                  <>
                    <CarouselPrevious />
                    <CarouselNext />
                  </>
                )}
              </Carousel>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <DialogClose asChild>
            <Button variant="outline">Đóng</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewProgressDialog;
