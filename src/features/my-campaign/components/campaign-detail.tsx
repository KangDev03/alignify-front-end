import { Calendar, DollarSignIcon } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

import { StatusBadge } from "./status-badge.tsx"
import type { Campaign } from "../campaign.type.ts"

export default function CampaignDetail({ campaign }: { campaign: Campaign }) {
  const startDate = new Date(campaign.startDate)
  const endDate = new Date(campaign.endDate)

  return (
    <>
      <DialogHeader>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={campaign.brandAvatar || "/placeholder.svg"} alt={campaign.brand} />
            <AvatarFallback>{campaign.brand.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <DialogTitle className="text-xl">{campaign.title}</DialogTitle>
            <DialogDescription>{campaign.brand} • {new Date(campaign.createdDate).toLocaleDateString("vi-VN")}</DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium mb-1">Mô tả chiến dịch:</h4>
          <p className="text-sm text-muted-foreground">{campaign.description}</p>
        </div>

        {campaign.category?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <h4 className="text-sm font-medium">Danh mục:</h4>
            {campaign.category.map((cat: string, i: number) => (
              <Badge key={i} variant="outline">{cat}</Badge>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {/* Ngân sách */}
          <div className="flex flex-col">
            <h4 className="text-sm font-medium mb-1">Ngân sách</h4>
            <div className="flex items-center w-fit mr-4">
              <DollarSignIcon className="w-4 h-4 mr-2 text-green-500" />
              <p>{campaign.budget}</p>
            </div>
          </div>

          {/* Thời gian */}
          <div className="flex flex-col">
            <h4 className="text-sm font-medium mb-1">Thời gian</h4>
            <div className="flex items-center w-fit">
              <Calendar className="w-4 h-4 mr-2 text-primary" />
              <p>{`${startDate.toLocaleDateString("vi-VN")} - ${endDate.toLocaleDateString("vi-VN")}`}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-row gap-2">
          <p className="text-sm font-medium">Trạng thái:</p>
          {StatusBadge(campaign.status)}
        </div>

        <Accordion type="multiple" className="w-full mb-4">
          {campaign.deliverables?.length > 0 && (
            <AccordionItem value="deliverables">
              <AccordionTrigger>Nội dung yêu cầu</AccordionTrigger>
              <AccordionContent>
                {campaign.deliverables.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-center text-sm text-muted-foreground">
                    <span className="mr-2">•</span>
                    {item}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          )}
          {campaign.goals?.length > 0 && (
            <AccordionItem value="goals">
              <AccordionTrigger>Mục tiêu chiến dịch</AccordionTrigger>
              <AccordionContent>
                {campaign.goals.map((goal: string, idx:number) => (
                  <div key={idx} className="flex items-center text-sm text-muted-foreground">
                    <span className="mr-2">•</span>
                    {goal}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>
    </>
  )
}
