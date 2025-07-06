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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

import { Icons } from "@/components/icons/icons"

interface SubscriptionPlan {
  id: string
  name: string
  price: number
  duration: string
  description: string
  features: string[]
  subscribers: number
  isActive: boolean
  createdAt: string
  targetRole: "brand" | "influencer"
  icon: any
  color: string
  maxCampaigns?: number
  maxInfluencers?: number
  maxApplications?: number
  portfolioItems?: number
  analyticsAccess: boolean
  prioritySupport: boolean
  customBranding?: boolean
}

export function SubscriptionPlans() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [_editingPlan, setEditingPlan] = useState<any>(null)
  const [selectedRole, setSelectedRole] = useState<"brand" | "influencer">("brand")

  const [newPlan, setNewPlan] = useState({
    name: "",
    price: "",
    duration: "monthly",
    description: "",
    features: [""],
    targetRole: "brand" as "brand" | "influencer",
    maxCampaigns: "",
    maxInfluencers: "",
    maxApplications: "",
    portfolioItems: "",
    maxSearches: "",
    analyticsAccess: false,
    prioritySupport: false,
    customBranding: false,
    isActive: true,
  })

  const brandPlans: SubscriptionPlan[] = [
    {
      id: "brand-1",
      name: "Starter",
      price: 0,
      duration: "monthly",
      description: "Gói khởi đầu cho thương hiệu nhỏ",
      features: [
        "Tạo tối đa 3 chiến dịch/tháng",
        "Tìm kiếm 100 influencers",
        "Kết nối với 5 influencers",
        "1 thành viên team",
        "Báo cáo cơ bản",
        "Hỗ trợ email",
      ],
      subscribers: 800,
      isActive: true,
      createdAt: "2024-01-01",
      targetRole: "brand",
      icon: Icons.star,
      color: "bg-gray-100 text-gray-800 pointer-events-none hover:bg-transparent hover:text-inherit",
      maxCampaigns: 3,
      maxInfluencers: 5,
      analyticsAccess: false,
      prioritySupport: false,
      customBranding: false,
    },
    {
      id: "brand-2",
      name: "Professional",
      price: 499000,
      duration: "monthly",
      description: "Gói chuyên nghiệp cho doanh nghiệp vừa",
      features: [
        "Tạo tối đa 25 chiến dịch/tháng",
        "Tìm kiếm không giới hạn influencers",
        "Kết nối với 100 influencers",
        "5 thành viên team",
        "Campaign templates",
        "Automated matching",
        "Analytics chi tiết",
        "Hỗ trợ chat trực tiếp",
      ],
      subscribers: 600,
      isActive: true,
      createdAt: "2024-01-01",
      targetRole: "brand",
      icon: Icons.crown,
      color: "bg-blue-100 text-blue-800 pointer-events-none hover:bg-transparent hover:text-inherit",
      maxCampaigns: 25,
      maxInfluencers: 100,
      analyticsAccess: true,
      prioritySupport: true,
      customBranding: true,
    },
    {
      id: "brand-3",
      name: "Enterprise",
      price: 1499000,
      duration: "monthly",
      description: "Gói doanh nghiệp với tính năng đầy đủ",
      features: [
        "Chiến dịch không giới hạn",
        "Influencers không giới hạn",
        "Team không giới hạn",
        "Multi-brand management",
        "Advanced analytics & reporting",
        "API access",
        "White-label solution",
        "Dedicated account manager",
        "Hỗ trợ 24/7",
      ],
      subscribers: 200,
      isActive: true,
      createdAt: "2024-01-01",
      targetRole: "brand",
      icon: Icons.zap,
      color: "bg-purple-100 text-purple-800 pointer-events-none hover:bg-transparent hover:text-inherit",
      maxCampaigns: -1,
      maxInfluencers: -1,
      analyticsAccess: true,
      prioritySupport: true,
      customBranding: true,
    },
  ]

  const influencerPlans: SubscriptionPlan[] = [
    {
      id: "influencer-1",
      name: "Creator",
      price: 0,
      duration: "monthly",
      description: "Gói miễn phí cho creator mới",
      features: [
        "Ứng tuyển 5 chiến dịch/tháng",
        "Portfolio 10 hình ảnh",
        "Thống kê cơ bản",
        "Chat với brands",
        "Profile cơ bản",
        "Hỗ trợ email",
      ],
      subscribers: 2500,
      isActive: true,
      createdAt: "2024-01-01",
      targetRole: "influencer",
      icon: Icons.camera,
      color: "bg-green-100 text-green-800 pointer-events-none hover:bg-transparent hover:text-inherit",
      maxApplications: 5,
      portfolioItems: 10,
      analyticsAccess: false,
      prioritySupport: false,
    },
    {
      id: "influencer-2",
      name: "Pro Creator",
      price: 199000,
      duration: "monthly",
      description: "Gói nâng cao cho influencer chuyên nghiệp",
      features: [
        "Ứng tuyển không giới hạn",
        "Portfolio không giới hạn",
        "Media kit tự động",
        "Priority trong search results",
        "Analytics chi tiết",
        "Collaboration tools",
        "Content calendar",
        "Hỗ trợ ưu tiên",
      ],
      subscribers: 1200,
      isActive: true,
      createdAt: "2024-01-01",
      targetRole: "influencer",
      icon: Icons.star,
      color: "bg-orange-100 text-orange-800 pointer-events-none hover:bg-transparent hover:text-inherit",
      maxApplications: -1,
      portfolioItems: -1,
      analyticsAccess: true,
      prioritySupport: true,
    },
    {
      id: "influencer-3",
      name: "Influencer Agency",
      price: 799000,
      duration: "monthly",
      description: "Gói dành cho agency quản lý nhiều influencer",
      features: [
        "Quản lý nhiều hồ sơ influencer",
        "Agency dashboard",
        "Client management tools",
        "Revenue tracking & reporting",
        "Team collaboration",
        "Bulk campaign applications",
        "Advanced analytics",
        "API access",
        "Dedicated support",
      ],
      subscribers: 150,
      isActive: true,
      createdAt: "2024-01-01",
      targetRole: "influencer",
      icon: Icons.building2,
      color: "bg-indigo-100 text-indigo-800 pointer-events-none hover:bg-transparent hover:text-inherit",
      maxApplications: -1,
      portfolioItems: -1,
      analyticsAccess: true,
      prioritySupport: true,
    },
  ]

  const formatPrice = (price: number) => {
    if (price === 0) return "Miễn phí"
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleCreatePlan = () => {
    console.log("Creating plan:", newPlan)
    // Logic tạo gói mới
    setIsCreateDialogOpen(false)
    setNewPlan({
      name: "",
      price: "",
      duration: "monthly",
      description: "",
      features: [""],
      targetRole: "brand",
      maxCampaigns: "",
      maxInfluencers: "",
      maxApplications: "",
      portfolioItems: "",
      maxSearches: "",
      analyticsAccess: false,
      prioritySupport: false,
      customBranding: false,
      isActive: true,
    })
  }

  const handleEditPlan = (plan: any) => {
    setEditingPlan(plan)
  }

  const handleDeletePlan = (planId: string) => {
    console.log("Deleting plan:", planId)
    // Logic xóa gói
  }

  const handleTogglePlan = (planId: string, isActive: boolean) => {
    console.log("Toggling plan:", planId, isActive)
    // Logic bật/tắt gói
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Quản lý gói đăng ký</h2>
          <p className="text-muted-foreground">Tạo và quản lý các gói đăng ký cho brand và influencer</p>
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
              <DialogDescription>Tạo gói đăng ký mới cho brand hoặc influencer</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Tên gói</Label>
                  <Input
                    id="name"
                    value={newPlan.name}
                    onChange={(e) => setNewPlan((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Nhập tên gói"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="price">Giá (VNĐ)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newPlan.price}
                    onChange={(e) => setNewPlan((prev) => ({ ...prev, price: e.target.value }))}
                    placeholder="Nhập giá gói"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="targetRole">Đối tượng</Label>
                <Select
                  value={newPlan.targetRole}
                  onValueChange={(value) =>
                    setNewPlan((prev) => ({ ...prev, targetRole: value as "brand" | "influencer" }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn đối tượng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brand">Brand</SelectItem>
                    <SelectItem value="influencer">Influencer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  value={newPlan.description}
                  onChange={(e) => setNewPlan((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Nhập mô tả gói"
                />
              </div>

              {/* Role-specific limits */}
              {newPlan.targetRole === "brand" ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="maxCampaigns">Số chiến dịch tối đa</Label>
                    <Input
                      id="maxCampaigns"
                      type="number"
                      value={newPlan.maxCampaigns}
                      onChange={(e) => setNewPlan((prev) => ({ ...prev, maxCampaigns: e.target.value }))}
                      placeholder="0 cho không giới hạn"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="maxInfluencers">Số influencers tối đa</Label>
                    <Input
                      id="maxInfluencers"
                      type="number"
                      value={newPlan.maxInfluencers}
                      onChange={(e) => setNewPlan((prev) => ({ ...prev, maxInfluencers: e.target.value }))}
                      placeholder="0 cho không giới hạn"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="maxApplications">Số ứng tuyển tối đa</Label>
                  <Input
                    id="maxApplications"
                    type="number"
                    value={newPlan.maxApplications}
                    onChange={(e) => setNewPlan((prev) => ({ ...prev, maxApplications: e.target.value }))}
                    placeholder="0 cho không giới hạn"
                  />
                </div>
              )}
              <div className="flex flex-col gap-2">
                <Label htmlFor="maxSearches">Số kết quả tìm kiếm</Label>
                <Input
                  id="maxSearches"
                  type="number"
                  value={newPlan.maxSearches}
                  onChange={(e) =>
                    setNewPlan((prev) => ({ ...prev, maxSearches: e.target.value }))
                  }
                  placeholder="0 cho không giới hạn"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="isActive">Kích hoạt gói</Label>
                  <Switch
                    id="isActive"
                    checked={newPlan.isActive}
                    onCheckedChange={(checked) => setNewPlan((prev) => ({ ...prev, isActive: checked }))}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={handleCreatePlan}>Tạo gói</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Role Tabs */}
      <Tabs value={selectedRole} onValueChange={(value) => setSelectedRole(value as "brand" | "influencer")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="brand" className="flex items-center space-x-2">
            <Icons.crown className="h-4 w-4" />
            <span>Gói Brand ({brandPlans.length})</span>
          </TabsTrigger>
          <TabsTrigger value="influencer" className="flex items-center space-x-2">
            <Icons.camera className="h-4 w-4" />
            <span>Gói Influencer ({influencerPlans.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="brand" className="space-y-6">
          {/* Brand Plans Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {brandPlans.map((plan) => {
              const Icon = plan.icon
              return (
                <Card key={plan.id} className={`relative ${plan.isActive ? "" : "opacity-60"}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon className="h-5 w-5" />
                        <CardTitle>{plan.name}</CardTitle>
                        <Badge className={plan.color}>Brand</Badge>
                      </div>
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
                          <DropdownMenuItem onClick={() => handleTogglePlan(plan.id, !plan.isActive)}>
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
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{formatPrice(plan.price)}</div>
                      <div className="text-sm text-muted-foreground">
                        /{plan.duration === "monthly" ? "tháng" : "năm"}
                      </div>
                    </div>

                    <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icons.users className="h-4 w-4" />
                        <span>{plan.subscribers} brands</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Giới hạn:</h4>
                      <div className="text-sm space-y-1">
                        <div>Chiến dịch: {plan.maxCampaigns === -1 ? "Không giới hạn" : plan.maxCampaigns}</div>
                        <div>Influencers: {plan.maxInfluencers === -1 ? "Không giới hạn" : plan.maxInfluencers}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Tính năng:</h4>
                      <ul className="space-y-1">
                        {plan.features.slice(0, 4).map((feature, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm">
                            <Icons.check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                        {plan.features.length > 4 && (
                          <li className="text-sm text-muted-foreground">+{plan.features.length - 4} tính năng khác</li>
                        )}
                      </ul>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="text-xs text-muted-foreground">
                        Tạo ngày: {new Date(plan.createdAt).toLocaleDateString("vi-VN")}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="influencer" className="space-y-6">
          {/* Influencer Plans Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {influencerPlans.map((plan) => {
              const Icon = plan.icon
              return (
                <Card key={plan.id} className={`relative ${plan.isActive ? "" : "opacity-60"}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon className="h-5 w-5" />
                        <CardTitle>{plan.name}</CardTitle>
                        <Badge className={plan.color}>Influencer</Badge>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger >
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
                          <DropdownMenuItem onClick={() => handleTogglePlan(plan.id, !plan.isActive)}>
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
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{formatPrice(plan.price)}</div>
                      <div className="text-sm text-muted-foreground">
                        /{plan.duration === "monthly" ? "tháng" : "năm"}
                      </div>
                    </div>

                    <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icons.users className="h-4 w-4" />
                        <span>{plan.subscribers} influencers</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Giới hạn:</h4>
                      <div className="text-sm space-y-1">
                        <div>Ứng tuyển: {plan.maxApplications === -1 ? "Không giới hạn" : plan.maxApplications}</div>
                        <div>
                          Portfolio: {plan.portfolioItems === -1 ? "Không giới hạn" : plan.portfolioItems} items
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Tính năng:</h4>
                      <ul className="space-y-1">
                        {plan.features.slice(0, 4).map((feature, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm">
                            <Icons.check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                        {plan.features.length > 4 && (
                          <li className="text-sm text-muted-foreground">+{plan.features.length - 4} tính năng khác</li>
                        )}
                      </ul>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="text-xs text-muted-foreground">
                        Tạo ngày: {new Date(plan.createdAt).toLocaleDateString("vi-VN")}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
