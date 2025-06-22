import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import type { ForgotPasswordFormValues } from '@/features/auth/auth.schema';
import { forgotPasswordSchema } from '@/features/auth/auth.schema';
import { useForgotPasswordMutation } from '@/features/auth/auth.service';
import { zodResolver } from '@hookform/resolvers/zod';

export default function ForgotPasswordForm() {
  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: ForgotPasswordFormValues) {
    try {
      const baseUrl = window.location.origin;
      const resetUrl = `${baseUrl}/auth/reset-password/`;

      const response = await forgotPassword({
        email: values.email,
        url: resetUrl,
      }).unwrap();

      toast.success(response.message);
      setSubmitted(true);
    } catch (err: any) {
      toast.error(err?.data?.message || 'Email không tồn tại hoặc có lỗi xảy ra!');
    }
  }

  return (
    <Card className="w-full max-w-md border-2 border-primary/20 bg-card shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-primary">Quên mật khẩu</CardTitle>
        <CardDescription>Nhập email của bạn để nhận liên kết đặt lại mật khẩu</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@example.com"
                      className="border-input focus:border-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading || submitted}
            >
              {isLoading ? 'Đang gửi...' : submitted ? 'Đã gửi email' : 'Gửi email xác nhận'}
            </Button>

            {submitted && (
              <div className="text-xs text-primary text-center mt-2">
                Email khôi phục đã được gửi. Kiểm tra hộp thư đến hoặc thư rác.
              </div>
            )}

            {error && !submitted && (
              <div className="text-sm text-red-500 text-center mt-2">
                {'data' in error && (error as any).data?.message
                  ? (error as any).data.message
                  : 'Không thể gửi email, hãy thử lại sau'}
              </div>
            )}
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex justify-center items-center">
        <Link to="/auth/login" className="text-sm font-medium text-primary hover:text-primary/80">
          Quay lại đăng nhập
        </Link>
      </CardFooter>
    </Card>
  );
}
