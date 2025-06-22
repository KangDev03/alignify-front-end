'use client';
import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useGetApplicationsByInfluencerQuery } from '@/features/application/application.service';
import type { ApplicationByInfluencer } from '@/features/application/application.type';
import ApplicationCard from '@/features/application/components/application-card';
import type { Campaign } from '@/features/common/common.type';

const tabs = [
  { value: 'pending', label: 'Đang chờ duyệt' },
  { value: 'accepted', label: 'Đã chấp nhận' },
  { value: 'rejected', label: 'Bị từ chối' },
];

export function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState('pending');

  const { data: rawData } = useGetApplicationsByInfluencerQuery({});

  const applications = useMemo(() => {
    if (!rawData?.data || !Array.isArray(rawData.data)) return [];

    return rawData.data.reduce((acc: (Application & { campaignInfo: Campaign })[], entry) => {
      if (Array.isArray(entry.applications)) {
        const combined = entry.applications.map((app) => ({
          ...app,
          campaignInfo: entry.campaignResponse,
        }));
        acc.push(...combined);
      }
      return acc;
    }, []);
  }, [rawData]);

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
                  application.status === 'PENDING' && application.campaignInfo !== undefined,
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
                  application.status === 'ACCEPTED' && application.campaignInfo !== undefined,
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
                  application.status === 'REJECTED' && application.campaignInfo !== undefined,
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
