'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Camera, Plus, Save, Star, X } from 'lucide-react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

import { Icons } from '@/components/icons/icons';
import { changeName, changeUserAvtar } from '@/features/auth/auth.slice';
import { useGetCategoriesQuery } from '@/features/common/common.service';
import {
  useChangeAvatarMutation,
  useGetBrandProfileUserQuery,
  useGetInfluencerProfileUserQuery,
} from '@/features/profile/profile.service';
import { profileFormSchema, type ProfileFormValues } from '@/features/setting/setting.schema';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useSendNotification } from '@/hooks/useSendNotification';
import { cn } from '@/lib/utils';
import type { RootState } from '@/redux/store';
import { parseIsoToDateTime } from '@/utils/format';
import { zodResolver } from '@hookform/resolvers/zod';

import { FollowerInput } from './follower';
import { useEditProfileMutation } from '../setting.service';
import type {
  BrandProfileRequest,
  Contact,
  InfluencerProfileRequest,
  SocialMedia,
} from '../setting.type';

export default function ProfileSection() {
  const { role: roleName } = useAppSelector((state: RootState) => state.auth);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | undefined>(undefined);
  const [changeAvatar] = useChangeAvatarMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editProfile, { isLoading }] = useEditProfileMutation();

  const brandProfile = useGetBrandProfileUserQuery(undefined);
  const influencerProfile = useGetInfluencerProfileUserQuery(undefined);
  const { data: categories } = useGetCategoriesQuery();

  const profileData = roleName === 'BRAND' ? brandProfile.data : influencerProfile.data;
  const MAX_CATEGORIES = 3;

  const [approveSocialLinks, setApproveSocialLinks] = useState<SocialMedia[]>([]);

  const form = useForm<ProfileFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      avatarFile: undefined,
      backgroundFile: undefined,
      bio: profileData?.data.bio ?? '',
      email: profileData?.data.email,
      categoryIds: profileData?.data.categories?.map((category) => category.categoryId) ?? [],
      socialMediaLinks: Array.isArray(profileData?.data.socialMediaLinks)
        ? (profileData?.data.socialMediaLinks as SocialMedia[]).map((item) => ({
          platform: item.platform,
          url: item.url,
          follower: item.follower,
        }))
        : [],
      contacts:
        profileData?.data && 'contacts' in profileData.data && profileData.data.contacts
          ? Array.isArray(profileData?.data.contacts)
            ? (profileData?.data.contacts as Contact[]).map((item) => ({
              contact_type: item.contact_type,
              contact_infor: item.contact_infor,
            }))
            : []
          : [],
    },
  });

  const {
    fields: contactFields,
    append: appendContact,
    remove: removeContact,
  } = useFieldArray({
    control: form.control,
    name: 'contacts',
  });
  const {
    fields: socialFields,
    append: appendSocial,
    remove: removeSocial,
  } = useFieldArray({
    control: form.control,
    name: 'socialMediaLinks',
  });

  const contactTypeOptions = [
    { value: 'phone', label: 'Số điện thoại' },
    { value: 'address', label: 'Địa chỉ' },
    { value: 'email', label: 'Email' },
  ];

  const socialPlatformOptions = [
    { value: 'TIKTOK', label: 'TikTok' },
    { value: 'YOUTUBE', label: 'YouTube' },
    { value: 'FACEBOOK', label: 'Facebook' },
    { value: 'INSTAGRAM', label: 'Instagram' },
  ];

  useEffect(() => {
    if (!profileData?.data) return;

    const profile = profileData.data;

    const formattedData: ProfileFormValues = {
      name: profile.name,
      email: profile.email,
      bio: profile.bio || '',
      isPublic: 'isPublic' in profile ? profile.isPublic : true,
      gender:
        'gender' in profile && ['male', 'female', 'other'].includes(profile.gender?.toLowerCase?.())
          ? (profile.gender.toLowerCase() as 'male' | 'female' | 'other')
          : undefined,

      doB: 'doB' in profile && profile.doB ? parseIsoToDateTime(profile.doB).toJSDate() : undefined,

      establishDate:
        'establishDate' in profile && profile.establishDate
          ? parseIsoToDateTime(profile.establishDate).toJSDate()
          : undefined,

      categoryIds: profile.categories?.map((c) => c.categoryId) || [],
      avatarFile: undefined,

      socialMediaLinks: Array.isArray(profile.socialMediaLinks)
        ? (profile.socialMediaLinks as SocialMedia[]).map((item) => ({
          platform: item.platform,
          url: item.url,
          follower: item.follower,
        }))
        : [],

      contacts:
        'contacts' in profile && profile.contacts
          ? Array.isArray(profile.contacts)
            ? (profile.contacts as Contact[]).map((item) => ({
              contact_type: item.contact_type,
              contact_infor: item.contact_infor,
            }))
            : []
          : [],
    };
    setAvatarPreviewUrl(profile.avatarUrl ?? undefined);
    form.reset(formattedData);
  }, [profileData, form]);

  useEffect(() => {
    (profileData?.data.socialMediaLinks && Array.isArray(profileData.data.socialMediaLinks)
      ? profileData.data.socialMediaLinks.map((item) => ({
        platform: item.platform,
        url: item.url,
        follower: item.follower,
      }))
      : []
    ).forEach((item) => {
      setApproveSocialLinks((prev) => {
        return [...prev, item];
      });
    });
  }, [form, profileData?.data.socialMediaLinks]);

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

  const dispatch = useAppDispatch();
  const sendNotification = useSendNotification();
  const { id, name } = useSelector((state: RootState) => state.auth);

  const handleChangeAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // setPopoverOpen(false);
    const file = event.target.files?.[0] || null;
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      return;
    }
    const image = new FormData();
    image.append('image', file);
    try {
      const response = await changeAvatar({ image }).unwrap();
      dispatch(changeUserAvtar({ url: response.data }));
      setAvatarPreviewUrl(response.data);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      sendNotification({
        userId: id!,
        content: `${name} đã cập nhật ảnh đại diện thành công`,
      });
      // toast.success('Cập nhật ảnh đại diện thành công');
    } catch (error) {
      toast.success('Cập nhật ảnh đại diện thất bại');
      console.error('Error uploading avatar:', error);
    }
  };

  // const handleBackgroundChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0]
  //   if (file) {
  //     form.setValue("backgroundFile", file)
  //   }
  // }

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      // setIsSubmitting(true);

      const formData = new FormData();

      if (values.avatarFile) {
        formData.append('avatar', values.avatarFile);
      }

      if (values.backgroundFile) {
        formData.append('background', values.backgroundFile);
      }

      if (values.name !== null) {
        dispatch(changeName({ name: values.name }));
      }

      let profileData: InfluencerProfileRequest | BrandProfileRequest;

      if (roleName === 'BRAND') {
        const { email: _email, follower: _follower, isPublic: _isPublic, ...rest } = values;

        profileData = {
          ...rest,
          establishDate:
            values.establishDate && !isNaN(new Date(values.establishDate).getTime())
              ? new Date(values.establishDate).toISOString()
              : undefined,
          socialMediaLinks:
            values.socialMediaLinks
              ?.filter((social) => social.platform && social.follower && social.url)
              .map((social) => ({
                platform: social.platform.toUpperCase(),
                url: social.url,
                follower: social.follower,
              })) || [],
          contacts:
            values.contacts?.filter((contact) => contact.contact_infor && contact.contact_type) ||
            [],
        };
      } else {
        const { email: _email, follower: _follower, contacts: _contacts, ...rest } = values;

        profileData = {
          ...rest,
          doB: values.doB ? values.doB.toISOString() : undefined,
          socialMediaLinks:
            values.socialMediaLinks
              ?.filter((social) => social.platform && social.follower && social.url)
              .map((social) => ({
                platform: social.platform.toUpperCase(),
                url: social.url,
                follower: social.follower,
              })) || [],
        };
      }
      await editProfile(profileData).unwrap();

      toast.success('Cập nhật hồ sơ thành công!');
      await brandProfile.refetch();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Cập nhật hồ sơ thất bại. Vui lòng thử lại!');
    } finally {
      // setIsSubmitting(false);
    }
  };

  const checkUrlWithPlatform = (platform: string, url: string) => {
    return (
      (url.match(new RegExp(`^https://www\\.${platform.toLowerCase()}\\.com/@([^/?]+)`)) != null ||
        url.match(new RegExp(`^https://www\\.${platform.toLowerCase()}\\.com/([^/?]+)`)) != null) &&
      socialPlatformOptions.findIndex(
        (item) => item.value.toLowerCase() === platform.toLowerCase(),
      ) !== -1
    );
  };

  const handleApproveSocialLinks = (platform: string, url: string, follower: number) => {
    if (!platform || !url) return;
    setApproveSocialLinks((prev) => {
      if (prev.some((item) => item.platform === platform)) return prev;
      return [...prev, { platform, url, follower }];
    });
  };

  const handleRemoveSocialLinks = (platform: string) => {
    setApproveSocialLinks((prev) => {
      return prev.filter((item) => !(item.platform === platform));
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Hồ sơ cá nhân</h3>
        <p className="text-sm text-muted-foreground">
          Cập nhật thông tin hồ sơ và ảnh đại diện của bạn.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ảnh đại diện và ảnh bìa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Background Image */}
              {/* <div className="space-y-2">
                <Label>Ảnh bìa</Label>
                <div className="relative">
                  <div className="w-full h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg bg-cover bg-center" />
                  <input
                    id="background-upload"
                    type="file"
                    accept="image/jpeg,image/png"
                    style={{ display: "none" }}
                    onChange={handleBackgroundChange}
                  />
                  <Button
                    type="button"
                    size="sm"
                    className="absolute bottom-2 right-2"
                    variant="secondary"
                    onClick={() => document.getElementById("background-upload")?.click()}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Thay đổi ảnh bìa
                  </Button>
                </div>
              </div> */}

              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={
                      form.watch('avatarFile')
                        ? URL.createObjectURL(form.watch('avatarFile') as File)
                        : avatarPreviewUrl || '/placeholder.svg?height=80&width=80'
                    }
                  />
                  <AvatarFallback>{profileData?.data?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>

                <div className="space-y-2">
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/jpeg,image/png"
                    style={{ display: 'none' }}
                    onChange={handleChangeAvatar}
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => document.getElementById('avatar-upload')?.click()}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Thay đổi ảnh đại diện
                  </Button>
                  {/* <p className="text-sm text-muted-foreground">JPG, GIF hoặc PNG. Tối đa 1MB.</p> */}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {roleName === 'BRAND' ? 'Tên thương hiệu *' : 'Họ và tên *'}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập tên..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          readOnly
                          className="cursor-not-allowed bg-muted"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {roleName === 'INFLUENCER' && (
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="doB"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ngày sinh</FormLabel>
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
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giới tính *</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value || undefined}>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn giới tính" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Nam</SelectItem>
                              <SelectItem value="female">Nữ</SelectItem>
                              <SelectItem value="other">Khác</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giới thiệu bản thân</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Viết giới thiệu về bản thân..." rows={3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-0.5">
                      <FormLabel>Hồ sơ công khai</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Cho phép mọi người xem hồ sơ của bạn
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        className="cursor-pointer"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {roleName === 'INFLUENCER' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Thống kê</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">0</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="flex items-center justify-center text-2xl font-bold text-yellow-600">
                        <Star className="h-6 w-6 mr-1 fill-current" />
                        <div>
                          {profileData?.data && 'rating' in profileData.data
                            ? `${profileData.data.rating}`
                            : 'Chưa có đánh giá'}
                        </div>{' '}
                      </div>
                      <div className="text-sm text-muted-foreground">Đánh giá</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {' '}
                        {profileData?.data && 'completedCampaign' in profileData.data
                          ? `${profileData.data.completedCampaign} `
                          : 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Chiến dịch hoàn thành</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lĩnh vực chuyên môn</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-2">
                    {/* <p className="text-sm text-muted-foreground">
                      Chọn tối đa 3 lĩnh vực chuyên môn của bạn
                    </p> */}
                    <div className="flex flex-wrap gap-2">
                      {categories &&
                        categories.data!.map((category) => (
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
                              <X className="h-3 w-3" />
                            )}
                          </Badge>
                        ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Đã chọn: {form.watch('categoryIds')?.length || 0}/3
                    </p>
                  </div>
                  <FormMessage />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Liên kết mạng xã hội</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {socialFields.map((item, idx) => {
                    const usedPlatforms =
                      form
                        .watch('socialMediaLinks')
                        ?.map((s, i) => (i === idx ? null : s.platform))
                        .filter(Boolean) || [];
                    if (
                      !form.watch(`socialMediaLinks.${idx}.platform`) &&
                      usedPlatforms.length >= socialPlatformOptions.length
                    )
                      return null;
                    return (
                      <div key={item.id} className="flex gap-2">
                        <FormField
                          control={form.control}
                          name={`socialMediaLinks.${idx}.platform`}
                          render={({ field }) => (
                            <FormItem className="w-1/5">
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value || undefined}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Nền tảng" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {socialPlatformOptions
                                      .filter(
                                        (opt) =>
                                          !usedPlatforms.includes(opt.value) ||
                                          field.value === opt.value,
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
                          name={`socialMediaLinks.${idx}.url`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input {...field} placeholder="URL" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {form.watch(`socialMediaLinks.${idx}.url`) &&
                          checkUrlWithPlatform(
                            form.watch(`socialMediaLinks.${idx}.platform`),
                            form.watch(`socialMediaLinks.${idx}.url`),
                          ) && (
                            <FormField
                              control={form.control}
                              name={`socialMediaLinks.${idx}.follower`}
                              render={({ field }) => (
                                <FormItem className="">
                                  <FormControl>
                                    {form.watch(`socialMediaLinks.${idx}.url`) &&
                                      approveSocialLinks.some(
                                        (link) =>
                                          link.platform ===
                                          form.watch(`socialMediaLinks.${idx}.platform`) &&
                                          link.url === form.watch(`socialMediaLinks.${idx}.url`),
                                      ) ? (
                                      <FollowerInput
                                        showRefetchComponent={field.value === 0}
                                        follower={field.value}
                                        url={form.watch(`socialMediaLinks.${idx}.url`)}
                                        className="w-24"
                                        type="text"
                                        {...field}
                                      />
                                    ) : (
                                      <Button
                                        variant="outline"
                                        onClick={() =>
                                          handleApproveSocialLinks(
                                            form.watch(`socialMediaLinks.${idx}.platform`),
                                            form.watch(`socialMediaLinks.${idx}.url`),
                                            form.watch(`socialMediaLinks.${idx}.follower`),
                                          )
                                        }
                                      >
                                        <Icons.check />
                                      </Button>
                                    )}
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => {
                            removeSocial(idx);
                            handleRemoveSocialLinks(form.watch(`socialMediaLinks.${idx}.platform`));
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    );
                  })}
                  {socialPlatformOptions.length > (form.watch('socialMediaLinks')?.length || 0) && (
                    <Button
                      type="button"
                      onClick={() => appendSocial({ platform: '', url: '', follower: 0 })}
                      size="sm"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm liên kết
                    </Button>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {roleName === 'BRAND' && (
            <>
              {/* Company Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin nhãn hàng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="establishDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ngày thành lập</FormLabel>
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
                </CardContent>
              </Card>

              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Lĩnh vực kinh doanh</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-2">
                    {/* <p className="text-sm text-muted-foreground">
                      Chọn tối đa 3 lĩnh vực kinh doanh của công ty
                    </p> */}
                    <div className="flex flex-wrap gap-2">
                      {categories &&
                        categories?.data?.map((category) => (
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
                              <X className="h-3 w-3" />
                            )}
                          </Badge>
                        ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Đã chọn: {form.watch('categoryIds')?.length || 0}/3
                    </p>
                  </div>
                  <FormMessage />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Thông tin liên hệ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactFields.map((item, idx) => {
                    const usedTypes =
                      form
                        .watch('contacts')
                        ?.map((c, i) => (i === idx ? null : c.contact_type))
                        .filter(Boolean) || [];
                    if (
                      !form.watch(`contacts.${idx}.contact_type`) &&
                      usedTypes.length >= contactTypeOptions.length
                    )
                      return null;
                    return (
                      <div key={item.id} className="flex gap-2">
                        <FormField
                          control={form.control}
                          name={`contacts.${idx}.contact_type`}
                          render={({ field }) => (
                            <FormItem className="w-1/5">
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value || undefined}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Loại liên hệ" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {contactTypeOptions
                                      .filter(
                                        (opt) =>
                                          !usedTypes.includes(opt.value) ||
                                          field.value === opt.value,
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
                          name={`contacts.${idx}.contact_infor`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input {...field} placeholder="Giá trị liên hệ" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => removeContact(idx)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    );
                  })}
                  {contactTypeOptions.length > (form.watch('contacts')?.length || 0) && (
                    <Button
                      type="button"
                      onClick={() => appendContact({ contact_type: '', contact_infor: '' })}
                      size="sm"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm liên hệ
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Liên kết mạng xã hội</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {socialFields.map((item, idx) => {
                    const usedPlatforms =
                      form
                        .watch('socialMediaLinks')
                        ?.map((s, i) => (i === idx ? null : s.platform))
                        .filter(Boolean) || [];
                    if (
                      !form.watch(`socialMediaLinks.${idx}.platform`) &&
                      usedPlatforms.length >= socialPlatformOptions.length
                    )
                      return null;
                    return (
                      <div key={item.id} className="flex gap-2">
                        <FormField
                          control={form.control}
                          name={`socialMediaLinks.${idx}.platform`}
                          render={({ field }) => (
                            <FormItem className="w-1/5">
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value || undefined}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Nền tảng" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {socialPlatformOptions
                                      .filter(
                                        (opt) =>
                                          !usedPlatforms.includes(opt.value) ||
                                          field.value === opt.value,
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
                          name={`socialMediaLinks.${idx}.url`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input {...field} placeholder="URL" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {form.watch(`socialMediaLinks.${idx}.url`) &&
                          checkUrlWithPlatform(
                            form.watch(`socialMediaLinks.${idx}.platform`),
                            form.watch(`socialMediaLinks.${idx}.url`),
                          ) && (
                            <FormField
                              control={form.control}
                              name={`socialMediaLinks.${idx}.follower`}
                              render={({ field }) => (
                                <FormItem className="">
                                  <FormControl>
                                    {form.watch(`socialMediaLinks.${idx}.url`) &&
                                      approveSocialLinks.some(
                                        (link) =>
                                          link.platform ===
                                          form.watch(`socialMediaLinks.${idx}.platform`) &&
                                          link.url === form.watch(`socialMediaLinks.${idx}.url`),
                                      ) ? (
                                      <FollowerInput
                                        showRefetchComponent={field.value === 0}
                                        follower={field.value}
                                        url={form.watch(`socialMediaLinks.${idx}.url`)}
                                        className="w-24"
                                        type="text"
                                        {...field}
                                      />
                                    ) : (
                                      <Button
                                        variant="outline"
                                        onClick={() =>
                                          handleApproveSocialLinks(
                                            form.watch(`socialMediaLinks.${idx}.platform`),
                                            form.watch(`socialMediaLinks.${idx}.url`),
                                            form.watch(`socialMediaLinks.${idx}.follower`),
                                          )
                                        }
                                      >
                                        <Icons.check />
                                      </Button>
                                    )}
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => {
                            removeSocial(idx);
                            handleRemoveSocialLinks(form.watch(`socialMediaLinks.${idx}.platform`));
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    );
                  })}
                  {socialPlatformOptions.length > (form.watch('socialMediaLinks')?.length || 0) && (
                    <Button
                      type="button"
                      onClick={() => appendSocial({ platform: '', url: '', follower: 0 })}
                      size="sm"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm liên kết
                    </Button>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          <div className="flex justify-end">
            <Button type="submit" disabled={!form.formState.isDirty || isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
