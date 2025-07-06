"use client"

import { useState } from "react"
import {
  Check,
  CreditCard,
  Crown,
  Gift,
  Globe,
  Headphones,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  X,
  Zap,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"

type UserRole = "INFLUENCER" | "BRAND" | "ADMIN" | null

interface UpgradePlanProps {
  userRole: UserRole
}

interface PlanFeature {
  name: string
  included: boolean
  limit?: string
}

interface Plan {
  id: string
  name: string
  price: number
  originalPrice?: number
  period: string
  description: string
  badge?: string
  badgeColor?: string
  popular?: boolean
  features: PlanFeature[]
  buttonText: string
  buttonVariant: "default" | "outline" | "secondary"
}

export function UpgradePlan({ userRole }: UpgradePlanProps) {
  const [isAnnual, setIsAnnual] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string>("")
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")

  const currentPlan = userRole === "INFLUENCER" ? "creator" : "starter"

  const influencerPlans: Plan[] = [
    {
      id: "creator",
      name: "Creator",
      price: 0,
      period: "Miễn phí",
      description: "Gói miễn phí cho creator mới",
      badge: "Hiện tại",
      badgeColor: "bg-green-500",
      features: [
        { name: "Ứng tuyển 5 chiến dịch/tháng", included: true, limit: "5/tháng" },
        { name: "Truy cập thống kê cơ bản", included: true },
        { name: "Chat với brands", included: true },
        { name: "Nhận hỗ trợ qua email", included: true },
        { name: "Hỗ trợ ưu tiên", included: false },
      ],
      buttonText: "Gói hiện tại",
      buttonVariant: "secondary",
    },
    {
      id: "pro-creator",
      name: "Pro Creator",
      price: isAnnual ? 1990000 : 199000,
      originalPrice: isAnnual ? 2388000 : 199000,
      period: isAnnual ? "/năm" : "/tháng",
      description: "Gói nâng cao cho influencer chuyên nghiệp",
      badge: "Phổ biến",
      badgeColor: "bg-blue-500",
      popular: true,
      features: [
        { name: "Ứng tuyển không giới hạn", included: true, limit: "Không giới hạn" },
        { name: "Portfolio không giới hạn", included: true, limit: "Không giới hạn" },
        { name: "Chat với brands", included: true },
        { name: "Truy cập thống kê chi tiết", included: true },
        { name: "Hỗ trợ ưu tiên", included: true },
      ],
      buttonText: "Nâng cấp ngay",
      buttonVariant: "default",
    },
    {
      id: "agency",
      name: "Influencer Agency",
      price: isAnnual ? 7990000 : 799000,
      originalPrice: isAnnual ? 9588000 : 799000,
      period: isAnnual ? "/năm" : "/tháng",
      description: "Gói dành cho agency quản lý nhiều influencer",
      badge: "Cao cấp",
      badgeColor: "bg-purple-500",
      features: [
        { name: "Quản lý nhiều tài khoản influencer trong cùng một dashboard", included: true, limit: "Không giới hạn" },
        { name: "Quản lý khách hàng và chiến dịch theo nhóm", included: true },
        { name: "Có nhân viên hỗ trợ riêng", included: true },
        { name: "Tùy chỉnh tích hợp và hỗ trợ nâng cao", included: true },
        { name: "Truy cập dashboard dành riêng cho agency", included: true },
      ],
      buttonText: "Liên hệ tư vấn",
      buttonVariant: "outline",
    },
  ]

  const brandPlans: Plan[] = [
    {
      id: "starter",
      name: "Starter",
      price: 0,
      period: "Miễn phí",
      description: "Bắt đầu với các tính năng cơ bản",
      badge: "Hiện tại",
      badgeColor: "bg-green-500",
      features: [
        { name: "3 chiến dịch/tháng", included: true, limit: "3/tháng" },
        { name: "Tìm kiếm 100 influencers", included: true, limit: "100/tháng" },
        { name: "Kết nối 5 influencers", included: true, limit: "5/tháng" },
        { name: "1 thành viên team", included: true, limit: "1 người" },
      ],
      buttonText: "Gói hiện tại",
      buttonVariant: "secondary",
    },
    {
      id: "professional",
      name: "Professional",
      price: isAnnual ? 4990000 : 499000,
      originalPrice: isAnnual ? 5988000 : 499000,
      period: isAnnual ? "/năm" : "/tháng",
      description: "Cho các thương hiệu đang phát triển",
      badge: "Phổ biến",
      badgeColor: "bg-blue-500",
      popular: true,
      features: [
        { name: "25 chiến dịch/tháng", included: true, limit: "25/tháng" },
        { name: "Tìm kiếm không giới hạn", included: true, limit: "Không giới hạn" },
        { name: "Kết nối 100 influencers", included: true, limit: "100/tháng" },
        { name: "5 thành viên team", included: true, limit: "5 người" },
      ],
      buttonText: "Nâng cấp ngay",
      buttonVariant: "default",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: isAnnual ? 14990000 : 1499000,
      originalPrice: isAnnual ? 17988000 : 1499000,
      period: isAnnual ? "/năm" : "/tháng",
      description: "Giải pháp toàn diện cho doanh nghiệp",
      badge: "Cao cấp",
      badgeColor: "bg-purple-500",
      features: [
        { name: "Không giới hạn chiến dịch", included: true, limit: "Không giới hạn" },
        { name: "Influencer không giới hạn", included: true, limit: "Không giới hạn" },
        { name: "Team không giới hạn", included: true, limit: "Không giới hạn" },
        { name: "Không giới hạn kết nối influencer", included: true, limit: "Không giới hạn" },
      ],
      buttonText: "Liên hệ tư vấn",
      buttonVariant: "outline",
    },
  ]

  const plans = userRole === "INFLUENCER" ? influencerPlans : brandPlans

  const handleUpgrade = (planId: string) => {
    if (planId === currentPlan) return
    setSelectedPlan(planId)
    if (planId === "agency" || planId === "enterprise") {
      // Redirect to contact form
      console.log("Redirecting to contact form...")
    } else {
      setShowPaymentDialog(true)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const selectedPlanData = plans.find((plan) => plan.id === selectedPlan)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Crown className="h-8 w-8 text-amber-500 mr-2" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Nâng cấp tài khoản
          </h1>
        </div>
        <p className="text-xl text-muted-foreground mb-6">
          {userRole === "INFLUENCER"
            ? "Mở khóa tiềm năng của bạn với các tính năng cao cấp"
            : "Tăng cường sức mạnh marketing với các công cụ chuyên nghiệp"}
        </p>

        {/* Annual/Monthly Toggle */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <span className={`text-sm ${isAnnual ? "text-muted-foreground" : "font-semibold"}`}>Hàng tháng</span>
          <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
          <span className={`text-sm ${isAnnual ? "font-semibold" : "text-muted-foreground"}`}>Hàng năm</span>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <Gift className="h-3 w-3 mr-1" />
            Tiết kiệm 17%
          </Badge>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative transition-all duration-300 hover:shadow-lg ${plan.popular ? "ring-2 ring-primary shadow-lg scale-105" : ""
              } ${plan.id === currentPlan ? "border-green-500" : ""}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-4 py-1">
                  <Star className="h-3 w-3 mr-1" />
                  Được đề xuất
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center mb-2">
                <Badge className={`${plan.badgeColor} text-white`}>{plan.badge}</Badge>
              </div>
              <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
              <CardDescription className="text-sm">{plan.description}</CardDescription>
              <div className="mt-4">
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold">{plan.price === 0 ? "Miễn phí" : formatPrice(plan.price)}</span>
                  {plan.price > 0 && <span className="text-muted-foreground ml-1">{plan.period}</span>}
                </div>
                {plan.originalPrice && plan.originalPrice > plan.price && (
                  <div className="text-sm text-muted-foreground line-through">
                    {formatPrice(plan.originalPrice)}
                    {plan.period}
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  {feature.included ? (
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <X className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <span className={feature.included ? "text-foreground" : "text-muted-foreground"}>
                      {feature.name}
                    </span>
                    {feature.limit && <div className="text-xs text-muted-foreground">{feature.limit}</div>}
                  </div>
                </div>
              ))}
            </CardContent>

            <CardFooter>
              <Button
                className="w-full"
                variant={plan.buttonVariant}
                onClick={() => handleUpgrade(plan.id)}
                disabled={plan.id === currentPlan}
              >
                {plan.id === currentPlan && <Check className="h-4 w-4 mr-2" />}
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Features Comparison */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">So sánh tính năng chi tiết</h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Tính năng</th>
                    {plans.map((plan) => (
                      <th key={plan.id} className="text-center p-4 font-semibold min-w-[150px]">
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {plans[0].features.map((_, featureIndex) => (
                    <tr key={featureIndex} className="border-b hover:bg-muted/50">
                      <td className="p-4 font-medium">{plans[0].features[featureIndex].name}</td>
                      {plans.map((plan) => (
                        <td key={plan.id} className="text-center p-4">
                          {plan.features[featureIndex].included ? (
                            <div className="flex flex-col items-center">
                              <Check className="h-5 w-5 text-green-500" />
                              {plan.features[featureIndex].limit && (
                                <span className="text-xs text-muted-foreground mt-1">
                                  {plan.features[featureIndex].limit}
                                </span>
                              )}
                            </div>
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Benefits Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="text-center p-6">
          <Zap className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Tăng hiệu suất</h3>
          <p className="text-sm text-muted-foreground">Công cụ tự động hóa giúp tiết kiệm thời gian</p>
        </Card>
        <Card className="text-center p-6">
          <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Bảo mật cao</h3>
          <p className="text-sm text-muted-foreground">Dữ liệu được bảo vệ với tiêu chuẩn enterprise</p>
        </Card>
        <Card className="text-center p-6">
          <Headphones className="h-12 w-12 text-purple-500 mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Hỗ trợ 24/7</h3>
          <p className="text-sm text-muted-foreground">Đội ngũ hỗ trợ chuyên nghiệp luôn sẵn sàng</p>
        </Card>
        <Card className="text-center p-6">
          <TrendingUp className="h-12 w-12 text-orange-500 mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Tăng trưởng</h3>
          <p className="text-sm text-muted-foreground">Analytics chi tiết giúp tối ưu hiệu quả</p>
        </Card>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Crown className="h-5 w-5 text-amber-500 mr-2" />
              Nâng cấp lên {selectedPlanData?.name}
            </DialogTitle>
            <DialogDescription>Hoàn tất thanh toán để kích hoạt gói {selectedPlanData?.name} của bạn</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Plan Summary */}
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{selectedPlanData?.name}</span>
                  <span className="font-bold">
                    {selectedPlanData?.price ? formatPrice(selectedPlanData.price) : "Miễn phí"}
                    {selectedPlanData?.period && selectedPlanData.price > 0 && selectedPlanData.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{selectedPlanData?.description}</p>
                {isAnnual &&
                  selectedPlanData?.originalPrice &&
                  selectedPlanData.originalPrice > selectedPlanData.price && (
                    <div className="mt-2 text-sm text-green-600">
                      <Gift className="h-4 w-4 inline mr-1" />
                      Tiết kiệm {formatPrice(selectedPlanData.originalPrice - selectedPlanData.price)} khi thanh toán
                      hàng năm
                    </div>
                  )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Phương thức thanh toán</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="card" id="card" />
                  <CreditCard className="h-4 w-4" />
                  <Label htmlFor="card">Thẻ tín dụng/ghi nợ</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="bank" id="bank" />
                  <Globe className="h-4 w-4" />
                  <Label htmlFor="bank">Chuyển khoản ngân hàng</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="momo" id="momo" />
                  <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
                  <Label htmlFor="momo">Ví MoMo</Label>
                </div>
              </RadioGroup>
            </div>

            {paymentMethod === "card" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cardName">Tên trên thẻ</Label>
                    <Input id="cardName" placeholder="Nguyễn Văn A" />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber">Số thẻ</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">MM/YY</Label>
                    <Input id="expiry" placeholder="12/25" />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
              Hủy
            </Button>
            <Button
              onClick={() => {
                console.log("Processing payment...")
                setShowPaymentDialog(false)
              }}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Xác nhận thanh toán
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
