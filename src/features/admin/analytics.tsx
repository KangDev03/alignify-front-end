"use client"

import { useState } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Icons } from "@/components/icons/icons"

export function Analytics() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString())

  // Mock data cho biểu đồ doanh thu theo tháng
  const revenueData = [
    { month: "T1", revenue: 2400000, users: 240, campaigns: 10, posts: 50 },
    { month: "T2", revenue: 1398000, users: 139, campaigns: 5, posts: 30 },
    { month: "T3", revenue: 9800000, users: 980, campaigns: 25, posts: 120 },
    { month: "T4", revenue: 3908000, users: 390, campaigns: 12, posts: 60 },
    { month: "T5", revenue: 4800000, users: 480, campaigns: 15, posts: 75 },
    { month: "T6", revenue: 3800000, users: 380, campaigns: 11, posts: 55 },
    { month: "T7", revenue: 4300000, users: 430, campaigns: 13, posts: 65 },
    { month: "T8", revenue: 5600000, users: 560, campaigns: 17, posts: 85 },
    { month: "T9", revenue: 6200000, users: 620, campaigns: 19, posts: 95 },
    { month: "T10", revenue: 7100000, users: 710, campaigns: 21, posts: 105 },
    { month: "T11", revenue: 8200000, users: 820, campaigns: 23, posts: 115 },
    { month: "T12", revenue: 9500000, users: 950, campaigns: 27, posts: 135 },
  ]

  // Mock data cho phân bố gói đăng ký
  const subscriptionData = [
    { name: "Basic", value: 1200, color: "#8884d8" },
    { name: "Premium", value: 800, color: "#82ca9d" },
    { name: "Enterprise", value: 300, color: "#ffc658" },
    { name: "Free Trial", value: 500, color: "#ff7300" },
  ]

  // Mock data cho người dùng mới theo tháng
  const userGrowthData = [
    { month: "T1", influencers: 120, brands: 45, total: 165 },
    { month: "T2", influencers: 98, brands: 32, total: 130 },
    { month: "T3", influencers: 156, brands: 67, total: 223 },
    { month: "T4", influencers: 189, brands: 78, total: 267 },
    { month: "T5", influencers: 234, brands: 89, total: 323 },
    { month: "T6", influencers: 198, brands: 56, total: 254 },
    { month: "T7", influencers: 267, brands: 98, total: 365 },
    { month: "T8", influencers: 289, brands: 112, total: 401 },
    { month: "T9", influencers: 312, brands: 134, total: 446 },
    { month: "T10", influencers: 345, brands: 156, total: 501 },
    { month: "T11", influencers: 378, brands: 167, total: 545 },
    { month: "T12", influencers: 423, brands: 189, total: 612 },
  ]

  // Mock data cho thống kê campaigns và forum posts
  const campaignForumData = [
    {
      month: "T1",
      campaigns: 10,
      forumPosts: 45,
      completedCampaigns: 8,
      activeCampaigns: 2,
      engagement: 78,
      successRate: 80,
    },
    {
      month: "T2",
      campaigns: 5,
      forumPosts: 32,
      completedCampaigns: 4,
      activeCampaigns: 1,
      engagement: 65,
      successRate: 80,
    },
    {
      month: "T3",
      campaigns: 25,
      forumPosts: 89,
      completedCampaigns: 20,
      activeCampaigns: 5,
      engagement: 92,
      successRate: 80,
    },
    {
      month: "T4",
      campaigns: 12,
      forumPosts: 67,
      completedCampaigns: 10,
      activeCampaigns: 2,
      engagement: 85,
      successRate: 83,
    },
    {
      month: "T5",
      campaigns: 15,
      forumPosts: 78,
      completedCampaigns: 12,
      activeCampaigns: 3,
      engagement: 88,
      successRate: 80,
    },
    {
      month: "T6",
      campaigns: 11,
      forumPosts: 56,
      completedCampaigns: 9,
      activeCampaigns: 2,
      engagement: 72,
      successRate: 82,
    },
    {
      month: "T7",
      campaigns: 13,
      forumPosts: 71,
      completedCampaigns: 11,
      activeCampaigns: 2,
      engagement: 79,
      successRate: 85,
    },
    {
      month: "T8",
      campaigns: 17,
      forumPosts: 94,
      completedCampaigns: 14,
      activeCampaigns: 3,
      engagement: 96,
      successRate: 82,
    },
    {
      month: "T9",
      campaigns: 19,
      forumPosts: 103,
      completedCampaigns: 16,
      activeCampaigns: 3,
      engagement: 105,
      successRate: 84,
    },
    {
      month: "T10",
      campaigns: 21,
      forumPosts: 112,
      completedCampaigns: 18,
      activeCampaigns: 3,
      engagement: 118,
      successRate: 86,
    },
    {
      month: "T11",
      campaigns: 23,
      forumPosts: 125,
      completedCampaigns: 20,
      activeCampaigns: 3,
      engagement: 132,
      successRate: 87,
    },
    {
      month: "T12",
      campaigns: 27,
      forumPosts: 145,
      completedCampaigns: 23,
      activeCampaigns: 4,
      engagement: 156,
      successRate: 85,
    },
  ]

  // Mock data cho trạng thái campaigns
  const campaignStatusData = [
    { name: "Hoàn thành", value: 185, color: "#22c55e" },
    { name: "Đang chạy", value: 32, color: "#3b82f6" },
    { name: "Tạm dừng", value: 8, color: "#f59e0b" },
    { name: "Đã hủy", value: 15, color: "#ef4444" },
  ]

  // Mock data cho loại forum posts
  const forumPostTypeData = [
    { name: "Thảo luận", value: 450, color: "#8b5cf6" },
    { name: "Hỏi đáp", value: 320, color: "#06b6d4" },
    { name: "Chia sẻ kinh nghiệm", value: 280, color: "#10b981" },
    { name: "Đánh giá", value: 150, color: "#f59e0b" },
  ]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0)
  const totalUsers = subscriptionData.reduce((sum, item) => sum + item.value, 0)
  const totalCampaigns = revenueData.reduce((sum, item) => sum + item.campaigns, 0)
  const totalPosts = revenueData.reduce((sum, item) => sum + item.posts, 0)

  // Tính toán thống kê cho campaigns và forum posts
  const totalForumPosts = campaignForumData.reduce((sum, item) => sum + item.forumPosts, 0)
  const totalCompletedCampaigns = campaignForumData.reduce((sum, item) => sum + item.completedCampaigns, 0)
  const averageSuccessRate = (
    campaignForumData.reduce((sum, item) => sum + item.successRate, 0) / campaignForumData.length
  ).toFixed(1)

  const years = ["2023", "2024", "2025", "2026", "2027"]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Thống kê & Phân tích</h2>
          <p className="text-muted-foreground">Tổng quan về hiệu suất và tăng trưởng của hệ thống</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select onValueChange={setSelectedYear} defaultValue={selectedYear}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Chọn năm" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
            <Icons.DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng người dùng</CardTitle>
            <Icons.users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng chiến dịch</CardTitle>
            <Icons.layoutDashboard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCampaigns}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng bài viết</CardTitle>
            <Icons.fileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPosts}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="revenue" className="w-full">
        <TabsList>
          <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
          <TabsTrigger value="users">Người dùng</TabsTrigger>
          <TabsTrigger value="subscriptions">Gói đăng ký</TabsTrigger>
          <TabsTrigger value="campaigns-forum">Chiến dịch & Forum</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Doanh thu theo tháng</CardTitle>
              <CardDescription>Biểu đồ doanh thu trong 12 tháng qua</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                  <Tooltip
                    formatter={(value) => [formatCurrency(value as number), "Doanh thu"]}
                    labelFormatter={(label) => `Tháng ${label}`}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Tăng trưởng người dùng</CardTitle>
              <CardDescription>Số lượng người dùng mới theo tháng</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="influencers" stackId="a" fill="#8884d8" name="Influencers" />
                  <Bar dataKey="brands" stackId="a" fill="#82ca9d" name="Brands" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscriptions" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Phân bố gói đăng ký</CardTitle>
                <CardDescription>Tỷ lệ người dùng theo từng gói</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={subscriptionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {subscriptionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Chi tiết gói đăng ký</CardTitle>
                <CardDescription>Số lượng người dùng từng gói</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subscriptionData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{item.value.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">
                          {((item.value / totalUsers) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns-forum" className="mt-6">
          <div className="grid gap-6">
            {/* Key Metrics for Campaigns & Forum */}
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tổng Forum Posts</CardTitle>
                  <Icons.messageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalForumPosts.toLocaleString()}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Chiến dịch hoàn thành</CardTitle>
                  <Icons.megaphone className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalCompletedCampaigns}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tỷ lệ thành công</CardTitle>
                  <Icons.layoutDashboard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{averageSuccessRate}%</div>
                </CardContent>
              </Card>
            </div>

            {/* Combined Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Chiến dịch & Forum Posts theo tháng</CardTitle>
                <CardDescription>Thống kê hoạt động chiến dịch và bài viết forum</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={campaignForumData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="campaigns" fill="#8884d8" name="Tổng chiến dịch" />
                    <Bar yAxisId="left" dataKey="completedCampaigns" fill="#82ca9d" name="Chiến dịch hoàn thành" />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="forumPosts"
                      stroke="#ff7300"
                      strokeWidth={3}
                      name="Forum Posts"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Status Charts */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Trạng thái chiến dịch</CardTitle>
                  <CardDescription>Phân bố trạng thái các chiến dịch</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={campaignStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {campaignStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Loại bài viết Forum</CardTitle>
                  <CardDescription>Phân loại các bài viết trong forum</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={forumPostTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {forumPostTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Success Rate & Engagement Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Tỷ lệ thành công & Engagement</CardTitle>
                <CardDescription>Hiệu suất chiến dịch và mức độ tương tác theo tháng</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={campaignForumData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" domain={[70, 90]} />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="successRate"
                      stroke="#22c55e"
                      strokeWidth={2}
                      name="Tỷ lệ thành công (%)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="engagement"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Engagement"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
