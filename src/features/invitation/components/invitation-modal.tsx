'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Alert, AlertTitle } from '@/components/ui/alert';
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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

import { Icons } from '@/components/icons/icons';
import { useGetCategoriesQuery, useGetRolesQuery } from '@/features/common/common.service';
import type { Campaign, Category } from '@/features/common/common.type';
import { cn } from '@/lib/utils';
import { formatDate, isApiResponseError } from '@/utils/format';
import { zodResolver } from '@hookform/resolvers/zod';

import CandidateList from './candidate-list';
import { type InvitationFormValues, invitationSchema } from '../invitation.schema';
import {
  useGetAllRecruitingCampaignQuery,
  useSendInvitationsMutation,
} from '../invitation.service';

const recommendLetter = (campaign: Campaign) => {
  return `Xin chào,

Chúng tôi là đại diện từ ${campaign.brandName}. Hiện tại, chúng tôi đang triển khai chiến dịch ${campaign.campaignName}, dự kiến diễn ra từ ${formatDate(campaign.startAt)} đến ${formatDate(campaign.dueAt)}, và rất mong muốn được hợp tác với bạn.

Nếu bạn quan tâm, mình sẽ gửi thêm thông tin chi tiết.

Rất mong nhận được phản hồi từ bạn!

Trân trọng,
${campaign.brandName}`;
};

