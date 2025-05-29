"use client"

import { AuthLayout } from "@/components/layouts/auth/auth-layout"
import SignInForm from "@/features/auth/components/sign-in-form"

export default function LoginPage() {
    return (
        <AuthLayout>
            <SignInForm />
        </AuthLayout>
    )
}
