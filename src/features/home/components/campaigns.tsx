import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const mockCampaigns = [
  {
    id: "1",
    title: "Chiến dịch quảng cáo sản phẩm làm đẹp mùa hè",
    brand: "Beauty Co.",
    brandAvatar: "/placeholder.svg?height=40&width=40",
    description: "Tìm kiếm influencer để quảng cáo dòng sản phẩm chăm sóc da mùa hè",
    budget: "10,000,000 VND",
    deadline: "10/07/2025",
    requirements: "Follower > 10K, nữ, 18 tuổi-35 tuổi",
    category: "Làm đẹp",
    location: "TP. HCM",
  },
  {
    id: "2",
    title: "Review sản phẩm công nghệ mới nhất",
    brand: "TechViet",
    brandAvatar: "/placeholder.svg?height=40&width=40",
    description: "Cần influencer tech review các sản phẩm điện tử mới",
    budget: "15,000,000 VND",
    deadline: "15/07/2025",
    requirements: "Follower > 50K, am hiểu công nghệ",
    category: "Công nghệ",
    location: "Hà Nội",
  },
]

export default function Campaigns() {
  return (
    <div className="space-y-4">
      {mockCampaigns.map((campaign) => (
        <Card key={campaign.id} className="border-2 bg-background shadow-lg hover:shadow-xl transition-all">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={campaign.brandAvatar || "/placeholder.svg"} alt={campaign.brand} />
                  <AvatarFallback>{campaign.brand.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{campaign.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{campaign.brand}</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">{campaign.description}</p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Ngân sách</span>
                <p className="text-green-600 font-semibold">{campaign.budget}</p>
              </div>
              <div>
                <span className="font-medium">Deadline</span>
                <p>{campaign.deadline}</p>
              </div>
            </div>

            <div>
              <span className="font-medium text-sm">Yêu cầu</span>
              <p className="text-sm text-muted-foreground">{campaign.requirements}</p>
            </div>

            <div className="flex items-center justify-between">
              <Badge variant="secondary">{campaign.category}</Badge>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Apply ngay
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
