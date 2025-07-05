"use client"

import { useState } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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
  const [selectedYear, setSelectedYear] = useState("2024")

  // Mock data cho biểu đồ doanh thu theo tháng
  const revenueData = [
    { month: "T1", revenue: 2400000, users: 240 },
    { month: "T2", revenue: 1398000, users: 139 },
    { month: "T3", revenue: 9800000, users: 980 },
    { month: "T4", revenue: 3908000, users: 390 },
    { month: "T5", revenue: 4800000, users: 480 },
    { month: "T6", revenue: 3800000, users: 380 },
    { month: "T7", revenue: 4300000, users: 430 },
    { month: "T8", revenue: 5600000, users: 560 },
    { month: "T9", revenue: 6200000, users: 620 },
    { month: "T10", revenue: 7100000, users: 710 },
    { month: "T11", revenue: 8200000, users: 820 },
    { month: "T12", revenue: 9500000, users: 950 },
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

  // Mock data cho hoạt động website
  const websiteActivityData = [
    { date: "1/1", visits: 1200, pageViews: 3400, bounceRate: 45 },
    { date: "2/1", visits: 1100, pageViews: 3100, bounceRate: 42 },
    { date: "3/1", visits: 1400, pageViews: 4200, bounceRate: 38 },
    { date: "4/1", visits: 1600, pageViews: 4800, bounceRate: 35 },
    { date: "5/1", visits: 1800, pageViews: 5400, bounceRate: 32 },
    { date: "6/1", visits: 1500, pageViews: 4500, bounceRate: 40 },
    { date: "7/1", visits: 1900, pageViews: 5700, bounceRate: 28 },
    { date: "8/1", visits: 2100, pageViews: 6300, bounceRate: 25 },
    { date: "9/1", visits: 2300, pageViews: 6900, bounceRate: 22 },
    { date: "10/1", visits: 2500, pageViews: 7500, bounceRate: 20 },
    { date: "11/1", visits: 2700, pageViews: 8100, bounceRate: 18 },
    { date: "12/1", visits: 2900, pageViews: 8700, bounceRate: 15 },
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
  const totalCampaigns = 1247 // Mock data
  const totalPosts = 8934 // Mock data

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Thống kê & Phân tích</h2>
          <p className="text-muted-foreground">Tổng quan về hiệu suất và tăng trưởng của hệ thống</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Chọn năm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
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
            <Icons.megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCampaigns.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng bài viết</CardTitle>
            <Icons.fileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPosts.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="revenue" className="w-full">
        <TabsList>
          <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
          <TabsTrigger value="users">Người dùng</TabsTrigger>
          <TabsTrigger value="subscriptions">Gói đăng ký</TabsTrigger>
          <TabsTrigger value="activity">Hoạt động website</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Doanh thu theo tháng</CardTitle>
              <CardDescription>
                Biểu đồ doanh thu trong 12 tháng năm{" "}{selectedYear}
              </CardDescription>
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
              <CardDescription>Số lượng người dùng mới theo tháng năm {selectedYear}</CardDescription>
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
                <CardDescription>Tỷ lệ người dùng theo từng gói năm {selectedYear}</CardDescription>
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

        <TabsContent value="activity" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Hoạt động website</CardTitle>
              <CardDescription>Lượt truy cập và tương tác theo tháng năm {selectedYear}</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={websiteActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="visits" stroke="#8884d8" name="Lượt truy cập" />
                  <Line yAxisId="left" type="monotone" dataKey="pageViews" stroke="#82ca9d" name="Lượt xem trang" />
                  <Line yAxisId="right" type="monotone" dataKey="bounceRate" stroke="#ffc658" name="Tỷ lệ thoát (%)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
