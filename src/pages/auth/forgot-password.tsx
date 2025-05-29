import { AuthLayout } from "@/components/layouts/auth/auth-layout"
import ForgotPasswordForm from "@/features/auth/components/forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <ForgotPasswordForm/>
    </AuthLayout>
  )
}
