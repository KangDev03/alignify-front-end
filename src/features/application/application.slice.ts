import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { ApplicationByInfluencer, ApplicationResponse } from './application.type';
import type { Campaign } from '../common/common.type';

interface ApplicationCampaignGroup {
  campaignResponse: Campaign;
  applications: ApplicationByInfluencer[];
}
interface ApplicationBrandState {
  campaignGroups: ApplicationCampaignGroup[] | null;
}
const initialState: ApplicationBrandState = {
  campaignGroups: null,
};

interface ApplicationStatusState {
  applicationId: string | null;
  campaignId: string | null;
  status: string;
}

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setApplication: (state, action: PayloadAction<ApplicationResponse>) => {
      state.campaignGroups = action.payload.data;
    },
    setStatusApplication: (state, action: PayloadAction<ApplicationStatusState>) => {
      const groups = state.campaignGroups;
      if (!groups) return;

      for (const group of groups) {
        const index = group.applications.findIndex(
          (app) =>
            app.applicationId === action.payload.applicationId &&
            app.campaignId === action.payload.campaignId,
        );
        if (index !== -1) {
          group.applications[index].status = action.payload.status;
          break;
        }
      }
    },
  },
});
export const { setApplication, setStatusApplication } = applicationSlice.actions;
export default applicationSlice.reducer;
