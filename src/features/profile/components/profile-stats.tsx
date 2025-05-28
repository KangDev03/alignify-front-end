import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Icons } from "@/components/icons/icons"

import { formatNumber } from "../utils/format-number"

interface ProfileStatsProps {
  totalFollowers: number
  followers: {
    instagram: number
    facebook: number
    youtube: number
  }
}

export function ProfileStats({ totalFollowers, followers }: ProfileStatsProps) {
  const socialPlatforms = [
    { name: "Instagram", icon: Icons.instagram, color: "text-pink-500", followers: followers.instagram },
    { name: "YouTube", icon: Icons.youtube, color: "text-red-500", followers: followers.youtube },
    { name: "Facebook", icon: Icons.facebook, color: "text-blue-500", followers: followers.facebook },
  ]

  return (
    <Card className="border-2 border-primary/20 bg-card shadow-lg">
      <CardHeader>
        <CardTitle>Thống kê người theo dõi</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <div className="text-2xl font-bold">{formatNumber(totalFollowers)}</div>
          <div className="text-sm text-muted-foreground">Tổng số người theo dõi</div>
        </div>
        <div className="space-y-4">
          {socialPlatforms.map((platform) => {
            const Icon = platform.icon
            return (
              <div key={platform.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className={`h-5 w-5 ${platform.color}`} />
                  <span className="font-medium">{platform.name}</span>
                </div>
                <span className="text-sm">{formatNumber(platform.followers)}</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}