"use client"
import { useState } from "react"
import {
  ArrowLeft,
  Bell,
  Camera,
  CreditCard,
  Download,
  Eye,
  Globe,
  Key,
  Lock,
  Palette,
  Save,
  SettingsIcon,
  Shield,
  Smartphone,
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
  SidebarRail,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

type SettingsSection = "profile" | "account" | "security" | "notifications" | "privacy" | "billing" | "appearance"

interface SettingsProps {
  userRole: "influencer" | "brand"
  userName: string
  userAvatar: string
  onBack: () => void
}

export function Settings({ userRole, userName, userAvatar, onBack }: SettingsProps) {
  const [activeSection, setActiveSection] = useState<SettingsSection>("profile")
  const [isLoading, setIsLoading] = useState(false)

  const settingsMenu = [
    {
      title: "Tài khoản",
      items: [
        { id: "profile", label: "Hồ sơ cá nhân", icon: User },
        { id: "account", label: "Cài đặt tài khoản", icon: SettingsIcon },
      ],
    },
    {
      title: "Bảo mật & Quyền riêng tư",
      items: [
        { id: "security", label: "Bảo mật", icon: Shield },
        { id: "privacy", label: "Quyền riêng tư", icon: Lock },
      ],
    },
    {
      title: "Tùy chỉnh",
      items: [
        { id: "notifications", label: "Thông báo", icon: Bell },
        { id: "appearance", label: "Giao diện", icon: Palette },
      ],
    },
    {
      title: "Thanh toán",
      items: [{ id: "billing", label: "Thanh toán & Hóa đơn", icon: CreditCard }],
    },
  ]

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Hồ sơ cá nhân</h2>
              <p className="text-muted-foreground">Quản lý thông tin cá nhân và hồ sơ công khai của bạn</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Ảnh đại diện</CardTitle>
                <CardDescription>Cập nhật ảnh đại diện của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={userAvatar || "/placeholder.svg"} alt={userName} />
                    <AvatarFallback className="text-lg">{userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Thay đổi ảnh
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Xóa ảnh
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thông tin cá nhân</CardTitle>
                <CardDescription>Cập nhật thông tin cá nhân của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Họ</Label>
                    <Input id="firstName" placeholder="Nhập họ của bạn" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Tên</Label>
                    <Input id="lastName" placeholder="Nhập tên của bạn" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input id="phone" placeholder="+84 xxx xxx xxx" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Tiểu sử</Label>
                  <Textarea id="bio" placeholder="Giới thiệu về bản thân..." rows={4} />
                </div>
                {userRole === "influencer" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="category">Lĩnh vực chuyên môn</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn lĩnh vực" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fashion">Thời trang</SelectItem>
                          <SelectItem value="beauty">Làm đẹp</SelectItem>
                          <SelectItem value="food">Ẩm thực</SelectItem>
                          <SelectItem value="travel">Du lịch</SelectItem>
                          <SelectItem value="tech">Công nghệ</SelectItem>
                          <SelectItem value="lifestyle">Lifestyle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Mạng xã hội</Label>
                      <div className="space-y-3">
                        <div className="flex space-x-2">
                          <Input placeholder="Instagram URL" />
                          <Badge variant="outline">1.2M followers</Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Input placeholder="TikTok URL" />
                          <Badge variant="outline">850K followers</Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Input placeholder="YouTube URL" />
                          <Badge variant="outline">500K subscribers</Badge>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )

      case "account":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Cài đặt tài khoản</h2>
              <p className="text-muted-foreground">Quản lý cài đặt tài khoản và tùy chọn đăng nhập</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Thông tin đăng nhập</CardTitle>
                <CardDescription>Cập nhật thông tin đăng nhập của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Tên đăng nhập</Label>
                  <Input id="username" placeholder="username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loginEmail">Email đăng nhập</Label>
                  <div className="flex space-x-2">
                    <Input id="loginEmail" type="email" placeholder="login@example.com" />
                    <Button variant="outline">Xác minh</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ngôn ngữ & Khu vực</CardTitle>
                <CardDescription>Tùy chỉnh ngôn ngữ và múi giờ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Ngôn ngữ</Label>
                  <Select defaultValue="vi">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vi">Tiếng Việt</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ja">日本語</SelectItem>
                      <SelectItem value="ko">한국어</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Múi giờ</Label>
                  <Select defaultValue="asia-ho_chi_minh">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asia-ho_chi_minh">Việt Nam (UTC+7)</SelectItem>
                      <SelectItem value="asia-tokyo">Tokyo (UTC+9)</SelectItem>
                      <SelectItem value="asia-seoul">Seoul (UTC+9)</SelectItem>
                      <SelectItem value="america-new_york">New York (UTC-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="text-destructive">Xóa tài khoản</CardTitle>
                <CardDescription>Xóa vĩnh viễn tài khoản và toàn bộ dữ liệu</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" className="w-full">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Xóa tài khoản
                </Button>
              </CardContent>
            </Card>
          </div>
        )

      case "security":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Bảo mật</h2>
              <p className="text-muted-foreground">Quản lý mật khẩu và bảo mật tài khoản</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Đổi mật khẩu</CardTitle>
                <CardDescription>Cập nhật mật khẩu để bảo mật tài khoản</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Mật khẩu mới</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button className="w-full">
                  <Key className="h-4 w-4 mr-2" />
                  Cập nhật mật khẩu
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Xác thực 2 bước (2FA)</CardTitle>
                <CardDescription>Tăng cường bảo mật bằng xác thực 2 bước</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Authentication</Label>
                    <p className="text-sm text-muted-foreground">Nhận mã xác thực qua SMS</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Authenticator App</Label>
                    <p className="text-sm text-muted-foreground">Sử dụng ứng dụng xác thực</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Phiên đăng nhập</CardTitle>
                <CardDescription>Quản lý các thiết bị đã đăng nhập</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">iPhone 15 Pro</p>
                        <p className="text-sm text-muted-foreground">Hoạt động hiện tại • Hồ Chí Minh</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Hiện tại</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Chrome on Windows</p>
                        <p className="text-sm text-muted-foreground">2 giờ trước • Hà Nội</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Đăng xuất
                    </Button>
                  </div>
                </div>
                <Button variant="destructive" className="w-full">
                  Đăng xuất tất cả thiết bị khác
                </Button>
              </CardContent>
            </Card>
          </div>
        )

      case "notifications":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Thông báo</h2>
              <p className="text-muted-foreground">Tùy chỉnh cách nhận thông báo</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>Chọn loại thông báo muốn nhận qua email</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Chiến dịch mới</Label>
                      <p className="text-sm text-muted-foreground">Thông báo khi có chiến dịch phù hợp</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Tin nhắn</Label>
                      <p className="text-sm text-muted-foreground">Thông báo tin nhắn mới</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Thanh toán</Label>
                      <p className="text-sm text-muted-foreground">Thông báo về thanh toán và hóa đơn</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Marketing</Label>
                      <p className="text-sm text-muted-foreground">Nhận email marketing và khuyến mãi</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Push Notifications</CardTitle>
                <CardDescription>Thông báo đẩy trên thiết bị</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Tin nhắn mới</Label>
                      <p className="text-sm text-muted-foreground">Thông báo ngay khi có tin nhắn</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Cập nhật chiến dịch</Label>
                      <p className="text-sm text-muted-foreground">Thông báo thay đổi trạng thái chiến dịch</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Nhắc nhở</Label>
                      <p className="text-sm text-muted-foreground">Nhắc nhở deadline và nhiệm vụ</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "privacy":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Quyền riêng tư</h2>
              <p className="text-muted-foreground">Kiểm soát ai có thể xem thông tin của bạn</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Hiển thị hồ sơ</CardTitle>
                <CardDescription>Kiểm soát ai có thể xem hồ sơ của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Hồ sơ công khai</Label>
                      <p className="text-sm text-muted-foreground">Cho phép mọi người xem hồ sơ</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Hiển thị số liệu thống kê</Label>
                      <p className="text-sm text-muted-foreground">Hiển thị followers, engagement rate</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Hiển thị liên hệ</Label>
                      <p className="text-sm text-muted-foreground">Cho phép brands liên hệ trực tiếp</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dữ liệu cá nhân</CardTitle>
                <CardDescription>Quản lý dữ liệu cá nhân của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Tải xuống dữ liệu
                  </Button>
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Xem hoạt động
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "billing":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Thanh toán & Hóa đơn</h2>
              <p className="text-muted-foreground">Quản lý phương thức thanh toán và xem lịch sử giao dịch</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Phương thức thanh toán</CardTitle>
                <CardDescription>Quản lý thẻ thanh toán và tài khoản ngân hàng</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-medium">**** **** **** 1234</p>
                        <p className="text-sm text-muted-foreground">Visa • Expires 12/25</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge variant="secondary">Mặc định</Badge>
                      <Button variant="ghost" size="sm">
                        Chỉnh sửa
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Thêm thẻ mới
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lịch sử giao dịch</CardTitle>
                <CardDescription>Xem lịch sử thanh toán và hóa đơn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Thanh toán chiến dịch #CM001</p>
                      <p className="text-sm text-muted-foreground">15/01/2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">+5,000,000 ₫</p>
                      <Badge variant="secondary">Hoàn thành</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Phí dịch vụ tháng 1</p>
                      <p className="text-sm text-muted-foreground">01/01/2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-red-600">-100,000 ₫</p>
                      <Badge variant="secondary">Đã thanh toán</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Xem tất cả giao dịch
                </Button>
              </CardContent>
            </Card>
          </div>
        )

      case "appearance":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Giao diện</h2>
              <p className="text-muted-foreground">Tùy chỉnh giao diện và theme</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Theme</CardTitle>
                <CardDescription>Chọn theme sáng hoặc tối</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="border-2 border-primary rounded-lg p-3 bg-white">
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                    <Label className="text-center block">Sáng</Label>
                  </div>
                  <div className="space-y-2">
                    <div className="border rounded-lg p-3 bg-gray-900">
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-600 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-700 rounded w-1/2"></div>
                      </div>
                    </div>
                    <Label className="text-center block">Tối</Label>
                  </div>
                  <div className="space-y-2">
                    <div className="border rounded-lg p-3 bg-gradient-to-br from-white to-gray-900">
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-400 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-500 rounded w-1/2"></div>
                      </div>
                    </div>
                    <Label className="text-center block">Hệ thống</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Màu sắc</CardTitle>
                <CardDescription>Chọn màu chủ đạo cho giao diện</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-6 gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-primary cursor-pointer"></div>
                  <div className="w-8 h-8 rounded-full bg-red-500 cursor-pointer"></div>
                  <div className="w-8 h-8 rounded-full bg-green-500 cursor-pointer"></div>
                  <div className="w-8 h-8 rounded-full bg-purple-500 cursor-pointer"></div>
                  <div className="w-8 h-8 rounded-full bg-orange-500 cursor-pointer"></div>
                  <div className="w-8 h-8 rounded-full bg-pink-500 cursor-pointer"></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cỡ chữ</CardTitle>
                <CardDescription>Điều chỉnh kích thước chữ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Kích thước: Trung bình</Label>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Nhỏ
                    </Button>
                    <Button variant="default" size="sm">
                      Trung bình
                    </Button>
                    <Button variant="outline" size="sm">
                      Lớn
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return <div>Section not found</div>
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        <Sidebar variant="sidebar" className="bg-card mt-16">
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

          <SidebarContent>
            {settingsMenu.map((section) => (
              <SidebarGroup key={section.title}>
                <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item) => {
                      const Icon = item.icon
                      return (
                        <SidebarMenuItem key={item.id}>
                          <SidebarMenuButton
                            isActive={activeSection === item.id}
                            onClick={() => setActiveSection(item.id as SettingsSection)}
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
          <SidebarRail />
        </Sidebar>

        <SidebarInset className="overflow-y-hidden">
          <main className="flex-1 overflow-auto "> {/*no-scrollbar */}
            <div className="container max-w-4xl space-y-6 ">
              {renderContent()}

              {/* <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button variant="outline">Hủy bỏ</Button>
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Đang lưu...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Lưu thay đổi
                    </>
                  )}
                </Button>
              </div> */}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
