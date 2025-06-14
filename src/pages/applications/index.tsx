import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Icons } from '@/components/icons/icons';
import Accepted from '@/features/application/accepted';
import Pending from '@/features/application/pending';
import Rejected from '@/features/application/rejected';

const status = [
  { value: 'pending', label: 'Đang chờ duyệt' },
  { value: 'accepted', label: 'Đã chấp nhận' },
  { value: 'rejected', label: 'Bị từ chối' },
];

export default function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tab, setTab] = useState('pending');

  return (
    <div className="min-h-screen bg-transparent transition-colors flex justify-center">
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Đơn ứng tuyển của tôi</h1>

          {/* Tabs Nav + Search */}
          <div className="flex gap-6">
            <div className="flex-1 font-semibold text-foreground">
              <TabsList className="grid w-full h-fit grid-cols-3 py-1.5 ">
                {status.map((status) => (
                  <TabsTrigger
                    key={status.value}
                    value={status.value}
                    className="rounded-xs h-full "
                  >
                    {status.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <div className="relative w-[349px] h-10 px-[9px] py-2 flex gap-[17px] border border-input rounded-[6px]">
              <Icons.search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 h-full border-none outline-none shadow-none bg-transparent"
              />
            </div>
          </div>

          {/* Nội dung từng tab */}
          <TabsContent value="pending" className="mt-6 ">
            <Pending />
          </TabsContent>
          <TabsContent value="accepted" className="mt-6">
            <Accepted />
          </TabsContent>
          <TabsContent value="rejected" className="mt-6">
            <Rejected />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
