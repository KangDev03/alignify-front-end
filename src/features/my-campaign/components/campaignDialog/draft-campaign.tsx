import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
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
import type { NotificationSending } from '@/features/notification/notification.type';
import CampaignPopUp from '@/features/posting/components/popUp-campaign';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type { RootState } from '@/redux/store';
import { zodResolver } from '@hookform/resolvers/zod';

import { contractFormSchema, type ContractFormValues } from '../../campaign.schema';
import { useUploadContractMutation } from '../../campaign.service';
import { changeCampaignStatus, updateContractSlice } from '../../campaign.slice';

interface DraftDialogProps {
  campaign: Campaign;
  sendNotification: (notification: NotificationSending) => void;
}
export default function DraftCampaignDialog({ campaign, sendNotification }: DraftDialogProps) {
  const dispatch = useAppDispatch();
  const { id, name, avatarUrl } = useAppSelector((state: RootState) => state.auth);

  const [uploadContract, { isLoading: isUploading }] = useUploadContractMutation();
  const contractForm = useForm<ContractFormValues>({
    mode: 'all',
    resolver: zodResolver(contractFormSchema),
    defaultValues: {
      contract: undefined,
    },
  });
  const handleStartRecruit = async (values: ContractFormValues) => {
    try {
      const contract = new FormData();
      contract.append('file', values.contract);
      await uploadContract({ campaignId: campaign.campaignId, contract: contract }).unwrap();
      // useSendNotification({
      //   userId: id!,
      //   content: `${campaign?.campaignName} bắt đầu tuyển dụng`,
      //   name: name!,
      //   avatarUrl: avatarUrl!,
      // });
      sendNotification({
        userId: id!,
        content: `${campaign?.campaignName} bắt đầu tuyển dụng`,
        name: name!,
        avatarUrl: avatarUrl!,
      });
      dispatch(changeCampaignStatus({ campaignId: campaign.campaignId, status: 'RECRUITING' }));
      dispatch(
        updateContractSlice({
          campaignId: campaign.campaignId,
          contractUrl: URL.createObjectURL(values.contract),
        }),
      );
      toast.success('Chiến dịch bắt đầu tuyển!');
      contractForm.reset();
    } catch (error) {
      console.error(error);
      toast.error('Chuyển giai đoạn thất bại!');
    }
  };
  return (
    <div className="w-full grid grid-cols-2 gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Icons.edit className="h-4 w-4 mr-1" />
            Chỉnh sửa
          </Button>
        </DialogTrigger>
        <CampaignPopUp campaignData={campaign} />
      </Dialog>

      <Dialog>
        <DialogTrigger className="flex-1">
          <Button
            variant="default"
            size="sm"
            className="flex-1 w-full"
            type="button"
            // onClick={handleStartRecruit}
          >
            <Icons.play className="h-4 w-4 mr-1" />
            Đăng tuyển
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Bạn có chắc chắn muốn ứng tuyển vào chiến dịch không ?</DialogTitle>
          </DialogHeader>
          <Form {...contractForm}>
            <form onSubmit={contractForm.handleSubmit(handleStartRecruit)}>
              <FormField
                control={contractForm.control}
                name="contract"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tải lên hợp đồng của bạn</FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          id="contract-upload"
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
                              onClick={() => document.getElementById('contract-upload')?.click()}
                              variant="outline"
                              size="sm"
                            >
                              <Icons.fileImage />
                              <span>Chọn hợp đồng</span>
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
                          onClick={() => window.open(URL.createObjectURL(field.value), '_blank')}
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
                          <span>Xóa hợp đồng</span>
                        </Button>
                      </div>
                    )}
                  </FormItem>
                )}
              />
              <Button type="submit" variant="default" size="sm" className="flex-1 mt-2">
                {isUploading ? (
                  <>
                    <Icons.loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang đăng chiến dịch
                  </>
                ) : (
                  'Đăng tuyển'
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
