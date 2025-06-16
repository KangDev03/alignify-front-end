import { useDispatch, useSelector } from 'react-redux';

import { Input } from '@/components/ui/input';

import { Icons } from '@/components/icons/icons';

import { setSearch } from '../my-campaign.slice';

export function CampaignSearch() {
  const dispatch = useDispatch();
  const search = useSelector((state: any) => state.myCampaign.search);

  return (
    <div className="relative w-full sm:w-80">
      <Icons.search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Tìm kiếm..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        className="pl-10"
      />
    </div>
  );
}