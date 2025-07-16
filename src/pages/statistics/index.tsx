'use client';

import { useEffect,useState } from 'react';
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

import { useGetBrandStatisticsQuery, useGetInfluencerStatisticsQuery } from '@/features/statistics/statistics.api';
import { useAppSelector } from '@/hooks/redux';

type UserRole = 'INFLUENCER' | 'BRAND' | 'ADMIN' | null;

interface StatisticsProps {
  userRole: UserRole;
}

export default function StatisticsPage({ userRole }: StatisticsProps) {
  const userId = useAppSelector((state) => state.auth.id);
  const safeUserId = userId ?? '';
  console.log('[DEBUG] userId:', userId);
  const brandSkip = userRole !== 'BRAND' || !userId;
  const influencerSkip = userRole !== 'INFLUENCER' || !userId;
  console.log('[DEBUG] brandSkip:', brandSkip);
  console.log('[DEBUG] influencerSkip:', influencerSkip);
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedPeriod, setSelectedPeriod] = useState('6months');


  const {
    data: brand,
    isLoading: brandLoading,
    error: brandError,
  } = useGetBrandStatisticsQuery(safeUserId, { skip: brandSkip });

  const {
    data: influencer,
    isLoading: influencerLoading,
    error: influencerError,
  } = useGetInfluencerStatisticsQuery(safeUserId, { skip: influencerSkip });
  // Log API response for influencer statistics using useEffect
  useEffect(() => {
    console.log('[DEBUG] userRole:', userRole);
    console.log('[DEBUG] influencerLoading:', influencerLoading);
    console.log('[DEBUG] influencerError:', influencerError);
    console.log('[DEBUG] influencer:', influencer);
    if (userRole === 'INFLUENCER') {
      if (influencerLoading) {
        console.log('API /api/v1/statistics/influencer: Loading...');
      }
      if (influencerError) {
        console.log('API /api/v1/statistics/influencer: Error', influencerError);
      }
      if (influencer) {
        console.log('API /api/v1/statistics/influencer: Data', influencer);
      }
    }
  }, [userRole, influencer, influencerLoading, influencerError]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  if (userRole === 'BRAND' && brandLoading) return <div className="py-10 text-center">Đang tải dữ liệu...</div>;
  if (userRole === 'BRAND' && brandError) return <div className="py-10 text-center text-red-500">{(brandError as any)?.message || 'Lỗi lấy dữ liệu brand'}</div>;
  if (userRole === 'INFLUENCER' && influencerLoading) return <div className="py-10 text-center">Đang tải dữ liệu...</div>;
  if (userRole === 'INFLUENCER' && influencerError) return <div className="py-10 text-center text-red-500">{(influencerError as any)?.message || 'Lỗi lấy dữ liệu influencer'}</div>;

  if (userRole === 'BRAND' && brand) {
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
              <div className="text-2xl font-bold">{brand.totalInvitations}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tỷ lệ chấp nhận</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Number(brand.acceptanceRate).toFixed(2)}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng ứng tuyển</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{brand.totalApplications}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chi phí tháng này</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(brand.costs[brand.costs.length - 1]?.paid || 0)}
              </div>
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
                  <BarChart data={brand.invitations}>
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
                  <AreaChart data={brand.applications}>
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
                    <BarChart data={brand.costs}>
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
                    <span className="font-semibold">
                      {formatCurrency(
                        brand.costs.reduce((total: number, item: any) => total + item.paid, 0)
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Chờ thanh toán</span>
                    </div>
                    <span className="font-semibold">
                      {formatCurrency(
                        brand.costs.reduce((total: number, item: any) => total + item.pending, 0)
                      )}
                    </span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Tổng cộng</span>
                      <span className="text-lg font-bold">
                        {formatCurrency(
                          brand.costs.reduce((total: number, item: any) => total + item.paid, 0) +
                            brand.costs.reduce((total: number, item: any) => total + item.pending, 0)
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span>
                      Chi phí trung bình:{' '}
                      {formatCurrency(
                        (brand.costs.reduce((total: number, item: any) => total + item.paid, 0) +
                          brand.costs.reduce((total: number, item: any) => total + item.pending, 0)) /
                          6
                      )}
                      /tháng
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  if (userRole === 'INFLUENCER' && influencer) {
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
              <div className="text-2xl font-bold">{influencer.totalInvitations}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tỷ lệ chấp nhận</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Number(influencer.acceptanceRate).toFixed(2)}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Thu nhập tháng này</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(influencer.income[influencer.income.length - 1]?.income || 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bài đăng forum</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{influencer.forum[influencer.forum.length - 1]?.posts}</div>
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
                  <BarChart data={influencer.invitations}>
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
                  <LineChart data={influencer.applications}>
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
                    <AreaChart data={influencer.income}>
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
                    <span className="font-semibold">
                      {formatCurrency(
                        influencer.income.reduce((total: number, item: any) => total + item.income, 0)
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Số chiến dịch</span>
                    <span className="font-semibold">{influencer.totalCampaigns} chiến dịch</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Thu nhập/chiến dịch</span>
                    <span className="font-semibold">
                      {formatCurrency(
                        influencer.income.reduce((total: number, item: any) => total + item.income, 0) /
                          influencer.totalCampaigns
                      )}
                    </span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Thu nhập trung bình</span>
                      <span className="text-lg font-bold">
                        {formatCurrency(
                          influencer.income.reduce((total: number, item: any) => total + item.income, 0) /
                            6
                        )}
                        /tháng
                      </span>
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
                    <BarChart data={influencer.forum}>
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
                    <LineChart data={influencer.forum}>
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
                      <p className="text-2xl font-bold">
                        {influencer.forum.reduce((total: number, item: any) => total + item.likes, 0)}
                      </p>
                      <p className="text-sm text-muted-foreground">Tổng likes</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                    <MessageSquare className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {influencer.forum.reduce((total: number, item: any) => total + item.comments, 0)}
                      </p>
                      <p className="text-sm text-muted-foreground">Tổng comments</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                    <Share2 className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {influencer.forum.reduce((total: number, item: any) => total + item.shares, 0)}
                      </p>
                      <p className="text-sm text-muted-foreground">Tổng shares</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg bg-green-50 dark:bg-green-950/20">
                    <Eye className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {influencer.forum.reduce((total: number, item: any) => total + item.views, 0)}
                      </p>
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

  return null;
}
