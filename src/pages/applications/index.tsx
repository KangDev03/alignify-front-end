'use client';
import { useState } from 'react';
import { AlertCircleIcon, Search } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useGetApplicationsByInfluencerQuery } from '@/features/application/application.service';
import type { ApplicationsByCampaginResponse } from '@/features/application/application.type';
import ApplicationCard from '@/features/application/components/application-card';

const tabs = [
  { value: 'pending', label: 'Đang chờ duyệt' },
  { value: 'accepted', label: 'Đã chấp nhận' },
  { value: 'rejected', label: 'Bị từ chối' },
];

export function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState('pending');

  const { data: rawData } = useGetApplicationsByInfluencerQuery(
    {},
    { refetchOnMountOrArgChange: true },
  );

  // const applications = useMemo(() => {
  //   if (!rawData?.data || !Array.isArray(rawData.data)) return [];
  //   return rawData.data.reduce(
  //     (acc: (ApplicationByInfluencer & { campaignInfo: Campaign })[], entry) => {
  //       if (Array.isArray(entry.applications)) {
  //         const combined = entry.applications.map((app) => ({
  //           ...app,
  //           campaignInfo: entry.campaignResponse,
  //         }));
  //         acc.push(...combined);
  //       }
  //       return acc;
  //     },
  //     [],
  //   );
  // }, [rawData]);
  console.log('rawData', rawData);
  const applications: ApplicationsByCampaginResponse[] = rawData?.data || [];
  const groupedApplications = {
    waiting: applications.filter((group) =>
      group?.applications?.filter((application) => application?.status === 'PENDING'),
    ),
    accepted: applications.filter((group) =>
      group?.applications?.filter((application) => application?.status === 'PENDING'),
    ),
    rejected: applications.filter((group) =>
      group?.applications?.filter((application) => application?.status === 'PENDING'),
    ),
  };

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
            {groupedApplications.waiting.length > 0 ? (
              groupedApplications.waiting.map(
                (group) =>
                  group.applications &&
                  group.applications.length > 0 &&
                  group.applications.map((application) => (
                    <ApplicationCard
                      key={application.applicationId}
                      application={application}
                      campaignInfo={group.campaignResponse}
                    />
                  )),
              )
            ) : (
              <Alert variant="default">
                <AlertCircleIcon />
                <AlertTitle>Bạn không có đơn ứng tuyển nào ở trạng thái đang chờ duyệt</AlertTitle>
                <AlertDescription>
                  Bạn có thể quay lại đây sau khi ứng tuyển vào các chiến dịch mới.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </TabsContent>

        <TabsContent value="accepted" className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groupedApplications.accepted.length > 0 ? (
              groupedApplications.accepted.map(
                (group) =>
                  group.applications &&
                  group.applications.length > 0 &&
                  group.applications.map((application) => (
                    <ApplicationCard
                      key={application.applicationId}
                      application={application}
                      campaignInfo={group.campaignResponse}
                    />
                  )),
              )
            ) : (
              <Alert variant="default">
                <AlertCircleIcon />
                <AlertTitle>
                  Bạn không có đơn ứng tuyển nào ở trạng thái đang đã chấp nhận
                </AlertTitle>
                <AlertDescription>
                  Bạn có thể quay lại đây sau khi các nhà tuyển dụng xác nhận đơn ứng tuyển của bạn.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </TabsContent>
        <TabsContent value="rejected" className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groupedApplications.rejected.length > 0 ? (
              groupedApplications.rejected.map(
                (group) =>
                  group.applications &&
                  group.applications.length > 0 &&
                  group.applications.map((application) => (
                    <ApplicationCard
                      key={application.applicationId}
                      application={application}
                      campaignInfo={group.campaignResponse}
                    />
                  )),
              )
            ) : (
              <Alert variant="default">
                <AlertCircleIcon />
                <AlertTitle>
                  Bạn không có đơn ứng tuyển nào ở trạng thái đang đã chấp nhận
                </AlertTitle>
                <AlertDescription>
                  Bạn có thể quay lại đây sau khi các nhà tuyển dụng xác nhận đơn ứng tuyển của bạn.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
