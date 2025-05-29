"use client"

import { AuthLayout } from "@/components/layouts/auth/auth-layout"
import SelectRoleForm from "@/features/auth/components/select-role-form"

export function SelectRolePage() {
    return (
        <AuthLayout>
            <SelectRoleForm />
        </AuthLayout>
    )
}


