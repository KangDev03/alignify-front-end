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
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { Icons } from '@/components/icons/icons';
import { zodResolver } from '@hookform/resolvers/zod';

import { contentFormSchema } from '../posting.schema';
import type { Categories } from '../posting.type';

export default function ContentPopUp({ categories }: Categories) {
  const form = useForm<z.infer<typeof contentFormSchema>>({
    resolver: zodResolver(contentFormSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  function onSubmit(values: z.infer<typeof contentFormSchema>) {
    console.log(values);
  }
  return (
    <DialogContent
      showCloseButton={false}
      className="p-6 w-[564px] text-base max-h-[80%] overflow-x-scroll"
    >
      <DialogHeader className="flex flex-col gap-1.5">
        <DialogTitle className="flex gap-2">
          <Icons.penTool className="w-5 h-5" />
          <h3 className="font-semibold text-lg leading-4">Đăng bài viết mới</h3>
        </DialogTitle>
        <DialogDescription>
          Chia sẻ kinh nghiệm, mẹo hay hoặc đặt câu hỏi với cộng đồng influencer.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề bài viết</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tiêu đề bài viết" required {...field} />
                </FormControl>
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
                    required
                  />
                </FormControl>
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
              Đăng bài viết
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
