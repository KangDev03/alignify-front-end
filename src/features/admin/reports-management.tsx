"use client"

import { useState } from "react"
import {
  AlertTriangle,
  Check,
  Eye,
  Flag,
  Megaphone,
  MessageSquare,
  MoreHorizontal,
  Search,
  User,
  X,
} from "lucide-react"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ReportsManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedReport, setSelectedReport] = useState<any>(null)

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Chờ xử lý</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Đã xử lý</Badge>
      case "dismissed":
        return <Badge className="bg-gray-100 text-gray-800">Đã bỏ qua</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-red-100 text-red-800">Nghiêm trọng</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800">Cao</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Trung bình</Badge>
      case "low":
        return <Badge className="bg-blue-100 text-blue-800">Thấp</Badge>
      default:
        return <Badge variant="secondary">{severity}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "user":
        return <User className="h-4 w-4" />
      case "post":
        return <MessageSquare className="h-4 w-4" />
      case "campaign":
        return <Megaphone className="h-4 w-4" />
      default:
        return <Flag className="h-4 w-4" />
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

  const handleViewReport = (report: any) => {
    setSelectedReport(report)
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
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => handleViewReport(report)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Xem chi tiết
                  </DropdownMenuItem>
                  {report.status === "pending" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleResolveReport(report.id)}>
                        <Check className="mr-2 h-4 w-4" />
                        Xử lý báo cáo
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDismissReport(report.id)}>
                        <X className="mr-2 h-4 w-4" />
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
            <Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chờ xử lý</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReports.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã xử lý</CardTitle>
            <Check className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolvedReports.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã bỏ qua</CardTitle>
            <X className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dismissedReports.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
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

      {/* Report Detail Dialog */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Chi tiết báo cáo vi phạm</DialogTitle>
            <DialogDescription>Thông tin đầy đủ về báo cáo</DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Đối tượng bị báo cáo</h4>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={selectedReport.targetAvatar || "/placeholder.svg"}
                        alt={selectedReport.targetName}
                      />
                      <AvatarFallback>{selectedReport.targetName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedReport.targetName}</p>
                      <p className="text-sm text-muted-foreground">ID: {selectedReport.targetId}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        {getTypeIcon(selectedReport.type)}
                        <span className="text-sm capitalize">{selectedReport.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Người báo cáo</h4>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={selectedReport.reporterAvatar || "/placeholder.svg"}
                        alt={selectedReport.reporterName}
                      />
                      <AvatarFallback>{selectedReport.reporterName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedReport.reporterName}</p>
                      <p className="text-sm text-muted-foreground">
                        Báo cáo vào {new Date(selectedReport.createdAt).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Trạng thái</h4>
                  {getStatusBadge(selectedReport.status)}
                </div>
                <div>
                  <h4 className="font-medium mb-2">Mức độ nghiêm trọng</h4>
                  {getSeverityBadge(selectedReport.severity)}
                </div>
                <div>
                  <h4 className="font-medium mb-2">Danh mục</h4>
                  <Badge variant="outline">{selectedReport.category}</Badge>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Lý do báo cáo</h4>
                <p className="text-sm font-medium">{selectedReport.reason}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Mô tả chi tiết</h4>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm">{selectedReport.description}</p>
                </div>
              </div>

              {selectedReport.resolution && (
                <div>
                  <h4 className="font-medium mb-2">Kết quả xử lý</h4>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800">{selectedReport.resolution}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedReport(null)}>
                  Đóng
                </Button>
                {selectedReport.status === "pending" && (
                  <>
                    <Button variant="secondary" onClick={() => handleDismissReport(selectedReport.id)}>
                      <X className="mr-2 h-4 w-4" />
                      Bỏ qua
                    </Button>
                    <Button onClick={() => handleResolveReport(selectedReport.id)}>
                      <Check className="mr-2 h-4 w-4" />
                      Xử lý báo cáo
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
