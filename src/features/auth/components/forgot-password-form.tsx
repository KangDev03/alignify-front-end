import { useState } from 'react';
import { Link } from 'react-router';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Icons } from '@/components/icons/icons';
import { useForgotPasswordMutation } from '@/features/auth/auth.service';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation();

  // const getEmailProviderLink = (email: string) => {
  //   if (email.includes('@gmail.com')) return 'https://mail.google.com/mail/u/0/#inbox';
  //   if (email.includes('@outlook.com') || email.includes('@hotmail.com'))
  //     return 'https://outlook.live.com/mail/inbox';
  //   if (email.includes('@yahoo.com')) return 'https://mail.yahoo.com/d/folders/1';
  //   return 'https://www.google.com'; // fallback
  // };

  const handleSubmit = async (email: string) => {
    try {
      const baseUrl = window.location.origin;
      const resetUrl = `${baseUrl}/auth/reset-password`;

      await forgotPassword({ email, url: resetUrl }).unwrap();
      toast.success('Gửi xác thực thành công!');
      setSubmitted(true);
    } catch (err: any) {
      console.error('Lỗi khi gửi email:', err);
    }
  };

  return (
    <Card className="w-full max-w-md border-2 border-primary/20 bg-card shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-primary">Quên mật khẩu</CardTitle>
        <CardDescription>Nhập email của bạn để gửi yêu cầu xác thực</CardDescription>
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
              required
            />
          </div>

          <Button
            className="w-full bg-primary hover:bg-primary/90"
            type="submit"
            disabled={isLoading || submitted}
          >
            {isLoading ?
              <>
                <Icons.loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang gửi...
              </>
              : submitted ? 'Email đã được gửi' : 'Gửi email xác nhận'}
          </Button>

          {submitted && (
            <div className="text-sm text-center flex items-center justify-center font-semibold">
              <p className="text-muted-foreground">Chưa nhận được yêu cầu xác thực?</p>
              <Button variant="link" type="submit">
                Gửi lại
              </Button>
              {/* <a
                href={getEmailProviderLink(email)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary/80"
              >
                Yêu cầ xác thực đã được gửi
              </a> */}
            </div>
          )}

          {error && (
            <div className="text-red-500 text-sm mt-2">
              {'data' in error && (error as any).data?.message
                ? (error as any).data.message
                : 'Không thể gửi email, hãy thử lại sau'}
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
