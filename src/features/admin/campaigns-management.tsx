"use client"

import { useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

import { Icons } from "@/components/icons/icons"

export function CampaignsManagement() {
  const [searchQuery, setSearchQuery] = useState("")

  const campaigns = [
    {
      id: "1",
      title: "Chiến dịch quảng cáo sản phẩm làm đẹp mùa hè",
      brand: "Beauty Plus Vietnam",
      brandAvatar: "/placeholder.svg?height=40&width=40",
      status: "active",
      budget: "50,000,000 VNĐ",
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      applicants: 24,
      selected: 8,
      category: "Làm đẹp",
      description: "Quảng bá dòng sản phẩm chăm sóc da mùa hè mới với các influencer beauty hàng đầu",
    },
    {
      id: "2",
      title: "Chiến dịch sản phẩm công nghệ Q1",
      brand: "TechGear Store",
      brandAvatar: "/placeholder.svg?height=40&width=40",
      status: "completed",
      budget: "30,000,000 VNĐ",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      applicants: 15,
      selected: 5,
      category: "Công nghệ",
      description: "Review và quảng bá các sản phẩm công nghệ mới trong quý 1",
    },
    {
      id: "3",
      title: "Chiến dịch thời trang xuân hè 2024",
      brand: "Fashion House",
      brandAvatar: "/placeholder.svg?height=40&width=40",
      status: "pending",
      budget: "75,000,000 VNĐ",
      startDate: "2024-03-01",
      endDate: "2024-04-01",
      applicants: 32,
      selected: 10,
      category: "Thời trang",
      description: "Quảng bá bộ sưu tập thời trang xuân hè mới với các fashion influencer",
    },
    {
      id: "4",
      title: "Chiến dịch ẩm thực địa phương",
      brand: "Local Food Co.",
      brandAvatar: "/placeholder.svg?height=40&width=40",
      status: "reported",
      budget: "20,000,000 VNĐ",
      startDate: "2024-02-01",
      endDate: "2024-02-28",
      applicants: 18,
      selected: 6,
      category: "Ẩm thực",
      description: "Khám phá và quảng bá các món ăn địa phương đặc sắc",
    },
  ]

  const getStatusBadge = (status: string) => {
    const base = "pointer-events-none hover:bg-transparent hover:text-inherit"
    switch (status) {
      case "active":
        return <Badge className={`bg-green-100 text-green-800 ${base}`}>Đang chạy</Badge>
      case "completed":
        return <Badge className={`bg-blue-100 text-blue-800 ${base}`}>Hoàn thành</Badge>
      case "pending":
        return <Badge className={`bg-yellow-100 text-yellow-800 ${base}`}>Chờ duyệt</Badge>
      case "reported":
        return <Badge className={`bg-red-100 text-red-800 ${base}`}>Bị báo cáo</Badge>
      default:
        return <Badge variant="secondary" className={`${base}`}>{status}</Badge>
    }
  }

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDeleteCampaign = (campaignId: string) => {
    console.log("Deleting campaign:", campaignId)
    // Logic xóa chiến dịch
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Quản lý chiến dịch</h2>
          <p className="text-muted-foreground">Quản lý tất cả chiến dịch trên hệ thống</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Icons.search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm chiến dịch..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách chiến dịch</CardTitle>
          <CardDescription>Tổng cộng {campaigns.length} chiến dịch</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Chiến dịch</TableHead>
                <TableHead>Thương hiệu</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngân sách</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead>Ứng viên</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{campaign.title}</div>
                      <div className="text-sm text-muted-foreground">{campaign.category}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={campaign.brandAvatar || "/placeholder.svg"} alt={campaign.brand} />
                        <AvatarFallback>{campaign.brand.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{campaign.brand}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                  <TableCell>{campaign.budget}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(campaign.startDate).toLocaleDateString("vi-VN")}</div>
                      <div className="text-muted-foreground">
                        đến {new Date(campaign.endDate).toLocaleDateString("vi-VN")}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>
                        {campaign.selected}/{campaign.applicants}
                      </div>
                      <div className="text-muted-foreground">đã chọn/ứng tuyển</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <Icons.moreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Icons.eye className="mr-2 h-4 w-4" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        {campaign.status === "reported" && (
                          <DropdownMenuItem>
                            <Icons.flag className="mr-2 h-4 w-4" />
                            Xem báo cáo
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteCampaign(campaign.id)} className="text-red-600">
                          <Icons.trash2 className="mr-2 h-4 w-4" />
                          Xóa chiến dịch
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
