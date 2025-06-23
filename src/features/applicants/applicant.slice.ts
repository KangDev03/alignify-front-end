import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { ApplicantsByBrand, ApplicationByBrandResponse } from './applicant.type';

interface ApplicantState {
  applicants: ApplicantsByBrand[] | null;
  selectCapaignId: string | null;
}

const initialState: ApplicantState = {
  applicants: null,
  selectCapaignId: null,
};

export const applicantSlice = createSlice({
  name: 'applicant',
  initialState,
  reducers: {
    setApplicant: (state, action: PayloadAction<ApplicationByBrandResponse>) => {
      if (action.payload?.data) state.applicants = action.payload.data;
    },
    setSelectedCampaign: (state, action: PayloadAction<string>) => {
      const campaignId = action.payload;
      if (state.applicants && campaignId) {
        state.selectCapaignId = campaignId;
      } else {
        state.selectCapaignId = null;
      }
    },
    setConfirmApplicant: (
      state,
      action: PayloadAction<{ applicationId: string; accepted: boolean }>,
    ) => {
      if (state.applicants) {
        const { applicationId, accepted } = action.payload;
        const applicant = state.applicants.find((app) =>
          app.applications.some((a) => a.applicationId === applicationId),
        );
        if (applicant) {
          const application = applicant.applications.find((a) => a.applicationId === applicationId);
          if (application) {
            application.status = accepted ? 'ACCEPTED' : 'REJECTED';
          }
        }
      }
    },
  },
});

export const { setApplicant, setConfirmApplicant, setSelectedCampaign } = applicantSlice.actions;
export default applicantSlice.reducer;
