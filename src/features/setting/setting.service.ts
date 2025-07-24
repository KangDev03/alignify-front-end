import { baseApi } from '@/redux/baseApi';

import type {
  BrandProfileRequest,
  ChangePasswordRequest,
  ChangePasswordResponse,
  InfluencerProfileRequest,
  UserStatsFromMetaResponse,
  UserStatsFromTiktokResponse,
  UserStatsFromYoutubeResponse,
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
    getFollowerCountFromTiktok: builder.query<UserStatsFromTiktokResponse, { uniqueId: string }>({
      query: (data) => ({
        url: `/rapidapi/tiktok/user/${data.uniqueId}/statsV2`,
        method: 'GET',
      }),
    }),
    getSubcriberCountFromYoutube: builder.query<
      UserStatsFromYoutubeResponse,
      { channelName: string }
    >({
      query: (data) => ({
        url: `/rapidapi/youtube/${data.channelName}/subscriber_count`,
        method: 'GET',
      }),
    }),
    getFollowerCountFromFacebook: builder.query<UserStatsFromMetaResponse, { pageName: string }>({
      query: (data) => ({
        url: `/rapidapi/facebook/page/${data.pageName}`,
        method: 'GET',
      }),
    }),
    getFollowerCountFromInstagram: builder.query<
      UserStatsFromMetaResponse,
      { code_or_id_or_url: string }
    >({
      query: (data) => ({
        url: `/rapidapi/instagram/user/${data.code_or_id_or_url}`,
        method: 'GET',
      }),
    }),
    change2FA: builder.mutation<void, boolean>({
      query: (turn) => ({
        url: `/auth/2fa`,
        method: 'PUT',
        params: { turn: turn },
      }),
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useEditProfileMutation,
  useGetFollowerCountFromTiktokQuery,
  useGetSubcriberCountFromYoutubeQuery,
  useGetFollowerCountFromFacebookQuery,
  useGetFollowerCountFromInstagramQuery,
  useChange2FAMutation,
} = settingApi;
