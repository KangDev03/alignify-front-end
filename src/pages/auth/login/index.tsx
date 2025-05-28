"use client"

import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { AuthLayout } from "@/components/layouts/auth/layout"
import { Label } from "@radix-ui/react-label"

export default function LoginPage() {
    return (
        <AuthLayout>
            <Card className="w-full max-w-md border-2 bg-card shadow-lg">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold text-primary">Đăng nhập</CardTitle>
                    <CardDescription>Nhập thông tin đăng nhập của bạn để tiếp tục</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="example@example.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Mật khẩu</Label>
                            <Link to="/auth/forgot-password" className="text-sm text-primary hover:text-primary/80">
                                Quên mật khẩu?
                            </Link>
                        </div>
                        <Input id="password" type="password"/>
                    </div>
                    <Button variant="default" className="w-full" type="submit">
                        Đăng nhập
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">hoặc</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button variant="outline" className="w-full">
                        Đăng nhập với Google
                    </Button>
                    <div className="text-center text-sm text-muted-foreground">
                        Chưa có tài khoản?{" "}
                        <Link to="/auth/select-role" className="font-medium text-primary hover:text-primary/80">
                            Đăng ký
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </AuthLayout>
    )
}
