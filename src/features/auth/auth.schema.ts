import * as z from 'zod';

// Define form validation schema
export const signInSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }),
  password: z.string().min(3, { message: 'Mật khẩu phải có ít nhất 3 ký tự' }),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    email: z.string().email({ message: 'Email không hợp lệ' }),
    password: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
    passwordConfirm: z.string(),
    name: z.string().min(2, { message: 'Tên phải có ít nhất 2 ký tự' }),
    // location: z.string().min(2, { message: 'Địa chỉ không được để trống' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export const verifyOTPSchema = z.object({
  otp: z
    .string()
    .min(6, 'Mã OTP phải có ít nhất 6 ký tự')
    .max(6, 'Mã OTP không được vượt quá 6 ký tự'),
});
export type VerifyOTPFormValues = z.infer<typeof verifyOTPSchema>;
