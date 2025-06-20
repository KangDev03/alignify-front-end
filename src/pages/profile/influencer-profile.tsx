"use client"

import { useState } from "react"
import {
  Calendar,
  Edit,
  ExternalLink,
  Eye,
  Facebook,
  Heart,
  Instagram,
  MapPin,
  MessageCircle,
  Save,
  Share2,
  Star,
  TrendingUp,
  Users,
  X,
  Youtube,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

interface InfluencerData {
  id: string
  name: string
  avatar: string
  dateOfBirth: string
  gender: string
  bio: string
  socialMediaLinks: {
    instagram: string
    tiktok: string
    youtube: string
    facebook: string
  }
  rating: number
  category: string[]
  followers: {
    instagram: number
    tiktok: number
    youtube: number
    facebook: number
  }
  totalFollowers: number
  engagementRate: number
  completedCampaigns: number
  location: string
}

interface InfluencerProfileProps {
  influencer: InfluencerData
}

export function InfluencerProfile({ influencer }: InfluencerProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(influencer)

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  // Mock data cho bài viết forum của influencer
  const forumPosts = [
    {
      id: "1",
      title: "Tips chụp ảnh sản phẩm đẹp với ánh sáng tự nhiên",
      content:
        "Chia sẻ một số mẹo nhỏ giúp các bạn influencer chụp ảnh sản phẩm đẹp hơn với ánh sáng tự nhiên. Đầu tiên, hãy chọn thời điểm golden hour (khoảng 1 giờ sau bình minh hoặc 1 giờ trước hoàng hôn) để có ánh sáng mềm mại nhất...",
      category: "Làm đẹp",
      createdAt: "2024-01-15",
      likes: 156,
      comments: 23,
      views: 1200,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "2",
      title: "Kinh nghiệm làm việc với brand lần đầu",
      content:
        "Khi mới bắt đầu làm influencer, việc hợp tác với brand có thể khiến bạn cảm thấy lo lắng. Hôm nay mình sẽ chia sẻ những kinh nghiệm quý báu từ những lần hợp tác đầu tiên của mình...",
      category: "Kinh nghiệm",
      createdAt: "2024-01-10",
      likes: 89,
      comments: 15,
      views: 890,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "3",
      title: "Cách tăng engagement rate hiệu quả",
      content:
        "Engagement rate là một trong những chỉ số quan trọng nhất đối với influencer. Sau 2 năm làm content creator, mình đã tìm ra những cách hiệu quả để tăng tỷ lệ tương tác...",
      category: "Tips & Tricks",
      createdAt: "2024-01-05",
      likes: 234,
      comments: 45,
      views: 1850,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "4",
      title: "Review setup quay video tại nhà với budget thấp",
      content:
        "Nhiều bạn hỏi mình về setup quay video tại nhà mà không tốn quá nhiều tiền. Hôm nay mình sẽ chia sẻ setup hiện tại của mình với tổng chi phí chỉ khoảng 3 triệu đồng...",
      category: "Công nghệ",
      createdAt: "2023-12-28",
      likes: 178,
      comments: 32,
      views: 1456,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const handleSave = () => {
    // Xử lý lưu dữ liệu
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(influencer)
    setIsEditing(false)
  }

  const socialPlatforms = [
    { name: "Instagram", icon: Instagram, color: "text-pink-500", followers: influencer.followers.instagram },
    { name: "TikTok", icon: Users, color: "text-black dark:text-white", followers: influencer.followers.tiktok },
    { name: "YouTube", icon: Youtube, color: "text-red-500", followers: influencer.followers.youtube },
    { name: "Facebook", icon: Facebook, color: "text-blue-500", followers: influencer.followers.facebook },
  ]

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="space-y-6">
        {/* Header Profile */}
        <Card className="border-2 border-primary/20 bg-card shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={influencer.avatar || "/placeholder.svg"} alt={influencer.name} />
                <AvatarFallback className="text-2xl">{influencer.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">{influencer.name}</h1>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{influencer.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(influencer.dateOfBirth).toLocaleDateString("vi-VN")}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant={isEditing ? "destructive" : "outline"}
                    size="sm"
                    onClick={isEditing ? handleCancel : () => setIsEditing(true)}
                  >
                    {isEditing ? <X className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                    {isEditing ? "Hủy" : "Chỉnh sửa"}
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {influencer.category.map((cat, index) => (
                    <Badge key={index} variant="secondary">
                      {cat}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{influencer.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{influencer.engagementRate}% engagement</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {influencer.completedCampaigns} chiến dịch hoàn thành
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content with Tabs */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
            <TabsTrigger value="posts">Bài viết của tôi ({forumPosts.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Thông tin cá nhân */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-2 border-primary/20 bg-card shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Thông tin cá nhân</CardTitle>
                    {isEditing && (
                      <Button size="sm" onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Lưu
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Họ và tên</Label>
                        {isEditing ? (
                          <Input
                            id="name"
                            value={editData.name}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                          />
                        ) : (
                          <p className="text-sm mt-1">{influencer.name}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="gender">Giới tính</Label>
                        {isEditing ? (
                          <Input
                            id="gender"
                            value={editData.gender}
                            onChange={(e) => setEditData({ ...editData, gender: e.target.value })}
                          />
                        ) : (
                          <p className="text-sm mt-1">{influencer.gender}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio">Giới thiệu bản thân</Label>
                      {isEditing ? (
                        <Textarea
                          id="bio"
                          value={editData.bio}
                          onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                          rows={3}
                        />
                      ) : (
                        <p className="text-sm mt-1">{influencer.bio}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media Links */}
                <Card className="border-2 border-primary/20 bg-card shadow-lg">
                  <CardHeader>
                    <CardTitle>Liên kết mạng xã hội</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(influencer.socialMediaLinks).map(([platform, link]) => (
                      <div
                        key={platform}
                        className="flex items-center justify-between p-3 border-2 border-primary/10 rounded-lg bg-card/50 hover:bg-card transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="capitalize font-medium">{platform}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">{link}</span>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Thống kê */}
              <div className="space-y-6">
                <Card className="border-2 border-primary/20 bg-card shadow-lg">
                  <CardHeader>
                    <CardTitle>Thống kê tổng quan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold text-primary">{formatNumber(influencer.totalFollowers)}</div>
                      <p className="text-sm text-muted-foreground">Tổng số người theo dõi</p>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-3">
                      {socialPlatforms.map((platform) => (
                        <div key={platform.name} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <platform.icon className={`h-4 w-4 ${platform.color}`} />
                            <span className="text-sm">{platform.name}</span>
                          </div>
                          <span className="text-sm font-medium">{formatNumber(platform.followers)}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-primary/20 bg-card shadow-lg">
                  <CardHeader>
                    <CardTitle>Hiệu suất</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tỷ lệ tương tác</span>
                      <span className="font-medium">{influencer.engagementRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Đánh giá</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{influencer.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Chiến dịch hoàn thành</span>
                      <span className="font-medium">{influencer.completedCampaigns}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="posts" className="mt-6">
            <div className="space-y-6">
              {forumPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {forumPosts.map((post) => (
                    <Card
                      key={post.id}
                      className="border-2 border-primary/20 bg-card shadow-lg hover:shadow-xl transition-all"
                    >
                      <CardContent className="p-0">
                        {/* Post Image */}
                        <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="p-6">
                          {/* Post Header */}
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline" className="text-xs">
                              {post.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                            </span>
                          </div>

                          {/* Post Title */}
                          <h3 className="font-semibold text-lg mb-3 line-clamp-2">{post.title}</h3>

                          {/* Post Content Preview */}
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.content}</p>

                          {/* Post Stats */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Heart className="h-4 w-4" />
                                <span>{post.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageCircle className="h-4 w-4" />
                                <span>{post.comments}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye className="h-4 w-4" />
                                <span>{post.views}</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-2 border-primary/20 bg-card shadow-lg">
                  <CardContent className="p-12 text-center">
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                        <MessageCircle className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Chưa có bài viết nào</h3>
                        <p className="text-muted-foreground">Bạn chưa đăng bài viết nào trong forum.</p>
                      </div>
                      <Button>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Viết bài đầu tiên
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
