import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Icons } from "@/components/icons/icons"

export function AdminDashboard() {
  const stats = [
    {
      title: "Tổng người dùng",
      value: "2,847",
      change: "+12%",
      changeType: "positive" as const,
      icon: Icons.users,
    },
    {
      title: "Chiến dịch đang chạy",
      value: "156",
      change: "+8%",
      changeType: "positive" as const,
      icon: Icons.megaphone,
    },
    {
      title: "Bài viết forum",
      value: "1,234",
      change: "+23%",
      changeType: "positive" as const,
      icon: Icons.messageSquare,
    },
    {
      title: "Báo cáo chờ xử lý",
      value: "23",
      change: "-5%",
      changeType: "negative" as const,
      icon: Icons.flag,
    },
    {
      title: "Doanh thu tháng này",
      value: "₫2.4M",
      change: "+15%",
      changeType: "positive" as const,
      icon: Icons.DollarSign,
    },
    {
      title: "Người dùng hoạt động",
      value: "1,892",
      change: "+7%",
      changeType: "positive" as const,
      icon: Icons.userCheck,
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "user_registered",
      message: "Người dùng mới đăng ký: Nguyễn Văn A",
      time: "5 phút trước",
      severity: "info" as const,
    },
    {
      id: 2,
      type: "campaign_created",
      message: "Chiến dịch mới được tạo: Beauty Summer 2024",
      time: "15 phút trước",
      severity: "success" as const,
    },
    {
      id: 3,
      type: "report_submitted",
      message: "Báo cáo vi phạm mới về bài viết #1234",
      time: "30 phút trước",
      severity: "warning" as const,
    },
    {
      id: 4,
      type: "user_banned",
      message: "Tài khoản @spammer123 đã bị cấm",
      time: "1 giờ trước",
      severity: "error" as const,
    },
    {
      id: 5,
      type: "payment_received",
      message: "Thanh toán gói Premium từ Beauty Co.",
      time: "2 giờ trước",
      severity: "success" as const,
    },
  ]

  const getSeverityColor = (severity: string) => {
    const base = "pointer-events-none hover:bg-transparent hover:text-inherit"
    switch (severity) {
      case "success":
        return `bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 ${base}`
      case "warning":
        return `bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 ${base}`
      case "error":
        return `bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 ${base}`
      default:
        return `bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 ${base}`
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                    {stat.change}
                  </span>{" "}
                  so với tháng trước
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
            <CardDescription>Các sự kiện mới nhất trên hệ thống</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Badge className={getSeverityColor(activity.severity)}>
                      {activity.severity === "warning" && <Icons.alertTriangle className="h-3 w-3 mr-1" />}
                      {activity.severity === "success" && <Icons.userCheck className="h-3 w-3 mr-1" />}
                      {activity.severity === "error" && <Icons.flag className="h-3 w-3 mr-1" />}
                      {activity.severity === "info" && <Icons.users className="h-3 w-3 mr-1" />}
                    </Badge>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Thống kê nhanh</CardTitle>
            <CardDescription>Tổng quan hệ thống hôm nay</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Người dùng đăng ký mới</span>
                <span className="font-medium">+24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Chiến dịch được tạo</span>
                <span className="font-medium">+8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Bài viết forum mới</span>
                <span className="font-medium">+45</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Báo cáo vi phạm</span>
                <span className="font-medium text-red-600">+3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Doanh thu hôm nay</span>
                <span className="font-medium text-green-600">₫156K</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Người dùng online</span>
                <span className="font-medium">342</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
