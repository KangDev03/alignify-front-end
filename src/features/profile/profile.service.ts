import { baseApi } from '@/redux/baseApi';

import type {
  BrandProfileResponse,
  ChangeAvatarRequest,
  ChangeAvatarResponses,
  InfluencerProfileResponse,
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
    getBrandProfileUser: builder.query<BrandProfileResponse, void>({
      query: () => ({
        url: '/profiles/me',
        method: 'GET',
      }),

      providesTags: ['Profile'],
    }),
  }),
});
export const {
  useChangeAvatarMutation,
  useGetInfluencerProfileUserQuery,
  useGetBrandProfileUserQuery,
} = profileApi;
