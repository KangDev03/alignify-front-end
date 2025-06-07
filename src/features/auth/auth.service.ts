import { baseApi } from '@/redux/baseApi';

import {
  type GoogleLoginRequest,
  type LoginRequest,
  type LoginResponse,
  type RegisterRequest,
  type RegisterResponse,
  type RequestOTPRequest,
  type RequestOTPResponse,
  type RolesResponse,
  type VerifyOTPRequest,
  type VerifyOTPResponse,
} from './auth.type';

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

    getRoles: builder.query<RolesResponse, void>({
      query: () => ({
        url: '/role',
        method: 'GET',
      }),
    }),

    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        params: { roleId: data.roleId },
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),

    requestOTP: builder.mutation<RequestOTPResponse, RequestOTPRequest>({
      query: (data) => ({
        url: `/auth/request-otp`,
        method: 'POST',
        params: { email: data.email },
      }),
    }),

    verifyOTP: builder.mutation<VerifyOTPResponse, VerifyOTPRequest>({
      query: (data) => ({
        url: `/auth/verify-otp`,
        method: 'POST',
        body: data,
      }),
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

    googleLogin: builder.mutation<LoginResponse, GoogleLoginRequest>({
      query: (accessToken) => ({
        url: `/auth/google`,
        method: 'POST',
        params: { code: accessToken.code },
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
  useGetRolesQuery,
  useRegisterMutation,
  useRequestOTPMutation,
  useVerifyOTPMutation,
  useGoogleLoginMutation,
} = authApi;
