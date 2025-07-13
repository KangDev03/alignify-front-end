import { z } from 'zod';

export const bannedReasonFormSchema = z.object({
  reason: z.string().min(1, {
    message: 'Bạn phải chọn lý do',
  }),
});

export type BannedReasonFormValues = z.infer<typeof bannedReasonFormSchema>;

export const planSchema = z.object({
  planName: z.string().min(1, {
    message: 'Bạn phải điền ít nhất một kí tự',
  }),
  description: z.string(),
  roleId: z.string(),
  permissionIds: z.array(z.string()),
  planPermissions: z.object({
    roleId: z.string(),
    planPermissionName: z.string(),
    limited: z.number().min(0, {
      message: 'Giới hạn không được là số âm',
    }),
  }),
  price: z.number().min(1, {
    message: 'Giá tiền phải lớn 0',
  }),
  discount: z.number().min(1, {
    message: 'Giảm giá phải lớn hơn bằng 0',
  }),
  planType: z.string(),
  planCount: z.number(),
  isPopular: z.boolean(),
  isActive: z.boolean(),
});
export type PlanValues = z.infer<typeof planSchema>;
