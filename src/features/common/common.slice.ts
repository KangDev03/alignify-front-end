import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Campaign,CategoriesResponse, Category, Role, RolesResponse, SearchCampaignsResponse } from './common.type';

interface CommonState {
  role: Role[] | null;
  category: Category[] | null;
  campaigns: Campaign[] | null;
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

const initialState: CommonState = {
  role: null,
  category: null,
  campaigns: null,
  currentPage: 0,
  totalPages: 0,
  totalItems: 0,
};

export const commomSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setRoles: (state, action: PayloadAction<RolesResponse | undefined>) => {
      if (action.payload?.data) state.role = action.payload.data;
    },
    setCategories: (state, action: PayloadAction<CategoriesResponse | undefined>) => {
      if (action.payload?.data) state.category = action.payload.data;
    },
    setCampaigns: (state, action: PayloadAction<SearchCampaignsResponse | undefined>) => {
      if (action.payload) {
        state.campaigns = action.payload.campaigns ?? null;
        state.currentPage = action.payload.currentPage ?? 0;
        state.totalPages = action.payload.totalPages ?? 0;
        state.totalItems = action.payload.totalItems ?? 0;
      } else {
        state.campaigns = null;
        state.currentPage = 0;
        state.totalPages = 0;
        state.totalItems = 0;
      }
    },
  },
});

export const { setRoles, setCategories, setCampaigns } = commomSlice.actions;
export default commomSlice.reducer;
