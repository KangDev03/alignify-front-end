import { baseApi } from '@/redux/baseApi';

import type {
  BrandProfileRequest,
  ChangePasswordRequest,
  ChangePasswordResponse,
  InfluencerProfileRequest,
} from './setting.type';

export const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordRequest>({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'PUT',
        body: {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
          passwordConfirm: data.passwordConfirm,
        },
      }),
      invalidatesTags: ['Auth'],
    }),
    editProfile: builder.mutation<any, InfluencerProfileRequest | BrandProfileRequest>({
      query: (profile) => ({
        url: '/profiles',
        method: 'PUT',
        body: profile,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const { useChangePasswordMutation, useEditProfileMutation } = settingApi;
