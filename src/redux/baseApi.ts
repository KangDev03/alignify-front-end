import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '@/config';
import type { RootState } from '@/redux/store';

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth?.token;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  baseQuery,
  endpoints: () => ({}),
  tagTypes: [
    'Auth',
    'ChatRoom',
    'ChatSheet',
    'Post',
    'Common',
    'Home',
    'Campaign',
    'Application',
    'Profile',
    'Notification',
  ],
});
