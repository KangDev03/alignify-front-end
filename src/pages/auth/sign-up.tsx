'use client';

import { AuthLayout } from '@/components/layouts/auth/auth-layout';
import SignUpForm from '@/features/auth/components/sign-up-form';

export default function RegisterPage() {

  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
}
