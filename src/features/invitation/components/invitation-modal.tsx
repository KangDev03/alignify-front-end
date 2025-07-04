"use client"

import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import * as z from "zod"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Textarea } from "@/components/ui/textarea"

import { Icons } from "@/components/icons/icons"
import { useAppSelector } from "@/hooks/redux"
import type { RootState } from "@/redux/store"
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
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([])
  const { influencerProfile } = useAppSelector((state: RootState) => state.home);

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
            <Icons.send className="h-4 w-4 mr-2" />
            Mời Influencer
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-7xl min-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Mời Influencer tham gia chiến dịch</DialogTitle>
          <DialogDescription>Chọn influencer phù hợp và gửi lời mời tham gia chiến dịch của bạn.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Influencer Selection */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Chọn Influencer</h3>

                  {/* Search and Filter */}
                  <div className="flex gap-2 mb-4">
                    <div className="flex-1 relative">
                      <Icons.search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Tìm kiếm influencer..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectItem value="làm đẹp">Làm đẹp</SelectItem>
                        <SelectItem value="công nghệ">Công nghệ</SelectItem>
                        <SelectItem value="thời trang">Thời trang</SelectItem>
                        <SelectItem value="ẩm thực">Ẩm thực</SelectItem>
                        <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Selected count */}
                  <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-blue-700">
                      Đã chọn <span className="font-semibold">{selectedInfluencers.length}</span> influencer
                    </p>
                    {selectedInfluencers.length > 0 && (
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="text-blue-600 hover:underline hover:text-blue-700 px-2 h-6"
                        onClick={() => {
                          setSelectedInfluencers([])
                          form.setValue("influencerIds", [])
                        }}
                      >
                        Đặt lại lựa chọn
                      </Button>
                    )}
                  </div>


                  {/* Influencer List */}
                  <div className="max-h-96 overflow-y-auto space-y-3 no-scrollbar">
                    {influencerProfile.length > 0 ? (
                      influencerProfile.map((influencer) => {
                        const isChecked = selectedInfluencers.includes(influencer.id)
                        return (
                          <Card
                            key={influencer.id}
                            className="border-2 border-primary/20 bg-card shadow-lg hover:shadow-xl transition-all"
                          >
                            <CardContent className="flex items-center justify-between gap-4 py-4">
                              {/* Checkbox */}
                              <Checkbox
                                checked={isChecked}
                                onCheckedChange={(checked) =>
                                  handleInfluencerSelect(influencer.id, !!checked)
                                }
                              />

                              {/* Avatar & Info */}
                              <div className="flex items-center space-x-4 flex-1">
                                <Avatar className="h-14 w-14">
                                  <AvatarImage
                                    src={influencer.avatarUrl || '/placeholder.svg'}
                                    alt={influencer.name}
                                    className="object-cover"
                                  />
                                  <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <h3 className="font-semibold">{influencer.name}</h3>
                                  {influencer?.category && (
                                    <p className="text-sm text-muted-foreground capitalize">
                                      {influencer.category
                                        .map((cat: any) => cat.categoryName)
                                        .join(', ')}
                                    </p>
                                  )}
                                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                                    <div className="flex items-center space-x-1">
                                      <Icons.users className="h-4 w-4" />
                                      <span>{influencer.follower} followers</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Icons.star className="h-4 w-4" />
                                      <span>{influencer.rating}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* View Profile */}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(`/influencer/${influencer.id}`)}
                              >
                                Xem hồ sơ
                              </Button>
                            </CardContent>
                          </Card>
                        )
                      })
                    ) : (
                      <Alert variant="default">
                        <Icons.circleAlert className="h-4 w-4 mr-2" />
                        <AlertTitle>Không có influencer nào</AlertTitle>
                        <AlertDescription>Hãy kiểm tra lại dữ liệu.</AlertDescription>
                      </Alert>
                    )}
                  </div>

                </div>
              </div>

              {/* Right Column - Campaign & Invitation Details */}
              <div className="flex flex-col gap-auto">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-3">Chi tiết lời mời</h3>

                  {/* Campaign Selection */}
                  <FormField
                    control={form.control}
                    name="campaignId"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Chọn chiến dịch *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Chọn chiến dịch để mời" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {campaigns.map((campaign) => (
                              <SelectItem key={campaign.id} value={campaign.id}>
                                <div className="flex flex-col">
                                  <span className="font-medium">{campaign.title}</span>
                                  {/* <span className="text-sm text-gray-500">
                                    {campaign.budget} • {campaign.category} • Deadline: {campaign.deadline}
                                  </span> */}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Budget and Deadline */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
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

                  {/* Message */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="mb-4">
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
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                    Hủy
                  </Button>
                  <Button type="submit" >
                    <Icons.send className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Đang gửi..." : `Gửi lời mời (${selectedInfluencers.length})`}
                  </Button>
                </div>

              </div>
            </div>

          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
