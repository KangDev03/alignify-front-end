import { z } from 'zod';

export const invitationSchema = z.object({
  campaignId: z.string().min(1, 'Vui lòng chọn chiến dịch'),
  influencerIds: z.array(z.string()).min(1, 'Vui lòng chọn ít nhất 1 influencer'),
  message: z.string().min(10, 'Tin nhắn phải có ít nhất 10 ký tự'),
  // deadline: z.string().min(1, 'Vui lòng chọn deadline'),
});

export type InvitationFormValues = z.infer<typeof invitationSchema>;
