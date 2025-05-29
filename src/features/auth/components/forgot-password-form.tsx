import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordForm() {
    return (
        <Card className="w-full max-w-md border-2 border-primary/20 bg-card shadow-lg">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold text-primary">Quên mật khẩu</CardTitle>
                <CardDescription>Nhập email của bạn để nhận mã xác nhận</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="example@example.com"
                        className="border-input focus:border-primary"
                    />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90" type="submit">
                    Gửi mã xác nhận
                </Button>
            </CardContent>
            <CardFooter className="flex justify-center items-center">
                <Link to="/auth/login" className="text-sm font-medium text-primary hover:text-primary/80">
                    Quay lại đăng nhập
                </Link>
            </CardFooter>
        </Card>
    )
}