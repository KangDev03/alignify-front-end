'use client';

import { useEffect, useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import { Star, TrendingUp } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Icons } from '@/components/icons/icons';
import {
  useGetCategoriesQuery,
  useGetRolesQuery,
  useSearchCampaignsQuery,
} from '@/features/common/common.service';
import { setCampaigns, setCategories, setRoles } from '@/features/common/common.slice';
import Brands from '@/features/home/components/brands';
import Campaigns from '@/features/home/components/campaigns';
import Forum from '@/features/home/components/forum';
import Influencers from '@/features/home/components/influencers';
import { useAppDispatch } from '@/hooks/redux';

const tabs = [
  { value: 'campaigns', label: 'Chiến dịch' },
  { value: 'brands', label: 'Brands' },
  { value: 'influencers', label: 'Influencers' },
  { value: 'forum', label: 'Forum' },
];

const mockInfluencers = [
  {
    id: '1',
    name: 'Nguyễn Thị Lan',
    avatar: '/placeholder.svg?height=60&width=60',
    category: 'Làm đẹp',
    followers: '125K',
    engagement: '3.2%',
    rating: 4.8,
    location: 'TP. HCM',
  },
  {
    id: '2',
    name: 'Trần Văn Nam',
    avatar: '/placeholder.svg?height=60&width=60',
    category: 'Công nghệ',
    followers: '89K',
    engagement: '4.1%',
    rating: 4.6,
    location: 'Hà Nội',
  },
];

export function HomePage() {
  const dispatch = useAppDispatch();
  const { data: roles } = useGetRolesQuery();
  const { data: categories } = useGetCategoriesQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [activeTab, setActiveTab] = useState('campaigns');
  const [searchTrigger, setSearchTrigger] = useState(false);

  // Gọi API tìm kiếm khi searchTrigger đổi sang true
  const { data: searchResult } = useSearchCampaignsQuery(
    searchTrigger && searchTerm.trim() ? { term: searchTerm.trim() } : skipToken,
  );

  useEffect(() => {
    dispatch(setRoles(roles));
    dispatch(setCategories(categories));
  }, [categories, dispatch, roles]);

  // Lưu kết quả tìm kiếm vào store khi có kết quả
  useEffect(() => {
    if (searchResult) {
      console.log('Search result:', searchResult);
      dispatch(setCampaigns(searchResult));
    }
  }, [searchResult, dispatch]);

  // Xử lý sự kiện Enter trên ô tìm kiếm
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (activeTab !== 'campaigns') return; // Chỉ tìm kiếm ở tab Chiến dịch
      if (!searchTerm.trim()) {
        dispatch(setCampaigns(undefined)); // Reset kết quả tìm kiếm
      }
      setSearchTrigger((prev) => !prev);
    }
  };

  // Reset kết quả tìm kiếm khi chuyển tab hoặc xoá từ khoá
  useEffect(() => {
    if (activeTab !== 'campaigns') {
      dispatch(setCampaigns(undefined));
    }
  }, [activeTab, dispatch]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      dispatch(setCampaigns(undefined));
    }
  }, [searchTerm, dispatch]);

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-300">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Khám phá</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Icons.search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.data.map((category) => (
                    <SelectItem key={category.categoryId} value={category.categoryName}>
                      {category.categoryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full h-fit grid-cols-4 p-1">
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className="h-full">
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="campaigns" className="mt-6">
                <Campaigns />
              </TabsContent>

              <TabsContent value="brands" className="mt-6">
                <Brands />
              </TabsContent>

              <TabsContent value="influencers" className="mt-6">
                <Influencers />
              </TabsContent>

              <TabsContent value="forum" className="mt-6">
                <Forum />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="space-y-6">
            {/* Trending Campaigns */}
            <Card className="border-2 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  <span>Chiến dịch hot</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg hover:bg-muted cursor-pointer">
                  <h4 className="font-medium text-sm">
                    Chiến dịch quảng cáo sản phẩm làm đẹp mùa hè
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">Beauty Co.</p>
                </div>
                <div className="p-3 border rounded-lg hover:bg-muted cursor-pointer">
                  <h4 className="font-medium text-sm">Review công nghệ AI mới nhất</h4>
                  <p className="text-xs text-muted-foreground mt-1">TechViet</p>
                </div>
                <div className="p-3 border rounded-lg hover:bg-muted cursor-pointer">
                  <h4 className="font-medium text-sm">Fashion Week 2024</h4>
                  <p className="text-xs text-muted-foreground mt-1">Fashion House</p>
                </div>
              </CardContent>
            </Card>

            {/* Top Influencers */}
            <Card className="border-2 border-primary/20 bg-card shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>Top Influencers</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockInfluencers.slice(0, 3).map((influencer, index) => (
                  <div key={influencer.id} className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {index + 1}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={influencer.avatar || '/placeholder.svg'}
                        alt={influencer.name}
                      />
                      <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{influencer.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {influencer.followers} followers
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-2 border-primary/20 bg-card shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Thống kê nhanh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Chiến dịch đang chạy</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Brands hoạt động</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Influencers online</span>
                  <span className="font-semibold">89</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Bài viết forum hôm nay</span>
                  <span className="font-semibold">12</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
