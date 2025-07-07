'use client';

import { useState } from 'react';
import {
  CheckCircle,
  DollarSign,
  Eye,
  Heart,
  MessageSquare,
  Send,
  Share2,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type UserRole = 'INFLUENCER' | 'BRAND' | 'ADMIN' | null;

interface StatisticsProps {
  userRole: UserRole;
}

// Mock data for Brand
const brandInvitationData = [
  { month: 'T1', sent: 45, accepted: 32, rejected: 13 },
  { month: 'T2', sent: 52, accepted: 38, rejected: 14 },
  { month: 'T3', sent: 48, accepted: 35, rejected: 13 },
  { month: 'T4', sent: 61, accepted: 44, rejected: 17 },
  { month: 'T5', sent: 58, accepted: 41, rejected: 17 },
  { month: 'T6', sent: 67, accepted: 49, rejected: 18 },
];

const brandApplicationData = [
  { month: 'T1', total: 128, approved: 89, pending: 25, rejected: 14 },
  { month: 'T2', total: 145, approved: 102, pending: 28, rejected: 15 },
  { month: 'T3', total: 134, approved: 95, pending: 24, rejected: 15 },
  { month: 'T4', total: 167, approved: 118, pending: 32, rejected: 17 },
  { month: 'T5', total: 156, approved: 110, pending: 29, rejected: 17 },
  { month: 'T6', total: 189, approved: 134, pending: 35, rejected: 20 },
];

const brandCostData = [
  { month: 'T1', paid: 45000000, pending: 12000000 },
  { month: 'T2', paid: 52000000, pending: 15000000 },
  { month: 'T3', paid: 48000000, pending: 11000000 },
  { month: 'T4', paid: 61000000, pending: 18000000 },
  { month: 'T5', paid: 58000000, pending: 16000000 },
  { month: 'T6', paid: 67000000, pending: 21000000 },
];

// Mock data for Influencer
const influencerInvitationData = [
  { month: 'T1', received: 23, accepted: 18, rejected: 5 },
  { month: 'T2', received: 28, accepted: 21, rejected: 7 },
  { month: 'T3', received: 25, accepted: 19, rejected: 6 },
  { month: 'T4', received: 32, accepted: 24, rejected: 8 },
  { month: 'T5', received: 29, accepted: 22, rejected: 7 },
  { month: 'T6', received: 35, accepted: 27, rejected: 8 },
];

const influencerApplicationData = [
  { month: 'T1', sent: 15, accepted: 8, rejected: 7 },
  { month: 'T2', sent: 18, accepted: 11, rejected: 7 },
  { month: 'T3', sent: 16, accepted: 9, rejected: 7 },
  { month: 'T4', sent: 21, accepted: 13, rejected: 8 },
  { month: 'T5', sent: 19, accepted: 12, rejected: 7 },
  { month: 'T6', sent: 24, accepted: 15, rejected: 9 },
];

const influencerIncomeData = [
  { month: 'T1', income: 8500000, campaigns: 8 },
  { month: 'T2', income: 12300000, campaigns: 11 },
  { month: 'T3', income: 9800000, campaigns: 9 },
  { month: 'T4', income: 15600000, campaigns: 13 },
  { month: 'T5', income: 13200000, campaigns: 12 },
  { month: 'T6', income: 18900000, campaigns: 15 },
];

const influencerForumData = [
  { month: 'T1', posts: 12, likes: 245, comments: 89, shares: 34, views: 1250 },
  { month: 'T2', posts: 15, likes: 312, comments: 108, shares: 45, views: 1580 },
  { month: 'T3', posts: 11, likes: 198, comments: 76, shares: 28, views: 980 },
  { month: 'T4', posts: 18, likes: 389, comments: 142, shares: 56, views: 1890 },
  { month: 'T5', posts: 16, likes: 356, comments: 125, shares: 48, views: 1670 },
  { month: 'T6', posts: 20, likes: 445, comments: 167, shares: 67, views: 2150 },
];

export function Statistics({ userRole }: StatisticsProps) {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  if (userRole === 'BRAND') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Thống kê tổng quan</h1>
            <p className="text-muted-foreground">
              Theo dõi hiệu suất chiến dịch và chi phí của bạn
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6months">6 tháng gần đây</SelectItem>
                <SelectItem value="12months">12 tháng gần đây</SelectItem>
                <SelectItem value="quarter">Theo quý</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lời mời đã gửi</CardTitle>
              <Send className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">331</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tỷ lệ chấp nhận</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">73.1%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng ứng tuyển</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">919</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chi phí tháng này</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">88M</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="invitations" className="space-y-4">
          <TabsList>
            <TabsTrigger value="invitations">Lời mời</TabsTrigger>
            <TabsTrigger value="applications">Ứng tuyển</TabsTrigger>
            <TabsTrigger value="costs">Chi phí</TabsTrigger>
          </TabsList>

          <TabsContent value="invitations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Thống kê lời mời theo tháng</CardTitle>
                <CardDescription>Số lượng lời mời đã gửi và tỷ lệ phản hồi</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={brandInvitationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sent" fill="#8884d8" name="Đã gửi" />
                    <Bar dataKey="accepted" fill="#82ca9d" name="Được chấp nhận" />
                    <Bar dataKey="rejected" fill="#ffc658" name="Bị từ chối" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Thống kê ứng tuyển theo tháng</CardTitle>
                <CardDescription>Số lượng ứng tuyển nhận được và trạng thái xử lý</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={brandApplicationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                      name="Tổng"
                    />
                    <Area
                      type="monotone"
                      dataKey="approved"
                      stackId="2"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      name="Đã duyệt"
                    />
                    {/* <Area
                      type="monotone"
                      dataKey="pending"
                      stackId="3"
                      stroke="#ffc658"
                      fill="#ffc658"
                      name="Chờ duyệt"
                    /> */}
                    <Area
                      type="monotone"
                      dataKey="rejected"
                      stackId="4"
                      stroke="#ff7c7c"
                      fill="#ff7c7c"
                      name="Từ chối"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="costs" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Chi phí theo tháng</CardTitle>
                  <CardDescription>Số tiền đã thanh toán và đang chờ thanh toán</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={brandCostData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Bar dataKey="paid" fill="#82ca9d" name="Đã thanh toán" />
                      <Bar dataKey="pending" fill="#ffc658" name="Chờ thanh toán" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tổng quan chi phí</CardTitle>
                  <CardDescription>6 tháng gần đây</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Đã thanh toán</span>
                    </div>
                    <span className="font-semibold">{formatCurrency(331000000)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Chờ thanh toán</span>
                    </div>
                    <span className="font-semibold">{formatCurrency(93000000)}</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Tổng cộng</span>
                      <span className="text-lg font-bold">{formatCurrency(424000000)}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span>Chi phí trung bình: {formatCurrency(70666667)}/tháng</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Influencer Statistics
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Thống kê tổng quan</h1>
          <p className="text-muted-foreground">Theo dõi hiệu suất và thu nhập của bạn</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6months">6 tháng gần đây</SelectItem>
              <SelectItem value="12months">12 tháng gần đây</SelectItem>
              <SelectItem value="quarter">Theo quý</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lời mời nhận được</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">192</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tỷ lệ chấp nhận</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">77.1%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Thu nhập tháng này</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.9M</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bài đăng forum</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="invitations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="invitations">Lời mời</TabsTrigger>
          <TabsTrigger value="applications">Ứng tuyển</TabsTrigger>
          <TabsTrigger value="income">Thu nhập</TabsTrigger>
          <TabsTrigger value="forum">Forum</TabsTrigger>
        </TabsList>

        <TabsContent value="invitations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thống kê lời mời theo tháng</CardTitle>
              <CardDescription>Số lượng lời mời nhận được và tỷ lệ phản hồi</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={influencerInvitationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="received" fill="#8884d8" name="Đã nhận" />
                  <Bar dataKey="accepted" fill="#82ca9d" name="Đã chấp nhận" />
                  <Bar dataKey="rejected" fill="#ffc658" name="Đã từ chối" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thống kê ứng tuyển theo tháng</CardTitle>
              <CardDescription>Số lượng ứng tuyển đã gửi và kết quả</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={influencerApplicationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="sent"
                    stroke="#8884d8"
                    name="Đã gửi"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="accepted"
                    stroke="#82ca9d"
                    name="Được chấp nhận"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="rejected"
                    stroke="#ffc658"
                    name="Bị từ chối"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Thu nhập theo tháng</CardTitle>
                <CardDescription>Doanh thu từ các chiến dịch đã hoàn thành</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={influencerIncomeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Area type="monotone" dataKey="income" stroke="#82ca9d" fill="#82ca9d" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tổng quan thu nhập</CardTitle>
                <CardDescription>6 tháng gần đây</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tổng thu nhập</span>
                  <span className="font-semibold">{formatCurrency(78300000)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Số chiến dịch</span>
                  <span className="font-semibold">68 chiến dịch</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Thu nhập/chiến dịch</span>
                  <span className="font-semibold">{formatCurrency(1151471)}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Thu nhập trung bình</span>
                    <span className="text-lg font-bold">{formatCurrency(13050000)}/tháng</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span>Tăng trưởng 28% so với 6 tháng trước</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forum" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Hoạt động forum theo tháng</CardTitle>
                <CardDescription>Số bài đăng và lượt tương tác</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={influencerForumData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="posts" fill="#8884d8" name="Bài đăng" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tương tác forum theo tháng</CardTitle>
                <CardDescription>Likes, comments, shares và views</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={influencerForumData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="likes"
                      stroke="#e91e63"
                      name="Likes"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="comments"
                      stroke="#2196f3"
                      name="Comments"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="shares"
                      stroke="#ff9800"
                      name="Shares"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="views"
                      stroke="#4caf50"
                      name="Views"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tổng quan hoạt động forum</CardTitle>
              <CardDescription>Thống kê tổng hợp 6 tháng gần đây</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-pink-50 dark:bg-pink-950/20">
                  <Heart className="h-8 w-8 text-pink-600" />
                  <div>
                    <p className="text-2xl font-bold">2,145</p>
                    <p className="text-sm text-muted-foreground">Tổng likes</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                  <MessageSquare className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">707</p>
                    <p className="text-sm text-muted-foreground">Tổng comments</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                  <Share2 className="h-8 w-8 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold">278</p>
                    <p className="text-sm text-muted-foreground">Tổng shares</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-green-50 dark:bg-green-950/20">
                  <Eye className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">9.5K</p>
                    <p className="text-sm text-muted-foreground">Tổng views</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
