"use client"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import InvitationList from "@/features/invitation/components/invitation-list"
import InvitationModal from "@/features/invitation/components/invitation-modal"

export default function Invitation() {
  // Mock campaigns data
  const campaigns = [
    {
      id: "1",
      title: "Chiến dịch quảng cáo sản phẩm làm đẹp mùa hè",
      budget: "10,000,000 VND",
      category: "Làm đẹp",
      deadline: "2024-02-15",
    },
    {
      id: "2",
      title: "Review sản phẩm công nghệ mới",
      budget: "15,000,000 VND",
      category: "Công nghệ",
      deadline: "2024-02-20",
    },
    {
      id: "3",
      title: "Quảng cáo thời trang xuân hè",
      budget: "12,000,000 VND",
      category: "Thời trang",
      deadline: "2024-02-25",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý lời mời</h1>
          <p className="mt-2 text-muted-foreground">Mời influencer tham gia chiến dịch và theo dõi trạng thái</p>
        </div>

        <InvitationModal
          campaigns={campaigns}
          trigger={
            <Button>
              <Send className="h-4 w-4" />
              Tạo lời mời
            </Button>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="gap-2 h-fit">
          <CardHeader>
            <CardTitle className="text-sm">Tổng lời mời</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>

        <Card className="gap-2 h-fit">
          <CardHeader>
            <CardTitle className="text-sm">Chờ phản hồi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">8</div>
          </CardContent>
        </Card>

        <Card className="gap-2 h-fit">
          <CardHeader>
            <CardTitle className="text-sm">Tỷ lệ chấp nhận</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">75%</div>
          </CardContent>
        </Card>
      </div>

      <InvitationList />
    </div>
  )
}
