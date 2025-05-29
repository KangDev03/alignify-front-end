'use client';

import { AuthLayout } from '@/components/layouts/auth/auth-layout';
import VerifyOTPForm from '@/features/auth/components/verify-otp-form';

export default function VerifyOtpPage() {

  return (
    <AuthLayout>
      <VerifyOTPForm />
    </AuthLayout>
  );
}
