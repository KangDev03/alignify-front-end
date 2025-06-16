"use client"

import { useState } from "react"
import {
  Bell,
  Camera,
  CreditCard,
  Eye,
  EyeOff,
  Lock,
  Monitor,
  Moon,
  Palette,
  Save,
  SettingsIcon,
  Shield,
  Smartphone,
  Sun,
  Trash2,
  User,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

type UserRole = "influencer" | "brand"

interface SettingsProps {
  userRole: UserRole
}

type SettingsSection = "profile" | "account" | "security" | "notifications" | "appearance" | "billing" | "privacy"

export function Settings({ userRole }: SettingsProps) {
  const [activeSection, setActiveSection] = useState<SettingsSection>("profile")
  const [showPassword, setShowPassword] = useState(false)

  const sidebarItems = [
    {
      group: "Cài đặt chung",
      items: [
        { id: "profile", label: "Hồ sơ cá nhân", icon: User },
        { id: "account", label: "Tài khoản", icon: SettingsIcon },
        { id: "security", label: "Bảo mật", icon: Shield },
      ],
    },
    {
      group: "Tùy chỉnh",
      items: [
        { id: "notifications", label: "Thông báo", icon: Bell },
        { id: "appearance", label: "Giao diện", icon: Palette },
        { id: "privacy", label: "Quyền riêng tư", icon: Lock },
      ],
    },
    {
      group: "Khác",
      items: [{ id: "billing", label: "Thanh toán", icon: CreditCard }],
    },
  ]

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Hồ sơ cá nhân</h3>
        <p className="text-sm text-muted-foreground">Cập nhật thông tin hồ sơ và ảnh đại diện của bạn.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ảnh đại diện</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder.svg?height=80&width=80" />
              <AvatarFallback>NL</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button size="sm">
                <Camera className="h-4 w-4 mr-2" />
                Thay đổi ảnh
              </Button>
              <p className="text-sm text-muted-foreground">JPG, GIF hoặc PNG. Tối đa 1MB.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin cơ bản</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Họ</Label>
              <Input id="firstName" defaultValue="Nguyễn Thị" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Tên</Label>
              <Input id="lastName" defaultValue="Lan" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="lan@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Giới thiệu bản thân</Label>
            <Textarea id="bio" defaultValue="Content creator chuyên về lifestyle và beauty." rows={3} />
          </div>
          {userRole === "influencer" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="specialties">Lĩnh vực chuyên môn</Label>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Thời trang</Badge>
                  <Badge variant="secondary">Làm đẹp</Badge>
                  <Badge variant="secondary">Lifestyle</Badge>
                  <Button variant="outline" size="sm">
                    + Thêm
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="followers">Tổng số followers</Label>
                <Input id="followers" defaultValue="326,000" disabled />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Lưu thay đổi
        </Button>
      </div>
    </div>
  )

  const renderAccountSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Tài khoản</h3>
        <p className="text-sm text-muted-foreground">Quản lý thông tin tài khoản và tùy chọn đăng nhập.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin đăng nhập</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Tên đăng nhập</Label>
            <Input id="username" defaultValue="nguyenthilan" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input id="phone" defaultValue="+84 901 234 567" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tùy chọn khu vực</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Ngôn ngữ</Label>
              <Select defaultValue="vi">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vi">Tiếng Việt</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Múi giờ</Label>
              <Select defaultValue="asia/ho_chi_minh">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asia/ho_chi_minh">GMT+7 (Hồ Chí Minh)</SelectItem>
                  <SelectItem value="asia/bangkok">GMT+7 (Bangkok)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Vùng nguy hiểm</CardTitle>
          <CardDescription>Các hành động này không thể hoàn tác. Hãy cân nhắc kỹ trước khi thực hiện.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive">
            <Trash2 className="h-4 w-4 mr-2" />
            Xóa tài khoản
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Bảo mật</h3>
        <p className="text-sm text-muted-foreground">Quản lý mật khẩu và các tùy chọn bảo mật tài khoản.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Đổi mật khẩu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu hiện tại"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">Mật khẩu mới</Label>
            <Input id="newPassword" type="password" placeholder="Nhập mật khẩu mới" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
            <Input id="confirmPassword" type="password" placeholder="Nhập lại mật khẩu mới" />
          </div>
          <Button>Cập nhật mật khẩu</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Xác thực hai yếu tố (2FA)</CardTitle>
          <CardDescription>Thêm lớp bảo mật bổ sung cho tài khoản của bạn.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Xác thực qua SMS</Label>
              <p className="text-sm text-muted-foreground">Nhận mã xác thực qua tin nhắn SMS</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Ứng dụng xác thực</Label>
              <p className="text-sm text-muted-foreground">Sử dụng Google Authenticator hoặc ứng dụng tương tự</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Phiên đăng nhập</CardTitle>
          <CardDescription>Quản lý các thiết bị đã đăng nhập vào tài khoản.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Monitor className="h-5 w-5" />
                <div>
                  <p className="font-medium">Chrome trên Windows</p>
                  <p className="text-sm text-muted-foreground">Hoạt động hiện tại • TP. HCM</p>
                </div>
              </div>
              <Badge variant="secondary">Hiện tại</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Smartphone className="h-5 w-5" />
                <div>
                  <p className="font-medium">Safari trên iPhone</p>
                  <p className="text-sm text-muted-foreground">2 giờ trước • TP. HCM</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Đăng xuất
              </Button>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            Đăng xuất tất cả thiết bị khác
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Thông báo</h3>
        <p className="text-sm text-muted-foreground">Tùy chỉnh cách bạn nhận thông báo từ hệ thống.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông báo Email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Chiến dịch mới</Label>
              <p className="text-sm text-muted-foreground">Nhận email khi có chiến dịch phù hợp</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Tin nhắn mới</Label>
              <p className="text-sm text-muted-foreground">Thông báo khi có tin nhắn từ brands/influencers</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Cập nhật hệ thống</Label>
              <p className="text-sm text-muted-foreground">Thông tin về tính năng mới và cập nhật</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Thông báo trên trình duyệt</Label>
              <p className="text-sm text-muted-foreground">Hiển thị thông báo ngay cả khi không mở website</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Âm thanh thông báo</Label>
              <p className="text-sm text-muted-foreground">Phát âm thanh khi có thông báo mới</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tần suất thông báo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="frequency">Tần suất email tổng hợp</Label>
            <Select defaultValue="daily">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">Ngay lập tức</SelectItem>
                <SelectItem value="daily">Hàng ngày</SelectItem>
                <SelectItem value="weekly">Hàng tuần</SelectItem>
                <SelectItem value="never">Không bao giờ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAppearanceSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Giao diện</h3>
        <p className="text-sm text-muted-foreground">Tùy chỉnh giao diện và trải nghiệm sử dụng.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Chọn theme hiển thị cho ứng dụng.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="border-2 border-primary rounded-lg p-4 bg-background">
                <Sun className="h-6 w-6 mb-2" />
                <p className="text-sm font-medium">Sáng</p>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" name="theme" value="light" defaultChecked />
                <Label>Theme sáng</Label>
              </div>
            </div>
            <div className="space-y-2">
              <div className="border rounded-lg p-4 bg-slate-900 text-white">
                <Moon className="h-6 w-6 mb-2" />
                <p className="text-sm font-medium">Tối</p>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" name="theme" value="dark" />
                <Label>Theme tối</Label>
              </div>
            </div>
            <div className="space-y-2">
              <div className="border rounded-lg p-4 bg-gradient-to-br from-background to-slate-100">
                <Monitor className="h-6 w-6 mb-2" />
                <p className="text-sm font-medium">Hệ thống</p>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" name="theme" value="system" />
                <Label>Theo hệ thống</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Màu chủ đạo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-6 gap-2">
            {["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-red-500", "bg-orange-500", "bg-pink-500"].map(
              (color, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-full ${color} ${index === 0 ? "ring-2 ring-offset-2 ring-blue-500" : ""}`}
                />
              ),
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tùy chỉnh hiển thị</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Hiển thị avatar trong sidebar</Label>
              <p className="text-sm text-muted-foreground">Hiển thị ảnh đại diện trong thanh điều hướng</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Hiệu ứng chuyển động</Label>
              <p className="text-sm text-muted-foreground">Bật/tắt các hiệu ứng chuyển động trong giao diện</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderBillingSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Thanh toán</h3>
        <p className="text-sm text-muted-foreground">Quản lý gói dịch vụ và phương thức thanh toán.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gói dịch vụ hiện tại</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Gói Premium</p>
              <p className="text-sm text-muted-foreground">Truy cập không giới hạn tất cả tính năng</p>
            </div>
            <Badge>Đang hoạt động</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Gia hạn vào</span>
            <span className="text-sm font-medium">15/02/2024</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Giá</span>
            <span className="text-sm font-medium">299,000 VNĐ/tháng</span>
          </div>
          <Separator />
          <div className="flex space-x-2">
            <Button variant="outline">Thay đổi gói</Button>
            <Button variant="outline">Hủy đăng ký</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Phương thức thanh toán</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                  VISA
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 1234</p>
                  <p className="text-sm text-muted-foreground">Hết hạn 12/26</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Chỉnh sửa
                </Button>
                <Button variant="outline" size="sm">
                  Xóa
                </Button>
              </div>
            </div>
          </div>
          <Button variant="outline">
            <CreditCard className="h-4 w-4 mr-2" />
            Thêm phương thức thanh toán
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lịch sử thanh toán</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {[
              { date: "15/01/2024", amount: "299,000 VNĐ", status: "Thành công" },
              { date: "15/12/2023", amount: "299,000 VNĐ", status: "Thành công" },
              { date: "15/11/2023", amount: "299,000 VNĐ", status: "Thành công" },
            ].map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{payment.date}</p>
                  <p className="text-sm text-muted-foreground">Gói Premium</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{payment.amount}</p>
                  <Badge variant="secondary" className="text-xs">
                    {payment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full">
            Xem tất cả lịch sử
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Quyền riêng tư</h3>
        <p className="text-sm text-muted-foreground">Kiểm soát quyền riêng tư và dữ liệu cá nhân của bạn.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hiển thị hồ sơ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Hồ sơ công khai</Label>
              <p className="text-sm text-muted-foreground">Cho phép mọi người xem hồ sơ của bạn</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Hiển thị thống kê</Label>
              <p className="text-sm text-muted-foreground">Hiển thị số followers và engagement rate</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Cho phép liên hệ</Label>
              <p className="text-sm text-muted-foreground">Brands có thể gửi tin nhắn trực tiếp</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Thu thập dữ liệu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Phân tích sử dụng</Label>
              <p className="text-sm text-muted-foreground">Giúp cải thiện trải nghiệm sử dụng</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Quảng cáo được cá nhân hóa</Label>
              <p className="text-sm text-muted-foreground">Hiển thị quảng cáo phù hợp với sở thích</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quyền kiểm soát dữ liệu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Tải xuống dữ liệu của tôi
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Yêu cầu xóa dữ liệu
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Xem chính sách quyền riêng tư
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSection()
      case "account":
        return renderAccountSection()
      case "security":
        return renderSecuritySection()
      case "notifications":
        return renderNotificationsSection()
      case "appearance":
        return renderAppearanceSection()
      case "billing":
        return renderBillingSection()
      case "privacy":
        return renderPrivacySection()
      default:
        return renderProfileSection()
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-[calc(100vh-120px)] w-full">
        <Sidebar className="w-64 mt-16">
          <SidebarHeader className="border-b px-4 py-3">
            <div className="flex items-center space-x-2">
              {/* <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button> */}
              <div>
                <h1 className="font-semibold">Cài đặt</h1>
                <p className="text-sm text-muted-foreground">Quản lý tài khoản và tùy chỉnh</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-2">
            {sidebarItems.map((group) => (
              <SidebarGroup key={group.group}>
                <SidebarGroupLabel className="px-2 py-1 text-xs font-medium text-muted-foreground">
                  {group.group}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => {
                      const Icon = item.icon
                      return (
                        <SidebarMenuItem key={item.id}>
                          <SidebarMenuButton
                            onClick={() => setActiveSection(item.id as SettingsSection)}
                            isActive={activeSection === item.id}
                            className="w-full justify-start"
                          >
                            <Icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="flex-1">
          <div className="flex h-full flex-col">
            {/* <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <h1 className="text-lg font-semibold">
                {sidebarItems.flatMap((group) => group.items).find((item) => item.id === activeSection)?.label}
              </h1>
            </header> */}
            <div className="flex-1 p-6">{renderContent()}</div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
