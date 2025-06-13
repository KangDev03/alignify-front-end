import { useState } from 'react';

import { Input } from '@/components/ui/input';

import { Icons } from '@/components/icons/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';

const status = [
  { value: "pending", label: "Đang chờ duyệt", },
  { value: "accepted", label: "Đã chấp nhận", },
  { value: "rejected", label: "Bị từ chối", }
]
export default function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tab, setTab] = useState('pending');

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-300">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Đơn ứng tuyển của tôi</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 ">
          {/* Main Content - 2/3 width  */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs Nav + Search */}

            <div className="flex flex-col sm:flex-row gap-6">
              <Tabs value={tab} onValueChange={setTab} className="w-full">
                <TabsList className="grid w-full h-fit grid-cols-3  py-1.5">
                  {status.map((status) => (
                    <TabsTrigger
                      key={status.value}
                      value={status.value}
                      className="rounded-xs h-full"
                    >
                      {status.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="pending" className="mt-8">
                Đang chờ duyệt
              </TabsContent>

              <TabsContent value="accepted" className="mt-8">
                Đã chấp nhận
              </TabsContent>

              <TabsContent value="rejected" className="mt-8">
                Bị từ chối
              </TabsContent>
            </Tabs>
              <div className="relative w-[349px] h-10 px-[9px] py-2 flex items-center gap-[17px] border border-input rounded-[6px] bg-white">
                <Icons.search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 h-full border-none outline-none shadow-none bg-transparent"
                />
              </div>
            </div>

          
          </div>
        </div>
      </div>
    </div>
  );
}
