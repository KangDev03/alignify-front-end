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

export const profileFormSchema = z.object({
  // name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  // email: z.string().email('Email không hợp lệ'),
  bio: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  doB: z.string().optional(),
  establishDate: z.string().optional(), // For BRAND
  follower: z.number().min(0, 'Số followers phải lớn hơn 0').optional(),
  isPublic: z.boolean(),
  categoryIds: z.array(z.string()).max(3, 'Chỉ được chọn tối đa 3 danh mục').optional(),
  avatarFile: z.instanceof(File).optional(),
  backgroundFile: z.instanceof(File).optional(),
  socialMediaLinks: z
    .array(
      z.object({
        platform: z.string(),
        url: z.string().url('URL không hợp lệ'),
      }),
    )
    .optional(),
  contacts: z // For BRAND
    .array(
      z.object({
        type: z.string(),
        value: z.string(),
      }),
    )
    .optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
