import { useRef } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
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
import { Textarea } from '@/components/ui/textarea';

import { Icons } from '@/components/icons/icons';
import type { Category } from '@/features/common/common.type';
import { setRefetch } from '@/features/home/home.slice';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';

import { campaignFormSchema, type CampaignFormValues } from '../posting.schema';
import { usePostCampaignMutation } from '../posting.service';

interface PopUpCampaignProps {
  categories: Category[];
}
const MAX_CATEGORIES = 3;

export default function CampaignPopUp({ categories }: PopUpCampaignProps) {
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const [postCampaign, { isLoading: isPosting }] = usePostCampaignMutation();
  const dispatch = useDispatch();

  const form = useForm<CampaignFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      campaignName: '',
      content: '',
      budget: 0,
      influencerCountExpected: 0,
      startAt: new Date(),
      dueAt: new Date(),
      influencerRequirements: [{ index: 0, requirement: '' }],
      campaignRequirements: [{ content: '', quantity: 0 }],
      categoryIds: [],
      image: undefined,
    },
  });

  const {
    fields: influencerFields,
    append: appendInfluencer,
    remove: removeInfluencer,
  } = useFieldArray<CampaignFormValues, 'influencerRequirements'>({
    control: form.control,
    name: 'influencerRequirements' as const,
  });

  const {
    fields: contentFields,
    append: appendContent,
    remove: removeContent,
  } = useFieldArray<CampaignFormValues, 'campaignRequirements'>({
    control: form.control,
    name: 'campaignRequirements',
  });

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
        startAt: startAt.toISOString(),
        dueAt: dueAt.toISOString(),
        campaignRequirements: campaignRequirements.reduce(
          (acc, item) => {
            acc[item.content.toLowerCase()] = item.quantity;
            return acc;
          },
          {} as Record<string, number>,
        ),
        influencerRequirements: influencerRequirements.map((item) => item.requirement),
      };
      console.log(campaignRaw);
      const formData = new FormData();
      if (file) formData.append('image', file);
      formData.append('campaign', JSON.stringify(campaignRaw));
      const res = await postCampaign({ formData }).unwrap();
      dialogCloseRef.current?.click();
      form.reset();
      dispatch(setRefetch({ key: 'campaign', value: true }));
      toast.error('Đăng bài thành công!');
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
    <DialogContent showCloseButton={false} className="p-0 py-6 w-[564px] h-[85%] text-base">
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
                      {field.value && (
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
                                  src={URL.createObjectURL(field.value as File)}
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
                  <FormLabel>Ngân sách *</FormLabel>
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
                      value={field.value ? field.value.toISOString().split('T')[0] : ''}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
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
                      value={field.value ? field.value.toISOString().split('T')[0] : ''}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col">
            <FormItem>
              <FormLabel className="">Yêu cầu về Influencer *</FormLabel>
              {influencerFields.map((item, idx) => (
                <div key={item.id} className="flex gap-2">
                  <FormField
                    control={form.control}
                    name={`influencerRequirements.${idx}.requirement`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input {...field} placeholder="Yêu cầu" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => {
                      if (influencerFields.length > 1) removeInfluencer(idx);
                    }}
                  >
                    <Icons.minus />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => appendInfluencer({ index: idx + 1, requirement: '' })}
                  >
                    <Icons.plus />
                  </Button>
                </div>
              ))}
            </FormItem>
            <FormMessage />
          </div>
          <div className="flex flex-col">
            <FormItem>
              <FormLabel className="">Yêu cầu của bạn *</FormLabel>
              {contentFields.map((item, idx) => (
                <div key={item.id} className="flex gap-2">
                  <FormField
                    control={form.control}
                    name={`campaignRequirements.${idx}.content`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input {...field} placeholder="Yêu cầu" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`campaignRequirements.${idx}.quantity`}
                    render={({ field }) => (
                      <FormItem className="w-15">
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Giá trị"
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => {
                      if (contentFields.length > 1) removeContent(idx);
                    }}
                  >
                    <Icons.minus />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => appendContent({ content: '', quantity: 0 })}
                  >
                    <Icons.plus />
                  </Button>
                </div>
              ))}
            </FormItem>

            <FormMessage />
          </div>
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
            <Button variant={'default'} type="submit" disabled={isPosting}>
              {isPosting ? 'Đang tạo...' : 'Đăng chiến dịch'}
            </Button>
          </div>
        </form>
      </Form>
      {/* <DialogClose ref={dialogCloseRef} className="hidden" /> */}
    </DialogContent>
  );
}
