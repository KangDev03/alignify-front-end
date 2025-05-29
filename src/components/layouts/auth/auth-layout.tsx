import { type ReactNode } from "react";

export function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative min-h-screen bg-background transition-colors duration-300">
            <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                {children}
            </div>
        </div>
    )
}
