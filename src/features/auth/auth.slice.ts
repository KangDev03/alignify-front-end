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
  sound: boolean;
  publicAcc: boolean | null;
  active: boolean;
  planId: string | null;
}

const initialState: AuthState = {
  token: null,
  id: null,
  role: null,
  avatarUrl: null,
  name: null,
  twoFA: null,
  sound: true,
  publicAcc: null,
  active: true,
  planId: null,
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
      state.twoFA = action.payload.data?.user.twoFA ?? false;
      state.sound = action.payload.data?.user.sound ?? true;
      state.publicAcc =
        action.payload.data?.user.publicAcc === undefined ||
        action.payload.data?.user.publicAcc === null
          ? null
          : action.payload.data?.user.publicAcc;
      state.active = action.payload.data!.user.active!;
    },
    logout: (state) => {
      state.token = null;
      state.id = null;
      state.role = null;
      state.avatarUrl = null;
      state.name = null;
      state.twoFA = null;
      state.sound = true;
      state.publicAcc = null;
      state.active = true;
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
    changeSoundMode: (state, action: PayloadAction<{ turn: boolean }>) => {
      state.sound = action.payload.turn;
    },
    changePublicAcc: (state, action: PayloadAction<{ turn: boolean }>) => {
      state.publicAcc = action.payload.turn;
    },
    changeActiveAcc: (state, action: PayloadAction<{ turn: boolean }>) => {
      state.active = action.payload.turn;
    },
    setPlan: (state, action: PayloadAction<{ planId: string }>) => {
      state.planId = action.payload.planId;
    },
  },
});

export const {
  setCredentials,
  logout,
  changeUserAvtar,
  changeName,
  changeTwoFA,
  changeSoundMode,
  changePublicAcc,
  changeActiveAcc,
  setPlan,
} = authSlice.actions;
export default authSlice.reducer;
