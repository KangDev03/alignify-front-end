// src/features/my-campaign/components/campaign-card.tsx

import { useState } from "react"
import { Calendar, DollarSignIcon, Eye } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import type { Campaign } from "@/features/my-campaign/campaign.type.ts"

import CampaignDetail from "./campaign-detail.tsx"
import { StatusBadge } from "./status-badge.tsx"

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  const [openDialog, setOpenDialog] = useState<string | null>(null)

  const description = new String(campaign.description)
  const startDate = new Date(campaign.startDate)
  const endDate = new Date(campaign.endDate)
  const budget = new String(campaign.budget)
  // const currentDate = new Date()
  // const timeDifference = currentDate.getTime() - startDate.getTime()
  // const daysSinceStarted = Math.floor(timeDifference / (1000 * 3600 * 24))

  return (
    <Card
      key={campaign.id}
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <CardContent className="px-6 w-full">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={campaign.brandAvatar || "/placeholder.svg"} alt={campaign.brand} />
            <AvatarFallback>{campaign.brand.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex flex-row items-center justify-center">
              <h3 className="flex-1 font-semibold text-lg ">{campaign.title}</h3>
              {StatusBadge(campaign.status)}
            </div>
            <p className="text-sm text-muted-foreground">{campaign.brand} • {startDate.toLocaleDateString("vi-VN")}</p>
          </div>
        </div>

        <div className="flex items-center w-fit mb-4 line-clamp-2">
          <span>{`${description}`}</span>
        </div>

        <div className="flex justify-between mb-4 text-sm text-muted-foreground">
          <div className="flex items-center w-fit mr-4">
            <DollarSignIcon className="w-4 h-4 mr-2 text-green-500" />
            <span>{`${budget}`}</span>
          </div>

          <div className="flex items-center w-fit">
            <Calendar className="w-4 h-4 mr-2 text-primary" />
            <span>{`${startDate.toLocaleDateString("vi-VN")} - ${endDate.toLocaleDateString("vi-VN")}`}</span>
          </div>
        </div>

        <div className="flex justify-center">
          <Dialog
            open={openDialog === campaign.id}
            onOpenChange={(open) => setOpenDialog(open ? campaign.id : null)}
          >
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center w-full">
                <Eye className="h-4 w-4 mr-2" />
                Xem chi tiết
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <CampaignDetail key={campaign.id} campaign={campaign} />
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}
