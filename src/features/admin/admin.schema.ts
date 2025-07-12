import { z } from 'zod';

export const bannedReasonFormSchema = z.object({
  reason: z.string().min(1, {
    message: 'Bạn phải chọn lý do',
  }),
});

export type BannedReasonFormValues = z.infer<typeof bannedReasonFormSchema>;
