import * as z from 'zod';

export const changepasswordSchema = z
  .object({
    oldPassword: z.string().min(3, { message: 'Mật khẩu cũ phải có ít nhất 6 ký tự' }),
    newPassword: z.string().min(6, { message: 'Mật khẩu mới phải có ít nhất 6 ký tự' }),
    passwordConfirm: z.string().min(6, { message: 'Xác nhận mật khẩu phải có ít nhất 6 ký tự' }),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: 'Mật khẩu mới không được trùng với mật khẩu cũ',
    path: ['newPassword'],
  })

  .refine((data) => data.newPassword === data.passwordConfirm, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['passwordConfirm'],
  });

export type ChangepasswordFormValues = z.infer<typeof changepasswordSchema>;
