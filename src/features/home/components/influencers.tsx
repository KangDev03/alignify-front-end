import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { Icons } from "@/components/icons/icons"

const mockInfluencers = [
  {
    id: "1",
    name: "Nguyễn Thị Lan",
    avatar: "/placeholder.svg?height=60&width=60",
    category: "Làm đẹp",
    followers: "125K",
    engagement: "3.2%",
    rating: 4.8,
    location: "TP. HCM",
  },
  {
    id: "2",
    name: "Trần Văn Nam",
    avatar: "/placeholder.svg?height=60&width=60",
    category: "Công nghệ",
    followers: "89K",
    engagement: "4.1%",
    rating: 4.6,
    location: "Hà Nội",
  },
]

export default function Influencers() {
  return (
    <div className="space-y-4">
      {mockInfluencers.map((influencer) => (
        <Card
          key={influencer.id}
          className="border-2 border-primary/20 bg-card shadow-lg hover:shadow-xl transition-all"
        >
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={influencer.avatar || "/placeholder.svg"} alt={influencer.name} />
                <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold">{influencer.name}</h3>
                <p className="text-sm text-muted-foreground">{influencer.category}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm">
                  <div className="flex items-center space-x-1">
                    <Icons.users className="h-4 w-4" />
                    <span>{influencer.followers} followers</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icons.trendingUp className="h-4 w-4" />
                    <span>{influencer.engagement} engagement</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icons.mapPin className="h-4 w-4" />
                    <span>{influencer.location}</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Xem hồ sơ
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
