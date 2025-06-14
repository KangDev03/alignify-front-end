import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { LoginResponse } from './auth.type';

interface AuthState {
  token: string | null;
  id: string | null;
  role: 'INFLUENCER' | 'BRAND' | 'ADMIN' | null;
}

const initialState: AuthState = {
  token: null,
  id: null,
  role: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      state.token = action.payload.data.token;
      state.id = action.payload.data.id;
      state.role = action.payload.data.role;
    },
    logout: (state) => {
      state.token = null;
      state.id = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
