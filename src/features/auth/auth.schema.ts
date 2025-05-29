import * as z from 'zod';

// Define form validation schema
export const signInSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }),
  password: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
