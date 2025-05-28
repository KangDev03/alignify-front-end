import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Icons } from "@/components/icons/icons"

interface ProfilePerformanceProps {
  engagementRate: number
  rating: number
  completedCampaigns: number
}

export function ProfilePerformance({ 
  engagementRate, 
  rating, 
  completedCampaigns 
}: ProfilePerformanceProps) {
  const metrics = [
    {
      icon: Icons.trendingUp,
      label: "Tỷ lệ tương tác",
      value: `${engagementRate.toFixed(1)}%`,
      color: "text-blue-500"
    },
    {
      icon: Icons.star,
      label: "Đánh giá",
      value: rating.toFixed(1),
      color: "text-yellow-500"
    },
    {
      icon: Icons.checkCircle,
      label: "Chiến dịch đã hoàn thành",
      value: completedCampaigns,
      color: "text-green-500"
    }
  ]

  return (
    <Card className="border-2 border-primary/20 bg-card shadow-lg">
      <CardHeader>
        <CardTitle>Hiệu suất</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {metrics.map((metric) => {
            const Icon = metric.icon
            return (
              <div key={metric.label} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className={`h-5 w-5 ${metric.color}`} />
                  <span className="text-sm font-medium">{metric.label}</span>
                </div>
                <span className="font-bold">{metric.value}</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}