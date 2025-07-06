import { useEffect, useRef, useState } from 'react';
import { type FieldPath, useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { Icons } from '@/components/icons/icons';
import {
  type Campaign,
  type Category,
  type PostType,
  SupportedPostTypeByPlatform,
} from '@/features/common/common.type';
import { setRefetch } from '@/features/home/home.slice';
import { useUpdateCampaignDataMutation } from '@/features/my-campaign/campaign.service';
import { useSendNotification } from '@/hooks/useSendNotification';
import { cn } from '@/lib/utils';
import type { RootState } from '@/redux/store';
import { zodResolver } from '@hookform/resolvers/zod';

import { campaignFormSchema, type CampaignFormValues } from '../posting.schema';
import { usePostCampaignMutation } from '../posting.service';

interface PopUpCampaignProps {
  categories: Category[];
  campaignData?: Campaign;
}
const MAX_CATEGORIES = 3;
interface ExtendedState {
  idx: number;
  extended: boolean;
}

export default function CampaignPopUp({ categories, campaignData }: PopUpCampaignProps) {
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const [postCampaign, { isLoading: isPosting }] = usePostCampaignMutation();
  const [updateCampaign, { isLoading: isUpdating }] = useUpdateCampaignDataMutation();
  const dispatch = useDispatch();
  const sendNotification = useSendNotification();
  const { avatarUrl, id, name } = useSelector((state: RootState) => state.auth);

  const [isExtended, setExtended] = useState<ExtendedState[]>([]);

  const onUpdating = campaignData !== undefined && campaignData !== null;

  const imageUrl = campaignData && campaignData.imageUrl;

  const form = useForm<CampaignFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      campaignName: campaignData?.campaignName || '',
      content: campaignData?.content || '',
      budget: campaignData?.budget || undefined,
      influencerCountExpected: campaignData?.influencerCountExpected || undefined,
      startAt: campaignData?.startAt ? new Date(campaignData.startAt) : new Date(),
      dueAt: campaignData?.dueAt ? new Date(campaignData.dueAt) : new Date(),
      influencerRequirements: campaignData?.influencerRequirements?.length
        ? campaignData.influencerRequirements
        : [{ platform: '', followers: undefined }],
      campaignRequirements: campaignData?.campaignRequirements?.length
        ? campaignData.campaignRequirements.map((req) => ({
            platform: req.platform,
            post_type: req.post_type,
            quantity: req.quantity,
            postDetails: req.details.map((item) => {
              const postType = item.post_type?.toLowerCase() as PostType;
              return {
                [postType]: {
                  like: item.like,
                  comment: item.comment,
                  share: item.share,
                },
              };
            }),
          }))
        : [
            {
              platform: '',
              post_type: '',
              quantity: undefined,
              postDetails: [
                { post: { like: 0, comment: 0, share: 0 } },
                { video: { like: 0, comment: 0, share: 0 } },
                { story: { like: 0, comment: 0, share: 0 } },
                { reel: { like: 0, comment: 0, share: 0 } },
              ],
            },
          ],
      categoryIds: campaignData?.categories.map((cat) => cat.categoryId) || [],
      image: undefined,
    },
  });

  const {
    fields: influencerFields,
    append: appendInfluencer,
    remove: removeInfluencer,
  } = useFieldArray<CampaignFormValues, 'influencerRequirements'>({
    control: form.control,
    name: 'influencerRequirements',
  });

  const {
    fields: contentFields,
    append: appendContent,
    remove: removeContent,
  } = useFieldArray<CampaignFormValues, 'campaignRequirements'>({
    control: form.control,
    name: 'campaignRequirements',
  });

  useEffect(() => {
    contentFields.forEach((_, idx) => {
      const quantity = Number(form.watch(`campaignRequirements.${idx}.quantity`) || 0);
      const currentPostDetails = form.watch(`campaignRequirements.${idx}.postDetails`) || [];
      if (currentPostDetails.length < quantity) {
        const postType =
          form.watch(`campaignRequirements.${idx}.post_type`)?.toLowerCase() || 'video';
        const newDetails = Array.from({ length: quantity - currentPostDetails.length }, () => ({
          [postType]: { like: 0, comment: 0, share: 0 },
        }));
        form.setValue(`campaignRequirements.${idx}.postDetails`, [
          ...currentPostDetails,
          ...newDetails,
        ]);
      } else if (currentPostDetails.length > quantity) {
        form.setValue(
          `campaignRequirements.${idx}.postDetails`,
          currentPostDetails.slice(0, quantity),
        );
      }
    });
  }, [contentFields, form.watch('campaignRequirements')]);

  const socialPlatformOptions = [
    { value: 'TIKTOK', label: 'TikTok' },
    { value: 'YOUTUBE', label: 'YouTube' },
    { value: 'FACEBOOK', label: 'Facebook' },
    { value: 'INSTAGRAM', label: 'Instagram' },
  ];

  const onSubmit = async (values: CampaignFormValues) => {
    try {
      const {
        image: file,
        influencerRequirements,
        campaignRequirements,
        startAt,
        dueAt,
        ...rest
      } = values;
      const campaignRaw = {
        ...rest,
        imageUrl: imageUrl ?? '',
        startAt: startAt.toISOString(),
        dueAt: dueAt.toISOString(),
        campaignRequirements: campaignRequirements.map((item) => ({
          platform: item.platform,
          post_type: item.post_type,
          quantity: item.quantity,
          details: item.postDetails.map((detail) => {
            const postTypeData = detail[item.post_type as keyof typeof detail];
            return {
              post_type: item.post_type,
              like: postTypeData?.like ?? 0,
              comment: postTypeData?.comment ?? 0,
              share: 0,
            };
          }),
        })),
        influencerRequirements: influencerRequirements.map((item) => ({
          platform: item.platform,
          followers: item.followers,
        })),
      };

      console.log(campaignRaw);
      const formData = new FormData();
      if (file) formData.append('image', file);
      formData.append('campaign', JSON.stringify(campaignRaw));
      if (onUpdating) {
        await updateCampaign({ formData: formData }).unwrap();
      } else {
        await postCampaign({ formData }).unwrap();
      }
      dialogCloseRef.current?.click();
      form.reset();
      dispatch(setRefetch({ key: 'campaign', value: true }));
      sendNotification({
        userId: id!,
        content: `Bạn đã đăng bài chiến dịch thành công`,
        name: name!,
        avatarUrl: avatarUrl!,
      });
      // toast.success('Đăng bài thành công!');
    } catch (err) {
      console.log(err);
      toast.error('Đăng bài thất bại. Vui lòng thử lại!');
    }
  };

  const handleSelectCategory = (categoryId: string) => {
    const current = form.getValues('categoryIds') || [];
    if (current.includes(categoryId)) {
      form.setValue(
        'categoryIds',
        current.filter((id) => id !== categoryId),
      );
    } else {
      if (current.length >= MAX_CATEGORIES) {
        const copy = [...current].slice(0, MAX_CATEGORIES - 1);
        form.setValue('categoryIds', [...copy, categoryId]);
      } else {
        form.setValue('categoryIds', [...current, categoryId]);
      }
    }
  };
  return (
    <DialogContent showCloseButton={false} className="p-0 py-6 sm:max-w-[650px] h-[85%] text-base">
      <DialogHeader className="flex flex-col gap-1.5 px-6">
        <DialogTitle className="flex items-center gap-1 text-primary font-bold border-b-2 pb-1 border-primary w-fit">
          <Icons.megaphone className="size-6" />
          <p className="text-lg leading-4">Tạo chiến dịch mới</p>
        </DialogTitle>
        <DialogDescription>
          Tạo chiến dịch mới để tìm kiếm và hợp tác với các influencer phù hợp.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground scrollbar-track-transparent px-6 pb-3"
        >
          <FormField
            control={form.control}
            name="campaignName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề chiến dịch *</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tiêu đề chiến dịch" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả chiến dịch *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Mô tả chi tiết về chiến dịch"
                    className="h-24"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Poster của chiến dịch *</FormLabel>
                <FormControl>
                  <div>
                    <input
                      id="poster-upload"
                      type="file"
                      accept="image/jpeg,image/png"
                      style={{ display: 'none' }}
                      onChange={(e) =>
                        field.onChange(e.target.files?.[0] ?? field.value ?? undefined)
                      }
                      ref={field.ref}
                    />
                    <div className="flex justify-between">
                      <Button
                        type="button"
                        onClick={() => document.getElementById('poster-upload')?.click()}
                        variant="outline"
                        size="sm"
                      >
                        <Icons.fileImage />
                        <span>Chọn ảnh</span>
                      </Button>
                      {(field.value || imageUrl) && (
                        <div className="flex gap-4">
                          <Dialog>
                            <DialogTrigger>
                              <Button type="button" variant="secondary" size="sm">
                                <Icons.eye />
                                <span>Xem trước ảnh</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent showCloseButton={false} className="p-3">
                              <div className="flex flex-col space-y-3">
                                <img
                                  src={
                                    field.value
                                      ? URL.createObjectURL(field.value as File)
                                      : imageUrl!
                                  }
                                  alt="Poster preview"
                                  className="object-contain max-w-full h-[600px]"
                                />
                                <div className="flex justify-end">
                                  <DialogClose name="close-posterPopup">
                                    <Button type="button" variant="outline" size="sm">
                                      Đóng
                                    </Button>
                                  </DialogClose>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
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
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">
            <p className="font-medium">Danh mục *</p>
            <div className="flex flex-wrap gap-2">
              {categories &&
                categories.map((category) => (
                  <Badge
                    key={category.categoryId}
                    variant={
                      form.watch('categoryIds')?.includes(category.categoryId)
                        ? 'default'
                        : 'outline'
                    }
                    className={cn(
                      'flex justify-center items-center gap-1 h-6 rounded-md text-xs font-medium cursor-pointer capitalize',
                    )}
                    onClick={() => handleSelectCategory(category.categoryId)}
                  >
                    {category.categoryName}
                    {form.watch('categoryIds')?.includes(category.categoryId) && (
                      <Icons.x className="size-3" />
                    )}
                  </Badge>
                ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 items-start">
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngân sách dự kiến *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="10,000,000 VND"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="influencerCountExpected"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số lượng Influencer*</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="5"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày bắt đầu *</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={
                        field.value && !isNaN(field.value.getTime())
                          ? field.value.toISOString().split('T')[0]
                          : ''
                      }
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        if (isNaN(date.getTime())) {
                          field.onChange(undefined);
                        } else {
                          field.onChange(date);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày kết thúc *</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={
                        field.value && !isNaN(field.value.getTime())
                          ? field.value.toISOString().split('T')[0]
                          : ''
                      }
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        if (isNaN(date.getTime())) {
                          field.onChange(undefined);
                        } else {
                          field.onChange(date);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <FormLabel>Yêu cầu về Influencer *</FormLabel>
            {influencerFields.map((item, idx) => {
              const usedPlatforms =
                form
                  .watch('influencerRequirements')
                  ?.map((s, i) => (i === idx ? null : s.platform))
                  .filter(Boolean) || [];
              if (
                !form.watch(`influencerRequirements.${idx}.platform`) &&
                usedPlatforms.length >= socialPlatformOptions.length
              )
                return null;
              return (
                <div key={item.id} className="flex gap-2">
                  <FormField
                    control={form.control}
                    name={`influencerRequirements.${idx}.platform`}
                    render={({ field }) => (
                      <FormItem className="w-1/3">
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value || undefined}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Nền tảng" />
                            </SelectTrigger>
                            <SelectContent>
                              {socialPlatformOptions
                                .filter(
                                  (opt) =>
                                    !usedPlatforms.includes(opt.value) || field.value === opt.value,
                                )
                                .map((opt) => (
                                  <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`influencerRequirements.${idx}.followers`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            value={field.value ?? undefined}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            placeholder="Số lượng người theo dõi"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="button" variant="destructive" onClick={() => removeInfluencer(idx)}>
                    <Icons.x />
                  </Button>
                </div>
              );
            })}
            {socialPlatformOptions.length > (form.watch('influencerRequirements')?.length || 0) && (
              <Button
                type="button"
                variant="outline"
                onClick={() => appendInfluencer({ platform: '', followers: 0 })}
                size="sm"
                className="w-fit px-3 py-2 h-8"
              >
                <Icons.plus className="h-4 w-4" />
                Thêm nền tảng
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <FormItem>
              <FormLabel className="">Yêu cầu nền tảng *</FormLabel>
              {contentFields.map((item, idx) => {
                return (
                  <div
                    key={item.platform + idx}
                    className={cn(
                      'flex',
                      isExtended.find((item) => item.idx === idx)?.extended
                        ? ' items-start'
                        : ' items-center',
                    )}
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="hover:bg-transparent"
                      onClick={() => {
                        setExtended((prev) => {
                          const index = prev.findIndex((item) => item.idx === idx);
                          if (index === -1) {
                            return [...prev, { idx, extended: true }];
                          }
                          const newExtended = [...prev];
                          newExtended[index].extended = !newExtended[index].extended;
                          return newExtended;
                        });
                      }}
                    >
                      {isExtended.find((item) => item.idx === idx)?.extended ? (
                        <Icons.circleChevronUp className="size-5" />
                      ) : (
                        <Icons.circleChevronDown className="size-5" />
                      )}
                    </Button>
                    <div
                      key={item.id}
                      className="flex-1 flex flex-col gap-2 p-2 border rounded-lg bg-gray-100"
                    >
                      <div className="flex gap-0">
                        <FormField
                          control={form.control}
                          name={`campaignRequirements.${idx}.platform`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Select
                                  onValueChange={(value) => {
                                    field.onChange(value);
                                    setExtended((prev) => {
                                      const index = prev.findIndex((item) => item.idx === idx);
                                      if (index === -1) {
                                        return [...prev, { idx, extended: true }];
                                      }
                                      const newExtended = [...prev];
                                      newExtended[index].extended = true;
                                      return newExtended;
                                    });
                                  }}
                                  value={field.value || undefined}
                                >
                                  <SelectTrigger className="w-full bg-white">
                                    <SelectValue placeholder="Nền tảng" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {socialPlatformOptions.map((opt) => (
                                      <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:scale-110 bg-transparent hover:bg-transparent"
                          onClick={() => removeContent(idx)}
                        >
                          <Icons.trash className="size-5" />
                        </Button>
                      </div>
                      {isExtended.find((item) => item.idx === idx)?.extended &&
                        form.watch(`campaignRequirements.${idx}.platform`) && (
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-2 w-full items-start">
                              <FormField
                                control={form.control}
                                name={`campaignRequirements.${idx}.post_type`}
                                render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormLabel>Loại nội dung</FormLabel>
                                    <FormControl>
                                      <Select
                                        onValueChange={field.onChange}
                                        value={field.value || undefined}
                                        // onChange={() => {
                                        //   const postType = field.value?.toLowerCase() || 'video';
                                        //   const currentPostDetails =
                                        //     form.watch(`campaignRequirements.${idx}.postDetails`) ||
                                        //     [];
                                        //   const updatedDetails = currentPostDetails.map(
                                        //     (detail) => {
                                        //       const oldValue = Object.values(detail)[0] as {
                                        //         like: number;
                                        //         comment: number;
                                        //         share?: number;
                                        //       };
                                        //       return {
                                        //         [postType]: {
                                        //           like: oldValue.like,
                                        //           comment: oldValue.comment,
                                        //           share: oldValue.share ?? 0,
                                        //         },
                                        //       };
                                        //     },
                                        //   );
                                        //   form.setValue(
                                        //     `campaignRequirements.${idx}.postDetails`,
                                        //     updatedDetails,
                                        //   );
                                        // }}
                                      >
                                        <SelectTrigger className="w-full capitalize bg-white">
                                          <SelectValue placeholder="Loại nội dung" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {SupportedPostTypeByPlatform[
                                            (
                                              form.watch(`campaignRequirements.${idx}.platform`) ||
                                              ''
                                            ).toLowerCase() as keyof typeof SupportedPostTypeByPlatform
                                          ]?.map((item) => {
                                            const type = Object.keys(item)[0];
                                            return (
                                              <SelectItem
                                                key={type}
                                                value={type}
                                                className="capitalize"
                                              >
                                                {type}
                                              </SelectItem>
                                            );
                                          })}
                                        </SelectContent>
                                      </Select>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`campaignRequirements.${idx}.quantity`}
                                render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormLabel>Số lượng</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        className="bg-white"
                                        type="number"
                                        value={field.value ?? undefined}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        placeholder="Số lượng nội dung"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              {Array.from(
                                {
                                  length: Number(
                                    form.watch(`campaignRequirements.${idx}.quantity`) || 0,
                                  ),
                                },
                                (_, index) => {
                                  const selectedPostType = form.watch(
                                    `campaignRequirements.${idx}.post_type`,
                                  );
                                  const platform = form.watch(
                                    `campaignRequirements.${idx}.platform`,
                                  );
                                  const platformKey = (
                                    platform || ''
                                  ).toLowerCase() as keyof typeof SupportedPostTypeByPlatform;
                                  const postTypesArray =
                                    SupportedPostTypeByPlatform[platformKey] || [];
                                  const postTypeObj = postTypesArray.find(
                                    (obj) => Object.keys(obj)[0] === selectedPostType,
                                  );
                                  const postDetails = postTypeObj
                                    ? postTypeObj[selectedPostType as keyof typeof postTypeObj] ||
                                      []
                                    : [];

                                  if (
                                    !form.watch(`campaignRequirements.${idx}.postDetails.${index}`)
                                  ) {
                                    form.setValue(
                                      `campaignRequirements.${idx}.postDetails.${index}`,
                                      {
                                        [selectedPostType]: { like: 0, comment: 0 },
                                      },
                                    );
                                  }

                                  if (
                                    selectedPostType &&
                                    !form.watch(`campaignRequirements.${idx}.postDetails.${index}`)
                                  ) {
                                    form.setValue(
                                      `campaignRequirements.${idx}.postDetails.${index}`,
                                      {
                                        [selectedPostType]: { like: 0, comment: 0 },
                                      },
                                    );
                                  }

                                  if (!selectedPostType || !postDetails.length) {
                                    return null;
                                  }
                                  return (
                                    <div key={index} className="flex flex-col gap-4">
                                      <FormLabel>
                                        Yêu cầu tương tác nội dung ({index + 1})
                                      </FormLabel>
                                      <div className="flex gap-2">
                                        {postDetails.map((require: string) => (
                                          <FormField
                                            key={`${idx}_${index}_${require}`}
                                            control={form.control}
                                            name={
                                              `campaignRequirements.${idx}.postDetails.${index}.${selectedPostType}.${require}` as FieldPath<CampaignFormValues>
                                            }
                                            render={({ field }) => (
                                              <FormItem className="flex-1 flex flex-col">
                                                <FormLabel className="capitalize">
                                                  {require}
                                                </FormLabel>
                                                <FormControl>
                                                  <Input
                                                    {...field}
                                                    type="number"
                                                    min={0}
                                                    placeholder="Số lượng"
                                                    value={(field.value as number) ?? 0}
                                                    onChange={(e) =>
                                                      field.onChange(Number(e.target.value))
                                                    }
                                                  />
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  );
                                },
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                );
              })}
              <FormMessage />
            </FormItem>
            <Button
              variant="outline"
              type="button"
              onClick={() =>
                appendContent({ platform: '', post_type: '', postDetails: [], quantity: 1 })
              }
            >
              <Icons.plus className="w-10" />
              Thêm nền tảng khác
            </Button>
          </div>
          <div className="flex justify-end gap-2.5">
            <DialogClose name="close-campaignPopup" ref={dialogCloseRef}>
              <Button
                variant={'outline'}
                className="text-destructive hover:text-destructive"
                type="reset"
              >
                {onUpdating ? 'Xóa' : 'Hủy'}
              </Button>
            </DialogClose>
            <Button variant={'default'} type="submit" disabled={isPosting}>
              {onUpdating
                ? isUpdating
                  ? 'Cập nhật'
                  : 'Đang cập nhật'
                : isPosting
                  ? 'Đang đăng...'
                  : 'Đăng chiến dịch'}
            </Button>
          </div>
        </form>
      </Form>
      {/* <DialogClose ref={dialogCloseRef} className="hidden" /> */}
    </DialogContent>
  );
}
