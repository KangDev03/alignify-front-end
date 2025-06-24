import { baseApi } from '@/redux/baseApi';

import type {
  BrandProfileResponse,
  ChangeAvatarRequest,
  ChangeAvatarResponses,
  InfluencerProfileResponse,
  TopInfluencerResponse,
} from './profile.type';

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changeAvatar: builder.mutation<ChangeAvatarResponses, ChangeAvatarRequest>({
      query: ({ image }) => ({
        url: `/profiles/avatar`,
        method: 'POST',
        body: image,
      }),
      invalidatesTags: ['Auth'],
    }),
    getInfluencerProfileUser: builder.query<InfluencerProfileResponse, undefined | string>({
      query: (userId) => ({
        url: `/profiles${userId ? `/${userId}` : '/me'}`,
        method: 'GET',
      }),
      providesTags: ['Profile'],
    }),
    getBrandProfileUser: builder.query<BrandProfileResponse, undefined | string>({
      query: (userId) => ({
        url: `/profiles${userId ? `/${userId}` : '/me'}`,
        method: 'GET',
      }),

      providesTags: ['Profile'],
    }),
    getTopInfluencer: builder.query<TopInfluencerResponse, void>({
      query: () => ({
        url: '/profiles/topInfluencer',
        method: 'GET',
      }),
    }),
  }),
});
export const {
  useChangeAvatarMutation,
  useGetInfluencerProfileUserQuery,
  useGetBrandProfileUserQuery,
  useGetTopInfluencerQuery,
} = profileApi;
