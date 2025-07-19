import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Icons } from '@/components/icons/icons';
import type { Campaign } from '@/features/common/common.type';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';

import { processUploadSchema, type ProcessUploadValues } from '../../campaign.schema';
import {
  useGetCampaignTrackingByIdQuery,
  useUploadPostDetailsMutation,
} from '../../campaign.service';
import type { PostDetail } from '../../campaign.type';

interface ProgressUpdateDialogProps {
  campaign: Campaign;
}
const ProgressUpdateDialog = ({ campaign }: ProgressUpdateDialogProps) => {
  const { data: trackingRaw, isSuccess } = useGetCampaignTrackingByIdQuery(campaign.campaignId);
  const [uploadPostDetails, { isLoading }] = useUploadPostDetailsMutation();
  const tracking = trackingRaw?.data;
  console.log(tracking);

  const form = useForm<ProcessUploadValues>({
    mode: 'onSubmit',
    resolver: zodResolver(processUploadSchema),
    defaultValues: {
      platformRequirement: tracking?.platformRequirementTracking.map((require) => ({
        platform: require.platform,
        post_type: require.post_type,
        details: Array.from({ length: require.quantity }, (_, idx) => ({
          index: idx,
          postUrl: require.details[idx]?.postUrl ?? undefined,
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
          })),
        })),
      });
    }
  }, [isSuccess, tracking, form]);

  const handleUpload = async (values: ProcessUploadValues) => {
    console.log(values.platformRequirement);
    const postDetails: PostDetail[] = values.platformRequirement.flatMap((require) =>
      require.details
        .filter((detail) => !!detail.postUrl)
        .map((detail) => ({
          platform: require.platform,
          index: detail.index,
          post_type: require.post_type,
          postUrl: detail.postUrl!,
        })),
    );
    try {
      await uploadPostDetails({
        campaignId: tracking!.campaignId,
        trackingId: tracking!.campaignTrackingId,
        postDetails: postDetails,
      });
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
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icons.upload className="h-5 w-5" />
            Cập nhật tiến độ chiến dịch
          </DialogTitle>
          <DialogDescription>{campaign.campaignName}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-6 scrollbar-thin" onSubmit={form.handleSubmit(handleUpload)}>
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
                          <h4 className="font-medium capitalize">
                            {req.post_type} {contentIndex + 1}
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
                          <FormField
                            control={form.control}
                            name={`platformRequirement.${reqIndex}.details.${contentIndex}.postUrl`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Liên kết *</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder={`https://www.${req.platform.toLowerCase()}.com/${req.post_type}/..`}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
            <div className="flex justify-end gap-2 pt-4">
              <DialogClose asChild>
                <Button variant="outline">Hủy</Button>
              </DialogClose>
              <Button type="submit">
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
