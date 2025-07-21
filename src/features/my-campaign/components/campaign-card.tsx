import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
} from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Progress } from '@/components/ui/progress.tsx';

import { Icons } from '@/components/icons/icons.tsx';
import {
  applicationFormSchema,
  type ApplicationFormValues,
} from '@/features/application/application.schema.ts';
import type { Campaign, RoleName } from '@/features/common/common.type.ts';
import { applyForApplciation } from '@/features/home/home.slice.ts';
import {
  useApplyCampaignMutation,
  useChangeStatusMutation,
  useUpdateContractMutation,
  useUploadContractMutation,
} from '@/features/my-campaign/campaign.service.ts';
import CampaignPopUp from '@/features/posting/components/popUp-campaign.tsx';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.ts';
import { useSendNotification } from '@/hooks/useSendNotification.ts';
import type { RootState } from '@/redux/store.ts';
import { formatDate } from '@/utils/format.ts';
import { zodResolver } from '@hookform/resolvers/zod';

import CampaignDetail from './campaign-detail.tsx';
import HotCampaignBadge from './HotCampaignBadge.tsx';
import { StatusBadge } from './status-badge.tsx';
import { contractFormSchema, type ContractFormValues } from '../campaign.schema.ts';
import { changeCampaignStatus, updateContractSlice } from '../campaign.slice.ts';

