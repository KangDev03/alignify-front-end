import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
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

import { zodResolver } from '@hookform/resolvers/zod';

import { type VerifyOTPFormValues, verifyOTPSchema } from '../auth.schema';
import { useRegisterMutation, useRequestOTPMutation, useVerifyOTPMutation } from '../auth.service';

export default function VerifyOTPForm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [verifyOTP, { isLoading: isVerifyingOTP }] = useVerifyOTPMutation();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [requestOTP, { isLoading: isRequestingOTP }] = useRequestOTPMutation();
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { email, password, passwordConfirm, roleId, name } = state || {};

  const form = useForm<VerifyOTPFormValues>({
    resolver: zodResolver(verifyOTPSchema),
    defaultValues: {
      otp: '',
    },
  });

  useEffect(() => {
    inputRefs.current = Array(otpDigits.length).fill(null);
  }, [otpDigits.length]);

  // const registrationData = JSON.parse(localStorage.getItem('registrationData') || '{}');
  useEffect(() => {
    if (!email || !password || !roleId || !name || !passwordConfirm) {
      toast.error('Dữ liệu đăng ký không hợp lệ. Vui lòng thử lại!');
      navigate('/auth/login');
    } else {
      inputRefs.current[0]?.focus();
    }
  }, [email, password, roleId, name, passwordConfirm, navigate]);

  const handleInputChange = (index: number, value: string) => {
    if (!/^[0-9a-zA-Z]?$/.test(value)) return;

    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);
    form.setValue('otp', newOtpDigits.join(''));
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData('text').trim().toUpperCase();
    if (/^[0-9a-zA-Z]{6}$/.test(pastedData)) {
      const newOtpDigits = pastedData.split('');
      setOtpDigits(newOtpDigits);
      form.setValue('otp', pastedData);
      inputRefs.current[5]?.focus();
    }
    e.preventDefault();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') {
      setIsSelectAll(true);
      return;
    }
    if (isSelectAll && (e.key === 'Backspace' || e.key === 'Delete')) {
      setOtpDigits(['', '', '', '', '', '']);
      form.setValue('otp', '');
      inputRefs.current[0]?.focus();
      setIsSelectAll(false);
      e.preventDefault();
      return;
    } else if (isSelectAll && /^[0-9a-zA-Z]?$/.test(e.key)) {
      setOtpDigits([e.key, '', '', '', '', '']);
      form.setValue('otp', '');
      inputRefs.current[0]?.focus();
      setIsSelectAll(false);
      e.preventDefault();
      return;
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
      e.preventDefault();
      return;
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
      e.preventDefault();
      return;
    }
    if (e.key === 'Backspace' || e.key === 'Delete') {
      if (otpDigits[index]) {
        const newOtpDigits = [...otpDigits];
        newOtpDigits[index] = '';
        setOtpDigits(newOtpDigits);
        form.setValue('otp', newOtpDigits.join(''));
        e.preventDefault();
        return;
      }
      if (!otpDigits[index] && index < 6) {
        const newOtpDigits = [...otpDigits];
        newOtpDigits[index - 1] = '';
        inputRefs.current[index - 1]?.focus();
        setOtpDigits(newOtpDigits);
        form.setValue('otp', newOtpDigits.join(''));
        e.preventDefault();
        return;
      }
    }
    if (/^[0-9a-zA-Z]?$/.test(e.key)) {
      handleInputChange(index, e.key.toUpperCase());
      e.preventDefault();
    }
  };

  const onSubmit = async (values: VerifyOTPFormValues) => {
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
      setOtpDigits(['', '', '', '', '', '']);
      form.setValue('otp', '');
      inputRefs.current[0]?.focus();
    }
  };

  const handleResendOTP = async () => {
    try {
      const otpResponse = await requestOTP({ email }).unwrap();
      if (otpResponse.message) {
        toast.success(otpResponse.message);
        setOtpDigits(['', '', '', '', '', '']);
        form.setValue('otp', '');
        inputRefs.current[0]?.focus();
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
                  <FormLabel dataError={false}>Nhập mã OTP</FormLabel>
                  <FormControl>
                    <div className="flex justify-center gap-2">
                      {otpDigits.map((digit, index) => (
                        <Input
                          type="text"
                          key={index}
                          className={`h-12 w-12 border-input text-center text-xl focus:border-primary transition-colors ${isSelectAll ? 'bg-primary/10 font-bold text-primary border-primary' : ''}`}
                          maxLength={1}
                          value={digit}
                          onClick={() => {
                            inputRefs.current[index]?.focus();
                          }}
                          onChange={(e) => handleInputChange(index, e.target.value.toUpperCase())}
                          onPaste={index === 0 ? handlePaste : undefined}
                          onKeyDown={(e) => handleKeyDown(index, e)}
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
