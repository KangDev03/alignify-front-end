import { AuthLayout } from "@/components/layouts/auth/auth-layout"
import ResetPasswordForm from "@/features/auth/components/reset-password-form"

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <ResetPasswordForm />
    </AuthLayout>
  )
}
