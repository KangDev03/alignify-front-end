import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

import { Icons } from "@/components/icons/icons"

const mockForumPosts = [
  {
    id: "1",
    author: "Nguyễn Thị Lan",
    avatar: "/placeholder.svg?height=40&width=40",
    title: "Tips chụp ảnh sản phẩm đẹp với ánh sáng tự nhiên",
    content: "Chia sẻ một số mẹo nhỏ giúp các bạn influencer chụp ảnh sản phẩm đẹp hơn...",
    likes: 156,
    comments: 23,
    views: 1200,
    timeAgo: "2 giờ trước",
    category: "Làm đẹp",
  },
  {
    id: "2",
    author: "Trần Văn Nam",
    avatar: "/placeholder.svg?height=40&width=40",
    title: "Kinh nghiệm làm video review công nghệ thu hút người xem",
    content: "Sau 3 năm làm tech reviewer, tôi muốn chia sẻ những kinh nghiệm...",
    likes: 89,
    comments: 15,
    views: 890,
    timeAgo: "5 giờ trước",
    category: "Công nghệ",
  },
]

export default function Forum() {
  return (
    <div className="space-y-4">
      {mockForumPosts.map((post) => (
        <Card key={post.id} className="border-2 border-primary/20 bg-card shadow-lg hover:shadow-xl transition-all">
          <CardContent>
            <div className="flex items-start space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.author} />
                <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">{post.author}</h3>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{post.timeAgo}</span>
                </div>
                <h4 className="font-medium mt-1">{post.title}</h4>
                <p className="text-sm text-muted-foreground mt-2">{post.content}</p>
                <div className="flex items-center space-x-6 mt-3">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Icons.heart className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Icons.messageCircle className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Icons.eye className="h-4 w-4" />
                    <span>{post.views}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {post.category}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
