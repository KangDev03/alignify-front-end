import { baseApi } from '@/redux/baseApi';

import type {
  BrandProfileResponse,
  ChangeAvatarRequest,
  ChangeAvatarResponses,
  InfluencerProfileResponse,
} from './profile.type';
import type { CommonPageableRequest } from '../common/common.type';
import type { ContentPostingResponse } from '../home/home.type';
import type { ForumPostingResponse, PostingRequest } from '../posting/posting.type';

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
    updateContentPosting: builder.mutation<ForumPostingResponse, PostingRequest>({
      query: (data) => ({
        url: `/contentPosting/${data.id}`,
        method: 'PUT',
        body: data.formData,
      }),
      invalidatesTags: ['Post'],
    }),
    getPostMe: builder.query<
      ContentPostingResponse,
      { page: CommonPageableRequest; userId?: string }
    >({
      query: (data) => ({
        url: `/contentPosting/${data.userId ?? 'me'}`,
        method: 'GET',
        params: { ...data.page },
      }),
      providesTags: ['Auth'],
    }),
  }),
});
export const {
  useChangeAvatarMutation,
  useGetInfluencerProfileUserQuery,
  useGetBrandProfileUserQuery,
  useUpdateContentPostingMutation,
  useGetPostMeQuery,
} = profileApi;
