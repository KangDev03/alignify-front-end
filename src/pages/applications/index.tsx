'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/query';
import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  useGetApplicationsByBrandQuery,
  useGetApplicationsByInfluencerQuery,
} from '@/features/application/application.service';
import type { Application, Campaign } from '@/features/application/application.type';
import ApplicationCard from '@/features/application/components/application-card';
import { selectAuthState } from '@/features/auth/auth.slice';

const tabs = [
  { value: 'pending', label: 'Đang chờ duyệt' },
  { value: 'accepted', label: 'Đã chấp nhận' },
  { value: 'rejected', label: 'Bị từ chối' },
];

export function ApplicationsPage() {
  const { id, role } = useSelector(selectAuthState);
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const influencerQuery = useGetApplicationsByInfluencerQuery(
    role === 'INFLUENCER' ? { pageNumber: 0, pageSize: 10 } : skipToken,
  );

  const brandQuery = useGetApplicationsByBrandQuery(
    role === 'BRAND' ? { pageNumber: 0, pageSize: 10 } : skipToken,
  );

  console.log('ROLE:', role, 'ID:', id);
  console.log('influencerQuery:', influencerQuery);
  console.log('brandQuery:', brandQuery);
const rawData =
  role === "INFLUENCER"
    ? influencerQuery.currentData
    : role === "BRAND"
    ? brandQuery.currentData
    : undefined;
    let campaign: Campaign | undefined = undefined;
    let applications: Application[] = [];
    if(role==='INFLUENCER'){
      applications = (rawData?.data as Application[]) || [];
      campaign ={
        campaignId:'mock-id',
        brandId: 'mock-id',
        budget: 33,
        categories:[],
        status:'PENDING',
        content:'mock-content',
        createdDate: new Date(),
        imageUrl: 'mock-url',
        influencerCount: 5,
        influencerRequirement: [],
        campaignRequirements: { "mock-require": 3 }        
      }
    }else if(role==='BRAND'){
    if (
      rawData?.data &&
      typeof rawData.data === 'object' &&
      !Array.isArray(rawData.data) &&
      'campaignResponse' in rawData.data &&
      'applications' in rawData.data
    ) {
      campaign = (rawData.data as { campaignResponse: Campaign }).campaignResponse;
      applications = (rawData.data as { applications: Application[] }).applications || [];      
    } else {
      campaign = undefined;
      applications = [];
    }
    

    } 

    const filteredApplications = (tabValue: string) => {
  return applications.filter((app) => {
    const matchesStatus = app.status?.toLowerCase() === tabValue.toLowerCase();
    const matchesSearch =
      campaign?.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicationId?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });
};

    console.log(applications);
    console.log(campaign);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Đơn ứng tuyển của tôi</h1>

      <Tabs
        defaultValue="pending"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full gap-6"
      >
        <div className="flex flex-row gap-6">
          <TabsList className="grid w-full h-fit grid-cols-3 p-1">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="h-full">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="relative w-2/5">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {campaign &&
                filteredApplications(tab.label).map((application) => (
                  <ApplicationCard
                    key={application.applicationId}
                    application={application}
                    campaign={campaign}
                  />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
