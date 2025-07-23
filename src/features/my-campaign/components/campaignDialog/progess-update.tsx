import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Badge, badgeVariants } from '@/components/ui/badge';
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
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Icons } from '@/components/icons/icons';
import type { Campaign } from '@/features/common/common.type';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';

import { processUploadSchema, type ProcessUploadValues } from '../../campaign.schema';
import {
  useGetCampaignTrackingByInfluencerQuery,
  useUploadPostDetailsMutation,
} from '../../campaign.service';
import type { PostDetail } from '../../campaign.type';
import PostDetailStats from '../post-detail-stats';

interface ProgressUpdateDialogProps {
  campaign: Campaign;
}
const ProgressUpdateDialog = ({ campaign }: ProgressUpdateDialogProps) => {
  const { data: trackingRaw, isSuccess } = useGetCampaignTrackingByInfluencerQuery(
    campaign.campaignId,
  );
  const [uploadPostDetails, { isLoading }] = useUploadPostDetailsMutation();
  const tracking = trackingRaw?.data;
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const form = useForm<ProcessUploadValues>({
    mode: 'all',
    resolver: zodResolver(processUploadSchema),
    defaultValues: {
      platformRequirement: tracking?.platformRequirementTracking.map((require) => ({
        platform: require.platform,
        post_type: require.post_type,
        details: Array.from({ length: require.quantity }, (_, idx) => ({
          index: idx,
          postUrl: require.details[idx]?.postUrl ?? undefined,
          like: require.details[idx]?.like ?? 0,
          comment: require.details[idx]?.comment ?? 0,
          share: require.details[idx]?.share ?? 0,
        })),
      })),
    },
  });

  useEffect(() => {
    if (isSuccess && tracking) {
      form.reset({
        platformRequirement: tracking.platformRequirementTracking.map((require) => ({
          platform: require.platform,
          post_type: require.post_type,
          details: Array.from({ length: require.quantity }, (_, idx) => ({
            index: idx,
            postUrl: require.details[idx]?.postUrl ?? undefined,
            like: require.details[idx]?.like ?? 0,
            comment: require.details[idx]?.comment ?? 0,
            share: require.details[idx]?.share ?? 0,
            view: require.details[idx]?.view ?? 0,
          })),
        })),
      });
    }
  }, [isSuccess, tracking, form]);

  const handleUpload = async (values: ProcessUploadValues) => {
    const postDetails: PostDetail[] = values.platformRequirement.flatMap((require) =>
      require.details.map((detail) => ({
        platform: require.platform,
        index: detail.index,
        post_type: require.post_type,
        postUrl: detail.postUrl!,
        like: require.details[detail.index]?.like ?? 0,
        comment: require.details[detail.index]?.comment ?? 0,
        share: require.details[detail.index]?.share ?? 0,
        view: require.details[detail.index]?.view ?? 0,
      })),
    );
    console.log(postDetails);
    try {
      await uploadPostDetails({
        campaignId: tracking!.campaignId,
        trackingId: tracking!.campaignTrackingId,
        postDetails: postDetails,
      });
      dialogCloseRef.current?.click();
      toast.success('Gửi bài thành công!');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          <Icons.upload className="h-4 w-4 mr-2" />
          Cập nhật tiến độ
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] h-[85%] pr-3 flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icons.upload className="h-5 w-5" />
            Cập nhật tiến độ chiến dịch
          </DialogTitle>
          <DialogDescription>{campaign.campaignName}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-6 overflow-auto scrollbar-thin pr-3 flex flex-col justify-between h-full"
            onSubmit={form.handleSubmit(handleUpload)}
          >
            {tracking?.platformRequirementTracking?.map((req, reqIndex) => {
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
                      <span className="first-letter:capitalize text-white">{req.platform}</span>
                    </Badge>
                    <Badge variant="secondary" className="capitalize">
                      {req.post_type}
                    </Badge>
                    <span>•</span>
                    <span className="text-sm text-muted-foreground">{req.quantity} nội dung</span>
                  </div>

                  {Array.from({ length: req.quantity }, (_, contentIndex) => {
                    return (
                      <div
                        key={req.platform + req.post_type + reqIndex + '_' + contentIndex}
                        className="bg-muted/30 rounded-lg px-3 py-1 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium capitalize flex items-center gap-2">
                            {req.post_type} {contentIndex + 1}
                            {req.details[contentIndex] && req.details[contentIndex].status && (
                              <Badge
                                className="text-xs font-semibold"
                                variant={`${req.details[contentIndex].status.toLowerCase() as keyof typeof badgeVariants}`}
                              >
                                {req.details[contentIndex].status}
                              </Badge>
                            )}
                          </h4>
                        </div>
                        <div className="space-y-2">
                          <FormField
                            control={form.control}
                            name={`platformRequirement.${reqIndex}.details.${contentIndex}.index`}
                            render={({ field }) => (
                              <Input type="hidden" {...field} value={contentIndex} />
                            )}
                          />
                          <PostDetailStats
                            form={form}
                            req={req}
                            reqIndex={reqIndex}
                            contentIndex={contentIndex}
                            key={`${req.platform}.${req.post_type}.${reqIndex}.details.${contentIndex}.index`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
            <div className="flex justify-end gap-2 ">
              <DialogClose ref={dialogCloseRef}>
                <Button variant="outline" type="button">
                  Hủy
                </Button>
              </DialogClose>
              <Button type="submit" disabled={!form.formState.isDirty || isLoading}>
                {isLoading ? (
                  <>
                    <Icons.loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang gửi bài
                  </>
                ) : (
                  'Gửi bài'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProgressUpdateDialog;
