import { useState } from 'react';
import { Link } from 'react-router';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useForgotPasswordMutation } from '@/features/auth/auth.service';

export default function ForgotPasswordForm() {
  const [forgotPassword, { isLoading, error}] = useForgotPasswordMutation();
  const [email, setEmail] = useState('');
  const handleSubmit = async (email: string) => {
    try {
      const response = await forgotPassword({ email }).unwrap();
      toast.success(response.message); 
    } catch (err: any) {
      console.error('Lỗi khi gửi email:', err);
    }
  };

  return (
    <Card className="w-full max-w-md border-2 border-primary/20 bg-card shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-primary">Quên mật khẩu</CardTitle>
        <CardDescription>Nhập email của bạn để nhận mã xác nhận</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSubmit(email);
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@example.com"
              className="border-input focus:border-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button
            className="w-full bg-primary hover:bg-primary/90"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Đang gửi...' : 'Gửi email xác nhận'}
          </Button>

          {error && (
            <div className="text-red-500 text-sm mt-2">
              {'data' in error && (error as any).data?.message
                ? (error as any).data.message
                : 'không thể gửi email, hãy thử lại sau'}
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <Link to="/auth/login" className="text-sm font-medium text-primary hover:text-primary/80">
          Quay lại đăng nhập
        </Link>
      </CardFooter>
    </Card>
  );
}