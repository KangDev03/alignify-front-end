'use client';

import { useEffect, useState } from 'react';
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
import { useGetCategoriesQuery, useGetRolesQuery } from '@/features/common/common.service';
import { setCategories, setRoles } from '@/features/common/common.slice';
import type { Category } from '@/features/common/common.type';
import Brands from '@/features/home/components/brands';
import Campaigns from '@/features/home/components/campaigns';
import Forum from '@/features/home/components/forum';
import Influencers from '@/features/home/components/influencers';
import { resetHomeState, setRefetch } from '@/features/home/home.slice';
import type { homeTab } from '@/features/home/home.type';
import { useGetCampaignTop3Query } from '@/features/my-campaign/campaign.service';
import { useGetTopInfluencerQuery } from '@/features/profile/profile.service';
import { useAppDispatch } from '@/hooks/redux';
import { formatNumber } from '@/utils/format';

const tabs = [
  { value: 'campaign', label: 'Chiến dịch' },
  { value: 'brand', label: 'Brands' },
  { value: 'influencer', label: 'Influencers' },
  { value: 'forum', label: 'Forum' },
];

export function HomePage() {
  const dispatch = useAppDispatch();
  const { data: roles } = useGetRolesQuery();
  const { data: categories } = useGetCategoriesQuery();
  const { data: top3Campaign } = useGetCampaignTop3Query();
  const { data: top2Influencer } = useGetTopInfluencerQuery();
  const [searchTermChange, setSearchTermChange] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    categoryId: 'all',
    categoryName: 'Tất Cả',
  });
  const [activeTab, setActiveTab] = useState<homeTab>('campaign');

  useEffect(() => {
    dispatch(setRoles(roles));
    dispatch(setCategories(categories));
  }, [categories, dispatch, roles]);

  const handleTabRefetch = (tab: homeTab) => {
    dispatch(setRefetch({ key: tab, value: true }));
    setSelectedCategory({ categoryId: 'all', categoryName: 'Tất cả' });
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTermChange.trim().length > 0) {
      setSearchTerm(searchTermChange);
    } else if (
      !searchTermChange.trim() ||
      searchTermChange.trim().length === 0 ||
      searchTermChange.trim() === ''
    ) {
      setSelectedCategory({ categoryId: 'all', categoryName: 'Tất cả' });
      setSearchTermChange('');
      setSearchTerm(null);
      dispatch(setRefetch({ key: activeTab, value: true }));
    }
  };

  useEffect(() => {
    if (!searchTermChange.trim()) {
      setSelectedCategory({ categoryId: 'all', categoryName: 'Tất cả' });
      setSearchTerm(null);
      dispatch(setRefetch({ key: activeTab, value: true }));
    }
  }, [searchTermChange, dispatch, activeTab]);

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
                  value={searchTermChange}
                  onChange={(e) => setSearchTermChange(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  className="pl-10"
                />
              </div>
              <Select
                value={selectedCategory.categoryId}
                onValueChange={(value) => {
                  dispatch(resetHomeState());
                  if (value === 'all') {
                    setSelectedCategory({ categoryId: 'all', categoryName: 'Tất Cả' });
                  } else {
                    const found = categories?.data.find((cat) => cat.categoryId === value);
                    if (found) setSelectedCategory(found);
                  }
                }}
              >
                <SelectTrigger className="w-full sm:w-[180px] capitalize">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="capitalize">
                    Tất Cả
                  </SelectItem>
                  {categories?.data.map((category) => (
                    <SelectItem
                      key={category.categoryId}
                      value={category.categoryId}
                      className="capitalize"
                    >
                      {category.categoryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as homeTab)}
              className="w-full"
            >
              <TabsList className="grid w-full h-fit grid-cols-4 p-1">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="h-full"
                    onClick={() => handleTabRefetch(tab.value as homeTab)}
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="campaign" className="mt-6">
                <Campaigns
                  selectedCategoryId={selectedCategory.categoryId}
                  searchTerm={searchTerm}
                />
              </TabsContent>

              <TabsContent value="brand" className="mt-6">
                <Brands searchTerm={searchTerm} selectedCategoryId={selectedCategory.categoryId} />
              </TabsContent>

              <TabsContent value="influencer" className="mt-6">
                <Influencers
                  searchTerm={searchTerm}
                  selectedCategoryId={selectedCategory.categoryId}
                />
              </TabsContent>

              <TabsContent value="forum" className="mt-6">
                <Forum searchTerm={searchTerm} selectedCategoryId={selectedCategory.categoryId} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="space-y-6">
            {/* Trending Campaigns */}
            <Card className="border-2 shadow-lg gap-0">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  <span>Chiến dịch hot</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {top3Campaign?.data && Array.isArray(top3Campaign?.data) && top3Campaign.data.length > 0 ? (
                  top3Campaign.data.map((campaign) => (
                    <div
                      key={campaign.campaignId}
                      className="p-3 border rounded-lg hover:bg-muted cursor-pointer"
                    >
                      <h4 className="font-medium text-sm">{campaign.campaignName}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{campaign.brandName}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground">Đang cập nhật</p>
                )}
              </CardContent>
            </Card>

            {/* Top Influencers */}
            <Card className="border-2 border-primary/20 bg-card shadow-lg gap-0">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>Top Influencers</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {top2Influencer?.data && Array.isArray(top2Influencer?.data) ? (
                  top2Influencer?.data.map((influencer, index) => (
                    <div key={influencer.userId} className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        {index + 1}
                      </div>
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={influencer.avatarUrl || '/placeholder.svg'}
                          alt={influencer.name}
                        />
                        <AvatarFallback>{influencer.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{influencer.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatNumber(influencer.follower ?? 0)} followers
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground">Đang cập nhật</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
