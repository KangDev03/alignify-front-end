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
  },
});

export const { setContents } = profileSlice.actions;
export default profileSlice.reducer;
