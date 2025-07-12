'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { Icons } from '@/components/icons/icons';
import { useGetCategoriesQuery, useGetRolesQuery } from '@/features/common/common.service';
import type { Campaign, Category } from '@/features/common/common.type';
import { useGetInfluencerProfilesQuery } from '@/features/home/home.service';
import { cn } from '@/lib/utils';
import { formatDate, formatNumber, isApiResponseError } from '@/utils/format';
import { zodResolver } from '@hookform/resolvers/zod';

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
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    categoryId: 'all',
    categoryName: 'Tất cả',
  });
  const { data: categoryRaw } = useGetCategoriesQuery(undefined, { refetchOnFocus: true });
  const { data: roleRaw } = useGetRolesQuery(undefined, { refetchOnFocus: true });
  const influencerRoleId = roleRaw?.data?.find((item) => item.roleName === 'INFLUENCER')?.roleId;
  const { data: influencerRaw } = useGetInfluencerProfilesQuery(
    {
      pageNumber: 0,
      pageSize: 10,
      roleId: influencerRoleId!,
    },
    { refetchOnFocus: true },
  );
  const { data: campaignRaw } = useGetAllRecruitingCampaignQuery(undefined, {
    refetchOnFocus: true,
  });

  const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign>();
  const [sendInvitation, { isLoading: isSending, isSuccess }] = useSendInvitationsMutation();
  const [toastId, setToastId] = useState<string | number | undefined>();

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
    const maxInluemcerNum = selectedCampaign.influencerCountExpected;
    if (selectedInfluencers.includes(influencerId)) {
      newSelected = selectedInfluencers.filter((id) => id !== influencerId);
    } else if (selectedInfluencers.length === maxInluemcerNum) {
      newSelected = selectedInfluencers;
      newSelected.pop();
      newSelected = [...newSelected, influencerId];
    } else {
      newSelected = [...selectedInfluencers, influencerId];
    }
    setSelectedInfluencers(newSelected);
    form.setValue('influencerIds', newSelected);
  };

  const onSubmit = async (values: InvitationFormValues) => {
    try {
      form.reset();
      await sendInvitation(values);
      closeDialogRef.current?.click();
      setSelectedInfluencers([]);
    } catch (error) {
      if (isApiResponseError(error)) {
        toast.error(error.data.error);
      } else toast.error('Gửi lời mời thất bại. Vui lòng thử lại!');
    }
  };

  useEffect(() => {
    if (isSending) {
      const id = toast.loading('Đang gửi lời mời!', { duration: 2000 });
      setToastId(id);
    }
  }, [isSending]);

  useEffect(() => {
    if (isSuccess && toastId) {
      toast.dismiss(toastId);
      toast.success('Gửi lời mời thành công!', { duration: 2000 });
      setToastId(undefined);
    }
  }, [isSuccess, toastId]);

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
                  <Button type="submit">
                    Gửi lời mời
                    <Icons.send className="h-4 w-4 mr-2 -rotate-12" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Chọn Influencer</h3>

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

                  {/* Selected count */}
                  <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg mb-4">
                    <div className="text-sm text-blue-700">
                      <p>
                        Tối đa:
                        <span className="font-semibold">
                          {selectedCampaign?.influencerCountExpected ?? 0}
                        </span>
                      </p>
                      <p>
                        Đã chọn:
                        <span className="font-semibold">{selectedInfluencers.length} </span>
                      </p>
                    </div>
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
                      Đặt lại
                    </Button>
                  </div>

                  <div className="max-h-96 overflow-y-auto space-y-3 no-scrollbar">
                    {influencerRaw?.data && influencerRaw?.data.length > 0 ? (
                      influencerRaw.data.map((influencer) => {
                        if (selectedCampaign?.joinedInfluencerIds.includes(influencer.id)) return;
                        return (
                          <Card
                            key={influencer.id}
                            className="border-2 border-primary/20 bg-card shadow-lg hover:shadow-xl transition-all py-2"
                          >
                            <CardContent className="flex items-center justify-between gap-4">
                              <Checkbox
                                checked={selectedInfluencers.includes(influencer.id)}
                                disabled={selectedCampaign === undefined}
                                onCheckedChange={() => handleInfluencerSelect(influencer.id)}
                                className="cursor-pointer"
                              />

                              <div className="flex items-center space-x-4 flex-1">
                                <Avatar className="h-14 w-14">
                                  <AvatarImage
                                    src={influencer.avatarUrl || '/placeholder.svg'}
                                    alt={influencer.name}
                                    className="object-cover"
                                  />
                                  <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <h3 className="font-semibold">{influencer.name}</h3>
                                  {/* {influencer?.category && (
                                    <p className="text-sm text-muted-foreground capitalize">
                                      {influencer.category
                                        .map((cat: any) => cat.categoryName)
                                        .join(', ')}
                                    </p>
                                  )} */}
                                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                                    <div className="flex items-center space-x-1">
                                      <Icons.users className="h-4 w-4" />
                                      <span>
                                        {formatNumber(influencer.follower ?? 0)} followers
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Icons.star className="h-4 w-4" />
                                      <span>{influencer.rating}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(`/influencer/${influencer.id}`)}
                              >
                                Xem hồ sơ
                              </Button>
                            </CardContent>
                          </Card>
                        );
                      })
                    ) : (
                      <Alert variant="default">
                        <Icons.circleAlert className="h-4 w-4 mr-2" />
                        <AlertTitle>Không có influencer nào</AlertTitle>
                        <AlertDescription>Hãy kiểm tra lại dữ liệu.</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
