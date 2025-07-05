"use client"

import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

import { Icons } from "@/components/icons/icons"

export function SubscriptionPlans() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [_editingPlan, setEditingPlan] = useState<any>(null)

  const [newPlan, setNewPlan] = useState({
    name: "",
    description: "",
    price: "",
    duration: "monthly",
    features: "",
    maxCampaigns: "",
    maxInfluencers: "",
    analyticsAccess: false,
    prioritySupport: false,
    customBranding: false,
  })

  const subscriptionPlans = [
    {
      id: "1",
      name: "Basic",
      description: "Gói cơ bản cho người mới bắt đầu",
      price: 0,
      duration: "monthly",
      features: [
        "Tạo tối đa 3 chiến dịch/tháng",
        "Kết nối với tối đa 10 influencers",
        "Báo cáo cơ bản",
        "Hỗ trợ email",
      ],
      maxCampaigns: 3,
      maxInfluencers: 10,
      analyticsAccess: false,
      prioritySupport: false,
      customBranding: false,
      isActive: true,
      subscribers: 1200,
      icon: Icons.star,
      color: "bg-gray-100 text-gray-800",
    },
    {
      id: "2",
      name: "Premium",
      description: "Gói nâng cao cho doanh nghiệp nhỏ",
      price: 299000,
      duration: "monthly",
      features: [
        "Tạo tối đa 15 chiến dịch/tháng",
        "Kết nối với tối đa 50 influencers",
        "Báo cáo chi tiết và phân tích",
        "Hỗ trợ ưu tiên",
        "Tùy chỉnh thương hiệu cơ bản",
      ],
      maxCampaigns: 15,
      maxInfluencers: 50,
      analyticsAccess: true,
      prioritySupport: true,
      customBranding: true,
      isActive: true,
      subscribers: 800,
      icon: Icons.crown,
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "3",
      name: "Enterprise",
      description: "Gói doanh nghiệp với tính năng đầy đủ",
      price: 999000,
      duration: "monthly",
      features: [
        "Chiến dịch không giới hạn",
        "Kết nối influencers không giới hạn",
        "Báo cáo và phân tích nâng cao",
        "Hỗ trợ 24/7",
        "Tùy chỉnh thương hiệu hoàn toàn",
        "API access",
        "Dedicated account manager",
      ],
      maxCampaigns: -1, // unlimited
      maxInfluencers: -1, // unlimited
      analyticsAccess: true,
      prioritySupport: true,
      customBranding: true,
      isActive: true,
      subscribers: 300,
      icon: Icons.zap,
      color: "bg-purple-100 text-purple-800",
    },
  ]

  const handleCreatePlan = () => {
    console.log("Creating plan:", newPlan)
    // Logic tạo gói mới
    setIsCreateDialogOpen(false)
    setNewPlan({
      name: "",
      description: "",
      price: "",
      duration: "monthly",
      features: "",
      maxCampaigns: "",
      maxInfluencers: "",
      analyticsAccess: false,
      prioritySupport: false,
      customBranding: false,
    })
  }

  const handleEditPlan = (plan: any) => {
    setEditingPlan(plan)
  }

  const handleDeletePlan = (planId: string) => {
    console.log("Deleting plan:", planId)
    // Logic xóa gói
  }

  const handleTogglePlanStatus = (planId: string) => {
    console.log("Toggling plan status:", planId)
    // Logic bật/tắt gói
  }

  const formatPrice = (price: number) => {
    if (price === 0) return "Miễn phí"
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Quản lý gói đăng ký</h2>
          <p className="text-muted-foreground">Tạo và quản lý các gói đăng ký cho người dùng</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Icons.plus className="mr-2 h-4 w-4" />
              Tạo gói mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tạo gói đăng ký mới</DialogTitle>
              <DialogDescription>Thiết lập thông tin cho gói đăng ký mới</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Tên gói *</Label>
                  <Input
                    id="name"
                    value={newPlan.name}
                    onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                    placeholder="VD: Premium"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="price">Giá (VNĐ) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newPlan.price}
                    onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                    placeholder="299000"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  value={newPlan.description}
                  onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                  placeholder="Mô tả ngắn về gói đăng ký"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="maxCampaigns">Số chiến dịch tối đa</Label>
                  <Input
                    id="maxCampaigns"
                    type="number"
                    value={newPlan.maxCampaigns}
                    onChange={(e) => setNewPlan({ ...newPlan, maxCampaigns: e.target.value })}
                    placeholder="15 (hoặc -1 cho không giới hạn)"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="maxInfluencers">Số influencers tối đa</Label>
                  <Input
                    id="maxInfluencers"
                    type="number"
                    value={newPlan.maxInfluencers}
                    onChange={(e) => setNewPlan({ ...newPlan, maxInfluencers: e.target.value })}
                    placeholder="50 (hoặc -1 cho không giới hạn)"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="features">Tính năng (mỗi dòng một tính năng)</Label>
                <Textarea
                  id="features"
                  value={newPlan.features}
                  onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value })}
                  placeholder="Báo cáo chi tiết&#10;Hỗ trợ ưu tiên&#10;Tùy chỉnh thương hiệu"
                  rows={4}
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor="analyticsAccess">Truy cập phân tích nâng cao</Label>
                  <Switch
                    id="analyticsAccess"
                    checked={newPlan.analyticsAccess}
                    onCheckedChange={(checked) => setNewPlan({ ...newPlan, analyticsAccess: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="prioritySupport">Hỗ trợ ưu tiên</Label>
                  <Switch
                    id="prioritySupport"
                    checked={newPlan.prioritySupport}
                    onCheckedChange={(checked) => setNewPlan({ ...newPlan, prioritySupport: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="customBranding">Tùy chỉnh thương hiệu</Label>
                  <Switch
                    id="customBranding"
                    checked={newPlan.customBranding}
                    onCheckedChange={(checked) => setNewPlan({ ...newPlan, customBranding: checked })}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={handleCreatePlan} disabled={!newPlan.name || !newPlan.price}>
                  Tạo gói
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Plans Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {subscriptionPlans.map((plan) => {
          const Icon = plan.icon
          return (
            <Card key={plan.id} className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className="h-5 w-5" />
                    <CardTitle>{plan.name}</CardTitle>
                  </div>
                  <Badge className={`${plan.color} pointer-events-none hover:bg-transparent hover:text-inherit`}>
                    {plan.isActive ? "Hoạt động" : "Tạm dừng"}
                  </Badge>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex flex-col h-full">
                <div className="space-y-4 flex-1">

                  <div>
                    <div className="text-3xl font-bold">{formatPrice(plan.price)}</div>
                    <div className="text-sm text-muted-foreground">/{plan.duration === "monthly" ? "tháng" : "năm"}</div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Tính năng:</h4>
                    <ul className="space-y-1 text-sm">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Icons.check className="h-3 w-3 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span>Người đăng ký:</span>
                    <span className="font-medium">{plan.subscribers.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Plans Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách gói đăng ký</CardTitle>
          <CardDescription>Quản lý tất cả gói đăng ký trong hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên gói</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Người đăng ký</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Giới hạn</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptionPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <plan.icon className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{plan.name}</div>
                        <div className="text-sm text-muted-foreground">{plan.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{formatPrice(plan.price)}</TableCell>
                  <TableCell>{plan.subscribers.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={`${plan.color} pointer-events-none hover:bg-transparent hover:text-inherit`}>
                      {plan.isActive ? "Hoạt động" : "Tạm dừng"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>Chiến dịch: {plan.maxCampaigns === -1 ? "Không giới hạn" : plan.maxCampaigns}</div>
                      <div>Influencers: {plan.maxInfluencers === -1 ? "Không giới hạn" : plan.maxInfluencers}</div>
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
                        <DropdownMenuItem onClick={() => handleEditPlan(plan)}>
                          <Icons.edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleTogglePlanStatus(plan.id)}>
                          {plan.isActive ? (
                            <>
                              <Icons.x className="mr-2 h-4 w-4" />
                              Tạm dừng
                            </>
                          ) : (
                            <>
                              <Icons.check className="mr-2 h-4 w-4" />
                              Kích hoạt
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeletePlan(plan.id)} className="text-red-600">
                          <Icons.trash2 className="mr-2 h-4 w-4" />
                          Xóa gói
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
