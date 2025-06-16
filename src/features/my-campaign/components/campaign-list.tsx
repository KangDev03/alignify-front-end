import { useSelector } from 'react-redux';

import { CampaignCard } from './campaign-card';
import { getCampaignStatus } from '../utils/campaign-status';

export function CampaignList() {
  const { campaigns, search, statusFilter } = useSelector((state: any) => state.myCampaign);

  const filtered = campaigns.filter((c: any) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = getCampaignStatus(c) === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {filtered.map((c: any) => <CampaignCard key={c.id} campaign={c} />)}
    </div>
  );
}
