'use client';

import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Icons } from '@/components/icons/icons';
import type { Campaign } from '@/features/common/common.type';
import { useGetAllCampaignsOfBrandQuery } from '@/features/my-campaign/campaign.service';
import CampaignCard from '@/features/my-campaign/components/campaign-card';

const tabs = [
  { value: 'draft', label: 'Nháp' },
  { value: 'recruiting', label: 'Đang tuyển' },
  { value: 'pending', label: 'Chưa bắt đầu' },
  { value: 'participating', label: 'Đang diễn ra' },
  { value: 'completed', label: 'Đã kết thúc' },
];

export function CampaignManagement() {
  const [activeTab, setActiveTab] = useState('DRAFT');

  const { data: campaignsResponse } = useGetAllCampaignsOfBrandQuery({
    pageNumber: 0,
    pageSize: 10,
  });
  const campaigns: Campaign[] = Array.isArray(campaignsResponse?.data?.campaigns)
    ? campaignsResponse.data.campaigns
    : [];

  console.log('campaignsResponse:', campaigns);

  const filteredCampaigns = campaigns.filter(
    (campaign) => campaign.status === activeTab.toUpperCase(),
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Quản lí chiến dịch</h1>
      <Tabs
        defaultValue="DRAFT"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full gap-6"
      >
        <div className="flex flex-row gap-6">
          <TabsList className="grid w-full h-fit grid-cols-5 p-1">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="h-full">
                {tab.label} (
                {campaigns.filter((campaign) => campaign.status === tab.value.toUpperCase())
                  .length ?? 0}
                )
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="relative w-2/5">
            <Icons.search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Tìm kiếm..." className="pl-8" />
          </div>
        </div>

        <TabsContent value={activeTab}>
          <div className="grid grid-cols-2 gap-4">
            {filteredCampaigns.length > 0 ? (
              filteredCampaigns.map((campaign) => (
                <CampaignCard key={campaign.campaignId} campaign={campaign} />
              ))
            ) : (
              <p className="text-muted-foreground text-sm">Không có chiến dịch nào.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
