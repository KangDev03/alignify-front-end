import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

import { Icons } from '@/components/icons/icons';
import { useGetCategoriesQuery } from '@/features/common/common.service';
import { setRefetch } from '@/features/home/home.slice';
import type { ContentPosting } from '@/features/home/home.type';
import { useUpdateContentPostingMutation } from '@/features/profile/profile.service';
import { useSendNotification } from '@/hooks/useSendNotification';
import { cn } from '@/lib/utils';
import type { RootState } from '@/redux/store';
import { isApiResponseError } from '@/utils/format';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';

import { contentFormSchema, type ContentFormValues } from '../posting.schema';
import { usePostContentMutation } from '../posting.service';

interface PopUpContentProps {
  contentData?: ContentPosting;
}
const MAX_CATEGORIES = 3;

export default function ContentPopUp({ contentData }: PopUpContentProps) {
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const [postContent, { isLoading: isPosting }] = usePostContentMutation();
  const [updateContent, { isLoading: isUpdating }] = useUpdateContentPostingMutation();
  const dispatch = useDispatch();
  const sendNotification = useSendNotification();
  const { avatarUrl, id, name } = useSelector((state: RootState) => state.auth);
  const { data: rawData } = useGetCategoriesQuery();
  const categories = rawData?.data;
  const onUpdating = contentData !== undefined && contentData !== null;
  const imageUrl = contentData && contentData.imageUrl;

  const form = useForm<ContentFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(contentFormSchema),
    defaultValues: {
      contentName: contentData?.contentName ?? '',
      content: contentData?.content ?? '',
      categoryIds: contentData?.categories.map((cat) => cat.categoryId) ?? [],
      isPublic: contentData?.isPublic ?? false,
      image: undefined,
    },
  });

  const onSubmit = async (values: ContentFormValues) => {
    try {
      const { image: file, ...contentRaw } = values;
      const formData = new FormData();
      if (file) formData.append('image', file);
      formData.append('contentPosting', JSON.stringify(contentRaw));
      if (onUpdating) {
        await updateContent({ formData, id: contentData.contentId }).unwrap();
        toast.success('Cập nhật bài viết thành công!');
      } else {
        await postContent({ formData }).unwrap();
        toast.success('Đăng bài viết thành công!');
      }
      dialogCloseRef.current?.click();
      form.reset();
      dispatch(setRefetch({ key: 'forum', value: true }));
      sendNotification({
        userId: id!,
        content: onUpdating ? `Bạn đã cập nhật bài viết thành công` : `Bạn đã đăng bài thành công`,
        name: name!,
        avatarUrl: avatarUrl!,
      });
    } catch (err) {
      if (isApiResponseError(err)) {
        if (Number(err.data.status) === 403) {
          toast.error('Bạn không có quyền đăng bài viết!');
        } else {
          toast.error(
            onUpdating
              ? 'Cập nhật bài viết thất bại. Vui lòng thử lại!'
              : 'Đăng bài thất bại. Vui lòng thử lại!',
          );
        }
      } else {
        toast.error(
          onUpdating
            ? 'Cập nhật bài viết thất bại. Vui lòng thử lại!'
            : 'Đăng bài thất bại. Vui lòng thử lại!',
        );
      }
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
    <DialogContent showCloseButton={false} className="p-0 py-6 sm:max-w-[650px] text-base h-[72%]">
      <DialogHeader className="flex flex-col gap-1.5 px-6">
        <DialogTitle className="flex items-center gap-1 text-primary font-bold border-b-2 pb-1 border-primary w-fit">
          <Icons.penTool className="size-6 rotate-180" />
          <p className="text-lg leading-4">
            {onUpdating ? 'Chỉnh sửa bài viết' : 'Đăng bài viết mới'}
          </p>
        </DialogTitle>
        <DialogDescription>
          {onUpdating
            ? 'Chỉnh sửa nội dung và cài đặt quyền riêng tư cho bài viết của bạn.'
            : 'Chia sẻ kinh nghiệm, mẹo hay hoặc đặt câu hỏi với cộng đồng influencer.'}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground scrollbar-track-transparent px-6"
        >
          <FormField
            control={form.control}
            name="contentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề bài viết</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tiêu đề bài viết" {...field} />
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
                <FormLabel>Ảnh bài đăng *</FormLabel>
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
                            <DialogTrigger asChild>
                              <Button type="button" variant="secondary" size="sm">
                                <Icons.eye />
                                <span>Xem trước ảnh</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent showCloseButton={false} className="p-3">
                              <div className="flex flex-col space-y-3">
                                <img
                                  src={
                                    field.value instanceof File
                                      ? URL.createObjectURL(field.value)
                                      : imageUrl
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

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nội dung bài viết *</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-24"
                    placeholder="Chia sẻ kinh nghiệm, mẹo hay, hoặc đặt câu hỏi..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isPublic"
            render={({ field }) => (
              <FormItem className="flex flex-col rounded-md border p-4">
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                    <FormLabel className="flex items-center gap-2">
                      <Icons.globe className="w-4 h-4" />
                      Công khai
                    </FormLabel>
                  </div>
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  {field.value
                    ? 'Bài viết sẽ hiển thị công khai cho tất cả mọi người'
                    : 'Bài viết chỉ hiển thị cho bạn'}
                </p>
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2.5">
            <DialogClose name="close-campaignPopup" ref={dialogCloseRef}>
              <Button
                variant={'outline'}
                className="text-destructive hover:text-destructive"
                type="reset"
              >
                Hủy
              </Button>
            </DialogClose>
            <Button variant={'default'} type="submit" disabled={isPosting || isUpdating}>
              {onUpdating ? (
                isUpdating ? (
                  <>
                    <Icons.loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang cập nhật...
                  </>
                ) : (
                  'Cập nhật bài viết'
                )
              ) : isPosting ? (
                <>
                  <Icons.loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang đăng...
                </>
              ) : (
                'Đăng bài viết'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
