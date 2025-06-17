import { useState } from "react"
import { Calendar, Eye } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import type { Application, Campaign } from "@/features/application/application.type"
import ApplicationDetail from "@/features/application/components/application-detail"
import { StatusBadge } from "@/features/application/components/status-badge"

interface ApplicationCardProps {
  application: Application
  campaign: Campaign
}

export default function ApplicationCard({ application, campaign }: ApplicationCardProps) {
  const [openDialog, setOpenDialog] = useState<string | null>(null)

  const appliedDate = new Date(application.createdAt)
  const currentDate = new Date()
  const timeDifference = currentDate.getTime() - appliedDate.getTime()
  const daysSinceApplied = Math.floor(timeDifference / (1000 * 3600 * 24))

  return (
    <Card
      key={application.applicationId}
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <CardContent className="px-6">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={campaign.imageUrl || "/placeholder.svg"} alt="brand avatar" />
            <AvatarFallback>{campaign.brandId.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex flex-row items-center justify-center">
              <h3 className="flex-1 font-semibold text-lg">{campaign.content}</h3>
              {StatusBadge(application.status)}
            </div>
            <p className="text-sm text-muted-foreground">{campaign.brandId} • {appliedDate.toLocaleDateString("vi-VN")}</p>
          </div>
        </div>

        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Calendar className="w-4 h-4 mr-2 text-primary" />
          <span>
            {application.status === "Chờ duyệt"
              ? `Ứng tuyển ${daysSinceApplied} ngày trước`
              : `Ngày ứng tuyển: ${appliedDate.toLocaleDateString("vi-VN")}`}
          </span>
        </div>

        <div className="flex justify-center">
          <Dialog
            open={openDialog === application.applicationId}
            onOpenChange={(open) => setOpenDialog(open ? application.applicationId : null)}
          >
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center w-full">
                <Eye className="h-4 w-4 mr-2" />
                Xem chi tiết
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <ApplicationDetail application={application} campaign={campaign} />
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}
