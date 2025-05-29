import * as z from 'zod';

// Define form validation schema
export const signInSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }),
  password: z.string().min(3, { message: 'Mật khẩu phải có ít nhất 3 ký tự' }),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
