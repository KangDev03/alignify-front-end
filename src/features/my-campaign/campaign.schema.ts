import { z } from 'zod';

import type { ISupportedPlatforms } from '../common/common.type';

export const contractFormSchema = z.object({
  contract: z.instanceof(File, { message: 'Hợp dồng phải là file ảnh *' }).refine(
    (file) => {
      return ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type);
    },
    { message: 'Hợp dồng  là ảnh PDF *' },
  ),
});

export type ContractFormValues = z.infer<typeof contractFormSchema>;

export const processUploadSchema = z.object({
  platformRequirement: z
    .array(
      z
        .object({
          platform: z
            .string()
            .min(0, { message: 'Không hỗ trợ nền tảng nàt' })
            .refine(
              (platform) => {
                return platform.toLowerCase() as keyof ISupportedPlatforms;
              },
              {
                message: 'Không hỗ trợ nền tảng này',
              },
            ),
          post_type: z.string(),
          details: z.array(
            z.object({
              index: z.number(),
              postUrl: z
                .string()
                .url({ message: 'Phải là định dạng đường dẫn liên kết' })
                .or(z.literal(''))
                .optional(),
            }),
          ),
        })
        .superRefine((val, ctx) => {
          const platform = val.platform?.toLowerCase?.();
          val.details.forEach((detail, idx) => {
            const url = detail.postUrl;
            if (!platform || !url || url === '' || url === undefined) return;
            if (platform === 'instagram' && !url.includes('instagram.com')) {
              ctx.addIssue({
                code: 'custom',
                message: 'Liên kết không đúng với nền tảng Instagram!',
                path: ['details', idx, 'postUrl'],
              });
            }
            if (platform === 'facebook' && !url.includes('facebook.com')) {
              ctx.addIssue({
                code: 'custom',
                message: 'Liên kết không đúng với nền tảng Facebook!',
                path: ['details', idx, 'postUrl'],
              });
            }
            if (
              platform === 'youtube' &&
              !(url.includes('youtube.com') || url.includes('youtu.be'))
            ) {
              ctx.addIssue({
                code: 'custom',
                message: 'Liên kết không đúng với nền tảng YouTube!',
                path: ['details', idx, 'postUrl'],
              });
            }
            if (platform === 'tiktok' && !url.includes('tiktok.com')) {
              ctx.addIssue({
                code: 'custom',
                message: 'Liên kết không đúng với nền tảng TikTok!',
                path: ['details', idx, 'postUrl'],
              });
            }
          });
        }),
    )
    .refine((platform) => platform.length > 0, { message: 'Không có yêu cầu nào!' }),
});

export type ProcessUploadValues = z.infer<typeof processUploadSchema>;
