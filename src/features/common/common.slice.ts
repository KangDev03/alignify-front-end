import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { CategoriesResponse, Category, Role, RolesResponse } from './common.type';

interface CommonState {
  role: Role[] | null;
  category: Category[] | null;
}

const initialState: CommonState = {
  role: null,
  category: null,
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
  },
});

export const { setRoles, setCategories } = commomSlice.actions;
export default commomSlice.reducer;