const mockProgressData = {
  'campaign-1': [
    {
      id: '1',
      influencerId: 'inf-1',
      influencerName: 'Nguyễn Văn A',
      influencerAvatar: '/placeholder.svg',
      platform: 'TIKTOK',
      postType: 'video',
      contentIndex: 1,
      link: 'https://tiktok.com/@user/video/123',
      description: 'Video giới thiệu sản phẩm theo yêu cầu',
      status: 'approved',
      submittedAt: '2024-01-15T10:30:00Z',
      approvedAt: '2024-01-15T14:20:00Z',
    },
    {
      id: '2',
      influencerId: 'inf-1',
      influencerName: 'Nguyễn Văn A',
      influencerAvatar: '/placeholder.svg',
      platform: 'INSTAGRAM',
      postType: 'post',
      contentIndex: 1,
      link: 'https://instagram.com/p/ABC123',
      description: 'Post Instagram với hashtag theo yêu cầu',
      status: 'pending',
      submittedAt: '2024-01-16T09:15:00Z',
    },
  ],
};

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  const dispatch = useAppDispatch();
  const { role, id, name, avatarUrl } = useAppSelector((state: RootState) => state.auth);
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [progressUpdates, setProgressUpdates] = useState<Record<string, string>>({});
  const [progressDescriptions, setProgressDescriptions] = useState<Record<string, string>>({});
  const location = useLocation();
  const currentPath = location.pathname;
  const userRole: RoleName = role!;
  const sendNotification = useSendNotification();
  const isApplied = campaign.appliedInfluencerIds?.includes(id!);
  const [applyCampaign, { isLoading: isApplying }] = useApplyCampaignMutation();
  const [changeStatus] = useChangeStatusMutation();
  const [uploadContract, { isLoading: isUploading }] = useUploadContractMutation();
  const [updateContract, { isLoading: isContractUpdating }] = useUpdateContractMutation();
  const isHotCampaign =
    (campaign.applicationTotal || campaign.appliedInfluencerIds?.length || 0) > 10;

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

  const sendNotificationForAll = (
    influencerIds: string[],
    notification: string,
    name: string,
    avatarUrl: string,
  ) => {
    influencerIds.forEach((influencerId) => {
      sendNotification({
        userId: influencerId!,
        content: notification,
        name: name,
        avatarUrl: avatarUrl,
      });
    });
  };
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
      toast.success('Tải lên thành công!');
      contractForm.reset();
    } catch (error) {
      console.error(error);
      toast.error('Chuyển giai đoạn thất bại!');
    }
  };

  const handleMoveToDraft = async () => {
    try {
      await changeStatus({ campaignId: campaign.campaignId, newStatus: 'DRAFT' }).unwrap();
      sendNotificationForAll(
        campaign.appliedInfluencerIds ?? [],
        `Đã xóa chiến dịch\n${campaign?.campaignName}`,
        name!,
        avatarUrl!,
      );
      sendNotification({
        userId: id!,
        content: `Chiến dịch đã về dạng nháp\n${campaign?.campaignName}`,
        name: name!,
        avatarUrl: avatarUrl!,
      });

      dispatch(changeCampaignStatus({ campaignId: campaign.campaignId, status: 'DRAFT' }));
    } catch (error) {
      console.error(error);
      toast.error('Chuyển giai đoạn thất bại!');
    }
  };

  const handleEndRecuit = async () => {
    try {
      await changeStatus({ campaignId: campaign.campaignId, newStatus: 'PENDING' }).unwrap();
      sendNotificationForAll(
        campaign.appliedInfluencerIds ?? [],
        `Đã kết thúc tuyển chiến dịch\n${campaign?.campaignName}`,
        name!,
        avatarUrl!,
      );
      sendNotification({
        userId: id!,
        content: `Bạn đã kết thúc tuyển chiến dịch\n${campaign?.campaignName}`,
        name: name!,
        avatarUrl: avatarUrl!,
      });

      dispatch(changeCampaignStatus({ campaignId: campaign.campaignId, status: 'PENDING' }));
      toast.success('Kết thúc tuyển thành công!');
    } catch (error) {
      console.error(error);
      toast.error('Chuyển giai đoạn thất bại!');
    }
  };

  const handleStartCampaign = async () => {
    try {
      await changeStatus({ campaignId: campaign.campaignId, newStatus: 'PARTICIPATING' }).unwrap();
      sendNotificationForAll(
        campaign.appliedInfluencerIds ?? [],
        `Đã bắt đầu chiến dịch\n${campaign?.campaignName}`,
        name!,
        avatarUrl!,
      );
      sendNotification({
        userId: id!,
        content: `Bạn đã bắt đầu chiến dịch\n${campaign?.campaignName}`,
        name: name!,
        avatarUrl: avatarUrl!,
      });
      dispatch(changeCampaignStatus({ campaignId: campaign.campaignId, status: 'PARTICIPATING' }));
      toast.success('Chiến dịch đã bắt đầu!');
    } catch (error) {
      console.error(error);
      toast.error('Chuyển giai đoạn thất bại!');
    }
  };

  const handleEndCampaign = async () => {
    try {
      await changeStatus({ campaignId: campaign.campaignId, newStatus: 'COMPLETED' }).unwrap();
      sendNotificationForAll(
        campaign.appliedInfluencerIds ?? [],
        `Đã hoàn thành chiến dịch\n${campaign?.campaignName}`,
        name!,
        avatarUrl!,
      );
      sendNotification({
        userId: id!,
        content: `Bạn đã kết thúc chiến dịch\n${campaign?.campaignName}`,
        name: name!,
        avatarUrl: avatarUrl!,
      });
      setTimeout(() => {
        sendNotificationForAll(
          campaign.appliedInfluencerIds ?? [],
          `Đã hoàn thành chiến dịch\n${campaign?.campaignName}`,
          '',
          '',
        );
      }, 1000 * 60);
      dispatch(changeCampaignStatus({ campaignId: campaign.campaignId, status: 'COMPLETED' }));
      toast.success('Chiến dịch đã kết thúc!');
    } catch (error) {
      console.error(error);
      toast.error('Chuyển giai đoạn thất bại!');
    }
  };

  const handleSubmitProgress = () => {
    console.log('Progress updates:', progressUpdates);
    console.log('Progress descriptions:', progressDescriptions);

    sendNotification({
      userId: campaign.brandId,
      content: `${name!} đã cập nhật tiến độ cho chiến dịch\n${campaign?.campaignName}`,
      avatarUrl: avatarUrl!,
      name: name!,
    });

    toast.success('Cập nhật tiến độ thành công!');
    setOpenDialog(null);
    setProgressUpdates({});
    setProgressDescriptions({});
  };

  const handleApproveProgress = (progressId: string) => {
    console.log(`Approving progress with ID: ${progressId}`);
    toast.success('Đã duyệt nội dung!');
  };

  const handleRejectProgress = (progressId: string) => {
    console.log(`Rejecting progress with ID: ${progressId}`);
    toast.success('Đã từ chối nội dung!');
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Đã duyệt';
      case 'pending':
        return 'Chờ duyệt';
      case 'rejected':
        return 'Từ chối';
      default:
        return 'Chưa xác định';
    }
  };

  const renderProgressUpdateDialog = () => (
    <Dialog
      open={openDialog === `progress-${campaign.campaignId}`}
      onOpenChange={(open) => setOpenDialog(open ? `progress-${campaign.campaignId}` : null)}
    >
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

        <div className="space-y-6">
          {campaign.campaignRequirements?.map((req, reqIndex) => (
            <div key={reqIndex} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="capitalize">
                  {req.platform.toLowerCase()}
                </Badge>
                <Badge variant="secondary" className="capitalize">
                  {req.post_type}
                </Badge>
                <span className="text-sm text-muted-foreground">{req.quantity} nội dung</span>
              </div>

              {Array.from({ length: req.quantity }, (_, contentIndex) => {
                const key = `${reqIndex}-${contentIndex}`;
                const detail = req.details[contentIndex];

                return (
                  <div key={contentIndex} className="bg-muted/30 rounded-lg px-3 py-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Nội dung {contentIndex + 1}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {detail?.like > 0 && (
                          <div className="flex items-center gap-1">
                            <Icons.heart className="h-4 w-4 text-red-500" />
                            <span>{detail.like}+ likes</span>
                          </div>
                        )}
                        {detail?.comment > 0 && (
                          <div className="flex items-center gap-1">
                            <Icons.messageCircle className="h-4 w-4 text-blue-500" />
                            <span>{detail.comment}+ comments</span>
                          </div>
                        )}
                        {detail?.share > 0 && (
                          <div className="flex items-center gap-1">
                            <Icons.share2 className="h-4 w-4 text-green-500" />
                            <span>{detail.share}+ shares</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`link-${key}`}>Link nội dung *</Label>
                      <Input
                        id={`link-${key}`}
                        placeholder="https://..."
                        value={progressUpdates[key] || ''}
                        onChange={(e) =>
                          setProgressUpdates((prev) => ({ ...prev, [key]: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <DialogClose asChild>
            <Button variant="outline">Hủy</Button>
          </DialogClose>
          <Button onClick={handleSubmitProgress}>
            <Icons.send className="h-4 w-4 mr-2" />
            Gửi cập nhật
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const renderViewProgressDialog = () => {
    const campaignProgress =
      mockProgressData[campaign.campaignId as keyof typeof mockProgressData] || [];
    const totalRequirements =
      campaign.campaignRequirements?.reduce((sum, req) => sum + req.quantity, 0) || 0;
    const completedCount = campaignProgress.filter((p) => p.status === 'approved').length;
    const progressPercentage =
      totalRequirements > 0 ? (completedCount / totalRequirements) * 100 : 0;

    return (
      <Dialog
        open={openDialog === `view-progress-${campaign.campaignId}`}
        onOpenChange={(open) => setOpenDialog(open ? `view-progress-${campaign.campaignId}` : null)}
      >
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
            {/* Overall Progress */}
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

            {/* Individual Progress */}
            <div className="space-y-4">
              <h3 className="font-medium">Chi tiết tiến độ</h3>

              {campaignProgress.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Icons.inbox className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Chưa có cập nhật tiến độ nào</p>
                </div>
              ) : (
                campaignProgress.map((progress) => (
                  <div key={progress.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={progress.influencerAvatar || '/placeholder.svg'} />
                          <AvatarFallback>{progress.influencerName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{progress.influencerName}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="capitalize">
                              {progress.platform.toLowerCase()}
                            </Badge>
                            <Badge variant="secondary" className="capitalize">
                              {progress.postType}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              Nội dung {progress.contentIndex}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={getStatusBadgeVariant(progress.status)}>
                        {getStatusText(progress.status)}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Icons.link className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={progress.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          {progress.link}
                        </a>
                        <Icons.externalLink className="h-3 w-3 text-muted-foreground" />
                      </div>

                      {progress.description && (
                        <p className="text-sm text-muted-foreground pl-6">{progress.description}</p>
                      )}

                      <div className="flex items-center justify-between pl-6">
                        <span className="text-xs text-muted-foreground">
                          Gửi lúc: {new Date(progress.submittedAt).toLocaleString('vi-VN')}
                        </span>

                        {progress.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleApproveProgress(progress.id)}
                            >
                              <Icons.check className="h-4 w-4 mr-1" />
                              Duyệt
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRejectProgress(progress.id)}
                            >
                              <Icons.x className="h-4 w-4 mr-1" />
                              Từ chối
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
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

  const form = useForm<ApplicationFormValues>({
    mode: 'all',
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      cv: undefined,
    },
  });

  const renderDialogButton = () => {
    const commonProps = {
      open: openDialog === campaign.campaignId,
      onOpenChange: (open: boolean) => setOpenDialog(open ? campaign.campaignId : null),
    };

    switch (campaign.status.toUpperCase()) {
      case 'DRAFT':
        return (
          <div className="w-full grid grid-cols-2 gap-2">
            <Dialog {...commonProps}>
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
                                    onClick={() =>
                                      document.getElementById('contract-upload')?.click()
                                    }
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
      case 'RECRUITING':
        if (currentPath === '/home') {
          return userRole === 'BRAND' ? (
            <Dialog {...commonProps}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center w-full bg-transparent"
                >
                  <Icons.eye className="h-4 w-4 mr-2" />
                  Xem chi tiết
                </Button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[600px] h-[85%] gap-0 p-0 pb-4"
                showCloseButton={false}
              >
                <DialogHeader className="border-b-2 border-border p-0 m-0 py-3">
                  <DialogTitle className="font-semibold text-xl text-center">
                    Chiến dịch của {campaign.brandName}
                  </DialogTitle>
                  <DialogDescription className="hidden"></DialogDescription>
                </DialogHeader>
                <CampaignDetail key={campaign.campaignId} campaign={campaign} />
              </DialogContent>
            </Dialog>
          ) : (
            <div className="w-full grid grid-cols-2 gap-2">
              <Dialog {...commonProps}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center w-full bg-transparent"
                  >
                    <Icons.eye className="h-4 w-4 mr-2" />
                    Xem chi tiết
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className="sm:max-w-[600px] h-[85%] gap-0 p-0 pb-4"
                  showCloseButton={false}
                >
                  <DialogHeader className="border-b-2 border-border p-0 m-0 py-3">
                    <DialogTitle className="font-semibold text-xl text-center">
                      Chiến dịch của {campaign.brandName}
                    </DialogTitle>
                    <DialogDescription className="hidden"></DialogDescription>
                  </DialogHeader>
                  <CampaignDetail key={campaign.campaignId} campaign={campaign} />
                </DialogContent>
              </Dialog>
              {isApplied ? (
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
                      <DialogTitle>
                        Bạn có chắc chắn muốn ứng tuyển vào chiến dịch không ?
                      </DialogTitle>
                      {/* <DialogDescription></DialogDescription> */}
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
                                      field.onChange(
                                        e.target.files?.[0] ?? field.value ?? undefined,
                                      )
                                    }
                                    ref={field.ref}
                                  />
                                  <div className="flex flex-col gap-2">
                                    <div className="flex gap-2 items-center">
                                      <Button
                                        type="button"
                                        onClick={() =>
                                          document.getElementById('poster-upload')?.click()
                                        }
                                        variant="outline"
                                        size="sm"
                                      >
                                        <Icons.fileImage />
                                        <span>Chọn ảnh</span>
                                      </Button>
                                      <span className="text-sm">hoặc</span>
                                      <Button
                                        type="button"
                                        onClick={() =>
                                          document.getElementById('poster-upload')?.click()
                                        }
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
              )}
            </div>
          );
        }
        return userRole === 'BRAND' ? (
          <div className="w-full grid grid-cols-2 gap-2">
            {campaign.contractUrl ? (
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => window.open(campaign.contractUrl, '_blank')}
              >
                <Icons.fileText className="h-4 w-4 mr-1" />
                Hợp đồng
              </Button>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Icons.fileText className="h-4 w-4 mr-1" />
                    Hợp đồng
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] " showCloseButton={false}>
                  <DialogHeader>
                    <DialogTitle className="font-semibold text-xl text-center">
                      Chiến dịch của {campaign.brandName}
                    </DialogTitle>
                  </DialogHeader>
                  <Form {...contractForm}>
                    <form onSubmit={contractForm.handleSubmit(handleUpdateContract)}>
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
                                      onClick={() =>
                                        document.getElementById('contract-upload')?.click()
                                      }
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
                                  <span>Xóa hợp đồng</span>
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
                            Đang tải
                          </>
                        ) : (
                          'Tải lên'
                        )}
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Icons.edit className="h-4 w-4 mr-1" />
                  Chỉnh sửa
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] " showCloseButton={false}>
                <DialogHeader className="border-b-2 border-border py-3">
                  <DialogTitle className="font-semibold text-xl text-center">
                    Chiến dịch của {campaign.brandName}
                  </DialogTitle>
                  <DialogDescription>
                    Bạn có chắc chắn muốn chỉnh sửa chiến dịch không? Hành động này sẽ đưa chiến
                    dịch của bạn về trạng thái nháp. Mọi đơn ứng tuyển và lời mời sẽ bị xóa. Hãy đảm
                    bảo rằng chính bạn là người thực hiện!
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-between">
                  <DialogClose>
                    <Button variant={'destructive'}>Hủy</Button>
                  </DialogClose>
                  <Button variant={'default'} onClick={handleMoveToDraft}>
                    Xác nhận
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center w-full bg-transparent"
                >
                  <Icons.eye className="h-4 w-4 mr-2" />
                  Xem chi tiết
                </Button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[600px] h-[85%] gap-0 p-0 pb-4"
                showCloseButton={false}
              >
                <DialogHeader className="h-fit border-b-2 border-border p-0 m-0 py-3">
                  <DialogTitle className="font-semibold text-xl text-center">
                    Chiến dịch của {campaign.brandName}
                  </DialogTitle>
                  <DialogDescription className="hidden"></DialogDescription>
                </DialogHeader>
                <CampaignDetail key={campaign.campaignId} campaign={campaign} />
              </DialogContent>
            </Dialog>
            <Button variant="default" size="sm" className="" onClick={handleEndRecuit}>
              <Icons.play className="h-4 w-4 mr-1" />
              Kết thúc tuyển
            </Button>
          </div>
        ) : (
          userRole == 'INFLUENCER' && (
            <Dialog {...commonProps}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center w-full bg-transparent"
                >
                  <Icons.eye className="h-4 w-full" />
                  Xem chi tiết
                </Button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[600px] h-[85%] gap-0 p-0 pb-4"
                showCloseButton={false}
              >
                <DialogHeader className="h-fit border-b-2 border-border p-0 m-0 py-3">
                  <DialogTitle className="font-semibold text-xl text-center">
                    Chiến dịch của {campaign.brandName}
                  </DialogTitle>
                  <DialogDescription className="hidden"></DialogDescription>
                </DialogHeader>
                <CampaignDetail key={campaign.campaignId} campaign={campaign} />
              </DialogContent>
            </Dialog>
          )
        );
      case 'PENDING':
        return userRole === 'BRAND' ? (
          <div className="w-full grid grid-cols-2 gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center w-full bg-transparent"
                >
                  <Icons.eye className="h-4 w-4 mr-2" />
                  Xem chi tiết
                </Button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[600px] h-[85%] gap-0 p-0 pb-4"
                showCloseButton={false}
              >
                <DialogHeader className="h-fit border-b-2 border-border p-0 m-0 py-3">
                  <DialogTitle className="font-semibold text-xl text-center">
                    Chiến dịch của {campaign.brandName}
                  </DialogTitle>
                  <DialogDescription className="hidden"></DialogDescription>
                </DialogHeader>
                <CampaignDetail key={campaign.campaignId} campaign={campaign} />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Icons.edit className="h-4 w-4 mr-1" />
                  Chỉnh sửa
                </Button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[600px] h-[85%] gap-0 p-0 pb-4"
                showCloseButton={false}
              >
                <DialogHeader className="h-fit border-b-2 border-border p-0 m-0 py-3">
                  <DialogTitle className="font-semibold text-xl text-center">
                    Chiến dịch của {campaign.brandName}
                  </DialogTitle>
                  <DialogDescription className="hidden"></DialogDescription>
                </DialogHeader>
                <CampaignDetail key={campaign.campaignId} campaign={campaign} />
              </DialogContent>
            </Dialog>

            <Button
              variant="default"
              size="sm"
              className="col-span-2 w-full"
              onClick={handleStartCampaign}
            >
              <Icons.play className="h-4 w-4 mr-1" />
              Bắt đầu
            </Button>
          </div>
        ) : (
          <Dialog {...commonProps}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center w-full bg-transparent"
              >
                <Icons.eye className="h-4 w-4 mr-2" />
                Xem chi tiết
              </Button>
            </DialogTrigger>
            <DialogContent
              className="sm:max-w-[600px] h-[85%] gap-0 p-0 pb-4"
              showCloseButton={false}
            >
              <DialogHeader className="h-fit border-b-2 border-border p-0 m-0 py-3">
                <DialogTitle className="font-semibold text-xl text-center">
                  Chiến dịch của {campaign.brandName}
                </DialogTitle>
                <DialogDescription className="hidden"></DialogDescription>
              </DialogHeader>
              <CampaignDetail key={campaign.campaignId} campaign={campaign} />
            </DialogContent>
          </Dialog>
        );
      case 'PARTICIPATING':
        return userRole === 'BRAND' ? (
          <div className="w-full grid grid-cols-2 gap-2">
            <Dialog {...commonProps}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Icons.eye className="w-4 h-4 mr-2" />
                  Theo dõi chiến dịch
                </Button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[600px] h-[85%] gap-0 p-0 pb-4"
                showCloseButton={false}
              >
                <DialogHeader className="h-fit border-b-2 border-border p-0 m-0 py-3">
                  <DialogTitle className="font-semibold text-xl text-center">
                    Chiến dịch của {campaign.brandName}
                  </DialogTitle>
                  <DialogDescription className="hidden"></DialogDescription>
                </DialogHeader>
                <CampaignDetail key={campaign.campaignId} campaign={campaign} />
              </DialogContent>
            </Dialog>

            {renderViewProgressDialog()}

            <Button
              variant="default"
              size="sm"
              className="col-span-2 w-full"
              onClick={handleEndCampaign}
            >
              <Icons.play className="h-4 w-4 mr-1" />
              Kết thúc
            </Button>
          </div>
        ) : (
          <div className="w-full grid grid-cols-2 gap-2">
            <Dialog {...commonProps}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Icons.eye className="w-4 h-4 mr-2" />
                  Theo dõi chiến dịch
                </Button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[600px] h-[85%] gap-0 p-0 pb-4"
                showCloseButton={false}
              >
                <DialogHeader className="h-fit border-b-2 border-border p-0 m-0 py-3">
                  <DialogTitle className="font-semibold text-xl text-center">
                    Chiến dịch của {campaign.brandName}
                  </DialogTitle>
                  <DialogDescription className="hidden"></DialogDescription>
                </DialogHeader>
                <CampaignDetail key={campaign.campaignId} campaign={campaign} />
              </DialogContent>
            </Dialog>

            {renderProgressUpdateDialog()}
          </div>
        );
      case 'COMPLETED':
        return (
          <Dialog {...commonProps}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center w-full bg-transparent"
              >
                <Icons.eye className="h-4 w-4 mr-2" />
                Xem báo cáo
              </Button>
            </DialogTrigger>
            <DialogContent
              className="sm:max-w-[600px] h-[85%] gap-0 p-0 pb-4"
              showCloseButton={false}
            >
              <DialogHeader className="h-fit border-b-2 border-border p-0 m-0 py-3">
                <DialogTitle className="font-semibold text-xl text-center">
                  Chiến dịch của {campaign.brandName}
                </DialogTitle>
                <DialogDescription className="hidden"></DialogDescription>
              </DialogHeader>
              <CampaignDetail key={campaign.campaignId} campaign={campaign} />
            </DialogContent>
          </Dialog>
        );
      default:
        return null;
    }
  };

  return (
    <Card
      key={campaign.campaignId}
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow pt-0 relative"
    >
      {isHotCampaign && <HotCampaignBadge />}

      <div className="w-full h-80 relative">
        <img
          src={campaign.imageUrl || '/placeholder.svg'}
          alt={campaign.campaignName}
          className="w-full h-full object-cover"
        />
        {/* {isHotCampaign && (
          <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent pointer-events-none" />
        )} */}
      </div>
      <CardContent className="px-6 w-full">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={campaign.brandAvartar || '/placeholder.svg'}
              alt={campaign.brandName}
            />
            <AvatarFallback>{campaign.brandName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex flex-row items-center justify-center">
              <h3 className="flex-1 font-semibold text-lg line-clamp-1">{campaign.campaignName}</h3>
              {StatusBadge(campaign.status)}
            </div>
            <p className="text-sm text-muted-foreground">
              {campaign.brandName} • {formatDate(campaign.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex items-start w-fit mb-3 h-12">
          <p className="line-clamp-2">{`${campaign.content}`}</p>
        </div>

        {campaign.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            <h4 className="text-sm font-medium">Danh mục:</h4>
            {campaign.categories.map((cat: any, i: number) => (
              <Badge key={cat.categoryId ?? i} variant="outline">
                {cat.categoryName ?? cat}
              </Badge>
            ))}
          </div>
        )}

        {isHotCampaign && (
          <div className="flex items-center gap-2 mb-3 text-sm">
            <div className="flex items-center gap-1 text-orange-600">
              <Icons.users className="h-4 w-4" />
              <span className="font-medium">
                {campaign.applicationTotal || campaign.appliedInfluencerIds?.length || 0} ứng viên
              </span>
            </div>
            <Badge
              variant="secondary"
              className="bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200 dark:hover:bg-orange-200"
            >
              Phổ biến
            </Badge>
          </div>
        )}

        <div className="flex justify-between mb-4 text-sm text-muted-foreground">
          <div className="flex items-center w-fit mr-4">
            <Icons.DollarSign className="w-4 h-4 mr-2 text-green-500" />
            <span>{`${Number(campaign.budget).toLocaleString('vi-VN')} VNĐ`}</span>
          </div>

          <div className="flex items-center w-fit">
            <Icons.calendar className="w-4 h-4 mr-2 text-primary" />
            <span>{`${formatDate(campaign.startAt)} - ${formatDate(campaign.dueAt)}`}</span>
          </div>
        </div>

        <div className="flex justify-center">{renderDialogButton()}</div>
      </CardContent>
    </Card>
  );
}
