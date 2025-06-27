'use client';

import { useState } from 'react';
import { AlertCircleIcon, Search } from 'lucide-react';

import { Alert, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import type { Campaign } from '@/features/common/common.type';
import { useGetAllCampaignsOfInfluencerQuery } from '@/features/my-campaign/campaign.service';
import CampaignCard from '@/features/my-campaign/components/campaign-card';

const tabs = [
  { value: 'pending', label: 'Chưa bắt đầu' },
  { value: 'participating', label: 'Đang diễn ra' },
  { value: 'completed', label: 'Đã kết thúc' },
];

export default function MyCampaignPage() {
  const [activeTab, setActiveTab] = useState('pending');
  const { data: campaignsResponse } = useGetAllCampaignsOfInfluencerQuery();
  const campaigns: Campaign[] = Array.isArray(campaignsResponse?.data?.campaigns)
    ? campaignsResponse.data.campaigns
    : [];

  const filteredCampaigns = campaigns.filter((campaign) => campaign.status === activeTab);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Chiến dịch của tôi</h1>
      <Tabs
        defaultValue="PENDING"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full gap-6"
      >
        <div className="flex flex-row gap-6">
          <TabsList className="grid w-full h-fit grid-cols-3 p-1">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="h-full">
                {tab.label} (
                {campaigns.filter((campaign) => campaign.status === tab.value).length ?? 0})
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="relative w-2/5">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
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
              <Alert variant="default">
                <AlertCircleIcon />
                <AlertTitle>
                  {activeTab.toUpperCase() === 'PENDING' &&
                    'Bạn chưa có chiến dịch nào đang chờ bắt đầu'}
                  {activeTab.toUpperCase() === 'PARTICIPATING' &&
                    'Bạn chưa có chiến dịch nào đang diễn ra'}
                  {activeTab.toUpperCase() === 'COMPLETED' &&
                    'Bạn chưa có chiến dịch nào đã kết thúc'}
                </AlertTitle>
              </Alert>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
