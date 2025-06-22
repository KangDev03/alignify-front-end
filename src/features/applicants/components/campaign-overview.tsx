import type { Campaign } from '@/features/common/common.type';
import { formatDate, parseTimestampToDate } from '@/utils/format';

export function CampaignOverview({ campaign }: { campaign: Campaign }) {
  return (
    <div className="p-6 border-b">
      <h2 className="text-xl font-semibold mb-2 line-clamp-1">{campaign.campaignName}</h2>
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">Ngân sách:</span>
          <p className="font-medium">{campaign.budget}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Tổng ứng viên:</span>
          <p className="font-medium">{campaign.applicationTotal}</p>
        </div>
        {/* <div>
          <span className="text-muted-foreground">Đã chọn:</span>
          <p className="font-medium">
            {campaign.selectedInfluencers}/{campaign.maxInfluencers}
          </p>
        </div> */}
        <div>
          <span className="text-muted-foreground">Thời gian:</span>
          <p className="font-medium flex gap-2">
            <span>{formatDate(parseTimestampToDate(campaign.startAt))}</span>
            <span>-</span>
            <span>{formatDate(parseTimestampToDate(campaign.dueAt))}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
