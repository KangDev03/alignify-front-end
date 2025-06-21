export function CampaignOverview({ campaign }: { campaign: any }) {
  return (
    <div className="p-6 border-b">
      <h2 className="text-xl font-semibold mb-2">{campaign.title}</h2>
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">Ngân sách:</span>
          <p className="font-medium">{campaign.budget}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Tổng ứng viên:</span>
          <p className="font-medium">{campaign.applicants}</p>
        </div>
        {/* <div>
          <span className="text-muted-foreground">Đã chọn:</span>
          <p className="font-medium">
            {campaign.selectedInfluencers}/{campaign.maxInfluencers}
          </p>
        </div> */}
        <div>
          <span className="text-muted-foreground">Thời gian:</span>
          <p className="font-medium">
            {new Date(campaign.startDate).toLocaleDateString("vi-VN")} -{" "}
            {new Date(campaign.endDate).toLocaleDateString("vi-VN")}
          </p>
        </div>
      </div>
    </div>
  )
}
