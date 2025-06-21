"use client"

import { useState } from "react"

import { ApplicantTabs } from "@/features/applicants/components/applicant-tabs"
import { CampaignList } from "@/features/applicants/components/campaign-list"
import { CampaignOverview } from "@/features/applicants/components/campaign-overview"

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

export function Applicants() {
  const [selectedCampaign, setSelectedCampaign] = useState("1")

  const selectedCampaignData = campaigns.find((c) => c.id === selectedCampaign)
  const currentApplicants = applicantsData[selectedCampaign as keyof typeof applicantsData] || {
    waiting: [],
    accepted: [],
    rejected: [],
  }

  return (
    <div className="flex gap-6">
      <CampaignList
        campaigns={campaigns}
        selectedCampaign={selectedCampaign}
        onSelect={setSelectedCampaign}
      />
      <div className="flex-1 border rounded-lg bg-card">
        {selectedCampaignData ? (
          <div className="h-full flex flex-col">
            <CampaignOverview campaign={selectedCampaignData} />
            <ApplicantTabs applicants={currentApplicants} />
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
