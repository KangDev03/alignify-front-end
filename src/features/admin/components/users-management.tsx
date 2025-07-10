'use client';

import { useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Icons } from '@/components/icons/icons';
import type { RoleName } from '@/features/common/common.type';

import UserTable from './user-management/user-table';

type StatusState = 'NORMAL' | 'BANNED';
export function UsersManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<RoleName>('INFLUENCER');
  const [selectedStatus, setSelectedStatus] = useState<StatusState>('NORMAL');

  // const getStatusBadge = (status: string) => {
  //   const base = 'pointer-events-none hover:bg-transparent hover:text-inherit';
  //   switch (status) {
  //     case 'active':
  //       return <Badge className={`bg-green-100 text-green-800 ${base}`}>Hoạt động</Badge>;
  //     case 'banned':
  //       return <Badge className={`bg-red-100 text-red-800 ${base}`}>Bị cấm</Badge>;
  //     case 'pending':
  //       return <Badge className={`bg-yellow-100 text-yellow-800 ${base}`}>Chờ duyệt</Badge>;
  //     default:
  //       return <Badge variant="secondary">{status}</Badge>;
  //   }
  // };

  // const getSubscriptionBadge = (subscription: string) => {
  //   const base = 'pointer-events-none hover:bg-transparent hover:text-inherit';
  //   switch (subscription) {
  //     case 'basic':
  //       return (
  //         <Badge variant="secondary" className={`${base}`}>
  //           Basic
  //         </Badge>
  //       );
  //     case 'premium':
  //       return <Badge className={`bg-blue-100 text-blue-800 ${base}`}>Premium</Badge>;
  //     case 'enterprise':
  //       return <Badge className={`bg-purple-100 text-purple-800 ${base}`}>Enterprise</Badge>;
  //     default:
  //       return (
  //         <Badge variant="secondary" className={`${base}`}>
  //           {subscription}
  //         </Badge>
  //       );
  //   }
  // };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Quản lý người dùng</h2>
          <p className="text-muted-foreground">Quản lý tài khoản</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Icons.search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm người dùng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="space-y-4 w-full">
        <div className="w-full flex justify-between">
          <Tabs
            value={selectedRole}
            onValueChange={(value) => setSelectedRole(value as RoleName)}
            className=""
          >
            <TabsList className="flex">
              <TabsTrigger value="INFLUENCER" className="flex items-center space-x-2">
                <Icons.users className="h-4 w-4" />
                <span>Influencers</span>
              </TabsTrigger>
              <TabsTrigger value="BRAND" className="flex items-center space-x-2">
                <Icons.store className="h-4 w-4" />
                <span>Brands</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Tabs
            value={selectedStatus}
            onValueChange={(value) => setSelectedStatus(value as StatusState)}
            defaultValue="NORMAL"
          >
            <TabsList className="flex">
              <TabsTrigger value="NORMAL" className="flex items-center space-x-2">
                <Icons.userCheck className="h-4 w-4" />
                <span>Bình thường</span>
              </TabsTrigger>
              <TabsTrigger value="BANNED" className="flex items-center space-x-2 text-red-600">
                <Icons.userRoundX className="h-4 w-4 text-red-600" />
                <span>Đã cấm</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle></CardTitle>
          </CardHeader>
          <CardContent>
            <UserTable
              isBanned={selectedStatus === 'BANNED'}
              isInfluencerRole={selectedRole === 'INFLUENCER'}
            />
          </CardContent>
        </Card>
      </div>

      {/* <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Hồ sơ người dùng</DialogTitle>
            <DialogDescription>Chi tiết thông tin tài khoản</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={selectedUser.avatar || '/placeholder.svg'}
                    alt={selectedUser.name}
                  />
                  <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                  <p className="text-muted-foreground">{selectedUser.email}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="outline">
                      {selectedUser.role === 'influencer' ? 'Influencer' : 'Brand'}
                    </Badge>
                    {getStatusBadge(selectedUser.status)}
                    {getSubscriptionBadge(selectedUser.subscription)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Thông tin cơ bản</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>ID:</span>
                      <span>{selectedUser.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ngày tham gia:</span>
                      <span>{new Date(selectedUser.joinDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hoạt động cuối:</span>
                      <span>{new Date(selectedUser.lastActive).toLocaleDateString('vi-VN')}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Thống kê</h4>
                  <div className="space-y-2 text-sm">
                    {selectedUser.role === 'influencer' && (
                      <div className="flex justify-between">
                        <span>Followers:</span>
                        <span>{selectedUser.followers.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Chiến dịch:</span>
                      <span>{selectedUser.campaigns}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedUser(null)}>
                  Đóng
                </Button>
                {selectedUser.status === 'banned' ? (
                  <Button onClick={() => handleUnbanUser(selectedUser.id)}>
                    <Icons.userCheck className="mr-2 h-4 w-4" />
                    Bỏ cấm
                  </Button>
                ) : (
                  <Button variant="destructive" onClick={() => handleBanUser(selectedUser.id)}>
                    <Icons.ban className="mr-2 h-4 w-4" />
                    Cấm tài khoản
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
