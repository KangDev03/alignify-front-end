import { Check, Star, X } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { Icons } from "@/components/icons/icons"

export function ApplicantCard({ influencer, status }: {
  influencer: any
  status: "waiting" | "accepted" | "rejected"
}) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={influencer.avatar || "/placeholder.svg"} alt={influencer.name} />
          <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{influencer.name}</p>
          <p className="text-sm text-muted-foreground">{influencer.followers.toLocaleString()} followers</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
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
              <Icons.user className="h-4 w-4 mr-1" />
              Hồ sơ
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
}
