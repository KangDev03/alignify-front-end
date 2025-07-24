import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { LoginResponse } from './auth.type';
import type { RoleName } from '../common/common.type';

interface AuthState {
  role: RoleName | null;
  token: string | null;
  id: string | null;
  avatarUrl?: string | null;
  name: string | null;
  twoFA: boolean | null;
}

const initialState: AuthState = {
  token: null,
  id: null,
  role: null,
  avatarUrl: null,
  name: null,
  twoFA: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      state.token = action.payload.data!.token;
      state.id = action.payload.data!.user!.userId;
      state.role = action.payload.data!.role;
      state.avatarUrl = action.payload.data!.user.avatarUrl;
      state.name = action.payload.data!.user.name;
      state.twoFA = action.payload.data!.user.twoFA!;
    },
    logout: (state) => {
      state.token = null;
      state.id = null;
      state.role = null;
      state.avatarUrl = null;
      state.name = null;
      state.twoFA = null;
    },
    changeUserAvtar: (state, action: PayloadAction<{ url: string }>) => {
      state.avatarUrl = action.payload.url;
    },
    changeName: (state, action: PayloadAction<{ name: string }>) => {
      state.name = action.payload.name;
    },
    changeTwoFA: (state, action: PayloadAction<{ turn: boolean }>) => {
      state.twoFA = action.payload.turn;
    },
  },
});

export const { setCredentials, logout, changeUserAvtar, changeName, changeTwoFA } =
  authSlice.actions;
export default authSlice.reducer;
