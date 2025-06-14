import { useForm } from 'react-hook-form';
import type { z } from 'zod';

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
import { Textarea } from '@/components/ui/textarea';

import { Icons } from '@/components/icons/icons';
import { zodResolver } from '@hookform/resolvers/zod';

import { campaignFormSchema } from '../posting.schema';
import type { Categories } from '../posting.type';

export default function CampaignPopUp({ categories }: Categories) {
  const form = useForm<z.infer<typeof campaignFormSchema>>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      title: '',
      description: '',
      budget: 0,
      quantity: 0,
      startAt: new Date(),
      endAt: new Date(),
      influencerRequirement: '',
      contentRequirement: '',
    },
  });

  function onSubmit(values: z.infer<typeof campaignFormSchema>) {
    console.log(values);
  }
  return (
    <DialogContent
      showCloseButton={false}
      className="p-6 w-[564px] h-[80%] text-base overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground scrollbar-track-transparent"
    >
      <DialogHeader className="flex flex-col gap-1.5">
        <DialogTitle className="flex gap-2">
          <Icons.megaphone className="w-5 h-5" />
          <h3 className="font-semibold text-lg leading-4">Tạo chiến dịch mới</h3>
        </DialogTitle>
        <DialogDescription>
          Tạo chiến dịch mới để tìm kiếm và hợp tác với các influencer phù hợp.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 96">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề chiến dịch *</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tiêu đề chiến dịch" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả chiến dịch *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Mô tả chi tiết về chiến dịch"
                    className="h-24"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">
            <p className="font-medium">Danh mục *</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category.id}
                  className="flex justify-center items-center gap-1 h-6 rounded-md text-xs font-medium"
                >
                  {category.name}
                  <Icons.x className="w-3 h-3" />
                </Badge>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngân sách *</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="10,000,000 VND" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số lượng Influencer*</FormLabel>
                  <FormControl>
                    <Input placeholder="5" required {...field} />
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
                      required
                      // value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                      // onChange={(e) => field.onChange(new Date(e.target.value))}
                      // onBlur={field.onBlur}
                      // placeholder="dd/MM/yyyy"
                      // name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày kết thúc *</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      required
                      // value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                      // onChange={(e) => field.onChange(new Date(e.target.value))}
                      // onBlur={field.onBlur}
                      // name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="influencerRequirement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Yêu cầu đối với influencer *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="VD: Có ít nhất 50K followers.  Hoạt động trong lĩnh vực thời trang..."
                    className="h-24"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contentRequirement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nội dung yêu cầu *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="VD: 3 bài đăng Instagram,  2  Stories, 1 Reel..."
                    className="h-24"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-2.5">
            <DialogClose>
              <Button variant={'outline'} className="text-" type="reset">
                Hủy
              </Button>
            </DialogClose>
            <Button variant={'default'} type="submit">
              Tạo chiến dịch
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
