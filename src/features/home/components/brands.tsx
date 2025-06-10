import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { Icons } from "@/components/icons/icons"

const mockBrands = [
  {
    id: "1",
    name: "Beauty Plus Vietnam",
    avatar: "/placeholder.svg?height=60&width=60",
    category: "Làm đẹp",
    description: "Thương hiệu mỹ phẩm hàng đầu Việt Nam",
    campaigns: 12,
    rating: 4.8,
    verified: true,
  },
  {
    id: "2",
    name: "Fashion House",
    avatar: "/placeholder.svg?height=60&width=60",
    category: "Thời trang",
    description: "Thương hiệu thời trang cao cấp",
    campaigns: 8,
    rating: 4.6,
    verified: true,
  },
]

export default function Brands() {
  return (
    <div className="space-y-4">
      {mockBrands.map((brand) => (
        <Card key={brand.id} className="border-2 border-primary/20 bg-card shadow-lg hover:shadow-xl transition-all">
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={brand.avatar || "/placeholder.svg"} alt={brand.name} />
                <AvatarFallback>{brand.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">{brand.name}</h3>
                  {brand.verified && (
                    <Badge variant="default" className="text-xs">
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{brand.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm">
                  <div className="flex items-center space-x-1">
                    <Icons.building2 className="h-4 w-4" />
                    <span>{brand.campaigns} chiến dịch</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icons.star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{brand.rating}</span>
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
