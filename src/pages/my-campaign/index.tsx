"use client"

import { useState } from "react"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useGetAllCampaignsQuery } from "@/features/my-campaign/campaign.service"
import type { Campaign } from "@/features/my-campaign/campaign.type"
import CampaignCard from "@/features/my-campaign/components/campaign-card"

const tabs = [
  { value: "PENDING", label: "Chưa bắt đầu" },
  { value: "RECRUITING", label: "Đang diễn ra" },
  { value: "COMPLETED", label: "Đã kết thúc" },
]


export default function MyCampaignPage() {
  const [activeTab, setActiveTab] = useState("PENDING")
  const { data: campaignsResponse } = useGetAllCampaignsQuery({ pageNumber: 0, pageSize: 10 })
  const campaigns: Campaign[] = Array.isArray(campaignsResponse?.data?.campaigns)
    ? campaignsResponse.data.campaigns
    : []

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.status === activeTab
  )
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Chiến dịch của tôi</h1>
      <Tabs defaultValue="PENDING" value={activeTab} onValueChange={setActiveTab} className="w-full gap-6">
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


        <TabsContent value={activeTab}>
          <div className="grid grid-cols-2 gap-4">
            {filteredCampaigns.length > 0 ? (
              filteredCampaigns.map((campaign) => (
                <CampaignCard key={campaign.campaignId} campaign={campaign} />
              ))
            ) : (
              <p className="text-muted-foreground text-sm">Không có chiến dịch nào.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
