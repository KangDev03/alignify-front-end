"use client"

import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { MapPin, Search, Send, Star, Users, X } from "lucide-react"
import { toast } from "sonner"
import * as z from "zod"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

import { zodResolver } from "@hookform/resolvers/zod"

interface Campaign {
  id: string
  title: string
  budget: string
  category: string
  deadline: string
}

interface Influencer {
  id: string
  name: string
  avatar: string
  followers: number
  rating: number
  categories: string[]
  location: string
  bio: string
  engagementRate: number
  isSelected?: boolean
}

// Invitation form schema
const invitationSchema = z.object({
  campaignId: z.string().min(1, "Vui lòng chọn chiến dịch"),
  influencerIds: z.array(z.string()).min(1, "Vui lòng chọn ít nhất 1 influencer"),
  message: z.string().min(10, "Tin nhắn phải có ít nhất 10 ký tự"),
  budget: z.number().min(1000, "Ngân sách phải lớn hơn 1,000 VND"),
  deadline: z.string().min(1, "Vui lòng chọn deadline"),
})

type InvitationFormValues = z.infer<typeof invitationSchema>

interface InvitationModalProps {
  campaigns: Campaign[]
  trigger?: React.ReactNode
}

export default function InvitationModal({ campaigns, trigger }: InvitationModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([])

  // Mock influencers data
  const [influencers] = useState<Influencer[]>([
    {
      id: "1",
      name: "Nguyễn Minh Anh",
      avatar: "/placeholder.svg?height=40&width=40",
      followers: 50000,
      rating: 4.8,
      categories: ["Làm đẹp", "Lifestyle"],
      location: "TP.HCM",
      bio: "Beauty blogger với 3 năm kinh nghiệm",
      engagementRate: 5.2,
    },
    {
      id: "2",
      name: "Trần Văn Tech",
      avatar: "/placeholder.svg?height=40&width=40",
      followers: 120000,
      rating: 4.9,
      categories: ["Công nghệ", "Review"],
      location: "Hà Nội",
      bio: "Tech reviewer chuyên nghiệp",
      engagementRate: 4.8,
    },
    {
      id: "3",
      name: "Lê Thị Fashion",
      avatar: "/placeholder.svg?height=40&width=40",
      followers: 85000,
      rating: 4.7,
      categories: ["Thời trang", "Lifestyle"],
      location: "Đà Nẵng",
      bio: "Fashion influencer yêu thích phong cách tối giản",
      engagementRate: 6.1,
    },
    {
      id: "4",
      name: "Phạm Food Lover",
      avatar: "/placeholder.svg?height=40&width=40",
      followers: 75000,
      rating: 4.6,
      categories: ["Ẩm thực", "Du lịch"],
      location: "TP.HCM",
      bio: "Food blogger khám phá ẩm thực Việt Nam",
      engagementRate: 5.8,
    },
  ])

  const form = useForm<InvitationFormValues>({
    resolver: zodResolver(invitationSchema),
    defaultValues: {
      campaignId: "",
      influencerIds: [],
      message: "",
      budget: 0,
      deadline: "",
    },
  })

  // Filter influencers based on search and category
  const filteredInfluencers = influencers.filter((influencer) => {
    const matchesSearch =
      influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.bio.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" ||
      influencer.categories.some((cat) => cat.toLowerCase().includes(selectedCategory.toLowerCase()))
    return matchesSearch && matchesCategory
  })

  // Handle influencer selection
  const handleInfluencerSelect = (influencerId: string, checked: boolean) => {
    let newSelected: string[]
    if (checked) {
      newSelected = [...selectedInfluencers, influencerId]
    } else {
      newSelected = selectedInfluencers.filter((id) => id !== influencerId)
    }
    setSelectedInfluencers(newSelected)
    form.setValue("influencerIds", newSelected)
  }

  // Format follower count
  const formatFollowerCount = (count: number) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M"
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K"
    }
    return count.toString()
  }

  // Handle form submission
  const onSubmit = async (values: InvitationFormValues) => {
    try {
      setIsSubmitting(true)

      // Prepare invitation data
      const invitationData = {
        ...values,
        selectedInfluencers: influencers.filter((inf) => values.influencerIds.includes(inf.id)),
        sentAt: new Date().toISOString(),
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Invitation data:", invitationData)

      toast.success(`Đã gửi lời mời đến ${values.influencerIds.length} influencer!`)

      // Reset form and close modal
      form.reset()
      setSelectedInfluencers([])
      setIsOpen(false)
    } catch (error) {
      console.error("Error sending invitations:", error)
      toast.error("Gửi lời mời thất bại. Vui lòng thử lại!")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Send className="h-4 w-4 mr-2" />
            Mời Influencer
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Mời Influencer tham gia chiến dịch</DialogTitle>
          <DialogDescription>Chọn influencer phù hợp và gửi lời mời tham gia chiến dịch của bạn.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="select" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="select">Chọn Influencer</TabsTrigger>
                <TabsTrigger value="details">Chi tiết lời mời</TabsTrigger>
              </TabsList>

              <TabsContent value="select" className="space-y-4">
                {/* Search and Filter */}
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Tìm kiếm influencer..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả danh mục</SelectItem>
                      <SelectItem value="làm đẹp">Làm đẹp</SelectItem>
                      <SelectItem value="công nghệ">Công nghệ</SelectItem>
                      <SelectItem value="thời trang">Thời trang</SelectItem>
                      <SelectItem value="ẩm thực">Ẩm thực</SelectItem>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Selected count */}
                {selectedInfluencers.length > 0 && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-700">Đã chọn {selectedInfluencers.length} influencer</p>
                  </div>
                )}

                {/* Influencer List */}
                <div className="max-h-96 overflow-y-auto space-y-3 scrollbar-thin">
                  {filteredInfluencers.map((influencer) => (
                    <Card key={influencer.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <Checkbox
                            checked={selectedInfluencers.includes(influencer.id)}
                            onCheckedChange={(checked) => handleInfluencerSelect(influencer.id, checked as boolean)}
                          />

                          <Avatar className="h-12 w-12">
                            <AvatarImage src={influencer.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{influencer.name[0]}</AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">{influencer.name}</h4>
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="text-sm">{influencer.rating}</span>
                              </div>
                            </div>

                            <p className="text-sm text-gray-600 mt-1">{influencer.bio}</p>

                            <div className="flex items-center space-x-4 mt-2">
                              <div className="flex items-center space-x-1">
                                <Users className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">{formatFollowerCount(influencer.followers)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">{influencer.location}</span>
                              </div>
                              <span className="text-sm text-green-600">{influencer.engagementRate}% engagement</span>
                            </div>

                            <div className="flex flex-wrap gap-1 mt-2">
                              {influencer.categories.map((category) => (
                                <Badge key={category} variant="secondary" className="text-xs">
                                  {category}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <FormField
                  control={form.control}
                  name="campaignId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chọn chiến dịch *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn chiến dịch để mời" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {campaigns.map((campaign) => (
                            <SelectItem key={campaign.id} value={campaign.id}>
                              <div className="flex flex-col">
                                <span className="font-medium">{campaign.title}</span>
                                <span className="text-sm text-gray-500">
                                  {campaign.budget} • {campaign.category} • Deadline: {campaign.deadline}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ngân sách đề xuất (VND) *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="5,000,000"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deadline phản hồi *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tin nhắn mời *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Xin chào! Chúng tôi rất mong muốn hợp tác với bạn trong chiến dịch này..."
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Selected Influencers Preview */}
                {selectedInfluencers.length > 0 && (
                  <div className="space-y-2">
                    <FormLabel>Influencer đã chọn ({selectedInfluencers.length})</FormLabel>
                    <div className="max-h-32 overflow-y-auto space-y-2">
                      {influencers
                        .filter((inf) => selectedInfluencers.includes(inf.id))
                        .map((influencer) => (
                          <div key={influencer.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={influencer.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{influencer.name[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{influencer.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleInfluencerSelect(influencer.id, false)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Hủy
              </Button>
              <Button type="submit" disabled={isSubmitting || selectedInfluencers.length === 0}>
                <Send className="h-4 w-4 mr-2" />
                {isSubmitting ? "Đang gửi..." : `Gửi lời mời (${selectedInfluencers.length})`}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
