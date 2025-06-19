"use client"

import { useState } from "react"
import { Check, Clock,MessageCircle, Star, X } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Applicants() {
  const [selectedCampaign, setSelectedCampaign] = useState("1")

  // Mock data cho Brand - danh sách chiến dịch
  const campaigns = [
    {
      id: "1",
      title: "Chiến dịch quảng cáo sản phẩm làm đẹp mùa hè",
      brand: "Beauty Brand",
      status: "Đang tuyển",
      budget: "50,000,000 VNĐ",
      startDate: "2024-02-15",
      endDate: "2024-03-15",
      applicants: 24,
      selectedInfluencers: 3,
      maxInfluencers: 8,
    },
    {
      id: "2",
      title: "Chiến dịch sản phẩm công nghệ Q1",
      brand: "Tech Corp",
      status: "Đang tuyển",
      budget: "30,000,000 VNĐ",
      startDate: "2024-03-01",
      endDate: "2024-04-01",
      applicants: 15,
      selectedInfluencers: 2,
      maxInfluencers: 5,
    },
    {
      id: "3",
      title: "Chiến dịch thời trang xuân hè 2024",
      brand: "Fashion House",
      status: "Sắp bắt đầu",
      budget: "75,000,000 VNĐ",
      startDate: "2024-04-01",
      endDate: "2024-05-01",
      applicants: 32,
      selectedInfluencers: 5,
      maxInfluencers: 10,
    },
  ]

  // Mock data cho ứng viên theo từng chiến dịch
  const applicantsData = {
    "1": {
      waiting: [
        {
          id: "inf1",
          name: "Nguyễn Thị Lan",
          avatar: "/placeholder.svg?height=40&width=40",
          followers: 125000,
          engagementRate: 3.2,
          rating: 4.8,
          appliedDate: "2024-01-20",
          bio: "Beauty & Lifestyle influencer",
          platforms: ["Instagram", "TikTok"],
        },
        {
          id: "inf2",
          name: "Trần Văn Minh",
          avatar: "/placeholder.svg?height=40&width=40",
          followers: 89000,
          engagementRate: 4.1,
          rating: 4.6,
          appliedDate: "2024-01-22",
          bio: "Skincare enthusiast & content creator",
          platforms: ["Instagram", "YouTube"],
        },
        {
          id: "inf5",
          name: "Phạm Thị Mai",
          avatar: "/placeholder.svg?height=40&width=40",
          followers: 67000,
          engagementRate: 3.8,
          rating: 4.5,
          appliedDate: "2024-01-25",
          bio: "Beauty content creator",
          platforms: ["TikTok", "Instagram"],
        },
        // {
        //   id: "inf6",
        //   name: "Lê Văn Đức",
        //   avatar: "/placeholder.svg?height=40&width=40",
        //   followers: 98000,
        //   engagementRate: 2.9,
        //   rating: 4.7,
        //   appliedDate: "2024-01-26",
        //   bio: "Lifestyle & Fashion influencer",
        //   platforms: ["Instagram", "YouTube"],
        // },
      ],
      accepted: [
        {
          id: "inf3",
          name: "Lê Thị Hoa",
          avatar: "/placeholder.svg?height=40&width=40",
          followers: 156000,
          engagementRate: 2.8,
          rating: 4.9,
          appliedDate: "2024-01-25",
          bio: "Fashion & Beauty influencer",
          platforms: ["Instagram", "TikTok", "YouTube"],
        },
        {
          id: "inf7",
          name: "Hoàng Văn Nam",
          avatar: "/placeholder.svg?height=40&width=40",
          followers: 203000,
          engagementRate: 3.5,
          rating: 4.8,
          appliedDate: "2024-01-23",
          bio: "Beauty & Skincare expert",
          platforms: ["Instagram", "YouTube"],
        },
      ],
      rejected: [
        {
          id: "inf4",
          name: "Nguyễn Văn Tùng",
          avatar: "/placeholder.svg?height=40&width=40",
          followers: 45000,
          engagementRate: 2.1,
          rating: 4.2,
          appliedDate: "2024-01-21",
          bio: "Content creator",
          platforms: ["TikTok"],
        },
      ],
    },
    "2": {
      waiting: [
        {
          id: "inf8",
          name: "Phạm Văn Tech",
          avatar: "/placeholder.svg?height=40&width=40",
          followers: 95000,
          engagementRate: 3.8,
          rating: 4.7,
          appliedDate: "2024-01-28",
          bio: "Tech reviewer & gadget enthusiast",
          platforms: ["YouTube", "Instagram"],
        },
      ],
      accepted: [],
      rejected: [],
    },
    "3": {
      waiting: [],
      accepted: [],
      rejected: [],
    },
  }

  const selectedCampaignData = campaigns.find((c) => c.id === selectedCampaign)
  const currentApplicants = applicantsData[selectedCampaign as keyof typeof applicantsData] || {
    waiting: [],
    accepted: [],
    rejected: [],
  }

  const renderInfluencerCard = (influencer: any, status: "waiting" | "accepted" | "rejected") => (
    <div
      key={influencer.id}
      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={influencer.avatar || "/placeholder.svg"} alt={influencer.name} />
          <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{influencer.name}</p>
          <p className="text-sm text-muted-foreground">{influencer.followers.toLocaleString()} followers</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
            <span>{influencer.engagementRate}% engagement</span>
            <div className="flex items-center">
              <Star className="h-3 w-3 text-yellow-500 mr-1" />
              {influencer.rating}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {status === "waiting" && (
          <>
            <Button size="sm" variant="outline">
              <MessageCircle className="h-4 w-4 mr-1" />
              Nhắn tin
            </Button>
            <Button size="sm" variant="default">
              <Check className="h-4 w-4 mr-1" />
              Chấp nhận
            </Button>
            <Button size="sm" variant="outline">
              <X className="h-4 w-4 mr-1" />
              Từ chối
            </Button>
          </>
        )}
        {status === "accepted" && (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <Check className="h-3 w-3 mr-1" />
            Đã chấp nhận
          </Badge>
        )}
        {status === "rejected" && (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            <X className="h-3 w-3 mr-1" />
            Đã từ chối
          </Badge>
        )}
      </div>
    </div>
  )

  return (
    <div className="flex gap-6">
      {/* Left Panel - Campaign List */}
      <div className="w-1/3 h-fit border rounded-lg p-4 bg-card">
        <h2 className="text-xl font-semibold mb-4">Danh sách chiến dịch</h2>
        <div className="space-y-3">
          {campaigns.map((campaign) => (
            <Card
              key={campaign.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedCampaign === campaign.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedCampaign(campaign.id)}
            >
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-sm leading-tight">{campaign.title}</h3>
                  <p className="text-sm text-muted-foreground">{campaign.brand}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant={campaign.status === "Đang tuyển" ? "default" : "secondary"} className="text-xs">
                      {campaign.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{campaign.applicants} ứng viên</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Panel - Applicant Management */}
      <div className="flex-1 border rounded-lg bg-card">
        {selectedCampaignData ? (
          <div className="h-full flex flex-col">
            {/* Campaign Header */}
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold mb-2">{selectedCampaignData.title}</h2>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Ngân sách:</span>
                  <p className="font-medium">{selectedCampaignData.budget}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Tổng ứng viên:</span>
                  <p className="font-medium">{selectedCampaignData.applicants}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Đã chọn:</span>
                  <p className="font-medium">
                    {selectedCampaignData.selectedInfluencers}/{selectedCampaignData.maxInfluencers}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Thời gian:</span>
                  <p className="font-medium">
                    {new Date(selectedCampaignData.startDate).toLocaleDateString("vi-VN")} -{" "}
                    {new Date(selectedCampaignData.endDate).toLocaleDateString("vi-VN")}
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs for Applicant Status */}
            <div className="flex-1 p-6">
              <Tabs defaultValue="waiting" className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="waiting" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Danh sách chờ ({currentApplicants.waiting.length})
                  </TabsTrigger>
                  <TabsTrigger value="accepted" className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Danh sách đã chấp nhận ({currentApplicants.accepted.length})
                  </TabsTrigger>
                  <TabsTrigger value="rejected" className="flex items-center gap-2">
                    <X className="h-4 w-4" />
                    Danh sách bị từ chối ({currentApplicants.rejected.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="waiting" className="flex-1 mt-4">
                  <div className="space-y-3 h-full overflow-y-auto">
                    {currentApplicants.waiting.length > 0 ? (
                      currentApplicants.waiting.map((influencer) => renderInfluencerCard(influencer, "waiting"))
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">Không có ứng viên nào đang chờ duyệt.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="accepted" className="flex-1 mt-4">
                  <div className="space-y-3 h-full overflow-y-auto">
                    {currentApplicants.accepted.length > 0 ? (
                      currentApplicants.accepted.map((influencer) => renderInfluencerCard(influencer, "accepted"))
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">Chưa có ứng viên nào được chấp nhận.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="rejected" className="flex-1 mt-4">
                  <div className="space-y-3 h-full overflow-y-auto">
                    {currentApplicants.rejected.length > 0 ? (
                      currentApplicants.rejected.map((influencer) => renderInfluencerCard(influencer, "rejected"))
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">Không có ứng viên nào bị từ chối.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Chọn một chiến dịch để xem ứng viên</p>
          </div>
        )}
      </div>
    </div>
  )
}
