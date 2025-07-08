"use client"

import { useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Icons } from "@/components/icons/icons"

export function ReportsManagement() {
  const [searchQuery, setSearchQuery] = useState("")

  const reports = [
    {
      id: "1",
      type: "user",
      targetId: "user_123",
      targetName: "Nguyễn Văn Spam",
      targetAvatar: "/placeholder.svg?height=40&width=40",
      reporterName: "Trần Thị A",
      reporterAvatar: "/placeholder.svg?height=40&width=40",
      reason: "Spam và nội dung không phù hợp",
      description: "Người dùng này liên tục đăng nội dung spam và quảng cáo không liên quan",
      status: "pending",
      createdAt: "2024-01-20",
      severity: "high",
      category: "spam",
    },
    {
      id: "2",
      type: "post",
      targetId: "post_456",
      targetName: "Bài viết có nội dung độc hại",
      targetAvatar: "/placeholder.svg?height=40&width=40",
      reporterName: "Lê Văn B",
      reporterAvatar: "/placeholder.svg?height=40&width=40",
      reason: "Nội dung độc hại và xúc phạm",
      description: "Bài viết chứa ngôn từ xúc phạm và kích động bạo lực",
      status: "pending",
      createdAt: "2024-01-19",
      severity: "critical",
      category: "harassment",
    },
    {
      id: "3",
      type: "campaign",
      targetId: "campaign_789",
      targetName: "Chiến dịch lừa đảo",
      targetAvatar: "/placeholder.svg?height=40&width=40",
      reporterName: "Phạm Thị C",
      reporterAvatar: "/placeholder.svg?height=40&width=40",
      reason: "Chiến dịch lừa đảo",
      description: "Chiến dịch này yêu cầu thanh toán trước nhưng không thực hiện cam kết",
      status: "resolved",
      createdAt: "2024-01-18",
      severity: "critical",
      category: "fraud",
      resolution: "Đã xóa chiến dịch và cấm tài khoản brand",
    },
    {
      id: "4",
      type: "user",
      targetId: "user_321",
      targetName: "Fake Influencer",
      targetAvatar: "/placeholder.svg?height=40&width=40",
      reporterName: "Nguyễn Văn D",
      reporterAvatar: "/placeholder.svg?height=40&width=40",
      reason: "Thông tin giả mạo",
      description: "Influencer này sử dụng thông tin và số liệu followers giả",
      status: "dismissed",
      createdAt: "2024-01-17",
      severity: "medium",
      category: "fake_info",
      resolution: "Không đủ bằng chứng để xử lý",
    },
  ]

  const getSeverityBadge = (severity: string) => {
    const base = "pointer-events-none hover:bg-transparent hover:text-inherit"
    switch (severity) {
      case "critical":
        return <Badge className={`bg-red-100 text-red-800 ${base}`}>Nghiêm trọng</Badge>
      case "high":
        return <Badge className={`bg-orange-100 text-orange-800 ${base}`}>Cao</Badge>
      case "medium":
        return <Badge className={`bg-yellow-100 text-yellow-800 ${base}`}>Trung bình</Badge>
      case "low":
        return <Badge className={`bg-blue-100 text-blue-800 ${base}`}>Thấp</Badge>
      default:
        return <Badge variant="secondary">{severity}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "user":
        return <Icons.user className="h-4 w-4" />
      case "post":
        return <Icons.messageSquare className="h-4 w-4" />
      case "campaign":
        return <Icons.megaphone className="h-4 w-4" />
      default:
        return <Icons.flag className="h-4 w-4" />
    }
  }

  const filteredReports = reports.filter(
    (report) =>
      report.targetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reporterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const pendingReports = filteredReports.filter((report) => report.status === "pending")
  const resolvedReports = filteredReports.filter((report) => report.status === "resolved")
  const dismissedReports = filteredReports.filter((report) => report.status === "dismissed")

  const handleResolveReport = (reportId: string) => {
    console.log("Resolving report:", reportId)
    // Logic xử lý báo cáo
  }

  const handleDismissReport = (reportId: string) => {
    console.log("Dismissing report:", reportId)
    // Logic bỏ qua báo cáo
  }


  const renderReportsTable = (reportsList: any[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Loại</TableHead>
          <TableHead>Đối tượng bị báo cáo</TableHead>
          <TableHead>Người báo cáo</TableHead>
          <TableHead>Lý do</TableHead>
          <TableHead>Mức độ</TableHead>
          <TableHead>Ngày báo cáo</TableHead>
          <TableHead className="text-right">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reportsList.map((report) => (
          <TableRow key={report.id}>
            <TableCell>
              <div className="flex items-center space-x-2">
                {getTypeIcon(report.type)}
                <span className="capitalize">{report.type}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={report.targetAvatar || "/placeholder.svg"} alt={report.targetName} />
                  <AvatarFallback>{report.targetName.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{report.targetName}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={report.reporterAvatar || "/placeholder.svg"} alt={report.reporterName} />
                  <AvatarFallback>{report.reporterName.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{report.reporterName}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="max-w-xs">
                <div className="font-medium truncate">{report.reason}</div>
                <div className="text-sm text-muted-foreground truncate">{report.description}</div>
              </div>
            </TableCell>
            <TableCell>{getSeverityBadge(report.severity)}</TableCell>
            <TableCell>{new Date(report.createdAt).toLocaleDateString("vi-VN")}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <Icons.moreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Icons.eye className="mr-2 h-4 w-4" />
                    Xem chi tiết
                  </DropdownMenuItem>
                  {report.status === "pending" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleResolveReport(report.id)}>
                        <Icons.check className="mr-2 h-4 w-4" />
                        Xử lý báo cáo
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDismissReport(report.id)}>
                        <Icons.x className="mr-2 h-4 w-4" />
                        Bỏ qua
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Quản lý báo cáo vi phạm</h2>
          <p className="text-muted-foreground">Xử lý các báo cáo về vi phạm quy định</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng báo cáo</CardTitle>
            <Icons.flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chờ xử lý</CardTitle>
            <Icons.alertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReports.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã xử lý</CardTitle>
            <Icons.check className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolvedReports.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã bỏ qua</CardTitle>
            <Icons.x className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dismissedReports.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Icons.search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm báo cáo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Reports Tabs */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">Chờ xử lý ({pendingReports.length})</TabsTrigger>
          <TabsTrigger value="resolved">Đã xử lý ({resolvedReports.length})</TabsTrigger>
          <TabsTrigger value="dismissed">Đã bỏ qua ({dismissedReports.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Báo cáo chờ xử lý</CardTitle>
              <CardDescription>Các báo cáo cần được xem xét và xử lý</CardDescription>
            </CardHeader>
            <CardContent>{renderReportsTable(pendingReports)}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolved" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Báo cáo đã xử lý</CardTitle>
              <CardDescription>Các báo cáo đã được xử lý thành công</CardDescription>
            </CardHeader>
            <CardContent>{renderReportsTable(resolvedReports)}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dismissed" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Báo cáo đã bỏ qua</CardTitle>
              <CardDescription>Các báo cáo đã được xem xét và bỏ qua</CardDescription>
            </CardHeader>
            <CardContent>{renderReportsTable(dismissedReports)}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
