import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function VerifyOTPForm() {
  return (
      <Card className="w-full max-w-md border-2 border-primary/20 bg-card shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-primary">Xác nhận OTP</CardTitle>
          <CardDescription>Nhập mã OTP đã được gửi đến email của bạn</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp">Mã OTP</Label>
            <div className="flex justify-center gap-2">
              <Input className="h-12 w-12 border-input text-center text-xl focus:border-primary" maxLength={1} />
              <Input className="h-12 w-12 border-input text-center text-xl focus:border-primary" maxLength={1} />
              <Input className="h-12 w-12 border-input text-center text-xl focus:border-primary" maxLength={1} />
              <Input className="h-12 w-12 border-input text-center text-xl focus:border-primary" maxLength={1} />
              <Input className="h-12 w-12 border-input text-center text-xl focus:border-primary" maxLength={1} />
              <Input className="h-12 w-12 border-input text-center text-xl focus:border-primary" maxLength={1} />
            </div>
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90" type="submit">
            Xác nhận
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Không nhận được mã?{" "}
            <Button variant="link" className="p-0 text-primary hover:text-primary/80">
              Gửi lại
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center items-center">
          <Link to="/auth/login" className="text-sm text-primary hover:text-primary/80">
            Quay lại đăng nhập
          </Link>
        </CardFooter>
      </Card>
  )
}
