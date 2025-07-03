"use client"

import { useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Icons } from "@/components/icons/icons"

interface Invitation {
  id: string
  campaignTitle: string
  influencerName: string
  influencerAvatar: string
  status: "pending" | "accepted" | "declined"
  sentAt: string
  respondedAt?: string
  budget: number
  message: string
  deadline: string
}

export default function InvitationList() {
  const [invitations] = useState<Invitation[]>([
    {
      id: "1",
      campaignTitle: "Chiến dịch quảng cáo sản phẩm làm đẹp mùa hè",
      influencerName: "Nguyễn Minh Anh",
      influencerAvatar: "/placeholder.svg?height=40&width=40",
      status: "pending",
      sentAt: "2024-01-15T10:30:00Z",
      budget: 5000000,
      message: "Xin chào! Chúng tôi rất mong muốn hợp tác với bạn...",
      deadline: "2024-01-20",
    },
    {
      id: "2",
      campaignTitle: "Review sản phẩm công nghệ mới",
      influencerName: "Trần Văn Tech",
      influencerAvatar: "/placeholder.svg?height=40&width=40",
      status: "accepted",
      sentAt: "2024-01-14T14:20:00Z",
      respondedAt: "2024-01-15T09:15:00Z",
      budget: 8000000,
      message: "Chúng tôi có sản phẩm công nghệ mới...",
      deadline: "2024-01-18",
    },
    {
      id: "3",
      campaignTitle: "Quảng cáo thời trang xuân hè",
      influencerName: "Lê Thị Fashion",
      influencerAvatar: "/placeholder.svg?height=40&width=40",
      status: "declined",
      sentAt: "2024-01-13T16:45:00Z",
      respondedAt: "2024-01-14T11:30:00Z",
      budget: 6000000,
      message: "Bộ sưu tập thời trang mới của chúng tôi...",
      deadline: "2024-01-17",
    },
  ])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="pending">
            <Icons.clock4 size={12} className="mt-0.5" />
            <p className="leading-6">Chờ phản hồi</p>
          </Badge>
        )
      case "accepted":
        return (
          <Badge variant="accepted">
            <Icons.circleCheckBig size={12} className="mt-0.5" />
            <p className="leading-6">Đã chấp nhận</p>
          </Badge>
        )
      case "declined":
        return (
          <Badge variant="rejected">
            <Icons.circleX size={12} className="mt-0.5" />
            <p className="leading-6">Bị từ chối</p>
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filterInvitations = (status?: string) => {
    if (!status) return invitations
    return invitations.filter((inv) => inv.status === status)
  }

  const InvitationCard = ({ invitation }: { invitation: Invitation }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <Avatar className="h-10 w-10">
              <AvatarImage src={invitation.influencerAvatar || "/placeholder.svg"} />
              <AvatarFallback>{invitation.influencerName[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">{invitation.influencerName}</h4>
                {getStatusBadge(invitation.status)}
              </div>

              <p className="text-sm text-gray-600 mt-1">{invitation.campaignTitle}</p>

              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <span>Ngân sách: {formatCurrency(invitation.budget)}</span>
                <span>Gửi: {formatDate(invitation.sentAt)}</span>
                {invitation.respondedAt && <span>Phản hồi: {formatDate(invitation.respondedAt)}</span>}
              </div>

              <p className="text-xs text-gray-500 mt-1">
                Deadline: {new Date(invitation.deadline).toLocaleDateString("vi-VN")}
              </p>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Tất cả ({invitations.length})</TabsTrigger>
          <TabsTrigger value="pending">Chờ phản hồi ({filterInvitations("pending").length})</TabsTrigger>
          <TabsTrigger value="accepted">Đã chấp nhận ({filterInvitations("accepted").length})</TabsTrigger>
          <TabsTrigger value="declined">Đã từ chối ({filterInvitations("declined").length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {invitations.map((invitation) => (
            <InvitationCard key={invitation.id} invitation={invitation} />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {filterInvitations("pending").map((invitation) => (
            <InvitationCard key={invitation.id} invitation={invitation} />
          ))}
        </TabsContent>

        <TabsContent value="accepted" className="space-y-4">
          {filterInvitations("accepted").map((invitation) => (
            <InvitationCard key={invitation.id} invitation={invitation} />
          ))}
        </TabsContent>

        <TabsContent value="declined" className="space-y-4">
          {filterInvitations("declined").map((invitation) => (
            <InvitationCard key={invitation.id} invitation={invitation} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
