import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { ContentPosting, ContentPostingResponse } from './../home/home.type';

interface ProfileSlice {
  contents: ContentPosting[] | [];
}

const initialState: ProfileSlice = {
  contents: [],
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
  },
});

export const { setContents, updateContentSlice } = profileSlice.actions;
export default profileSlice.reducer;
