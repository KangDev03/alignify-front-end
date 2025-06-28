import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type {
  BrandProfile,
  BrandProfileResponse,
  ContentPosting,
  ContentPostingResponse,
  InfluencerProfile,
  InfluencerProfileResponse,
} from './home.type';
import type { Campaign } from '../common/common.type';
import type { CampaignResponse } from '../my-campaign/campaign.type';

interface HomeState {
  contentPosting: ContentPosting[] | [];
  campaignPosting: Campaign[] | [];
  influencerProfile: InfluencerProfile[] | [];
  brandProfile: BrandProfile[] | [];
}
const initialState: HomeState = {
  contentPosting: [],
  campaignPosting: [],
  influencerProfile: [],
  brandProfile: [],
};

const homeSlice = createSlice({
  name: 'homeSlice',
  initialState,
  reducers: {
    setContentPosting: (state, action: PayloadAction<ContentPostingResponse>) => {
      if (Array.isArray(action.payload?.data)) {
        state.contentPosting = action.payload.data;
      } else if (action.payload?.data) {
        state.contentPosting = action.payload.data;
      } else {
        state.campaignPosting = [];
      }
    },
    setCampaignPosting: (state, action: PayloadAction<CampaignResponse>) => {
      if (Array.isArray(action.payload?.data)) {
        state.campaignPosting = action.payload.data;
      } else if (action.payload?.data?.campaigns) {
        state.campaignPosting = action.payload.data.campaigns;
      } else {
        state.campaignPosting = [];
      }
    },
    setInfluencerProfile: (state, action: PayloadAction<InfluencerProfileResponse>) => {
      if (Array.isArray(action.payload.data)) {
        state.influencerProfile = action.payload.data;
      } else if (action.payload?.data) {
        state.influencerProfile = action.payload.data;
      } else {
        state.influencerProfile = [];
      }
    },
    setBrandProfile: (state, action: PayloadAction<BrandProfileResponse>) => {
      if (Array.isArray(action.payload.data)) {
        state.brandProfile = action.payload.data;
      } else if (action.payload?.data) {
        state.brandProfile = action.payload.data;
      } else {
        state.brandProfile = [];
      }
    },
    addCampaignPosting: (state, action: PayloadAction<Campaign[]>) => {
      if (action.payload && action.payload.length > 0) {
        state.campaignPosting = [...state.campaignPosting, ...action.payload];
      }
    },
    addContentPosting: (state, action: PayloadAction<ContentPosting[]>) => {
      if (action.payload && action.payload.length > 0) {
        state.contentPosting = [...state.contentPosting, ...action.payload];
      }
    },
    addInfluencerProfile: (state, action: PayloadAction<InfluencerProfile[]>) => {
      if (action.payload && action.payload.length > 0) {
        state.influencerProfile = [...state.influencerProfile, ...action.payload];
      }
    },
    addBrandProfile: (state, action: PayloadAction<BrandProfile[]>) => {
      if (action.payload && action.payload.length > 0) {
        state.brandProfile = [...state.brandProfile, ...action.payload];
      }
    },
    applyForApplciation: (
      state,
      action: PayloadAction<{ campaignId: string; influencerId: string }>,
    ) => {
      const { campaignId, influencerId } = action.payload;
      if (!campaignId || !influencerId) return;
      const campaignIndex = state.campaignPosting.findIndex(
        (campaign) => campaign.campaignId === campaignId,
      );
      if (campaignIndex !== -1) {
        const campaign = state.campaignPosting[campaignIndex];
        if (!campaign.appliedInfluencerIds) {
          state.campaignPosting[campaignIndex].appliedInfluencerIds = [];
        }
        if (
          campaign.appliedInfluencerIds &&
          !campaign.appliedInfluencerIds.includes(influencerId)
        ) {
          campaign.appliedInfluencerIds.push(influencerId);
        }
      }
    },
    toggleLikeContentPosting: (
      state,
      action: PayloadAction<{ contentId: string }>,
    ) => {
      const contentIndex = state.contentPosting.findIndex((content) => content.contentId === action.payload.contentId);
      if (contentIndex !== -1) {
        const content = state.contentPosting[contentIndex];
        const wasLiked = content.isLiked;
        content.isLiked = !wasLiked;
        content.likeCount = content.likeCount + (wasLiked ? -1 : 1);
      }
    },
    setLikedState: (
      state,
      action: PayloadAction<{ contentId: string, isLiked: boolean }>,
    ) => {
      const contentIndex = state.contentPosting.findIndex((content) => content.contentId === action.payload.contentId);
      if (contentIndex !== -1) {
        state.contentPosting[contentIndex].isLiked = action.payload.isLiked;
      }
    },
    setLikeCountState: (
      state,
      action: PayloadAction<{ contentId: string, likeCount: number }>,
    ) => {
      const contentIndex = state.contentPosting.findIndex((content) => content.contentId === action.payload.contentId);
      if (contentIndex !== -1) {
        state.contentPosting[contentIndex].likeCount = action.payload.likeCount;
      }
    },
    resetCampaignPosting: (state) => {
      state.campaignPosting = [];
    },
    resetContentPosting: (state) => {
      state.contentPosting = [];
    },
    resetInfluencerProfile: (state) => {
      state.influencerProfile = [];
    },
    resetBrandProfile: (state) => {
      state.brandProfile = [];
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
  setInfluencerProfile,
  setBrandProfile,
  addCampaignPosting,
  addContentPosting,
  addBrandProfile,
  addInfluencerProfile,
  applyForApplciation,
  toggleLikeContentPosting,
  setLikeCountState,
  setLikedState,
  resetCampaignPosting,
  resetContentPosting,
  resetBrandProfile,
  resetHomeState,
  resetInfluencerProfile,
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
