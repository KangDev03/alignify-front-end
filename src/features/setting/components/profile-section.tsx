'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
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

import { changeUserAvtar } from '@/features/auth/auth.slice';
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

import { useEditProfileMutation } from '../setting.service';
import type { BrandProfileRequest, InfluencerProfileRequest } from '../setting.type';

export default function ProfileSection() {
  const { role: roleName } = useAppSelector((state: RootState) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newSocialMedia, setNewSocialMedia] = useState({ platform: '', url: '' });
  const [newContact, setNewContact] = useState({ type: '', value: '' });
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | undefined>(undefined);
  // const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [changeAvatar] = useChangeAvatarMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editProfile] = useEditProfileMutation();

  const brandProfile = useGetBrandProfileUserQuery(undefined);
  const influencerProfile = useGetInfluencerProfileUserQuery(undefined);
  const { data: categories } = useGetCategoriesQuery();

  const profileData = roleName === 'BRAND' ? brandProfile.data : influencerProfile.data;
  const MAX_CATEGORIES = 3;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      avatarFile: undefined,
      backgroundFile: undefined,
      bio: profileData?.data.bio ?? '',
      categoryIds: profileData?.data.categories?.map((category) => category.categoryId) ?? [],
      socialMediaLinks: Array.isArray(profileData?.data.socialMediaLinks)
        ? (profileData?.data.socialMediaLinks as { key: string; value: string }[]).map((item) => ({
            platform: item.key,
            url: item.value,
          }))
        : [],
      contacts:
        profileData?.data && 'contacts' in profileData.data && profileData.data.contacts
          ? Object.entries(profileData.data.contacts).map(([type, rawValue]) => ({
              type,
              value: typeof rawValue === 'string' ? rawValue : (rawValue?.key ?? ''),
            }))
          : [],
    },
  });

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

      follower: 'follower' in profile ? profile.follower : undefined,

      socialMediaLinks: profile.socialMediaLinks
        ? Object.entries(profile.socialMediaLinks).map(([platform, rawUrl]) => ({
            platform,
            url: typeof rawUrl === 'string' ? rawUrl : (rawUrl?.key ?? ''),
          }))
        : [],

      contacts:
        'contacts' in profile && profile.contacts
          ? Object.entries(profile.contacts).map(([type, rawValue]) => ({
              type,
              value: typeof rawValue === 'string' ? rawValue : (rawValue?.key ?? ''),
            }))
          : [],
    };
    setAvatarPreviewUrl(profile.avatarUrl ?? undefined);
    form.reset(formattedData);
    console.log(formattedData);
  }, [profileData, form]);

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

  const formatFollowerCount = (count: number) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  const addSocialMedia = () => {
    const { platform, url } = newSocialMedia;

    if (platform && url) {
      const currentLinks = form.getValues('socialMediaLinks') || [];

      const index = currentLinks.findIndex((link) => link.platform === platform);
      let updatedLinks;

      if (index === -1) {
        updatedLinks = [...currentLinks, { platform, url }];
      } else {
        updatedLinks = [...currentLinks];
        updatedLinks[index] = { platform, url };
      }

      form.setValue('socialMediaLinks', updatedLinks, { shouldDirty: true });
      form.trigger('socialMediaLinks'); // đảm bảo form nhận thay đổi

      setNewSocialMedia({ platform: '', url: '' });
    }
  };
  const removeSocialMedia = (index: number) => {
    const confirmed = window.confirm('Bạn có chắc muốn xoá liên kết này?');

    if (confirmed) {
      const currentLinks = form.getValues('socialMediaLinks') || [];
      const newLinks = currentLinks.filter((_, i) => i !== index);
      form.setValue('socialMediaLinks', newLinks, { shouldDirty: true });
      form.trigger('socialMediaLinks');
    }
  };

  const addContact = () => {
    const { type, value } = newContact;

    if (!type || !value) {
      toast.error('Vui lòng nhập đầy đủ thông tin liên hệ');
      return;
    }

    const currentContacts = form.getValues('contacts') || [];

    const index = currentContacts.findIndex((contact) => contact.type === type);

    let updatedContacts;

    if (index === -1) {
      updatedContacts = [...currentContacts, { type, value }];
    } else {
      updatedContacts = [...currentContacts];
      updatedContacts[index] = { type, value };
    }

    form.setValue('contacts', updatedContacts, { shouldDirty: true });
    form.trigger('contacts');

    setNewContact({ type: '', value: '' });

    // ✅ Thêm console log này để kiểm tra kết quả:
    console.log('Updated Contacts:', form.getValues('contacts'));
  };

  const removeContact = (index: number) => {
    const confirmed = window.confirm('Bạn có chắc muốn xoá liên hệ này?');

    if (confirmed) {
      const currentContacts = form.getValues('contacts') || [];
      const newContacts = currentContacts.filter((_, i) => i !== index);
      form.setValue('contacts', newContacts, { shouldDirty: true });
      form.trigger('contacts');
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
      setIsSubmitting(true);

      const formData = new FormData();

      if (values.avatarFile) {
        formData.append('avatar', values.avatarFile);
      }

      if (values.backgroundFile) {
        formData.append('background', values.backgroundFile);
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
            values.socialMediaLinks?.reduce((acc: { [key: string]: string }, link) => {
              if (link.platform && link.url) {
                acc[link.platform] = link.url;
              }
              return acc;
            }, {}) || {},
          contacts:
            values.contacts?.reduce((acc: { [key: string]: string }, contact) => {
              if (contact.type && contact.value) {
                acc[contact.type] = contact.value;
              }
              return acc;
            }, {}) || {},
        };
      } else {
        const { email: _email, follower: _follower, contacts: _contacts, ...rest } = values;

        profileData = {
          ...rest,
          doB: values.doB ? values.doB.toISOString() : undefined,
          socialMediaLinks:
            values.socialMediaLinks?.reduce((acc: { [key: string]: string }, link) => {
              if (link.platform && link.url) {
                acc[link.platform] = link.url;
              }
              return acc;
            }, {}) || {},
        };
      }
      await editProfile(profileData).unwrap();

      toast.success('Cập nhật hồ sơ thành công!');
      await brandProfile.refetch();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Cập nhật hồ sơ thất bại. Vui lòng thử lại!');
    } finally {
      setIsSubmitting(false);
    }
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
                  <p className="text-sm text-muted-foreground">JPG, GIF hoặc PNG. Tối đa 1MB.</p>
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
                <FormLabel>Email *</FormLabel>
                <Input
                  type="email"
                  value={profileData?.data?.email || ''}
                  readOnly
                  className="cursor-not-allowed bg-muted"
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
                        <Select onValueChange={field.onChange} value={field.value || undefined}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn giới tính" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Nam</SelectItem>
                            <SelectItem value="female">Nữ</SelectItem>
                            <SelectItem value="other">Khác</SelectItem>
                          </SelectContent>
                        </Select>
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
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
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
                      <div className="text-2xl font-bold text-blue-600">
                        {formatFollowerCount(form.watch('follower') || 0)}
                      </div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="flex items-center justify-center text-2xl font-bold text-yellow-600">
                        <Star className="h-6 w-6 mr-1 fill-current" />
                        <div>
                          {profileData?.data && 'rating' in profileData.data
                            ? `${profileData.data.rating} ★`
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
                    <p className="text-sm text-muted-foreground">
                      Chọn tối đa 3 lĩnh vực chuyên môn của bạn
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {categories &&
                        categories.data.map((category) => (
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
                  <div className="space-y-3">
                    {form.watch('socialMediaLinks')?.map((social, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium capitalize">{social.platform}</div>
                          <div className="text-sm text-muted-foreground">{social.url}</div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSocialMedia(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Select
                        value={newSocialMedia.platform}
                        onValueChange={(value) =>
                          setNewSocialMedia({ ...newSocialMedia, platform: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn nền tảng" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="instagram">TikTok</SelectItem>
                          <SelectItem value="twitter">Twitter</SelectItem>
                          <SelectItem value="youtube">YouTube</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="URL"
                        value={newSocialMedia.url}
                        onChange={(e) =>
                          setNewSocialMedia({ ...newSocialMedia, url: e.target.value })
                        }
                      />
                    </div>
                    <Button type="button" onClick={addSocialMedia} size="sm" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm liên kết
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {roleName === 'BRAND' && (
            <>
              {/* Company Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin công ty</CardTitle>
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
                    <p className="text-sm text-muted-foreground">
                      Chọn tối đa 3 lĩnh vực kinh doanh của công ty
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {categories?.data.map((category) => (
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

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin liên hệ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {form.watch('contacts')?.map((contact, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium capitalize">{contact.type}</div>
                          <div className="text-sm text-muted-foreground">{contact.value}</div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeContact(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Select
                        value={newContact.type}
                        onValueChange={(value) => setNewContact({ ...newContact, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Loại liên hệ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="phone">Số điện thoại</SelectItem>
                          <SelectItem value="address">Địa chỉ</SelectItem>
                          <SelectItem value="hotline">Email</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Thông tin liên hệ"
                        value={newContact.value}
                        onChange={(e) => setNewContact({ ...newContact, value: e.target.value })}
                      />
                    </div>
                    <Button type="button" onClick={addContact} size="sm" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm thông tin liên hệ
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Liên kết mạng xã hội</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {form.watch('socialMediaLinks')?.map((social, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium capitalize">{social.platform}</div>
                          <div className="text-sm text-muted-foreground">{social.url}</div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSocialMedia(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Select
                        value={newSocialMedia.platform}
                        onValueChange={(value) =>
                          setNewSocialMedia({ ...newSocialMedia, platform: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn nền tảng" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="instagram">TikTok</SelectItem>
                          <SelectItem value="twitter">Twitter</SelectItem>
                          <SelectItem value="youtube">YouTube</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="URL"
                        value={newSocialMedia.url}
                        onChange={(e) =>
                          setNewSocialMedia({ ...newSocialMedia, url: e.target.value })
                        }
                      />
                    </div>
                    <Button type="button" onClick={addSocialMedia} size="sm" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm liên kết
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
