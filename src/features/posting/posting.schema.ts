import { z } from 'zod';

import {
  type ISupportedPlatforms,
  SupportedPlatforms,
  SupportedPostTypeByPlatform,
} from '../common/common.type';

export const contentFormSchema = z.object({
  contentName: z.string().min(10, {
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
  isPublic: z.boolean().optional(),
  image: z
    .instanceof(File, { message: 'File phải là file ảnh' })
    .refine(
      (file) => {
        return ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type);
      },
      { message: 'Poster phải là file ảnh (JPEG, PNG, hoặc GIF)' },
    )
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
    image: z
      .instanceof(File, { message: 'Poster phải là file ảnh' })
      .refine(
        (file) => {
          return ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type);
        },
        { message: 'Ảnh phải là dạng (JPEG, PNG, hoặc GIF)' },
      )
      .optional(),
    budget: z
      .number()
      .min(1000000, {
        message: 'Ngân sách phải lớn từ 1,000,000 VND',
      })
      .max(1000000000, {
        message: 'Ngân sách không được vượt quá 1,000,000,000 VND',
      }),
    influencerCountExpected: z
      .number()
      .min(1, {
        message: 'Số lượng influencer phải lớn hơn 0',
      })
      .max(10, {
        message: 'Số lượng influencer không được vượt quá 10',
      }),
    startAt: z.date().refine((date: Date) => date >= new Date(), {
      message: 'Ngày bắt đầu phải trong tương lai',
    }),
    dueAt: z.date().refine((date: Date) => date >= new Date(), {
      message: 'Ngày kết thúc phải trong tương lai',
    }),
    influencerRequirements: z.array(
      z.object({
        platform: z
          .string()
          .refine(
            (plat: string) =>
              SupportedPlatforms.includes(plat.toLowerCase() as ISupportedPlatforms),
            {
              message: 'Nền tảng hiện tại không được hỗ trợ',
            },
          ),
        followers: z.number().min(1, { message: 'Số lượng theo dõi phải ít nhất là 1' }),
      }),
    ),
    campaignRequirements: z.array(
      z
        .object({
          platform: z
            .string()
            .refine(
              (plat: string) =>
                SupportedPlatforms.includes(plat.toLowerCase() as ISupportedPlatforms),
              {
                message: 'Nền tảng hiện tại không được hỗ trợ',
              },
            ),
          post_type: z.string(),
          quantity: z.number().min(1, { message: 'Số lượng nội dung ít nhất là 1' }),
          postDetails: z.array(
            z.object({
              video: z
                .object({
                  like: z.number().min(0, 'Số lượng ít nhất là 0'),
                  comment: z.number().min(0, 'Số lượng ít nhất là 0'),
                  share: z.number().min(0, 'Số lượng ít nhất là 0').optional(),
                })
                .optional(),
              post: z
                .object({
                  like: z.number().min(0, 'Số lượng ít nhất là 0'),
                  comment: z.number().min(0, 'Số lượng ít nhất là 0'),
                  share: z.number().min(0, 'Số lượng ít nhất là 0').optional(),
                })
                .optional(),
              story: z
                .object({
                  like: z.number().min(0, 'Số lượng ít nhất là 0'),
                  comment: z.number().min(0, 'Số lượng ít nhất là 0'),
                  share: z.number().min(0, 'Số lượng ít nhất là 0').optional(),
                })
                .optional(),
              reel: z
                .object({
                  like: z.number().min(0, 'Số lượng ít nhất là 0'),
                  comment: z.number().min(0, 'Số lượng ít nhất là 0'),
                  share: z.number().min(0, 'Số lượng ít nhất là 0').optional(),
                })
                .optional(),
            }),
          ),
        })
        .refine(
          (data) => {
            const platform = data.platform?.toLowerCase() as ISupportedPlatforms;
            const postType = data.post_type;
            if (!platform || !postType) return false;
            const validPostTypes = SupportedPostTypeByPlatform[platform]?.map(
              (type) => Object.keys(type)[0],
            );
            return validPostTypes?.includes(postType) || false;
          },
          {
            message: 'Loại nội dung không hợp lệ cho nền tảng đã chọn',
            path: ['post_type'],
          },
        ),
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
