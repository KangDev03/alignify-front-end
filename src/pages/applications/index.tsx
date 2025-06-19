'use client';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/query';
import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  useGetApplicationsByBrandQuery,
  useGetApplicationsByInfluencerQuery,
} from '@/features/application/application.service';
import type {
  Application,
  Campaign,
} from '@/features/application/application.type';
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
  // const [searchTerm, setSearchTerm] = useState('');

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
    role === 'INFLUENCER'
      ? influencerQuery.currentData
      : role === 'BRAND'
        ? brandQuery.currentData
        : undefined;  
 const applications = useMemo(() => {
  if (!rawData?.data || !Array.isArray(rawData.data)) return [];

  return rawData.data.reduce(
    (acc: (Application & { campaignInfo: Campaign })[], entry) => {
      console.log('entry.applications:', entry.applications);
console.log('isArray?', Array.isArray(entry.applications));

      if (Array.isArray(entry.applications)) {
        const combined = entry.applications.map((app) => ({
          ...app,
          campaignInfo: entry.campaignResponse,
          
        }));
        acc.push(...combined);
      }
      return acc;
    },
    [],
  );
}, [rawData]);

console.log('data', applications)
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
            <Input placeholder="Tìm kiếm..." className="pl-8" />
          </div>
        </div>

        <TabsContent value="pending" className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications
              .filter(
                (application) =>
                  application.status === 'PENDING' &&
                  application.campaignInfo !== undefined,
              )
              .map((application) => (
                <ApplicationCard
                  key={application.applicationId}
                  application={application}
                  campaignInfo={application.campaignInfo!}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="accepted" className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications
              .filter(
                (application) =>
                  application.status === 'ACCEPTED' &&
                  application.campaignInfo !== undefined,
              )
              .map((application) => (
                <ApplicationCard
                  key={application.applicationId}
                  application={application}
                  campaignInfo={application.campaignInfo!}
                />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="rejected" className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications
              .filter(
                (application) =>
                  application.status === 'REJECTED' &&
                  application.campaignInfo !== undefined,
              )
              .map((application) => (
                <ApplicationCard
                  key={application.applicationId}
                  application={application}
                  campaignInfo={application.campaignInfo!}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
