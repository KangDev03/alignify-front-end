import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { ContentPosting, ContentPostingResponse } from './home.type';
import type { Campaign } from '../common/common.type';
import type { CampaignResponse } from '../my-campaign/campaign.type';

interface HomeState {
  contentPosting: ContentPosting[] | [];
  campaignPosting: Campaign[] | [];
}
const initialState: HomeState = {
  contentPosting: [],
  campaignPosting: [],
};

const homeSlice = createSlice({
  name: 'homeSlice',
  initialState,
  reducers: {
    setContentPosting: (state, action: PayloadAction<ContentPostingResponse>) => {
      state.contentPosting = action.payload.data;
    },
    setCampaignPosting: (state, action: PayloadAction<CampaignResponse>) => {
      console.log('searchResult', action.payload);
      state.campaignPosting = action.payload?.data?.campaigns ?? [];
    },
    addCampaignPosting: (state, action: PayloadAction<Campaign[]>) => {
      if (action.payload && action.payload.length > 0) {
        state.campaignPosting = [...state.campaignPosting, ...action.payload];
      }
    },
    resetCampaignPosting: (state) => {
      state.campaignPosting = [];
    },
    resetContentPosting: (state) => {
      state.contentPosting = [];
    },
    resetHomeState: (state) => {
      state.contentPosting = [];
      state.campaignPosting = [];
    },
  },
});

export const {
  setContentPosting,
  setCampaignPosting,
  addCampaignPosting,
  resetHomeState,
  resetCampaignPosting,
  resetContentPosting,
} = homeSlice.actions;
export const homeReducer = homeSlice.reducer;

interface RefetchState {
  campaign: boolean;
  brand: boolean;
  influencer: boolean;
  forum: boolean;
}

const initialRefetchState: RefetchState = {
  campaign: false,
  brand: false,
  influencer: false,
  forum: false,
};

const refetchSlice = createSlice({
  name: 'refetch',
  initialState: initialRefetchState,
  reducers: {
    setRefetch: (state, action: PayloadAction<{ key: keyof RefetchState; value: boolean }>) => {
      state[action.payload.key] = action.payload.value;
    },
    resetRefetch: (state) => {
      Object.keys(state).forEach((key) => {
        state[key as keyof RefetchState] = false;
      });
    },
  },
});

export const { setRefetch, resetRefetch } = refetchSlice.actions;
export const refetchReducer = refetchSlice.reducer;
