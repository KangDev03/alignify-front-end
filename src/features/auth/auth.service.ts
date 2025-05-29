import { baseApi } from '@/redux/baseApi';

import type { LoginRequest, LoginResponse } from './auth.type';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/api/v1/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    logout: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),

    refreshToken: builder.mutation<LoginResponse, { refreshToken: string }>({
      query: (body) => ({
        url: '/auth/refresh',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),

    getProfile: builder.query<LoginResponse['data']['user'], void>({
      query: () => '/auth/profile',
      providesTags: ['Auth'],
    }),
  }),
});

// Export các hooks để sử dụng trong components
export const { useLoginMutation, useLogoutMutation, useRefreshTokenMutation, useGetProfileQuery } =
  authApi;
