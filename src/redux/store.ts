import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import applicantReducer from '@/features/applicants/applicant.slice';
import authReducer from '@/features/auth/auth.slice';
import commonReducer from '@/features/common/common.slice';
import homeRefetchReducer from '@/features/home/home.slice';

import { baseApi } from './baseApi';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['id', 'token', 'role', 'avatarUrl', 'name'],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Sử dụng reducer đã được persist
    [baseApi.reducerPath]: baseApi.reducer,
    common: commonReducer,
    homeRefetch: homeRefetchReducer,
    applicant: applicantReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Tắt cảnh báo cho redux-persist
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store); // Tạo persistor
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
