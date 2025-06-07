import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';

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

import { zodResolver } from '@hookform/resolvers/zod';

import { useRegisterMutation, useRequestOTPMutation, useVerifyOTPMutation } from '../auth.service';

const verifyOTPSchema = z.object({
  otp: z
    .string()
    .min(6, 'Mã OTP phải có ít nhất 6 ký tự')
    .max(6, 'Mã OTP không được vượt quá 6 ký tự'),
});
type VerifyOTPFormValues = z.infer<typeof verifyOTPSchema>;

export default function VerifyOTPForm() {
  const navigate = useNavigate();
  const [verifyOTP, { isLoading: isVerifyingOTP }] = useVerifyOTPMutation();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [requestOTP, { isLoading: isRequestingOTP }] = useRequestOTPMutation();

  const form = useForm<VerifyOTPFormValues>({
    resolver: zodResolver(verifyOTPSchema),
    defaultValues: {
      otp: '',
    },
  });

  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // const registrationData = JSON.parse(localStorage.getItem('registrationData') || '{}');
  const { state } = useLocation();
  const { email, password, passwordConfirm, roleId, name } = state || {};
  useEffect(() => {
    if (!email || !password || !roleId || !name || !passwordConfirm) {
      toast.error('Dữ liệu đăng ký không hợp lệ. Vui lòng thử lại!');
      navigate('/auth/login');
    }
  }, [email, password, roleId, name, passwordConfirm, navigate]);

  const handleInputChange = (index: number, value: string) => {
    if (!/^[0-9a-zA-Z]?$/.test(value)) return;

    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);

    form.setValue('otp', newOtpDigits.join(''), { shouldValidate: true });

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData('text').trim().toUpperCase();
    if (/^[0-9a-zA-Z]{6}$/.test(pastedData)) {
      const newOtpDigits = pastedData.split('');
      setOtpDigits(newOtpDigits);
      form.setValue('otp', pastedData, { shouldValidate: true });
      inputRefs.current[5]?.focus();
    }
    e.preventDefault();
  };

  const onSubmit = async (values: VerifyOTPFormValues) => {
    console.log('sending...');
    try {
      const verifyResponse = await verifyOTP({ email, otp: values.otp }).unwrap();
      if (verifyResponse.message) {
        toast.success(verifyResponse.message);
        const registerData = { email, password, passwordConfirm, name, roleId };
        const registerResponse = await register(registerData).unwrap();
        if (registerResponse.message) {
          toast.success(registerResponse.message);
          localStorage.removeItem('registrationData');
          navigate('/auth/login');
        }
      }
    } catch (err) {
      console.log(err);
      toast.error('Xác thực OTP hoặc đăng ký thất bại. Vui lòng thử lại!');
    }
  };

  const handleResendOTP = async () => {
    try {
      const otpResponse = await requestOTP({ email }).unwrap();
      if (otpResponse.message) {
        toast.success(otpResponse.message);
      }
    } catch (err) {
      console.log(err);
      toast.error('Không thể gửi lại mã OTP. Vui lòng thử lại!');
    }
  };

  const isLoading = isVerifyingOTP || isRegistering || isRequestingOTP;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md shadow-lg">
        <Card className="border-2 border-primary/20 bg-card">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-primary">Xác nhận OTP</CardTitle>
            <CardDescription>Nhập mã OTP đã được gửi đến email của bạn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="otp"
              render={() => (
                <FormItem>
                  <FormLabel>Mã OTP</FormLabel>
                  <FormControl>
                    <div className="flex justify-center gap-2">
                      {otpDigits.map((digit, index) => (
                        <Input
                          key={index}
                          className="h-12 w-12 border-input text-center text-xl focus:border-primary"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleInputChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          onPaste={index === 0 ? handlePaste : undefined}
                          ref={(el) => {
                            inputRefs.current[index] = el;
                          }}
                          disabled={isLoading}
                        />
                      ))}
                    </div>
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
              {isLoading ? 'Đang xử lý...' : 'Xác nhận'}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Không nhận được mã?{' '}
              <Button
                variant="link"
                className="p-0 text-primary hover:text-primary/80"
                onClick={handleResendOTP}
                disabled={isLoading}
              >
                Gửi lại
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center items-center">
            <Link to="/auth/login" className="text-sm text-primary hover:text-primary/80">
              Quay lại đăng nhập
            </Link>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
