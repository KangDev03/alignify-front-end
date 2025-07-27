import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
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
} from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input';

import { Icons } from '@/components/icons/icons';
import {
  applicationFormSchema,
  type ApplicationFormValues,
} from '@/features/application/application.schema';
import type { Campaign } from '@/features/common/common.type';
import { applyForApplciation } from '@/features/home/home.slice';
import type { NotificationSending } from '@/features/notification/notification.type';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { cn } from '@/lib/utils';
import type { RootState } from '@/redux/store';
import { zodResolver } from '@hookform/resolvers/zod';

import { useApplyCampaignMutation } from '../../campaign.service';
import CampaignDetail from '../campaign-detail';

interface HomeCampaignDialogProps {
  campaign: Campaign;
  sendNotification: (notification: NotificationSending) => void;
}
export default function HomeCampaignDialog({
  campaign,
  sendNotification,
}: HomeCampaignDialogProps) {
  const dispatch = useAppDispatch();
  const { role: userRole, id, name, avatarUrl } = useAppSelector((state: RootState) => state.auth);
  const [applyCampaign, { isLoading: isApplying }] = useApplyCampaignMutation();
  const isApplied = campaign.appliedInfluencerIds?.includes(id!);

  const form = useForm<ApplicationFormValues>({
    mode: 'all',
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      cv: undefined,
    },
  });
  const handleApplyCampaign = async (values: ApplicationFormValues) => {
    try {
      const cv = new FormData();
      cv.append('file', values.cv);
      await applyCampaign({ campaignId: campaign.campaignId, CV: cv }).unwrap();
      sendNotification({
        userId: campaign.brandId,
        content: `${name!} đã ứng tuyển\n${campaign?.campaignName}`,
        avatarUrl: avatarUrl!,
        name: campaign.brandName!,
      });
      sendNotification({
        userId: id!,
        content: `Ứng tuyển thành công\n${campaign?.campaignName}`,
        avatarUrl: avatarUrl!,
        name: name!,
      });
      dispatch(applyForApplciation({ campaignId: campaign.campaignId, influencerId: id! }));
      toast.success('Ứng tuyển thành công.');
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error('Ứng tuyển thất bại. Vui lòng thử lại sau.');
    }
  };
  return (
    <div className={cn('w-full', userRole === 'INFLUENCER' && 'w-full grid grid-cols-2 gap-2')}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center w-full bg-transparent">
            <Icons.eye className="h-4 w-4 mr-2" />
            Xem chi tiết
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] h-[85%] gap-0 p-0 pb-4" showCloseButton={false}>
          <DialogHeader className="border-b-2 border-border p-0 m-0 py-3">
            <DialogTitle className="font-semibold text-xl text-center">
              Chiến dịch của {campaign.brandName}
            </DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
          </DialogHeader>
          <CampaignDetail key={campaign.campaignId} campaign={campaign} />
        </DialogContent>
      </Dialog>
      {userRole === 'INFLUENCER' &&
        (isApplied ? (
          <Button variant="default" size="sm" className="flex-1" disabled>
            Đã ứng tuyển
          </Button>
        ) : (
          <Dialog>
            <DialogTrigger className="flex-1">
              <Button variant="default" size="sm" className="w-full">
                Ứng tuyển
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] flex flex-col gap-4">
              <DialogHeader>
                <DialogTitle>Bạn có chắc chắn muốn ứng tuyển vào chiến dịch không ?</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleApplyCampaign)}>
                  <FormField
                    control={form.control}
                    name="cv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tải lên CV hoặc Portfolio của bạn</FormLabel>
                        <FormControl>
                          <div>
                            <Input
                              id="poster-upload"
                              type="file"
                              accept="image/jpeg,image/png,image/jpg"
                              style={{ display: 'none' }}
                              onChange={(e) =>
                                field.onChange(e.target.files?.[0] ?? field.value ?? undefined)
                              }
                              ref={field.ref}
                            />
                            <div className="flex flex-col gap-2">
                              <div className="flex gap-2 items-center">
                                <Button
                                  type="button"
                                  onClick={() => document.getElementById('poster-upload')?.click()}
                                  variant="outline"
                                  size="sm"
                                >
                                  <Icons.fileImage />
                                  <span>Chọn ảnh</span>
                                </Button>
                                <span className="text-sm">hoặc</span>
                                <Button
                                  type="button"
                                  onClick={() => document.getElementById('poster-upload')?.click()}
                                  variant="outline"
                                  size="sm"
                                >
                                  <Icons.fileImage />
                                  <span>Sử dụng của bạn</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                        {field.value && (
                          <div className="flex gap-4 justify-end">
                            <Button
                              type="button"
                              variant="secondary"
                              size="sm"
                              onClick={() =>
                                window.open(URL.createObjectURL(field.value), '_blank')
                              }
                            >
                              <Icons.eye />
                              <span>Xem trước</span>
                            </Button>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => field.onChange(undefined)}
                            >
                              <Icons.trash />
                              <span>Xóa ảnh</span>
                            </Button>
                          </div>
                        )}
                      </FormItem>
                    )}
                  />
                  <Button type="submit" variant="default" size="sm" className="flex-1 mt-2">
                    {isApplying ? (
                      <>
                        <Icons.loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Đang ứng tuyển
                      </>
                    ) : (
                      'Ứng tuyển'
                    )}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        ))}
    </div>
  );
}
