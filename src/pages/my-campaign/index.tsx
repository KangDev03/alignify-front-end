'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircleIcon, Search } from 'lucide-react';

import { Alert, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useGetAllCampaignsOfInfluencerQuery } from '@/features/my-campaign/campaign.service';
import { setCampagin } from '@/features/my-campaign/campaign.slice';
import CampaignCard from '@/features/my-campaign/components/campaign-card';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type { RootState } from '@/redux/store';


export default function MyCampaignPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState('pending');
  const { data: campaignsResponse } = useGetAllCampaignsOfInfluencerQuery();
  const { campaigns } = useAppSelector((state: RootState) => state.campaign);

  const tabs = [
    { value: ['pending', 'recruiting'], label: t('myCampaigns.tabs.pending') },
    { value: ['participating'], label: t('myCampaigns.tabs.participating') },
    { value: ['completed'], label: t('myCampaigns.tabs.completed') },
  ];

  useEffect(() => {
    if (campaignsResponse) dispatch(setCampagin(campaignsResponse));
  }, [campaignsResponse, dispatch]);

  const filteredCampaigns = campaigns.filter((campaign) => {
    const tab = tabs.find((t) => t.value.includes(activeTab));
    return tab?.value.includes(campaign.status.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t('myCampaigns.title')}</h1>
      <Tabs
        defaultValue="pending"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full gap-6"
      >
        <div className="flex flex-row gap-6">
          <TabsList className="grid w-full h-fit grid-cols-3 p-1">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value.join('-')} value={tab.value[0]} className="h-full">
                {tab.label} (
                {
                  campaigns.filter((campaign) => tab.value.includes(campaign.status.toLowerCase()))
                    .length
                }
                )
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="relative w-2/5">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder={t('myCampaigns.searchPlaceholder')} className="pl-8" />
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
                  {activeTab === 'pending' || activeTab === 'recruiting'
                    ? t('myCampaigns.noCampaigns.pending')
                    : activeTab === 'participating'
                      ? t('myCampaigns.noCampaigns.participating')
                      : t('myCampaigns.noCampaigns.completed')}
                </AlertTitle>
              </Alert>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
