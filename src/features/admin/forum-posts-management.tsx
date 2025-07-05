"use client"

import { useState } from "react"
import { Calendar, Eye, Flag, Heart, MessageCircle, MoreHorizontal, Search, Trash2 } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ForumPostsManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPost, setSelectedPost] = useState<any>(null)

  const forumPosts = [
    {
      id: "1",
      title: "Tips chụp ảnh sản phẩm đẹp với ánh sáng tự nhiên",
      author: "Nguyễn Thị Lan",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      category: "Làm đẹp",
      status: "published",
      createdAt: "2024-01-15",
      likes: 156,
      comments: 23,
      views: 1200,
      content: "Chia sẻ một số mẹo nhỏ giúp các bạn influencer chụp ảnh sản phẩm đẹp hơn với ánh sáng tự nhiên...",
      reports: 0,
    },
    {
      id: "2",
      title: "Kinh nghiệm làm việc với brand lần đầu",
      author: "Trần Văn Nam",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      category: "Kinh nghiệm",
      status: "published",
      createdAt: "2024-01-10",
      likes: 89,
      comments: 15,
      views: 890,
      content: "Khi mới bắt đầu làm influencer, việc hợp tác với brand có thể khiến bạn cảm thấy lo lắng...",
      reports: 0,
    },
    {
      id: "3",
      title: "Cách tăng engagement rate hiệu quả",
      author: "Lê Thị Hoa",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      category: "Tips & Tricks",
      status: "published",
      createdAt: "2024-01-05",
      likes: 234,
      comments: 45,
      views: 1850,
      content: "Engagement rate là một trong những chỉ số quan trọng nhất đối với influencer...",
      reports: 0,
    },
    {
      id: "4",
      title: "Bài viết có nội dung không phù hợp",
      author: "User Spam",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      category: "Spam",
      status: "reported",
      createdAt: "2024-01-20",
      likes: 5,
      comments: 2,
      views: 45,
      content: "Nội dung spam hoặc không phù hợp với cộng đồng...",
      reports: 8,
    },
  ]

  const getStatusBadge = (status: string, reports: number) => {
    if (reports > 0) {
      return <Badge className="bg-red-100 text-red-800">Bị báo cáo ({reports})</Badge>
    }
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800">Đã đăng</Badge>
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800">Bản nháp</Badge>
      case "hidden":
        return <Badge className="bg-gray-100 text-gray-800">Đã ẩn</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredPosts = forumPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDeletePost = (postId: string) => {
    console.log("Deleting post:", postId)
    // Logic xóa bài viết
  }

  const handleViewPost = (post: any) => {
    setSelectedPost(post)
  }

  const handleHidePost = (postId: string) => {
    console.log("Hiding post:", postId)
    // Logic ẩn bài viết
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Quản lý bài viết Forum</h2>
          <p className="text-muted-foreground">Quản lý tất cả bài viết trong forum</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm bài viết..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Posts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách bài viết</CardTitle>
          <CardDescription>Tổng cộng {forumPosts.length} bài viết</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bài viết</TableHead>
                <TableHead>Tác giả</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày đăng</TableHead>
                <TableHead>Tương tác</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div className="max-w-xs">
                      <div className="font-medium truncate">{post.title}</div>
                      <div className="text-sm text-muted-foreground truncate">{post.content}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={post.authorAvatar || "/placeholder.svg"} alt={post.author} />
                        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{post.author}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{post.category}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(post.status, post.reports)}</TableCell>
                  <TableCell>{new Date(post.createdAt).toLocaleDateString("vi-VN")}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-3 w-3" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-3 w-3" />
                        <span>{post.comments}</span>
                      </div>
                      <div className="text-muted-foreground">{post.views} views</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewPost(post)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        {post.reports > 0 && (
                          <DropdownMenuItem>
                            <Flag className="mr-2 h-4 w-4" />
                            Xem báo cáo ({post.reports})
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleHidePost(post.id)}>Ẩn bài viết</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeletePost(post.id)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Xóa bài viết
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Post Detail Dialog */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Chi tiết bài viết</DialogTitle>
            <DialogDescription>Thông tin đầy đủ về bài viết forum</DialogDescription>
          </DialogHeader>
          {selectedPost && (
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedPost.authorAvatar || "/placeholder.svg"} alt={selectedPost.author} />
                  <AvatarFallback>{selectedPost.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{selectedPost.title}</h3>
                  <p className="text-muted-foreground">Bởi {selectedPost.author}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    {getStatusBadge(selectedPost.status, selectedPost.reports)}
                    <Badge variant="outline">{selectedPost.category}</Badge>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(selectedPost.createdAt).toLocaleDateString("vi-VN")}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <div>
                        <p className="text-sm font-medium">Lượt thích</p>
                        <p className="text-lg font-bold">{selectedPost.likes}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">Bình luận</p>
                        <p className="text-lg font-bold">{selectedPost.comments}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-purple-500" />
                      <div>
                        <p className="text-sm font-medium">Lượt xem</p>
                        <p className="text-lg font-bold">{selectedPost.views}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h4 className="font-medium mb-2">Nội dung bài viết</h4>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm">{selectedPost.content}</p>
                </div>
              </div>

              {selectedPost.reports > 0 && (
                <div>
                  <h4 className="font-medium mb-2 text-red-600">Báo cáo vi phạm ({selectedPost.reports})</h4>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-sm text-red-800">
                      Bài viết này đã bị báo cáo {selectedPost.reports} lần vì vi phạm quy định cộng đồng.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedPost(null)}>
                  Đóng
                </Button>
                <Button variant="secondary" onClick={() => handleHidePost(selectedPost.id)}>
                  Ẩn bài viết
                </Button>
                <Button variant="destructive" onClick={() => handleDeletePost(selectedPost.id)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Xóa bài viết
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
