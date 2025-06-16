import { useDispatch, useSelector } from 'react-redux';

import { TabFilter } from '@/components/ui/tabs';

import { setStatusFilter } from '../my-campaign.slice';

const filters = [
  { value: 'upcoming', label: 'Chưa bắt đầu' },
  { value: 'ongoing', label: 'Đang diễn ra' },
  { value: 'ended', label: 'Đã kết thúc' },
];

export function CampaignFilter() {
  const dispatch = useDispatch();
  const selected = useSelector((state: any) => state.myCampaign.statusFilter);

  return (
    <TabFilter
      options={filters}
      selected={selected}
      onChange={(value: any) => dispatch(setStatusFilter(value))}
    />
  );
}
