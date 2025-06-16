"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"

import { CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { Icons } from "@/components/icons/icons"
import { CampaignFilter } from "@/features/my-campaign/components/campaign-filter"
import { CampaignList } from "@/features/my-campaign/components/campaign-list"
import { setSearch } from "@/features/my-campaign/my-campaign.slice"

export default function MyCampaignPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const dispatch = useDispatch()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    dispatch(setSearch(e.target.value))
  }

  return (
    <CardHeader title="Chiến dịch của tôi">
      <div className="space-y-6">
        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Icons.search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm chiến dịch..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>

          {/* Status Filter Tabs */}
          <CampaignFilter />
        </div>

        {/* Campaign List */}
        <CampaignList />
      </div>
    </CardHeader>
  )
}
