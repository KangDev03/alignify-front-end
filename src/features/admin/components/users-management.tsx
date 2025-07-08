'use client';

import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Icons } from '@/components/icons/icons';

export function UsersManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState('influencer');
  const [selectedStatus, setSelectedStatus] = useState('normal');

  const allUsers = [
    {
      id: '1',
      name: 'Nguyễn Thị Lan',
      email: 'lan.nguyen@email.com',
      role: 'influencer',
      status: 'active',
      joinDate: '2024-01-15',
      lastActive: '2024-01-20',
      followers: 125000,
      campaigns: 24,
      avatar: '/placeholder.svg?height=40&width=40',
      subscription: 'premium',
    },
    {
      id: '2',
      name: 'Beauty Plus Vietnam',
      email: 'contact@beautyplus.vn',
      role: 'brand',
      status: 'active',
      joinDate: '2023-12-01',
      lastActive: '2024-01-19',
      followers: 0,
      campaigns: 45,
      avatar: '/placeholder.svg?height=40&width=40',
      subscription: 'enterprise',
    },
    {
      id: '3',
      name: 'Trần Văn Nam',
      email: 'nam.tran@email.com',
      role: 'influencer',
      status: 'banned',
      joinDate: '2024-01-10',
      lastActive: '2024-01-18',
      followers: 89000,
      campaigns: 12,
      avatar: '/placeholder.svg?height=40&width=40',
      subscription: 'basic',
    },
    {
      id: '4',
      name: 'TechGear Store',
      email: 'info@techgear.vn',
      role: 'brand',
      status: 'pending',
      joinDate: '2024-01-18',
      lastActive: '2024-01-20',
      followers: 0,
      campaigns: 3,
      avatar: '/placeholder.svg?height=40&width=40',
      subscription: 'basic',
    },
    {
      id: '5',
      name: 'Lê Minh Hương',
      email: 'huong.le@email.com',
      role: 'influencer',
      status: 'active',
      joinDate: '2024-01-12',
      lastActive: '2024-01-21',
      followers: 67000,
      campaigns: 18,
      avatar: '/placeholder.svg?height=40&width=40',
      subscription: 'premium',
    },
    {
      id: '6',
      name: 'Fashion House',
      email: 'contact@fashionhouse.vn',
      role: 'brand',
      status: 'active',
      joinDate: '2023-11-15',
      lastActive: '2024-01-20',
      followers: 0,
      campaigns: 32,
      avatar: '/placeholder.svg?height=40&width=40',
      subscription: 'enterprise',
    },
  ];

  const getStatusBadge = (status: string) => {
    const base = 'pointer-events-none hover:bg-transparent hover:text-inherit';
    switch (status) {
      case 'active':
        return <Badge className={`bg-green-100 text-green-800 ${base}`}>Hoạt động</Badge>;
      case 'banned':
        return <Badge className={`bg-red-100 text-red-800 ${base}`}>Bị cấm</Badge>;
      case 'pending':
        return <Badge className={`bg-yellow-100 text-yellow-800 ${base}`}>Chờ duyệt</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getSubscriptionBadge = (subscription: string) => {
    const base = 'pointer-events-none hover:bg-transparent hover:text-inherit';
    switch (subscription) {
      case 'basic':
        return (
          <Badge variant="secondary" className={`${base}`}>
            Basic
          </Badge>
        );
      case 'premium':
        return <Badge className={`bg-blue-100 text-blue-800 ${base}`}>Premium</Badge>;
      case 'enterprise':
        return <Badge className={`bg-purple-100 text-purple-800 ${base}`}>Enterprise</Badge>;
      default:
        return (
          <Badge variant="secondary" className={`${base}`}>
            {subscription}
          </Badge>
        );
    }
  };

  const filterUsers = (role: string, status: string) => {
    return allUsers.filter(
      (user) =>
        (user.role === role || role === 'all') &&
        (status === 'normal'
          ? user.status === 'active' || user.status === 'pending'
          : user.status === status) &&
        (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())),
    );
  };

  const handleBanUser = (userId: string) => {
    console.log('Banning user:', userId);
  };

  const handleUnbanUser = (userId: string) => {
    console.log('Unbanning user:', userId);
  };

  const handleViewProfile = (user: any) => {
    setSelectedUser(user);
  };

  const UserTable = ({ users }: { users: any[]; userType: string }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Người dùng</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead>Gói đăng ký</TableHead>
          <TableHead>Ngày tham gia</TableHead>
          <TableHead className="text-right">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar || '/placeholder.svg'} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground">{user.email}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>{getStatusBadge(user.status)}</TableCell>
            <TableCell>{getSubscriptionBadge(user.subscription)}</TableCell>
            <TableCell>{new Date(user.joinDate).toLocaleDateString('vi-VN')}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <Icons.moreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => handleViewProfile(user)}>
                    <Icons.eye className="mr-2 h-4 w-4" />
                    Xem hồ sơ
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icons.mail className="mr-2 h-4 w-4" />
                    Gửi email
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {user.status === 'banned' ? (
                    <DropdownMenuItem onClick={() => handleUnbanUser(user.id)}>
                      <Icons.userCheck className="mr-2 h-4 w-4" />
                      Bỏ cấm
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      onClick={() => handleBanUser(user.id)}
                      className="text-red-600"
                    >
                      <Icons.ban className="mr-2 h-4 w-4" />
                      Cấm tài khoản
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Quản lý người dùng</h2>
          <p className="text-muted-foreground">Quản lý tài khoản influencer và brand</p>
        </div>
      </div>

      {/* Search */}
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
          <Tabs value={selectedRole} onValueChange={setSelectedRole} className="">
            <TabsList className="flex">
              <TabsTrigger value="influencer" className="flex items-center space-x-2">
                <Icons.users className="h-4 w-4" />
                <span>Influencers</span>
              </TabsTrigger>
              <TabsTrigger value="brand" className="flex items-center space-x-2">
                <Icons.store className="h-4 w-4" />
                <span>Brands</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Tabs value={selectedStatus} onValueChange={setSelectedStatus} defaultValue="normal">
            <TabsList className="flex">
              <TabsTrigger value="normal" className="flex items-center space-x-2">
                <Icons.userCheck className="h-4 w-4" />
                <span>Bình thường</span>
              </TabsTrigger>
              <TabsTrigger value="banned" className="flex items-center space-x-2">
                <Icons.userRoundX className="h-4 w-4" />
                <span>Đã cấm</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>
              Tổng cộng {filterUsers(selectedRole, selectedStatus).length} người dùng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <UserTable users={filterUsers(selectedRole, selectedStatus)} userType={selectedRole} />
          </CardContent>
        </Card>
      </div>

      {/* User Profile Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
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
      </Dialog>
    </div>
  );
}
