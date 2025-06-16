import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Icons } from '@/components/icons/icons';

import type { Campaign } from '../my-campaign.type';
import { getCampaignStatus } from '../utils/campaign-status';

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  const status = getCampaignStatus(campaign);

  const statusLabel = {
    upcoming: 'Chưa bắt đầu',
    ongoing: 'Đang diễn ra',
    ended: 'Đã kết thúc',
  }[status];

  return (
    <div className="border rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <Avatar>
          <AvatarImage src={campaign.imageUrl} alt={campaign.name} />
          <AvatarFallback>{campaign.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-semibold text-sm line-clamp-1">{campaign.name}</h4>
          <p className="text-xs text-gray-500">{campaign.brand} • {campaign.createdAt}</p>
        </div>
        <span className="ml-auto px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">{statusLabel}</span>
      </div>
      <p className="text-sm text-gray-600 mb-2">{campaign.description}</p>
      <div className="flex justify-between text-sm text-gray-700 mb-2">
        <div className="flex items-center gap-1"><Icons.DollarSign size={16} /> {campaign.budget.toLocaleString()} VNĐ</div>
        <div className="flex items-center gap-1"><Icons.calendar size={16} /> {campaign.startDate} - {campaign.endDate}</div>
      </div>
      <button type="button" className="text-blue-600 text-sm inline-flex items-center gap-1 hover:underline" onClick={() => console.log('Chi tiết chiến dịch', campaign.id)}>
        <Icons.eye size={16} /> Xem chi tiết
      </button>
    </div>
  );
}