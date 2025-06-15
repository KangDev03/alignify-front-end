"use client"

import { useState } from "react"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import ApplicationCard from "@/features/application/components/application-card"

const tabs = [
  { value: 'pending', label: 'Đang chờ duyệt' },
  { value: 'accepted', label: 'Đã chấp nhận' },
  { value: 'rejected', label: 'Bị từ chối' },
]

const applications = {
  pending: [
    {
      id: "1",
      title: "Chiến dịch thời trang tuần lễ thời trang",
      brand: "Beauty Co.",
      brandAvatar: "/placeholder.svg?height=40&width=40",
      description: "Tìm kiếm influencer để quảng cáo dòng sản phẩm chăm sóc da mùa hè",
      budget: "10,000,000 VNĐ",
      status: "Chờ duyệt",
      appliedDate: "2024-01-20",
      // expectedResponse: "2024-01-27",
      startDate: "2024-02-15",
      endDate: "2024-03-15",
      category: ["Thời trang", "Làm đẹp"],
      requirements: ["Instagram 100K+ followers", "Fashion influencer", "Có kinh nghiệm runway"],
      deliverables: ["3 bài đăng Instagram", "2 Stories", "1 Reel"],
      contactPerson: "Lê Văn C",
      contactEmail: "contact@stylehouse.vn",
      contactPhone: "0912345678",
    },
    {
      id: "2",
      title: "Chiến dịch thời trang tuần lễ thời trang",
      brand: "Beauty Co.",
      brandAvatar: "/placeholder.svg?height=40&width=40",
      description: "Tìm kiếm influencer để quảng cáo dòng sản phẩm chăm sóc da mùa hè",
      budget: "10,000,000 VNĐ",
      status: "Chờ duyệt",
      appliedDate: "2024-01-20",
      // expectedResponse: "2024-01-27",
      startDate: "2024-02-15",
      endDate: "2024-03-15",
      category: ["Thời trang", "Làm đẹp"],
      requirements: ["Instagram 100K+ followers", "Fashion influencer", "Có kinh nghiệm runway"],
      deliverables: ["3 bài đăng Instagram", "2 Stories", "1 Reel"],
      contactPerson: "Lê Văn C",
      contactEmail: "contact@stylehouse.vn",
      contactPhone: "0912345678",
    },
  ],
  accepted: [
    {
      id: "3",
      title: "Chiến dịch thời trang mùa hè",
      brand: "Summer Style",
      brandAvatar: "/placeholder.svg?height=40&width=40",
      description: "Quảng bá bộ sưu tập thời trang mùa hè mới nhất",
      budget: "15,000,000 VNĐ",
      status: "Đã chấp nhận",
      appliedDate: "2024-01-10",
      acceptedDate: "2024-01-15",
      startDate: "2024-02-01",
      endDate: "2024-03-01",
      category: ["Thời trang", "Mùa hè"],
      requirements: ["Instagram 80K+ followers", "Fashion influencer"],
      deliverables: ["5 Instagram posts", "3 Stories", "2 Reels"],
      contactPerson: "Trần Thị H",
      contactEmail: "contact@summerstyle.vn",
      contactPhone: "0923456789",
    },
  ],
  rejected: [
    {
      id: "4",
      title: "Chiến dịch mỹ phẩm cao cấp",
      brand: "Luxury Beauty",
      brandAvatar: "/placeholder.svg?height=40&width=40",
      description: "Quảng bá dòng mỹ phẩm cao cấp mới ra mắt",
      budget: "20,000,000 VNĐ",
      status: "Bị từ chối",
      appliedDate: "2024-01-05",
      rejectedDate: "2024-01-12",
      rejectionReason: "Không phù hợp với định hướng thương hiệu",
      startDate: "2024-02-01",
      endDate: "2024-03-01",
      category: ["Làm đẹp", "Mỹ phẩm cao cấp"],
      requirements: ["Instagram 150K+ followers", "Beauty influencer"],
      deliverables: ["4 Instagram posts", "6 Stories", "2 Reels"],
      contactPerson: "Nguyễn Văn K",
      contactEmail: "contact@luxurybeauty.vn",
      contactPhone: "0934567890",
    },
  ],
}

export function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState("pending")

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Đơn ứng tuyển của tôi</h1>
      <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab} className="w-full gap-6">
        <div className="flex flex-row gap-6">
          <TabsList className="grid w-full h-fit grid-cols-3 p-1">
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

        <TabsContent value="pending" className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications.pending.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="accepted" className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications.accepted.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications.rejected.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
