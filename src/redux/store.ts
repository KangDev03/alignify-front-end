import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { usersSlice } from '@/features/admin/admin.slice';
import applicantReducer from '@/features/applicants/applicant.slice';
import authReducer from '@/features/auth/auth.slice';
import commonReducer from '@/features/common/common.slice';
import { homeReducer, refetchReducer } from '@/features/home/home.slice';
import { invitationSlice } from '@/features/invitation/invitation.slice';
import { campaignSlice } from '@/features/my-campaign/campaign.slice';
import { notificationSlice } from '@/features/notification/notification.slice';
import { profileSlice } from '@/features/profile/profile.slice';

import { baseApi } from './baseApi';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['id', 'token', 'role', 'avatarUrl', 'name'],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

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
    profile: profileSlice.reducer,
    usersManagment: usersSlice.reducer,
    invitation: invitationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
