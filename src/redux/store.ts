import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { usersSlice } from '@/features/admin/admin.slice';
import applicantReducer from '@/features/applicants/applicant.slice';
import authReducer from '@/features/auth/auth.slice';
import { chatSheetSlice } from '@/features/chatting/chat-sheet.slice';
import commonReducer from '@/features/common/common.slice';
import { homeReducer, refetchReducer } from '@/features/home/home.slice';
import { invitationSlice } from '@/features/invitation/invitation.slice';
import {
  campaignSlice,
  campaignTrackingBrandSlice,
  campaignTrackingSlice,
} from '@/features/my-campaign/campaign.slice';
import { notificationSlice } from '@/features/notification/notification.slice';
import { profileSlice } from '@/features/profile/profile.slice';

import { baseApi } from './baseApi';

const persistAuthConfig = {
  key: 'auth',
  storage,
  whitelist: ['id', 'token', 'role', 'avatarUrl', 'name', 'twoFA'],
};

const persistProfileConfig = {
  key: 'profile',
  storage,
  whitelist: ['contents', 'influencerProfile', 'brandProfile'],
  transforms: [
    {
      in: (state: any, key: string) => {
        if (key === 'profile') {
          const authState = store.getState().auth;
          const role = authState.role;

          return {
            ...state,
            influencerProfile: role === 'INFLUENCER' ? state.influencerProfile : undefined,
            brandProfile: role === 'BRAND' ? state.brandProfile : undefined,
            contents: role === 'INFLUENCER' ? state.contents : [],
          };
        }
        return state;
      },
      out: (state: any) => state,
    },
  ],
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);

const persistedProfileReducer = persistReducer(persistProfileConfig, profileSlice.reducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    common: commonReducer,
    homeRefetch: refetchReducer,
    applicant: applicantReducer,
    home: homeReducer,
    notification: notificationSlice.reducer,
    campaign: campaignSlice.reducer,
    campaignTracking: campaignTrackingSlice.reducer,
    camapignTrackingBrand: campaignTrackingBrandSlice.reducer,
    profile: persitstedProfileReducer,
    usersManagment: usersSlice.reducer,
    invitation: invitationSlice.reducer,
    chatSheet: chatSheetSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
