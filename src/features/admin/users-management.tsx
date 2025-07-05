"use client"

import { useState } from "react"
import { Ban, Eye, Mail, MoreHorizontal, Search, UserCheck } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function UsersManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState<any>(null)

  const users = [
    {
      id: "1",
      name: "Nguyễn Thị Lan",
      email: "lan.nguyen@email.com",
      role: "influencer",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2024-01-20",
      followers: 125000,
      campaigns: 24,
      avatar: "/placeholder.svg?height=40&width=40",
      subscription: "premium",
    },
    {
      id: "2",
      name: "Beauty Plus Vietnam",
      email: "contact@beautyplus.vn",
      role: "brand",
      status: "active",
      joinDate: "2023-12-01",
      lastActive: "2024-01-19",
      followers: 0,
      campaigns: 45,
      avatar: "/placeholder.svg?height=40&width=40",
      subscription: "enterprise",
    },
    {
      id: "3",
      name: "Trần Văn Nam",
      email: "nam.tran@email.com",
      role: "influencer",
      status: "banned",
      joinDate: "2024-01-10",
      lastActive: "2024-01-18",
      followers: 89000,
      campaigns: 12,
      avatar: "/placeholder.svg?height=40&width=40",
      subscription: "basic",
    },
    {
      id: "4",
      name: "TechGear Store",
      email: "info@techgear.vn",
      role: "brand",
      status: "pending",
      joinDate: "2024-01-18",
      lastActive: "2024-01-20",
      followers: 0,
      campaigns: 3,
      avatar: "/placeholder.svg?height=40&width=40",
      subscription: "basic",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Hoạt động</Badge>
      case "banned":
        return <Badge className="bg-red-100 text-red-800">Bị cấm</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Chờ duyệt</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "influencer":
        return <Badge variant="outline">Influencer</Badge>
      case "brand":
        return <Badge variant="outline">Brand</Badge>
      default:
        return <Badge variant="secondary">{role}</Badge>
    }
  }

  const getSubscriptionBadge = (subscription: string) => {
    switch (subscription) {
      case "basic":
        return <Badge variant="secondary">Basic</Badge>
      case "premium":
        return <Badge className="bg-blue-100 text-blue-800">Premium</Badge>
      case "enterprise":
        return <Badge className="bg-purple-100 text-purple-800">Enterprise</Badge>
      default:
        return <Badge variant="secondary">{subscription}</Badge>
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleBanUser = (userId: string) => {
    console.log("Banning user:", userId)
    // Logic cấm người dùng
  }

  const handleUnbanUser = (userId: string) => {
    console.log("Unbanning user:", userId)
    // Logic bỏ cấm người dùng
  }

  const handleViewProfile = (user: any) => {
    setSelectedUser(user)
  }

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
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm người dùng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách người dùng</CardTitle>
          <CardDescription>Tổng cộng {users.length} người dùng</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Người dùng</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Gói đăng ký</TableHead>
                <TableHead>Ngày tham gia</TableHead>
                <TableHead>Hoạt động cuối</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{getSubscriptionBadge(user.subscription)}</TableCell>
                  <TableCell>{new Date(user.joinDate).toLocaleDateString("vi-VN")}</TableCell>
                  <TableCell>{new Date(user.lastActive).toLocaleDateString("vi-VN")}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewProfile(user)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Xem hồ sơ
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Gửi email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status === "banned" ? (
                          <DropdownMenuItem onClick={() => handleUnbanUser(user.id)}>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Bỏ cấm
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleBanUser(user.id)} className="text-red-600">
                            <Ban className="mr-2 h-4 w-4" />
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
        </CardContent>
      </Card>

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
                  <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} alt={selectedUser.name} />
                  <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                  <p className="text-muted-foreground">{selectedUser.email}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    {getRoleBadge(selectedUser.role)}
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
                      <span>{new Date(selectedUser.joinDate).toLocaleDateString("vi-VN")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hoạt động cuối:</span>
                      <span>{new Date(selectedUser.lastActive).toLocaleDateString("vi-VN")}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Thống kê</h4>
                  <div className="space-y-2 text-sm">
                    {selectedUser.role === "influencer" && (
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
                {selectedUser.status === "banned" ? (
                  <Button onClick={() => handleUnbanUser(selectedUser.id)}>
                    <UserCheck className="mr-2 h-4 w-4" />
                    Bỏ cấm
                  </Button>
                ) : (
                  <Button variant="destructive" onClick={() => handleBanUser(selectedUser.id)}>
                    <Ban className="mr-2 h-4 w-4" />
                    Cấm tài khoản
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
