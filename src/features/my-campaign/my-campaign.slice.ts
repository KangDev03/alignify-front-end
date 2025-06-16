import { createSlice } from '@reduxjs/toolkit';

import { campaigns } from './data';
import type { Campaign } from './my-campaign.type';

interface MyCampaignState {
  campaigns: Campaign[];
  search: string;
  statusFilter: string;
}

const initialState: MyCampaignState = {
  campaigns,
  search: '',
  statusFilter: 'upcoming',
};

const myCampaignSlice = createSlice({
  name: 'myCampaign',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setStatusFilter(state, action) {
      state.statusFilter = action.payload;
    },
  },
});

export const { setSearch, setStatusFilter } = myCampaignSlice.actions;
export default myCampaignSlice.reducer;