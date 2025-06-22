import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { ContentPosting, ContentPostingResponse } from './home.type';

interface ContentPostingState {
  contentPosting: ContentPosting[] | null;
}
const initialState: ContentPostingState = {
  contentPosting: null,
};

export const contentPostingSlice = createSlice({
  name: 'contentPosting',
  initialState,
  reducers: {
    setContentPosting: (state, action: PayloadAction<ContentPostingResponse>) => {
      state.contentPosting = action.payload.data;
    },
  },
});

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
export default refetchSlice.reducer;
