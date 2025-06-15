import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ResetPasswordForm() {
  return (
    <Card className="w-full max-w-md border-2 border-primary/20 bg-card shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-primary">Đổi mật khẩu</CardTitle>
        <CardDescription>Tạo mật khẩu mới cho tài khoản của bạn</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">Mật khẩu mới</Label>
          <Input id="password" type="password" className="border-input focus:border-primary" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
          <Input id="confirmPassword" type="password" className="border-input focus:border-primary" />
        </div>
        <Button className="w-full bg-primary hover:bg-primary/90" type="submit">
          Cập nhật mật khẩu
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
