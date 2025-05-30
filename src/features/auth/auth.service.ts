import { baseApi } from '@/redux/baseApi';

import type { LoginRequest, LoginResponse } from './auth.type';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
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

    getProfile: builder.query<LoginResponse, void>({
      query: () => '/auth/profile',
      providesTags: ['Auth'],
    }),

    googleLogin: builder.mutation<{ token: string; id: string }, { code: string }>({
      query: (accessToken) => ({
        url: `/auth/google?code=${accessToken.code}`,
        method: 'POST',
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        contentType: 'application/octet-stream; charset=utf-8',
      }),
    }),
  }),
});

// Export các hooks để sử dụng trong components
export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useGetProfileQuery,
  useGoogleLoginMutation,
} = authApi;
