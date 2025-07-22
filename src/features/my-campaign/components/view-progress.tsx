import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

import { Icons } from '@/components/icons/icons';
import { type Campaign, SupportedPostTypeByPlatform } from '@/features/common/common.type';
import { cn } from '@/lib/utils';

import { useGetCampaignTrackingByBrandQuery } from '../campaign.service';
import type { PostDetailConfirmSubmitData } from '../campaign.type';

interface ViewProgressDialogProps {
  campaign: Campaign;
}
const ViewProgressDialog = ({ campaign }: ViewProgressDialogProps) => {
  const { data: trackingRaw } = useGetCampaignTrackingByBrandQuery(campaign.campaignId);

  const campaignProgress = trackingRaw?.data ?? [];
  const totalRequirements =
    campaign.campaignRequirements?.reduce((sum, req) => sum + req.quantity, 0) || 0;
  const completedCount =
    (campaignProgress && campaignProgress.filter((p) => p.status === 'ACCEPTED').length) ?? 0;
  const progressPercentage = totalRequirements > 0 ? (completedCount / totalRequirements) * 100 : 0;

  const handleConfirmPostDetail = ({
    accepted,
    campaignId,
    campaignTrackingId,
    index,
    platform,
    post_type,
    postUrl,
  }: PostDetailConfirmSubmitData) => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Icons.users className="h-4 w-4 mr-2" />
          Xem tiến độ
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icons.users className="h-5 w-5" />
            Tiến độ chiến dịch
          </DialogTitle>
          <DialogDescription>{campaign.campaignName}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
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
              campaignProgress.map((progress) => (
                <div key={progress.campaignTrackingId} className="space-y-4">
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
                          <Badge variant="outline" className={cn('lowercase text-white', style)}>
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
                          const platformKey =
                            req.platform.toLowerCase() as keyof typeof SupportedPostTypeByPlatform;
                          const postTypes = SupportedPostTypeByPlatform[platformKey];

                          const postObj = postTypes.find((obj) => {
                            return Object.keys(obj)[0] === req.post_type;
                          });

                          const posts = postObj
                            ? postObj[req.post_type as keyof typeof postObj]
                            : [];
                          return (
                            <div
                              key={req.platform + req.post_type + reqIndex + '_' + contentIndex}
                              className="bg-muted/30 rounded-lg px-3 py-1 space-y-3"
                            >
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium capitalize">
                                  {req.post_type} {contentIndex + 1}
                                </h4>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => window.open(content.postUrl, '_blank')}
                                >
                                  <Icons.externalLink className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="space-y-2">
                                <div
                                  className="flex-1 items-start border rounded-md justify-between px-3 py-2 text-sm font-semibold space-y-4"
                                  key={`${req.platform}.${req.post_type}.${reqIndex}.details.${contentIndex}.index`}
                                >
                                  <div className="grid grid-cols-3 gap-4">
                                    {posts?.map((contentType, idx) => {
                                      let label = '';
                                      switch (contentType) {
                                        case 'view':
                                          label = 'Lượt xem ';
                                          break;
                                        case 'like':
                                          label = 'Lượt thích ';
                                          break;
                                        case 'comment':
                                          label = 'Lượt bình luận ';
                                          break;
                                        case 'share':
                                          label = 'Lượt chia sẻ ';
                                          break;
                                      }
                                      return (
                                        <div key={contentType + idx}>
                                          <p>{label}</p>
                                          <Input
                                            value={content[contentType]}
                                            className="text-primary"
                                          />
                                        </div>
                                      );
                                    })}
                                  </div>
                                  {content.status === 'PENDING' && (
                                    <div className="flex justify-end gap-4">
                                      <Button
                                        variant={'destructive'}
                                        size={'sm'}
                                        onClick={() =>
                                          handleConfirmPostDetail({
                                            accepted: false,
                                            campaignId: campaign.campaignId,
                                            campaignTrackingId: progress.campaignTrackingId,
                                            platform: req.platform,
                                            post_type: content.post_type,
                                            index: contentIndex,
                                            postUrl: content.postUrl,
                                          })
                                        }
                                      >
                                        Từ chối
                                      </Button>
                                      <Button variant={'default'} size={'sm'}>
                                        Chấp nhận
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              ))
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
