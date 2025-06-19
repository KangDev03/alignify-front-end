import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

import type { RootState } from '@/redux/store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://alignify-backend.onrender.com/api/v1/',
  // baseUrl: 'http://localhost:8080/api/v1/',
  prepareHeaders: (headers, { getState }) => {
    let token = (getState() as RootState).auth?.token;
    if (!token) {
      token = Cookies.get('authToken') || null;
    }
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ['Auth', 'ChatRoom', 'ChatSheet'],
});
