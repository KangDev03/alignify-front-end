import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export function CampaignList({ campaigns, selectedCampaign, onSelect }: {
  campaigns: any[]
  selectedCampaign: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="w-1/3 h-fit border rounded-lg p-4 bg-card">
      <h2 className="text-xl font-semibold mb-4">Danh sách chiến dịch</h2>
      <div className="space-y-3">
        {campaigns.map((campaign) => (
          <Card
            key={campaign.id}
            className={`cursor-pointer transition-all hover:shadow-md py-6 ${selectedCampaign === campaign.id ? "ring-2 ring-primary" : ""
              }`}
            onClick={() => onSelect(campaign.id)}
          >
            <CardContent className="px-4">
              <div className="space-y-2">
                <h3 className="font-medium text-sm leading-tight">{campaign.title}</h3>
                <p className="text-sm text-muted-foreground">{campaign.brand}</p>
                <div className="flex items-center justify-between">
                  <Badge variant={campaign.status === "Đang tuyển" ? "default" : "secondary"} className="text-xs">
                    {campaign.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{campaign.applicants} ứng viên</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
