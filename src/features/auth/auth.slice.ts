import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/redux/store';

import type { LoginResponse } from './auth.type';

interface AuthState {
  role: 'INFLUENCER' | 'BRAND' | 'ADMIN' | null;
  token: string | null;
  id: string | null;
  avatarUrl?: string | null;
  name: string | null;
}

const initialState: AuthState = {
  token: null,
  id: null,
  role: null,
  avatarUrl: null,
  name: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      state.token = action.payload.data.token;
      state.id = action.payload.data.user.userId;
      state.role = action.payload.data.role;
      state.avatarUrl = action.payload.data.user.avatarUrl;
      state.name = action.payload.data.user.name;
    },
    logout: (state) => {
       console.log('logout');
      state.token = null;
      state.id = null;
      state.role = null;
    },
  },
});

export const selectAuthState = (state: RootState) => state.auth;
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
