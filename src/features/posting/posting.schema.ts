import { z } from 'zod';

export const contentFormSchema = z.object({
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

export const campaignFormSchema = z
  .object({
    campaignName: z.string().min(10, {
      message: 'Tiêu đề phải có ít nhất 10 ký tự',
    }),
    content: z.string().min(20, {
      message: 'Mô tả phải có ít nhất 20 ký tự',
    }),
    image: z.instanceof(File, { message: 'Poster phải là file ảnh' }).refine(
      (file) => {
        return ['image/jpeg', 'image/png', 'image/gif'].includes(file.type);
      },
      { message: 'Poster phải là file ảnh (JPEG, PNG, hoặc GIF)' },
    ),
    budget: z
      .number()
      .min(1000000, {
        message: 'Ngân sách phải lớn hơn hoặc bằng 1,000,000 VND',
      })
      .max(1000000000, {
        message: 'Ngân sách không được vượt quá 1,000,000,000 VND',
      }),
    influencerCountExpected: z
      .number()
      .min(1, {
        message: 'Số lượng influencer phải lớn hơn hoặc bằng 1',
      })
      .max(10, {
        message: 'Số lượng influencer không được vượt quá 10',
      }),
    startAt: z.date().refine((date: Date) => date >= new Date(), {
      message: 'Ngày bắt đầu phải là hôm nay hoặc trong tương lai',
    }),
    dueAt: z.date().refine((date: Date) => date >= new Date(), {
      message: 'Ngày kết thúc phải là hôm nay hoặc trong tương lai',
    }),
    influencerRequirements: z.array(
      z.object({
        index: z.number(),
        requirement: z.string().min(1, { message: 'Nội dung yêu cầu không được bỏ trống' }),
      }),
    ),
    campaignRequirements: z.array(
      z.object({
        content: z.string().min(1, {
          message: 'Nội dung yêu cầu không được bỏ trống',
        }),
        quantity: z.number().min(1, {
          message: 'Số lượng phải lớn hơn 0',
        }),
      }),
    ),
    categoryIds: z
      .array(z.string())
      .max(3, {
        message: 'Bạn chỉ có thể chọn tối đa 3 danh mục',
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.startAt && data.dueAt) {
        return data.dueAt > data.startAt;
      }
      return true;
    },
    {
      message: 'Ngày kết thúc phải sau ngày bắt đầu',
      path: ['dueAt'],
    },
  );

export type CampaignFormValues = z.infer<typeof campaignFormSchema>;
