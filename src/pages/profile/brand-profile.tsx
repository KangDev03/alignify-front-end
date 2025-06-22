"use client"

import { useState } from "react"
import {
  BarChart3,
  Building2,
  Calendar,
  CheckCircle,
  DollarSign,
  Edit,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Save,
  Users,
  X,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

interface BrandData {
  id: string
  name: string
  avatar: string
  companyName: string
  category: string[]
  bio: string
  contactInfo: {
    email: string
    phone: string
    address: string
  }
  website: string
  establishedYear: number
  companySize: string
  verificationStatus: "verified" | "pending" | "unverified"
  campaignHistory: number
  budgetRange: string
  industry: string
}

interface BrandProfileProps {
  brand: BrandData
}

export function BrandProfile({ brand }: BrandProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(brand)

  const handleSave = () => {
    // Xử lý lưu dữ liệu
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(brand)
    setIsEditing(false)
  }

  const getVerificationBadge = () => {
    switch (brand.verificationStatus) {
      case "verified":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Đã xác minh</Badge>
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Đang xác minh</Badge>
        )
      default:
        return <Badge variant="secondary">Chưa xác minh</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="space-y-6">
        {/* Header Profile */}
        <Card className="border-2 border-primary/20 bg-card shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={brand.avatar || "/placeholder.svg"} alt={brand.name} />
                <AvatarFallback className="text-2xl">{brand.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">{brand.name}</h1>
                    <p className="text-muted-foreground">{brand.companyName}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center space-x-1">
                        <Building2 className="h-4 w-4" />
                        <span>{brand.industry}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Thành lập {brand.establishedYear}</span>
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
                  {getVerificationBadge()}
                  {brand.category.map((cat, index) => (
                    <Badge key={index} variant="secondary">
                      {cat}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <BarChart3 className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{brand.campaignHistory} chiến dịch</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{brand.companySize}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">{brand.budgetRange}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Thông tin công ty */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2 border-primary/20 bg-card shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Thông tin công ty</CardTitle>
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
                    <Label htmlFor="brandName">Tên thương hiệu</Label>
                    {isEditing ? (
                      <Input
                        id="brandName"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      />
                    ) : (
                      <p className="text-sm mt-1">{brand.name}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="companyName">Tên công ty</Label>
                    {isEditing ? (
                      <Input
                        id="companyName"
                        value={editData.companyName}
                        onChange={(e) => setEditData({ ...editData, companyName: e.target.value })}
                      />
                    ) : (
                      <p className="text-sm mt-1">{brand.companyName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="industry">Ngành nghề</Label>
                    {isEditing ? (
                      <Input
                        id="industry"
                        value={editData.industry}
                        onChange={(e) => setEditData({ ...editData, industry: e.target.value })}
                      />
                    ) : (
                      <p className="text-sm mt-1">{brand.industry}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    {isEditing ? (
                      <Input
                        id="website"
                        value={editData.website}
                        onChange={(e) => setEditData({ ...editData, website: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-sm">{brand.website}</p>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Mô tả công ty</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      value={editData.bio}
                      onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm mt-1">{brand.bio}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Thông tin liên hệ */}
            <Card className="border-2 border-primary/20 bg-card shadow-lg">
              <CardHeader>
                <CardTitle>Thông tin liên hệ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 border-2 border-primary/10 rounded-lg bg-card/50 hover:bg-card transition-colors">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{brand.contactInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 border-2 border-primary/10 rounded-lg bg-card/50 hover:bg-card transition-colors">
                  <Phone className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Số điện thoại</p>
                    <p className="text-sm text-muted-foreground">{brand.contactInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 border-2 border-primary/10 rounded-lg bg-card/50 hover:bg-card transition-colors">
                  <MapPin className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="font-medium">Địa chỉ</p>
                    <p className="text-sm text-muted-foreground">{brand.contactInfo.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Thống kê và trạng thái */}
          <div className="space-y-6">
            <Card className="border-2 border-primary/20 bg-card shadow-lg">
              <CardHeader>
                <CardTitle>Trạng thái tài khoản</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Trạng thái xác minh</span>
                  <div className="flex items-center space-x-2">
                    {brand.verificationStatus === "verified" && <CheckCircle className="h-4 w-4 text-green-500" />}
                    {getVerificationBadge()}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Năm thành lập</span>
                    <span className="font-medium">{brand.establishedYear}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Quy mô công ty</span>
                    <span className="font-medium">{brand.companySize}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Ngân sách chiến dịch</span>
                    <span className="font-medium">{brand.budgetRange}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20 bg-card shadow-lg">
              <CardHeader>
                <CardTitle>Thống kê chiến dịch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">{brand.campaignHistory}</div>
                  <p className="text-sm text-muted-foreground">Tổng số chiến dịch</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Chiến dịch đang chạy</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Chiến dịch hoàn thành</span>
                    <span className="font-medium">{brand.campaignHistory - 3}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tỷ lệ thành công</span>
                    <span className="font-medium text-green-600">94%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
