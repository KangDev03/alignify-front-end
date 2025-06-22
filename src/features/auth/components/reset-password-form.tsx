import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

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

import { type ResetPasswordFormValues, resetPasswordSchema } from '@/features/auth/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';

import { useResetPasswordMutation } from '../auth.service';

export default function ResetPasswordForm() {
  const params = useParams<{ token: string }>();
  const token = params.token ?? '';

  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  });

  async function onSubmit(values: ResetPasswordFormValues) {
    if (!token) {
      toast.error('Liên kết đặt lại mật khẩu không hợp lệ!');
      return;
    }

    try {
      await resetPassword({
        password: values.password,
        passwordConfirm: values.passwordConfirm,
        token,
      }).unwrap();

      toast.success('Mật khẩu đã được cập nhật!');
      navigate('/auth/login');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại!');
    }
  }

  return (
    <Card className="w-full max-w-md border-2 border-primary/20 bg-card shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-primary">Đổi mật khẩu</CardTitle>
        <CardDescription>Tạo mật khẩu mới cho tài khoản của bạn</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu mới</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="border-input focus:border-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
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
              disabled={isLoading}
            >
              {isLoading ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
            </Button>
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
