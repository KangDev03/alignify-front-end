import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
import type { Category } from '@/features/common/common.type';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';

import { contentFormSchema } from '../posting.schema';

interface PopUpContentProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
  selectedCategories?: string[];
}

export default function ContentPopUp({
  categories,
  onSelectCategory,
  selectedCategories = [],
}: PopUpContentProps) {
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const form = useForm<z.infer<typeof contentFormSchema>>({
    mode: 'onSubmit',
    resolver: zodResolver(contentFormSchema),
    defaultValues: {
      title: '',
      content: '',
      categoryIds: [],
    },
  });

  function onSubmit(values: z.infer<typeof contentFormSchema>) {
    console.log(values);
    try {
      dialogCloseRef.current?.click();
      form.reset();
      toast.error('Đăng bài thành công!');
    } catch (err) {
      console.log(err);
      toast.error('Đăng bài thất bại. Vui lòng thử lại!');
    }
  }
  return (
    <DialogContent showCloseButton={false} className="p-0 py-6 w-[564px] text-base h-[72%]">
      <DialogHeader className="flex flex-col gap-1.5 px-6">
        <DialogTitle className="flex items-center gap-1 text-primary font-bold border-b-2 pb-1 border-primary w-fit">
          <Icons.penTool className="size-6 rotate-180" />
          <p className="text-lg leading-4">Đăng bài viết mới</p>
        </DialogTitle>
        <DialogDescription>
          Chia sẻ kinh nghiệm, mẹo hay hoặc đặt câu hỏi với cộng đồng influencer.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground scrollbar-track-transparent px-6"
        >
          <FormField
            control={form.control}
            name="title"
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
          <div className="flex flex-col gap-2">
            <p className="font-medium">Danh mục *</p>
            <div className="flex flex-wrap gap-2">
              {categories &&
                categories.map((category) => (
                  <Badge
                    key={category.categoryId}
                    variant={
                      selectedCategories.length > 0 &&
                      selectedCategories.includes(category.categoryId)
                        ? 'default'
                        : 'outline'
                    }
                    className={cn(
                      'flex justify-center items-center gap-1 h-6 rounded-md text-xs font-medium cursor-pointer capitalize',
                    )}
                    onClick={() => onSelectCategory?.(category.categoryId)}
                  >
                    {category.categoryName}
                    {selectedCategories.includes(category.categoryId) && (
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
          <div className="flex justify-end gap-2.5">
            <DialogClose ref={dialogCloseRef}>
              <Button
                variant={'outline'}
                className="text-destructive hover:text-destructive"
                type="reset"
              >
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
