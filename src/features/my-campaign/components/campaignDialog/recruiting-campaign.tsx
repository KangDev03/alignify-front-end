import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
import type { Campaign } from '@/features/common/common.type';
import type { NotificationSending } from '@/features/notification/notification.type';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type { RootState } from '@/redux/store';
import { zodResolver } from '@hookform/resolvers/zod';

import ConfirmMoveDraftDialog from './confirm-dialog';
import { contractFormSchema, type ContractFormValues } from '../../campaign.schema';
import { useChangeStatusMutation, useUpdateContractMutation } from '../../campaign.service';
import { changeCampaignStatus, updateContractSlice } from '../../campaign.slice';
import { sendNotificationForAll } from '../campaign-card';
import CampaignDetail from '../campaign-detail';

interface RecruitingCampaignDialogProps {
  campaign: Campaign;
  sendNotification: (notification: NotificationSending) => void;
}
export default function RecruitingCampaignDialog({
  campaign,
  sendNotification,
}: RecruitingCampaignDialogProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { role: userRole, id, name, avatarUrl } = useAppSelector((state: RootState) => state.auth);
  const [changeStatus] = useChangeStatusMutation();
  const [updateContract, { isLoading: isContractUpdating }] = useUpdateContractMutation();
  const contractForm = useForm<ContractFormValues>({
    mode: 'all',
    resolver: zodResolver(contractFormSchema),
    defaultValues: {
      contract: undefined,
    },
  });
  const handleUpdateContract = async (values: ContractFormValues) => {
    try {
      const contract = new FormData();
      contract.append('file', values.contract);
      await updateContract({ campaignId: campaign.campaignId, contract: contract }).unwrap();
      dispatch(
        updateContractSlice({
          campaignId: campaign.campaignId,
          contractUrl: URL.createObjectURL(values.contract),
        }),
      );
      toast.success(t("campaignCard.updateSuccess"));
      contractForm.reset();
    } catch (error) {
      console.error(error);
      toast.error(t("campaignCard.failedPhaseChange"));
    }
  };
  const handleMoveToDraft = async () => {
    try {
      await changeStatus({ campaignId: campaign.campaignId, newStatus: 'DRAFT' }).unwrap();
      sendNotificationForAll(
        campaign.appliedInfluencerIds ?? [],
        `${t("campaignCard.deletedCampaign")}\n${campaign?.campaignName}`,
        name!,
        avatarUrl!,
        sendNotification,
      );
      sendNotification({
        userId: id!,
        content: `${t("campaignCard.draftCampaign")}\n${campaign?.campaignName}`,
        name: name!,
        avatarUrl: avatarUrl!,
      });

      dispatch(changeCampaignStatus({ campaignId: campaign.campaignId, status: 'DRAFT' }));
    } catch (error) {
      console.error(error);
      toast.error(t("campaignCard.failedPhaseChange"));
    }
  };
  const handleEndRecuit = async () => {
    try {
      await changeStatus({ campaignId: campaign.campaignId, newStatus: 'PENDING' }).unwrap();
      sendNotificationForAll(
        campaign.appliedInfluencerIds ?? [],
        `${t("campaignCard.endRecruitment")}\n${campaign?.campaignName}`,
        name!,
        avatarUrl!,
        sendNotification,
      );
      sendNotification({
        userId: id!,
        content: `${t("campaignCard.youEndRecruitment")}\n${campaign?.campaignName}`,
        name: name!,
        avatarUrl: avatarUrl!,
      });

      dispatch(changeCampaignStatus({ campaignId: campaign.campaignId, status: 'PENDING' }));
      toast.success(t("campaignCard.endRecruitmentSuccess"));
    } catch (_error) {
      toast.error(t("campaignCard.failedPhaseChange"));
    }
  };
  return (
    <div className="w-full grid grid-cols-2 gap-2">
      {userRole === 'INFLUENCER' && campaign.contractUrl ? (
        <Button
          variant="outline"
          size="sm"
          type="button"
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
                  (campaign.contractUrl.endsWith('.pdf') ? '.pdf' : '');
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
              } catch {
                toast.error('Không thể tải file CV. Vui lòng thử lại sau.');
              }
            }
            window.open(campaign.contractUrl, '_blank');
          }}
        >
          <Icons.fileText className="h-4 w-4 mr-1" />
          {t("campaignCard.contract")}
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Icons.fileText className="h-4 w-4 mr-1" />
              {t("campaignCard.contract")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] " showCloseButton={false}>
            <DialogHeader>
              <DialogTitle className="font-semibold text-xl text-center">
                {t("campaignCard.campaignPostBy")} {campaign.brandName}
              </DialogTitle>
            </DialogHeader>
            <Form {...contractForm}>
              <form onSubmit={contractForm.handleSubmit(handleUpdateContract)}>
                <FormField
                  control={contractForm.control}
                  name="contract"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> {t("campaignCard.uploadContract")}</FormLabel>
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
                                <span>{t("campaignCard.choseContractButton")}</span>
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
                            <span>{t("campaignCard.viewContract")}</span>
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => field.onChange(undefined)}
                          >
                            <Icons.trash />
                            <span>{t("campaignCard.deleteContract")}</span>
                          </Button>
                        </div>
                      )}
                    </FormItem>
                  )}
                />
                <Button type="submit" variant="default" size="sm" className="flex-1 mt-2">
                  {isContractUpdating ? (
                    <>
                      <Icons.loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("campaignCard.uploading")}
                    </>
                  ) : (
                    t("campaignCard.upload")
                  )}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
      {userRole === 'BRAND' && (
        <ConfirmMoveDraftDialog campaign={campaign} handleMoveToDraft={handleMoveToDraft} />
      )}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center w-full bg-transparent">
            <Icons.eye className="h-4 w-4 mr-2" />
            {t("campaignCard.viewCampaignDetails")}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] h-[85%] gap-0 p-0 pb-4" showCloseButton={false}>
          <DialogHeader className="h-fit border-b-2 border-border p-0 m-0 py-3">
            <DialogTitle className="font-semibold text-xl text-center">
              {t("campaignCard.campaignPostBy")} {campaign.brandName}
            </DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
          </DialogHeader>
          <CampaignDetail key={campaign.campaignId} campaign={campaign} />
        </DialogContent>
      </Dialog>
      {userRole === 'BRAND' && (
        <Button variant="default" size="sm" className="" onClick={handleEndRecuit}>
          <Icons.play className="h-4 w-4 mr-1" />
          {t("campaignCard.endRecruitmentButton")}
        </Button>
      )}
    </div>
  );
}
