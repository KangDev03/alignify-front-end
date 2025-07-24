import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type {
  CampaignResponse,
  CampaignState,
  CampaignTracking,
  CampaignTrackingByBrand,
  CampaignTrackingResponse,
  CampaignTrackingsResponse,
  PostDetailConfirmSubmitData,
} from './campaign.type';
import type { Campaign } from '../common/common.type';

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
    updateContractSlice: (
      state,
      action: PayloadAction<{ campaignId: string; contractUrl: string }>,
    ) => {
      const { campaignId, contractUrl } = action.payload;
      const campaignIndex = state.campaigns.findIndex((c) => c.campaignId === campaignId);
      if (campaignIndex !== -1) {
        state.campaigns[campaignIndex].contractUrl = contractUrl;
      }
    },
    updateCampaignSlice: (state, action: PayloadAction<Campaign>) => {
      const idx = state.campaigns.findIndex(
        (campaign) => campaign.campaignId === action.payload.campaignId,
      );
      if (idx !== -1 && idx >= 0) {
        state.campaigns[idx] = action.payload;
      }
    },
    deleteCampaignSlice: (state, action: PayloadAction<{ campaignId: string }>) => {
      const { campaignId } = action.payload;
      const campaignIndex = state.campaigns.findIndex((c) => c.campaignId === campaignId);
      if (campaignIndex !== -1) {
        state.campaigns = state.campaigns.filter((campaign) => campaign.campaignId !== campaignId);
      }
    },
    addCampaignSlice: (state, action: PayloadAction<Campaign>) => {
      state.campaigns = [action.payload, ...state.campaigns];
    },
  },
});
export const {
  setCampagin,
  changeCampaignStatus,
  updateCampaignSlice,
  deleteCampaignSlice,
  addCampaignSlice,
  updateContractSlice,
} = campaignSlice.actions;
export default campaignSlice.reducer;

interface CampaignTrackingState {
  campaignTrackings: CampaignTracking[] | [];
}

const intitialCampaignTrackingState: CampaignTrackingState = {
  campaignTrackings: [],
};

export const campaignTrackingSlice = createSlice({
  name: 'campaignTracking',
  initialState: intitialCampaignTrackingState,
  reducers: {
    // setCampaignTrackings: (state, action: PayloadAction<CampaignTrackingsResponse>) => {
    //   if (
    //     state.campaignTrackings.findIndex(
    //       (tracking) => tracking.campaignId === action.payload.data[0].campaignId,
    //     ) === -1
    //   )
    //     state.campaignTrackings = [...action.payload.data, ...state.campaignTrackings];
    // },
    addCampaignTracking: (state, action: PayloadAction<CampaignTrackingResponse>) => {
      if (
        state.campaignTrackings.findIndex(
          (tracking) => tracking.campaignTrackingId === action.payload.data.campaignTrackingId,
        ) === -1
      )
        state.campaignTrackings = [action.payload.data, ...state.campaignTrackings];
    },
    // confirmPostDetailSlice: (state, action: PayloadAction<PostDetailConfirmSubmitData>) => {
    //   const { accepted, campaignId, campaignTrackingId, index, platform, post_type, postUrl } =
    //     action.payload;
    //   const idx = state.campaignTrackings.findIndex(
    //     (tracking) =>
    //       tracking.campaignId === campaignId && tracking.campaignTrackingId === campaignTrackingId,
    //   );
    //   if (idx !== -1 && idx >= 0) {
    //     const platformIdx = state.campaignTrackings[idx].platformRequirementTracking.findIndex(
    //       (platReq) => platReq.platform === platform && platReq.post_type === post_type,
    //     );
    //     if (
    //       platformIdx !== -1 &&
    //       platformIdx >= 0 &&
    //       state.campaignTrackings[idx].platformRequirementTracking[platformIdx].details[index]
    //         .postUrl === postUrl
    //     ) {
    //       state.campaignTrackings[idx].platformRequirementTracking[platformIdx].details[
    //         index
    //       ].status = accepted ? 'ACCEPTED' : 'REJECTED';
    //     }
    //   }
    // },
  },
});

export const { addCampaignTracking } = campaignTrackingSlice.actions;

interface CampaignTrackingBrandState {
  campaignTrackingsBrand: CampaignTrackingByBrand[] | [];
}

const intitialCampaignTrackingBrandState: CampaignTrackingBrandState = {
  campaignTrackingsBrand: [],
};

export const campaignTrackingBrandSlice = createSlice({
  name: 'campaignTrackingBrand',
  initialState: intitialCampaignTrackingBrandState,
  reducers: {
    setCampaignTrackings: (state, action: PayloadAction<CampaignTrackingsResponse>) => {
      if (
        state.campaignTrackingsBrand.findIndex(
          (tracking) =>
            tracking.campaignTracking.campaignId ===
            action.payload.data[0].campaignTracking.campaignId,
        ) === -1
      )
        state.campaignTrackingsBrand = [...action.payload.data, ...state.campaignTrackingsBrand];
    },
    confirmPostDetailSlice: (state, action: PayloadAction<PostDetailConfirmSubmitData>) => {
      const { accepted, campaignId, campaignTrackingId, index, platform, post_type, postUrl } =
        action.payload;
      const idx = state.campaignTrackingsBrand.findIndex(
        (tracking) =>
          tracking.campaignTracking.campaignId === campaignId &&
          tracking.campaignTracking.campaignTrackingId === campaignTrackingId,
      );
      if (idx !== -1 && idx >= 0) {
        const platformIdx = state.campaignTrackingsBrand[
          idx
        ].campaignTracking.platformRequirementTracking.findIndex(
          (platReq) => platReq.platform === platform && platReq.post_type === post_type,
        );
        if (
          platformIdx !== -1 &&
          platformIdx >= 0 &&
          state.campaignTrackingsBrand[idx].campaignTracking.platformRequirementTracking[
            platformIdx
          ].details[index].postUrl === postUrl
        ) {
          state.campaignTrackingsBrand[idx].campaignTracking.platformRequirementTracking[
            platformIdx
          ].details[index].status = accepted ? 'ACCEPTED' : 'REJECTED';
        }
      }
    },
  },
});

export const { confirmPostDetailSlice, setCampaignTrackings } = campaignTrackingBrandSlice.actions;