export default function InvitationModal() {
  const closeDialogRef = useRef<HTMLButtonElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    categoryId: 'all',
    categoryName: 'Tất cả',
  });
  const { data: categoryRaw } = useGetCategoriesQuery(undefined, { refetchOnFocus: true });
  const { data: roleRaw } = useGetRolesQuery(undefined, { refetchOnFocus: true });
  const influencerRoleId = roleRaw?.data?.find((item) => item.roleName === 'INFLUENCER')?.roleId;

  const { data: campaignRaw } = useGetAllRecruitingCampaignQuery(undefined, {
    refetchOnFocus: true,
  });
  const [isAssistantMode, setAssistantMode] = useState<boolean>(false);

  const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign>();
  const [sendInvitation, { isLoading: isSending, isSuccess, isError }] =
    useSendInvitationsMutation();
  const [toastId, setToastId] = useState<string | number | undefined>();
  let max =
    selectedCampaign?.influencerCountExpected &&
    selectedCampaign?.invitedInfluencerIds &&
    selectedCampaign.joinedInfluencerIds
      ? selectedCampaign.influencerCountExpected -
        selectedCampaign.joinedInfluencerIds.length -
        selectedCampaign.invitedInfluencerIds.length
      : 0;
  if (max <= 0) max = 0;
  const form = useForm<InvitationFormValues>({
    resolver: zodResolver(invitationSchema),
    defaultValues: {
      campaignId: '',
      influencerIds: [],
      message: '',
      // budget: 0,
      // deadline: '',
    },
  });

  useEffect(() => {
    if (selectedCampaign) {
      form.setValue('message', recommendLetter(selectedCampaign));
    }
  }, [selectedCampaign, form]);

  const handleInfluencerSelect = (influencerId: string) => {
    if (selectedCampaign === undefined || selectedCampaign === null) {
      toast.error('Vui lòng chọn chiến dịch trước!');
      return;
    }
    let newSelected: string[];
    if (selectedInfluencers.includes(influencerId)) {
      newSelected = selectedInfluencers.filter((id) => id !== influencerId);
    } else if (selectedInfluencers.length === max) {
      newSelected = [...selectedInfluencers];
      newSelected.pop();
      newSelected = [...newSelected, influencerId];
    } else {
      newSelected = [...selectedInfluencers, influencerId];
    }
    console.log(newSelected);
    setSelectedInfluencers(newSelected);
    form.setValue('influencerIds', newSelected);
  };

  const onSubmit = async (values: InvitationFormValues) => {
    try {
      await sendInvitation(values);
      closeDialogRef.current?.click();
      setSelectedInfluencers([]);
      form.reset();
      console.log(values.influencerIds);
    } catch (error) {
      if (isApiResponseError(error)) {
        toast.error(error.data.error);
      } else toast.error('Gửi lời mời thất bại. Vui lòng thử lại!');
    }
  };

  useEffect(() => {
    if (isSending && !toastId) {
      const id = toast.loading('Đang gửi lời mời!', { duration: 2000 });
      setToastId(id);
    }
    if (!isSending && toastId) {
      toast.dismiss(toastId);
      setToastId(undefined);
    }
  }, [isSending, toastId]);

  useEffect(() => {
    if (isSuccess && toastId) {
      toast.dismiss(toastId);
      toast.success('Gửi lời mời thành công!', { duration: 2000 });
      setToastId(undefined);
    }
  }, [isSuccess, toastId]);
  useEffect(() => {
    if (isError && toastId) {
      toast.dismiss(toastId);
      toast.success('Gửi lời mời thất bại!', { duration: 2000 });
      setToastId(undefined);
    }
  }, [isError, toastId]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          {/* <Icons.send className="h-4 w-4 mr-2" /> */}
          Mời Influencer
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-7xl min-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Mời Influencer tham gia chiến dịch</DialogTitle>
          <DialogDescription>
            Chọn influencer phù hợp và gửi lời mời tham gia chiến dịch của bạn.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Influencer Selection */}
              <div className="flex flex-col gap-auto">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-3">Lời mời</h3>

                  {/* Campaign Selection */}
                  <FormField
                    control={form.control}
                    name="campaignId"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Chọn chiến dịch *</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            const campaign = campaignRaw?.data?.campaigns?.find(
                              (c) => c.campaignId === value,
                            );
                            if (campaign) setSelectedCampaign(campaign);
                          }}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Chọn chiến dịch để mời" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {campaignRaw?.data &&
                              campaignRaw.data.campaigns &&
                              campaignRaw.data.campaigns.map((campaign) => (
                                <SelectItem key={campaign.campaignId} value={campaign.campaignId}>
                                  <div className="flex flex-col">
                                    <span className="font-medium">{campaign.campaignName}</span>
                                  </div>
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Budget and Deadline */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ngân sách đề xuất (VND) *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="5,000,000"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}

                    {/* <FormField
                      control={form.control}
                      name="deadline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Deadline phản hồi *</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Tin nhắn mời *</FormLabel>
                        <FormControl>
                          <Textarea
                            spellCheck={false}
                            placeholder="Xin chào! Chúng tôi rất mong muốn hợp tác với bạn trong chiến dịch này..."
                            rows={4}
                            {...field}
                            value={selectedCampaign ? recommendLetter(selectedCampaign) : ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <DialogClose ref={closeDialogRef}>
                    <Button type="button" variant="outline">
                      Hủy
                    </Button>
                  </DialogClose>
                  <Button type="submit">Gửi lời mời</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Chọn Influencer</h3>

                <div className="flex gap-2 mb-4">
                  <div className="flex-1 relative">
                    <Icons.search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Tìm kiếm influencer..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={selectedCategory.categoryId}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      {categoryRaw?.data?.map((cat) => (
                        <SelectItem
                          key={cat.categoryId}
                          value={cat.categoryId}
                          onClick={() => setSelectedCategory(cat)}
                        >
                          {cat.categoryName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {!selectedCampaign && (
                  <Alert variant="default">
                    <Icons.circleAlert className="h-4 w-4 mr-2" />
                    <AlertTitle>Vui lòng chọn chiến dịch của bạn!</AlertTitle>
                  </Alert>
                )}
                {selectedCampaign && (
                  <div
                    className={cn(
                      'flex items-center bg-blue-50 p-3 rounded-lg text-sm text-blue-600 font-semibold',
                      selectedCampaign ? 'justify-between' : 'justify-end',
                    )}
                  >
                    {selectedCampaign && (
                      <p className="flex gap-1">
                        Tối đa
                        <span>
                          {max <= 0
                            ? 'Bạn đã đạt giới hạn mời hoặc chiến dịch đã đủ người tham gia'
                            : max}
                        </span>
                      </p>
                    )}
                    {selectedInfluencers.length > 0 && (
                      <p className="flex gap-1">
                        Đã chọn
                        <span>{selectedInfluencers.length} </span>
                        người
                      </p>
                    )}
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className={cn('text-blue-600 hover:text-blue-700 px-2 h-6')}
                      onClick={() => {
                        setSelectedInfluencers([]);
                        form.setValue('influencerIds', []);
                      }}
                    >
                      <Icons.refreshCw /> Đặt lại
                    </Button>
                  </div>
                )}
                {selectedCampaign && (
                  <div className="flex items-center justify-end space-x-2">
                    <Switch
                      id="recommend-mode"
                      className="cursor-pointer"
                      checked={isAssistantMode}
                      onClick={() => setAssistantMode(!isAssistantMode)}
                    />
                    <Label htmlFor="recommend-mode">Đề xuất</Label>
                  </div>
                )}
                {selectedCampaign && (
                  <div className="max-h-96 overflow-y-auto space-y-3 no-scrollbar">
                    <CandidateList
                      handleInfluencerSelect={handleInfluencerSelect}
                      influencerRoleId={influencerRoleId!}
                      selectedCampaign={selectedCampaign}
                      selectedInfluencers={selectedInfluencers}
                      assistant={isAssistantMode}
                    />
                  </div>
                )}
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
