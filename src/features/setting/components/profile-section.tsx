"use client"

import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Camera, Plus, Save, Star, X } from "lucide-react"
import { toast } from "sonner"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

import { profileFormSchema, type ProfileFormValues } from "@/features/setting/setting.schema"
import { useAppSelector } from "@/hooks/redux"
import { cn } from "@/lib/utils"
import type { RootState } from "@/redux/store"
import { zodResolver } from "@hookform/resolvers/zod"

interface Category {
  categoryId: string
  categoryName: string
}

export default function ProfileSection() {
  const { role: roleName } = useAppSelector((state: RootState) => state.auth)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newSocialMedia, setNewSocialMedia] = useState({ platform: "", url: "" })
  const [newContact, setNewContact] = useState({ type: "", value: "" })

  const MAX_CATEGORIES = 3

  const availableCategories: Category[] = [
    { categoryId: "1", categoryName: "Thời trang" },
    { categoryId: "2", categoryName: "Làm đẹp" },
    { categoryId: "3", categoryName: "Lifestyle" },
    { categoryId: "4", categoryName: "Công nghệ" },
    { categoryId: "5", categoryName: "Ẩm thực" },
    { categoryId: "6", categoryName: "Du lịch" },
    { categoryId: "7", categoryName: "Thể thao" },
    { categoryId: "8", categoryName: "Giải trí" },
    { categoryId: "9", categoryName: "Giáo dục" },
    { categoryId: "10", categoryName: "Sức khỏe" },
  ]

  const getDefaultValues = () => {
    if (roleName === "BRAND") {
      return {
        name: "Beauty Co.",
        email: "contact@beautyco.vn",
        bio: "Thương hiệu mỹ phẩm hàng đầu Việt Nam với hơn 10 năm kinh nghiệm trong ngành làm đẹp.",
        establishDate: "2014-05-20",
        isPublic: true,
        categoryIds: ["1", "2"],
        socialMediaLinks: [
          { platform: "facebook", url: "https://facebook.com/beautyco" },
          { platform: "instagram", url: "https://instagram.com/beautyco_official" },
        ],
        contacts: [
          { type: "phone", value: "+84 901 234 567" },
          { type: "website", value: "https://beautyco.vn" },
          { type: "address", value: "123 Nguyễn Huệ, Q1, TP.HCM" },
        ],
      }
    } else {
      return {
        name: "Nguyễn Thị Lan",
        email: "lan@example.com",
        bio: "Content creator chuyên về lifestyle và beauty.",
        gender: "female" as const,
        doB: "1995-03-15",
        follower: 326000,
        isPublic: true,
        categoryIds: ["1", "2", "3"],
        socialMediaLinks: [
          { platform: "instagram", url: "https://instagram.com/nguyenthilan" },
          { platform: "tiktok", url: "https://tiktok.com/@nguyenthilan" },
        ],
      }
    }
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: getDefaultValues(),
  })

  const handleSelectCategory = (categoryId: string) => {
    const current = form.getValues("categoryIds") || []
    if (current.includes(categoryId)) {
      form.setValue(
        "categoryIds",
        current.filter((id) => id !== categoryId),
      )
    } else {
      if (current.length >= MAX_CATEGORIES) {
        const copy = [...current].slice(0, MAX_CATEGORIES - 1)
        form.setValue("categoryIds", [...copy, categoryId])
      } else {
        form.setValue("categoryIds", [...current, categoryId])
      }
    }
  }

  const formatFollowerCount = (count: number) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M"
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K"
    }
    return count.toString()
  }

  const addSocialMedia = () => {
    if (newSocialMedia.platform && newSocialMedia.url) {
      const currentLinks = form.getValues("socialMediaLinks") || []
      const newLinks = [...currentLinks, newSocialMedia]
      form.setValue("socialMediaLinks", newLinks)
      setNewSocialMedia({ platform: "", url: "" })
    }
  }

  const removeSocialMedia = (index: number) => {
    const currentLinks = form.getValues("socialMediaLinks") || []
    const newLinks = currentLinks.filter((_, i) => i !== index)
    form.setValue("socialMediaLinks", newLinks)
  }

  const addContact = () => {
    if (newContact.type && newContact.value) {
      const currentContacts = form.getValues("contacts") || []
      const newContacts = [...currentContacts, newContact]
      form.setValue("contacts", newContacts)
      setNewContact({ type: "", value: "" })
    }
  }

  const removeContact = (index: number) => {
    const currentContacts = form.getValues("contacts") || []
    const newContacts = currentContacts.filter((_, i) => i !== index)
    form.setValue("contacts", newContacts)
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      form.setValue("avatarFile", file)
    }
  }

  // const handleBackgroundChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0]
  //   if (file) {
  //     form.setValue("backgroundFile", file)
  //   }
  // }

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      setIsSubmitting(true)

      const formData = new FormData()

      if (values.avatarFile) {
        formData.append("avatar", values.avatarFile)
      }
      if (values.backgroundFile) {
        formData.append("background", values.backgroundFile)
      }

      let profileData: any

      if (roleName === "BRAND") {
        profileData = {
          ...values,
          establishDate: values.establishDate ? values.establishDate.split("-").map(Number) : null,
          socialMediaLinks: values.socialMediaLinks?.flatMap((link) => [{ key: link.platform }, link.url]) || [],
          contacts: values.contacts?.flatMap((contact) => [{ key: contact.type }, contact.value]) || [],
        }
      } else {
        profileData = {
          ...values,
          doB: values.doB ? values.doB.split("-").map(Number) : null,
          socialMediaLinks: values.socialMediaLinks?.flatMap((link) => [{ key: link.platform }, link.url]) || [],
        }
      }

      formData.append("profile", JSON.stringify(profileData))

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success("Cập nhật hồ sơ thành công!")
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Cập nhật hồ sơ thất bại. Vui lòng thử lại!")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Hồ sơ cá nhân</h3>
        <p className="text-sm text-muted-foreground">Cập nhật thông tin hồ sơ và ảnh đại diện của bạn.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ảnh đại diện và ảnh bìa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Background Image */}
              {/* <div className="space-y-2">
                <Label>Ảnh bìa</Label>
                <div className="relative">
                  <div className="w-full h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg bg-cover bg-center" />
                  <input
                    id="background-upload"
                    type="file"
                    accept="image/jpeg,image/png"
                    style={{ display: "none" }}
                    onChange={handleBackgroundChange}
                  />
                  <Button
                    type="button"
                    size="sm"
                    className="absolute bottom-2 right-2"
                    variant="secondary"
                    onClick={() => document.getElementById("background-upload")?.click()}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Thay đổi ảnh bìa
                  </Button>
                </div>
              </div> */}

              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback>{form.watch("name")?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/jpeg,image/png"
                    style={{ display: "none" }}
                    onChange={handleAvatarChange}
                  />
                  <Button type="button" size="sm" onClick={() => document.getElementById("avatar-upload")?.click()}>
                    <Camera className="h-4 w-4 mr-2" />
                    Thay đổi ảnh đại diện
                  </Button>
                  <p className="text-sm text-muted-foreground">JPG, GIF hoặc PNG. Tối đa 1MB.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{roleName === "BRAND" ? "Tên thương hiệu *" : "Họ và tên *"}</FormLabel>
                    <FormControl>
                      <Input placeholder={roleName === "BRAND" ? "Nhập tên thương hiệu" : "Nhập họ và tên"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Nhập email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {roleName === "INFLUENCER" && (
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="doB"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ngày sinh</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giới tính *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn giới tính" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Nam</SelectItem>
                            <SelectItem value="female">Nữ</SelectItem>
                            <SelectItem value="other">Khác</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giới thiệu bản thân</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Viết giới thiệu về bản thân..." rows={3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-0.5">
                      <FormLabel>Hồ sơ công khai</FormLabel>
                      <p className="text-sm text-muted-foreground">Cho phép mọi người xem hồ sơ của bạn</p>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {roleName === "INFLUENCER" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Thống kê</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {formatFollowerCount(form.watch("follower") || 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">Followers</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="flex items-center justify-center text-2xl font-bold text-yellow-600">
                        <Star className="h-6 w-6 mr-1 fill-current" />
                        4.8
                      </div>
                      <div className="text-sm text-muted-foreground">Đánh giá</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">24</div>
                      <div className="text-sm text-muted-foreground">Chiến dịch hoàn thành</div>
                    </div>
                  </div>

                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lĩnh vực chuyên môn</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-muted-foreground">Chọn tối đa 3 lĩnh vực chuyên môn của bạn</p>
                    <div className="flex flex-wrap gap-2">
                      {availableCategories.map((category) => (
                        <Badge
                          key={category.categoryId}
                          variant={form.watch("categoryIds")?.includes(category.categoryId) ? "default" : "outline"}
                          className={cn(
                            "flex justify-center items-center gap-1 h-6 rounded-md text-xs font-medium cursor-pointer capitalize",
                          )}
                          onClick={() => handleSelectCategory(category.categoryId)}
                        >
                          {category.categoryName}
                          {form.watch("categoryIds")?.includes(category.categoryId) && <X className="h-3 w-3" />}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">Đã chọn: {form.watch("categoryIds")?.length || 0}/3</p>
                  </div>
                  <FormMessage />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Liên kết mạng xã hội</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {form.watch("socialMediaLinks")?.map((social, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium capitalize">{social.platform}</div>
                          <div className="text-sm text-muted-foreground">{social.url}</div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSocialMedia(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Select
                        value={newSocialMedia.platform}
                        onValueChange={(value) => setNewSocialMedia({ ...newSocialMedia, platform: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="tiktok">TikTok</SelectItem>
                          <SelectItem value="youtube">YouTube</SelectItem>
                          <SelectItem value="facebook">Facebook</SelectItem>
                          <SelectItem value="twitter">Twitter</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="URL"
                        value={newSocialMedia.url}
                        onChange={(e) => setNewSocialMedia({ ...newSocialMedia, url: e.target.value })}
                      />
                    </div>
                    <Button type="button" onClick={addSocialMedia} size="sm" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm liên kết
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {roleName === "BRAND" && (
            <>
              {/* Company Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin công ty</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="establishDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ngày thành lập</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Lĩnh vực kinh doanh</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-muted-foreground">Chọn tối đa 3 lĩnh vực kinh doanh của công ty</p>
                    <div className="flex flex-wrap gap-2">
                      {availableCategories.map((category) => (
                        <Badge
                          key={category.categoryId}
                          variant={form.watch("categoryIds")?.includes(category.categoryId) ? "default" : "outline"}
                          className={cn(
                            "flex justify-center items-center gap-1 h-6 rounded-md text-xs font-medium cursor-pointer capitalize",
                          )}
                          onClick={() => handleSelectCategory(category.categoryId)}
                        >
                          {category.categoryName}
                          {form.watch("categoryIds")?.includes(category.categoryId) && <X className="h-3 w-3" />}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">Đã chọn: {form.watch("categoryIds")?.length || 0}/3</p>
                  </div>
                  <FormMessage />
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin liên hệ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {form.watch("contacts")?.map((contact, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium capitalize">{contact.type}</div>
                          <div className="text-sm text-muted-foreground">{contact.value}</div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeContact(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Select
                        value={newContact.type}
                        onValueChange={(value) => setNewContact({ ...newContact, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Loại liên hệ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="phone">Số điện thoại</SelectItem>
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="address">Địa chỉ</SelectItem>
                          <SelectItem value="fax">Fax</SelectItem>
                          <SelectItem value="hotline">Hotline</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Thông tin liên hệ"
                        value={newContact.value}
                        onChange={(e) => setNewContact({ ...newContact, value: e.target.value })}
                      />
                    </div>
                    <Button type="button" onClick={addContact} size="sm" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm thông tin liên hệ
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Liên kết mạng xã hội</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {form.watch("socialMediaLinks")?.map((social, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium capitalize">{social.platform}</div>
                          <div className="text-sm text-muted-foreground">{social.url}</div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSocialMedia(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Select
                        value={newSocialMedia.platform}
                        onValueChange={(value) => setNewSocialMedia({ ...newSocialMedia, platform: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="facebook">Facebook</SelectItem>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="twitter">Twitter</SelectItem>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                          <SelectItem value="youtube">YouTube</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="URL"
                        value={newSocialMedia.url}
                        onChange={(e) => setNewSocialMedia({ ...newSocialMedia, url: e.target.value })}
                      />
                    </div>
                    <Button type="button" onClick={addSocialMedia} size="sm" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm liên kết
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
