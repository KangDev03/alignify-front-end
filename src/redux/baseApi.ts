import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { RootState } from '@/redux/store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://alignify-backend.onrender.com/api/v1/',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.token;

    headers.set('Content-Type', 'application/json');

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseApi = createApi({
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ['Auth'],
});
