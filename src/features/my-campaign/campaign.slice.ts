import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { CampaignResponse, CampaignState } from './campaign.type';

const initialState: CampaignState = {
  campaigns: [],
};

export const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    setCampagin: (state, action: PayloadAction<CampaignResponse>) => {
      if (Array.isArray(action.payload?.data)) {
        state.campaigns = action.payload.data;
      } else if (action.payload?.data?.campaigns) {
        state.campaigns = action.payload.data.campaigns;
      } else {
        state.campaigns = [];
      }
    },
    changeCampaignStatus: (
      state,
      action: PayloadAction<{ campaignId: string; status: string }>,
    ) => {
      const { campaignId, status } = action.payload;
      const campaignIndex = state.campaigns.findIndex((c) => c.campaignId === campaignId);
      if (campaignIndex !== -1) {
        state.campaigns[campaignIndex].status = status;
      }
    },
  },
});
export const { setCampagin, changeCampaignStatus } = campaignSlice.actions;
export default campaignSlice.reducer;
