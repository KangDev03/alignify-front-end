import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { Icons } from "@/components/icons/icons"

interface ForumPostProps {
  post: {
    id: string
    title: string
    content: string
    category: string
    createdAt: string
    likes: number
    comments: number
    views: number
    image?: string
  }
  influencer: {
    name: string
    avatar?: string
  }
}

export function ForumPost({ post, influencer }: ForumPostProps) {
  return (
    <Card className="border border-border bg-card hover:bg-muted/30 transition-all">
      <CardContent className="px-6">
        {/* Post Header */}
        <div className="flex items-start space-x-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={influencer.avatar || "/placeholder.svg"} alt={influencer.name} />
            <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-medium">{influencer.name}</h4>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {new Date(post.createdAt).toLocaleDateString("vi-VN")}
              </span>
              <span className="text-muted-foreground">•</span>
              <Badge variant="outline" className="text-xs">
                {post.category}
              </Badge>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold leading-tight">{post.title}</h3>
          <div className="text-sm text-muted-foreground leading-relaxed">
            <p className="line-clamp-3">{post.content}</p>
            {/* <Button variant="link" className="p-0 h-auto text-primary text-sm mt-1">
              Đọc thêm
            </Button> */}
          </div>
        </div>

        <div className="w-full h-80 relative rounded-md mt-3">
          <img
            src="background-16x9.jpg"
            alt="Chiến dịch quảng cáo sản phẩm làm đẹp mùa hè"
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Post Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 text-muted-foreground hover:text-red-500 transition-colors group">
              <Icons.heart className="h-4 w-4 group-hover:fill-current" />
              <span className="text-sm">{post.likes}</span>
            </button>
            <button className="flex items-center space-x-2 text-muted-foreground hover:text-blue-500 transition-colors">
              <Icons.messageCircle className="h-4 w-4" />
              <span className="text-sm">{post.comments}</span>
            </button>
            {/* <div className="flex items-center space-x-2 text-muted-foreground">
              <Icons.eye className="h-4 w-4" />
              <span className="text-sm">{post.views} lượt xem</span>
            </div> */}
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Icons.share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
