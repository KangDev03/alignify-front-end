import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

import { Badge, badgeVariants } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Icons } from '@/components/icons/icons';
import { type Campaign, SupportedPostTypeByPlatform } from '@/features/common/common.type';

import { useConfirmPostDetailMutation } from '../campaign.service';
import { confirmPostDetailSlice } from '../campaign.slice';
import type {
  PlatformRequirementDetailTracking,
  PlatformRequirementTracking,
  PostDetailConfirmSubmitData,
} from '../campaign.type';

interface PostDetailConfirmationProps {
  req: PlatformRequirementTracking;
  reqIndex: number;
  contentIndex: number;
  content: PlatformRequirementDetailTracking;
  campaignId: string;
  campaignTrackingId: string;
  campaign: Campaign;
}

export default function PostDetailConfirmation({
  req,
  reqIndex,
  contentIndex,
  content,
  campaignId,
  campaignTrackingId,
  campaign,
}: PostDetailConfirmationProps) {
  const dispatch = useDispatch();
  const [accepted, setAccepted] = useState<boolean>();
  const platformKey = req.platform.toLowerCase() as keyof typeof SupportedPostTypeByPlatform;
  const postTypes = SupportedPostTypeByPlatform[platformKey];
  const postObj = postTypes.find((obj) => {
    return Object.keys(obj)[0] === req.post_type;
  });

  const posts = postObj ? postObj[req.post_type as keyof typeof postObj] : [];
  const [confirmPostDetailStats, { isLoading }] = useConfirmPostDetailMutation();

  const campaignRequirements = campaign.campaignRequirements;

  const handleConfirmPostDetail = async ({
    accepted,
    campaignId,
    campaignTrackingId,
    index,
    platform,
    post_type,
    postUrl,
  }: PostDetailConfirmSubmitData) => {
    const requiredDetails = campaign.campaignRequirements.find(
      (campaignReq) =>
        campaignReq.platform === req.platform && campaignReq.post_type === req.post_type,
    )?.details[index];
    const required = req.details[index];
    const isStatified =
      requiredDetails &&
      (required.comment ?? 0) >= (requiredDetails?.comment ?? 0) &&
      (required.like ?? 0) >= (requiredDetails?.like ?? 0) &&
      (required.view ?? 0) >= (requiredDetails?.view ?? 0) &&
      (required.share ?? 0) >= (requiredDetails?.share ?? 0);
    if (!isStatified && accepted) {
      toast.error('Chưa đủ điều kiện!');
      return;
    }
    try {
      await confirmPostDetailStats({
        accepted,
        campaignId,
        campaignTrackingId,
        index,
        platform,
        post_type,
        postUrl,
      });
      dispatch(
        confirmPostDetailSlice({
          accepted,
          campaignId,
          campaignTrackingId,
          index,
          platform,
          post_type,
          postUrl,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-muted/30 rounded-lg px-3 py-1 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium capitalize flex items-center gap-2">
          {req.post_type} {contentIndex + 1}
          {req.details[contentIndex].status && (
            <Badge
              className="text-xs font-semibold"
              variant={`${req.details[contentIndex].status.toLowerCase() as keyof typeof badgeVariants}`}
            >
              {req.details[contentIndex].status}
            </Badge>
          )}
        </h4>
        <Button variant="ghost" size="sm" onClick={() => window.open(content.postUrl, '_blank')}>
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
                  <p className="flex gap-1 items-center">
                    {content[contentType] >=
                    (campaignRequirements.find(
                      (campaignReq) =>
                        campaignReq.platform === req.platform &&
                        campaignReq.post_type === req.post_type,
                    )?.details[contentIndex][contentType] ?? 0) ? (
                      <Icons.check size={16} className="text-primary stroke-3" />
                    ) : (
                      <Icons.x size={16} className="text-destructive stroke-3" />
                    )}
                    {label}(
                    {campaignRequirements.find(
                      (campaignReq) =>
                        campaignReq.platform === req.platform &&
                        campaignReq.post_type === req.post_type,
                    )?.details[contentIndex][contentType] ?? 0}
                    )
                  </p>
                  <Input value={content[contentType]} className="text-primary" />
                </div>
              );
            })}
          </div>
          {(content.status === 'PENDING' || !content.status) && (
            <div className="flex justify-end gap-4">
              <Button
                variant={'destructive'}
                size={'sm'}
                onClick={() => {
                  setAccepted(false);
                  handleConfirmPostDetail({
                    accepted: false,
                    campaignId: campaignId,
                    campaignTrackingId: campaignTrackingId,
                    platform: req.platform,
                    post_type: content.post_type,
                    index: contentIndex,
                    postUrl: content.postUrl,
                  });
                }}
              >
                {isLoading && !accepted ? (
                  <>
                    <Icons.loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Từ chối
                  </>
                ) : (
                  'Từ chối'
                )}
              </Button>
              <Button
                variant={'default'}
                size={'sm'}
                onClick={() => {
                  setAccepted(true);
                  handleConfirmPostDetail({
                    accepted: true,
                    campaignId: campaignId,
                    campaignTrackingId: campaignTrackingId,
                    platform: req.platform,
                    post_type: content.post_type,
                    index: contentIndex,
                    postUrl: content.postUrl,
                  });
                }}
              >
                {isLoading && accepted ? (
                  <>
                    <Icons.loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Chấp nhận
                  </>
                ) : (
                  'Chấp nhận'
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
