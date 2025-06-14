import { z } from 'zod';

export interface ContentFormSchema {
  title: string;
  content: string;
  categoryIds?: string[];
}
export const contentFormSchema: z.ZodType<ContentFormSchema> = z.object({
  title: z.string().min(10, {
    message: 'Tiêu đề phải có ít nhất 10 ký tự',
  }),
  content: z.string().min(20, {
    message: 'Nội dung phải có ít nhất 20 ký tự',
  }),
  categoryIds: z
    .array(z.string())
    .max(3, {
      message: 'Bạn chỉ có thể chọn tối đa 3 danh mục',
    })
    .optional(),
});

export type ContentFormValues = z.infer<typeof contentFormSchema>;

export interface CampaignFormSchema {
  title: string;
  description: string;
  budget: number;
  quantity: number;
  startAt: Date;
  endAt: Date;
  influencerRequirement: string;
  contentRequirement: string;
  categoryIds?: string[];
}

export const campaignFormSchema: z.ZodType<CampaignFormSchema> = z.object({
  title: z.string().min(10, {
    message: 'Tiêu đề phải có ít nhất 10 ký tự',
  }),
  description: z.string().min(20, {
    message: 'Mô tả phải có ít nhất 20 ký tự',
  }),
  budget: z
    .number()
    .min(1000000, {
      message: 'Ngân sách phải lớn hơn hoặc bằng 1,000,000 VND',
    })
    .max(1000000000, {
      message: 'Ngân sách không được vượt quá 1,000,000,000 VND',
    }),
  quantity: z
    .number()
    .min(1, {
      message: 'Số lượng influencer phải lớn hơn hoặc bằng 1',
    })
    .max(10, {
      message: 'Số lượng influencer không được vượt quá 10',
    }),
  startAt: z.date().refine((date: Date) => date > new Date(), {
    message: 'Ngày bắt đầu phải sau ngày hiện tại',
  }),
  endAt: z
    .date()
    .superRefine((date: Date, ctx: any) => {
      const startAt = ctx.parent.startAt;
      if (startAt && date <= startAt) {
        return false;
      }
      return true;
    })
    .refine((date: Date) => date > new Date(), {
      message: 'Ngày kết thúc phải sau ngày hiện tại',
    }),

  influencerRequirement: z.string().min(20, {
    message: 'Yêu cầu influencer phải có ít nhất 20 ký tự',
  }),
  contentRequirement: z.string().min(20, {
    message: 'Yêu cầu nội dung phải có ít nhất 20 ký tự',
  }),
  categoryIds: z
    .array(z.string())
    .max(3, {
      message: 'Bạn chỉ có thể chọn tối đa 3 danh mục',
    })
    .optional(),
});

export type CampaignFormValues = z.infer<typeof campaignFormSchema>;
