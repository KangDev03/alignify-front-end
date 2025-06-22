"use client"

import { useState } from "react"
import {
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Edit,
  Eye,
  FileText,
  Pause,
  Play,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react"

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import type { Campaign } from "@/features/my-campaign/campaign.type"
import CampaignCard from "@/features/my-campaign/components/campaign-card"

const tabs = [
  { value: "DRAFT", label: "Nháp" },
  { value: "RECRUITING", label: "Đang tuyển" },
  { value: "PENDING", label: "Chưa bắt đầu" },
  { value: "PARTICIPATING", label: "Đang diễn ra" },
  { value: "COMPLETED", label: "Đã kết thúc" },
]

// Mock data cho các chiến dịch theo trạng thái
const campaigns: {
  draft: Campaign[];
  recruiting: Campaign[];
  upcoming: Campaign[];
  ongoing: Campaign[];
  completed: Campaign[];
} = {
  draft: [
    {
      campaignId: "draft1",
      brandName: "Mock Brand",
      brandAvartar: "/images/brand-avatar.png",
      campaignName: "Chiến dịch mỹ phẩm mùa xuân 2024",
      content: "Quảng bá dòng sản phẩm chăm sóc da mùa xuân với các influencer beauty",
      imageUrl: "background-16x9.jpg",
      budget: 45000000,
      status: "Nháp",
      createdAt: [2024, 1, 20],
      startAt: [2024, 1, 20],
      dueAt: [2024, 1, 25],
      categories: [
        { categoryId: "lam-dep", categoryName: "Làm đẹp" },
        { categoryId: "cham-soc-da", categoryName: "Chăm sóc da" },
      ],
      campaignRequirements: {},
      influencerRequirements: ["Instagram 50K+ followers", "Beauty content creator"],
      influencerCountExpected: 8,
      influencerCountCurrent: 0,
    },
    {
      campaignId: "draft2",
      brandName: "Mock Brand",
      brandAvartar: "/images/brand-avatar.png",
      campaignName: "Chiến dịch thời trang công sở",
      content: "Giới thiệu bộ sưu tập thời trang công sở cho phụ nữ hiện đại",
      imageUrl: "background-16x9.jpg",
      budget: 30000000,
      status: "Nháp",
      createdAt: [2024, 1, 18],
      startAt: [2024, 1, 18],
      dueAt: [2024, 1, 22],
      categories: [
        { categoryId: "thoi-trang", categoryName: "Thời trang" },
        { categoryId: "cong-so", categoryName: "Công sở" },
      ],
      campaignRequirements: {},
      influencerRequirements: ["Fashion influencer", "Professional style"],
      influencerCountExpected: 5,
      influencerCountCurrent: 0,
    },
  ],

  recruiting: [
    {
      campaignId: "rec1",
      brandName: "Tech Brand",
      brandAvartar: "/images/tech-brand.png",
      campaignName: "Chiến dịch sản phẩm công nghệ Q1",
      content: "Review và quảng bá các sản phẩm công nghệ mới trong quý 1",
      imageUrl: "background-16x9.jpg",
      budget: 60000000,
      status: "Đang tuyển",
      createdAt: [2024, 2, 1],
      startAt: [2024, 2, 15],
      dueAt: [2024, 3, 15],
      categories: [
        { categoryId: "cong-nghe", categoryName: "Công nghệ" },
        { categoryId: "review", categoryName: "Review" },
      ],
      campaignRequirements: {},
      influencerRequirements: ["Tech reviewer", "YouTube channel"],
      influencerCountExpected: 10,
      influencerCountCurrent: 3,
    },
    {
      campaignId: "rec2",
      brandName: "Lifestyle Brand",
      brandAvartar: "/images/lifestyle-brand.png",
      campaignName: "Chiến dịch lifestyle mùa hè",
      content: "Quảng bá phong cách sống năng động mùa hè",
      imageUrl: "background-16x9.jpg",
      budget: 40000000,
      status: "Đang tuyển",
      createdAt: [2024, 2, 20],
      startAt: [2024, 3, 1],
      dueAt: [2024, 4, 1],
      categories: [
        { categoryId: "lifestyle", categoryName: "Lifestyle" },
        { categoryId: "mua-he", categoryName: "Mùa hè" },
      ],
      campaignRequirements: {},
      influencerRequirements: ["Lifestyle influencer", "Active social media"],
      influencerCountExpected: 6,
      influencerCountCurrent: 2,
    },
  ],

  upcoming: [
    {
      campaignId: "up1",
      brandName: "Edu Brand",
      brandAvartar: "/images/edu-brand.png",
      campaignName: "Chiến dịch back-to-school",
      content: "Quảng bá sản phẩm dành cho học sinh, sinh viên",
      imageUrl: "background-16x9.jpg",
      budget: 35000000,
      status: "Chưa bắt đầu",
      createdAt: [2024, 7, 10],
      startAt: [2024, 8, 15],
      dueAt: [2024, 9, 15],
      categories: [
        { categoryId: "giao-duc", categoryName: "Giáo dục" },
        { categoryId: "hoc-tap", categoryName: "Học tập" },
      ],
      campaignRequirements: {},
      influencerRequirements: ["Student influencer", "Educational content"],
      influencerCountExpected: 8,
      influencerCountCurrent: 8,
    },
  ],

  ongoing: [
    {
      campaignId: "on1",
      brandName: "Gift Brand",
      brandAvartar: "/images/valentine-brand.png",
      campaignName: "Chiến dịch Valentine 2024",
      content: "Quảng bá sản phẩm quà tặng Valentine",
      imageUrl: "background-16x9.jpg",
      budget: 50000000,
      status: "Đang diễn ra",
      createdAt: [2024, 1, 1],
      startAt: [2024, 1, 15],
      dueAt: [2024, 2, 14],
      categories: [
        { categoryId: "qua-tang", categoryName: "Quà tặng" },
        { categoryId: "valentine", categoryName: "Valentine" },
      ],
      campaignRequirements: {},
      influencerRequirements: ["Couple influencer", "Romantic content"],
      influencerCountExpected: 12,
      influencerCountCurrent: 12,
    },
    {
      campaignId: "on2",
      brandName: "Health Brand",
      brandAvartar: "/images/fitness-brand.png",
      campaignName: "Chiến dịch fitness đầu năm",
      content: "Khuyến khích lối sống khỏe mạnh đầu năm mới",
      imageUrl: "background-16x9.jpg",
      budget: 25000000,
      status: "Đang diễn ra",
      createdAt: [2023, 12, 25],
      startAt: [2024, 1, 1],
      dueAt: [2024, 1, 31],
      categories: [
        { categoryId: "fitness", categoryName: "Fitness" },
        { categoryId: "suc-khoe", categoryName: "Sức khỏe" },
      ],
      campaignRequirements: {},
      influencerRequirements: ["Fitness influencer", "Health content"],
      influencerCountExpected: 6,
      influencerCountCurrent: 6,
    },
  ],

  completed: [
    {
      campaignId: "comp1",
      brandName: "Tet Brand",
      brandAvartar: "/images/tet-brand.png",
      campaignName: "Chiến dịch Tết Nguyên Đán 2024",
      content: "Quảng bá sản phẩm và dịch vụ dịp Tết",
      imageUrl: "background-16x9.jpg",
      budget: 80000000,
      status: "Đã kết thúc",
      createdAt: [2023, 12, 10],
      startAt: [2024, 1, 1],
      dueAt: [2024, 1, 15],
      categories: [
        { categoryId: "tet", categoryName: "Tết" },
        { categoryId: "truyen-thong", categoryName: "Truyền thống" },
      ],
      campaignRequirements: {},
      influencerRequirements: ["Vietnamese culture", "Traditional content"],
      influencerCountExpected: 15,
      influencerCountCurrent: 15,
    },
  ],
};

export function CampaignManagement() {
  const [activeTab, setActiveTab] = useState("DRAFT")
  const [openDialog, setOpenDialog] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")


  const handleDeleteCampaign = (campaignId: string) => {
    console.log(`Xóa chiến dịch ${campaignId}`)
    // Xử lý xóa chiến dịch
  }

  const handleEditCampaign = (campaignId: string) => {
    console.log(`Chỉnh sửa chiến dịch ${campaignId}`)
    // Chuyển đến trang chỉnh sửa chiến dịch
  }

  const handlePublishCampaign = (campaignId: string) => {
    console.log(`Xuất bản chiến dịch ${campaignId}`)
    // Chuyển chiến dịch từ nháp sang đang tuyển
  }

  const handlePauseCampaign = (campaignId: string) => {
    console.log(`Tạm dừng chiến dịch ${campaignId}`)
    // Tạm dừng chiến dịch đang diễn ra
  }

  const handleViewReport = (campaignId: string) => {
    console.log(`Xem báo cáo chiến dịch ${campaignId}`)
    // Chuyển đến trang báo cáo
  }

  // Render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "Nháp":
        return (
          <Badge className="bg-gray-500 hover:bg-gray-600 text-white rounded-full">
            <FileText className="mr-1 h-3 w-3" />
            {status}
          </Badge>
        )
      case "Đang tuyển":
        return (
          <Badge className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
            <Users className="mr-1 h-3 w-3" />
            {status}
          </Badge>
        )
      case "Chưa bắt đầu":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full">
            <Clock className="mr-1 h-3 w-3" />
            {status}
          </Badge>
        )
      case "Đang diễn ra":
        return (
          <Badge className="bg-green-600 hover:bg-green-700 text-white rounded-full">
            <Play className="mr-1 h-3 w-3" />
            {status}
          </Badge>
        )
      case "Đã kết thúc":
        return (
          <Badge className="bg-purple-600 hover:bg-purple-700 text-white rounded-full">
            <CheckCircle className="mr-1 h-3 w-3" />
            {status}
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="rounded-full">
            {status}
          </Badge>
        )
    }
  }

  // Render campaign card
  const renderCampaignCard = (campaign: any, tabType: string) => {
    const filteredCampaign = searchQuery
      ? campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true

    if (!filteredCampaign) return null

    return (
      <Card key={campaign.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{campaign.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{campaign.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {campaign.category?.map((cat: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="ml-4">{renderStatusBadge(campaign.status)}</div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-green-500 mr-1" />
              <span>{campaign.budget}</span>
            </div>
            {campaign.startDate && campaign.endDate && (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-blue-500 mr-1" />
                <span>
                  {new Date(campaign.startDate).toLocaleDateString("vi-VN")} -{" "}
                  {new Date(campaign.endDate).toLocaleDateString("vi-VN")}
                </span>
              </div>
            )}
            {campaign.applicants && (
              <div className="flex items-center">
                <Users className="h-4 w-4 text-purple-500 mr-1" />
                <span>{campaign.applicants} ứng viên</span>
              </div>
            )}
            {campaign.selectedInfluencers && (
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span>
                  {campaign.selectedInfluencers}/{campaign.maxInfluencers} đã chọn
                </span>
              </div>
            )}
          </div>

          {/* Progress bar for draft campaigns */}
          {tabType === "draft" && campaign.completionPercentage && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Tiến độ hoàn thành</span>
                <span>{campaign.completionPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${campaign.completionPercentage}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Progress bar for ongoing campaigns */}
          {tabType === "ongoing" && campaign.progress && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Tiến độ thực hiện</span>
                <span>{campaign.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${campaign.progress}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            {/* Actions for draft campaigns */}
            {tabType === "draft" && (
              <>
                <Button variant="outline" size="sm" onClick={() => handleEditCampaign(campaign.id)} className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Chỉnh sửa
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handlePublishCampaign(campaign.id)}
                  className="flex-1"
                >
                  <Play className="h-4 w-4 mr-1" />
                  Xuất bản
                </Button>
                {/* <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Xác nhận xóa chiến dịch</AlertDialogTitle>
                      <AlertDialogDescription>
                        Bạn có chắc chắn muốn xóa chiến dịch &quot;{campaign.title}&quot;? Hành động này không thể hoàn tác.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Hủy</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteCampaign(campaign.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Xóa
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog> */}
              </>
            )}

            {/* Actions for other campaign types */}
            {tabType !== "draft" && (
              <>
                <Dialog
                  open={openDialog === campaign.id}
                  onOpenChange={(open) => setOpenDialog(open ? campaign.id : null)}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      Xem chi tiết
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle className="text-xl">{campaign.title}</DialogTitle>
                      <DialogDescription>{campaign.description}</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Ngân sách</h4>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                            <span>{campaign.budget}</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Trạng thái</h4>
                          {renderStatusBadge(campaign.status)}
                        </div>
                      </div>

                      {campaign.startDate && campaign.endDate && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Thời gian</h4>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-blue-500 mr-1" />
                            <span>
                              {new Date(campaign.startDate).toLocaleDateString("vi-VN")} -{" "}
                              {new Date(campaign.endDate).toLocaleDateString("vi-VN")}
                            </span>
                          </div>
                        </div>
                      )}

                      {campaign.requirements && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Yêu cầu</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {campaign.requirements.map((req: string, index: number) => (
                              <li key={index} className="flex items-center">
                                <span className="mr-2">•</span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {campaign.deliverables && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Nội dung yêu cầu</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {campaign.deliverables.map((item: string, index: number) => (
                              <li key={index} className="flex items-center">
                                <span className="mr-2">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Performance metrics for ongoing/completed campaigns */}
                      {(campaign.currentReach || campaign.finalReach) && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Hiệu suất</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                              <Eye className="h-4 w-4 text-blue-500" />
                              <span>Reach: {campaign.currentReach || campaign.finalReach}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <BarChart3 className="h-4 w-4 text-orange-500" />
                              <span>Engagement: {campaign.engagement || campaign.finalEngagement}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end gap-2 pt-4">
                        {tabType === "ongoing" && (
                          <Button variant="outline" onClick={() => handlePauseCampaign(campaign.id)}>
                            <Pause className="h-4 w-4 mr-2" />
                            Tạm dừng
                          </Button>
                        )}
                        {tabType === "completed" && (
                          <Button onClick={() => handleViewReport(campaign.id)}>
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Xem báo cáo
                          </Button>
                        )}
                        <DialogClose asChild>
                          <Button variant="outline">Đóng</Button>
                        </DialogClose>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* <div className="flex items-center justify-between">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
          placeholder="Tìm kiếm chiến dịch..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          />
          </div>
      </div> */}
      <h1 className="text-3xl font-bold">Quản lí chiến dịch</h1>
      <Tabs defaultValue="DRAFT" value={activeTab} onValueChange={setActiveTab} className="w-full gap-6">
        <div className="flex flex-row gap-6">
          <TabsList className="grid w-full h-fit grid-cols-5 p-1">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="h-full"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="relative w-2/5">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Tìm kiếm..." className="pl-8" />
          </div>
        </div>

        <TabsContent value="DRAFT">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaigns.draft.map((campaign) => (<CampaignCard key={campaign.campaignId} campaign={campaign} />))}
            {/* {campaigns.draft.map((campaign) => renderCampaignCard(campaign, "draft"))} */}
          </div>
        </TabsContent>

        <TabsContent value="RECRUITING">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaigns.recruiting.map((campaign) => renderCampaignCard(campaign, "recruiting"))}
          </div>
        </TabsContent>

        <TabsContent value="PENDING">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaigns.upcoming.map((campaign) => renderCampaignCard(campaign, "upcoming"))}
          </div>
        </TabsContent>

        <TabsContent value="PARTICIPATING">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaigns.ongoing.map((campaign) => renderCampaignCard(campaign, "ongoing"))}
          </div>
        </TabsContent>

        <TabsContent value="COMPLETED">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaigns.completed.map((campaign) => renderCampaignCard(campaign, "completed"))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
