import { useEffect } from 'react';
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

import { type SignUpFormValues, signUpSchema } from '@/features/auth/auth.schema';
import {
  // useGetRolesQuery,
  // useRegisterMutation,
  useRequestOTPMutation,
  // useRequestOTPQuery,
} from '@/features/auth/auth.service';
// import { setCredentials } from '@/features/auth/auth.slice';
// import { useAppDispatch } from '@/hooks/redux';
import { zodResolver } from '@hookform/resolvers/zod';

const FORM_FIELDS: {
  influencer: Array<{
    name: keyof SignUpFormValues;
    label: string;
    type?: string;
    placeholder?: string;
  }>;
  brand: Array<{
    name: keyof SignUpFormValues;
    label: string;
    type?: string;
    placeholder?: string;
  }>;
} = {
  influencer: [
    { name: 'name', label: 'Họ và tên', placeholder: 'Nguyễn Văn A' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'example@example.com' },
    { name: 'password', label: 'Mật khẩu', type: 'password' },
    { name: 'passwordConfirm', label: 'Xác nhận mật khẩu', type: 'password' },
    // { name: 'location', label: 'Địa chỉ', placeholder: 'Hà Nội' }
  ],
  brand: [
    { name: 'name', label: 'Tên nhãn hàng', placeholder: 'Tên nhãn hàng của bạn' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'example@example.com' },
    { name: 'password', label: 'Mật khẩu', type: 'password' },
    { name: 'passwordConfirm', label: 'Xác nhận mật khẩu', type: 'password' },
    // { name: 'location', label: 'Địa chỉ', placeholder: 'Hà Nội' }
  ],
};

export default function SignUpForm() {
  const location = useLocation();
  const navigate = useNavigate();
  // const dispatch = useAppDispatch()

  const roleId = new URLSearchParams(location.search).get('roleId');
  const roleName = new URLSearchParams(location.search).get('roleName');

  // const { data: rolesData } = useGetRolesQuery();
  // const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [requestOTP, { isLoading: isRequestingOTP }] = useRequestOTPMutation(); // Use mutation for OTP

  useEffect(() => {
    if (!roleId) {
      toast.error('Vui lòng chọn vai trò trước');
      navigate('/auth/select-role');
      return;
    }
  }, [roleId, navigate]);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
    },
  });

  const isInfluencer = roleName?.includes('INFLUENCER');

  const onSubmit = async (values: SignUpFormValues) => {
    // if (!rolesData?.roles) {
    //   toast.error('Không thể xác định vai trò. Vui lòng thử lại!');
    //   return;
    // }

    // const roleId = rolesData.roles.find(
    //   (role) => role.roleName === (isInfluencer ? 'INFLUENCER' : 'BRAND'),
    // )?.roleId;

    // if (!roleId) {
    //   toast.error('Không tìm thấy vai trò phù hợp!');
    //   return;
    // }

    try {
      const registerData = {
        email: values.email,
        passwordConfirm: values.passwordConfirm,
        password: values.password,
        roleId: roleId,
        name: values.name,
      };
      const otpResponse = await requestOTP({ email: values.email }).unwrap();
      if (otpResponse.message) {
        toast.success(otpResponse.message);
        // Store registration data in localStorage for use in OTP verification
        // localStorage.setItem('registrationData', JSON.stringify(registerData));
        navigate('/auth/verify-otp', { state: registerData });
      }
      // console.log('Step 1: Sending registration data:', registerData);

      // const response = await register(registerData).unwrap();

      // console.log('Step 2: Registration response:', response);

      //   if (response.message) {
      //     toast.success(response.message);
      //     console.log('Step 3: Starting OTP request for email:', values.email);

      //     try {
      //       form.setValue('email', values.email);
      //       const { data: otpData } = await requestOTP();
      //       console.log('Step 4: OTP response:', otpData);

      //       if (otpData?.message) {
      //         toast.success(otpData.message);
      //         console.log('Step 5: Navigating to verify-otp page');
      //         // Store email for verify page
      //         localStorage.setItem('verifyEmail', values.email);
      //         navigate('/auth/verify-otp');
      //       }
      //     } catch (otpErr) {
      //       console.error('OTP request failed:', otpErr);
      //       toast.error('Không thể gửi mã OTP. Vui lòng thử lại!');
      //     }
      //   }
    } catch (err) {
      // console.error('Registration failed:', err);
      // toast.error('Đăng ký thất bại. Vui lòng thử lại!');
      console.error('OTP request failed:', err);
      toast.error('Không thể gửi mã OTP. Vui lòng thử lại!');
    }
  };

  const isLoading = isRequestingOTP;

  // if (!rolesData?.roles) {
  //     return <div>Đang tải...</div>;
  // }

  const renderFormFields = () => {
    const fields = isInfluencer ? FORM_FIELDS.influencer : FORM_FIELDS.brand;

    return fields.map(({ name, label, type = 'text', placeholder }) => (
      <FormField
        key={name}
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input type={type} placeholder={placeholder} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md shadow-lg">
        <Card>
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold">
              Đăng ký {isInfluencer ? 'Influencer' : 'Brand'}
            </CardTitle>
            <CardDescription>
              {isInfluencer
                ? 'Đăng ký tài khoản nhà sáng tạo nội dung'
                : 'Đăng ký tài khoản nhãn hàng quảng cáo'
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {renderFormFields()}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
            </Button>
          </CardContent>

          <CardFooter className="justify-center text-sm">
            Đã có tài khoản?
            <Link to="/auth/login" className="ml-1 underline underline-offset-4">
              Đăng nhập
            </Link>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
