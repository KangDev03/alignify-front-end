import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { ContentPosting, ContentPostingResponse } from './../home/home.type';
import type {
  BrandData,
  BrandProfileResponse,
  InfluencerData,
  InfluencerProfileResponse,
} from './profile.type';

interface ProfileSlice {
  contents: ContentPosting[] | [];
  influencerProfile: InfluencerData | null;
  brandProfile: BrandData | null;
}

const initialState: ProfileSlice = {
  contents: [],
  influencerProfile: null,
  brandProfile: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    setContents: (state, action: PayloadAction<ContentPostingResponse>) => {
      if (action.payload.data && action.payload.data.length > 0) {
        state.contents = action.payload.data;
      }
    },
    updateContentSlice: (state, action: PayloadAction<ContentPosting>) => {
      const contentPosting = action.payload;
      const idx = state.contents.findIndex(
        (content) => content.contentId === contentPosting.contentId,
      );
      if (idx !== -1 && idx >= 0) {
        state.contents[idx] = contentPosting;
      }
    },
    setInfluencerProfileSlice: (state, action: PayloadAction<InfluencerProfileResponse>) => {
      if (action.payload.data) {
        state.influencerProfile = action.payload.data;
      }
    },
    setBrandProfileSlice: (state, action: PayloadAction<BrandProfileResponse>) => {
      if (action.payload.data) {
        state.brandProfile = action.payload.data;
      }
    },
  },
});

export const { setContents, updateContentSlice, setBrandProfileSlice, setInfluencerProfileSlice } =
  profileSlice.actions;
export default profileSlice.reducer;
