import { baseApi } from '@/redux/baseApi';

import {
  type ForgotPasswordRequest,
  type ForgotPasswordResponse,
  type GoogleLoginRequest,
  type LoginRequest,
  type LoginResponse,
  type RegisterRequest,
  type RegisterResponse,
  type RequestOTPRequest,
  type RequestOTPResponse,
  type ResetPasswordRequest,
  type ResetPasswordResponse,
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

    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (data) => {
        const { roleId, ...bodyData } = data;
        return {
          url: '/auth/register',
          method: 'POST',
          params: { roleId },
          body: bodyData,
        };
      },
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

    forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: (data) => ({
        url: '/auth/recovery-password',
        method: 'POST',
        body: { email: data.email, url: data.url },
      }),
    }),

    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
      query: (data) => ({
        url: `/auth/reset-password/${data.token}`,
        method: 'POST',
        body: {
          password: data.password,
          passwordConfirm: data.passwordConfirm,
        },
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

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useGetProfileQuery,
  useRegisterMutation,
  useRequestOTPMutation,
  useVerifyOTPMutation,
  useGoogleLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
