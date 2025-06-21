import { baseApi } from '@/redux/baseApi';

import type { ContentPostingRequest, ContentPostingResponse } from './forum.type';

export const contentPostingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllContentPosting: builder.query<ContentPostingResponse, ContentPostingRequest>({
      query: (params) => ({
        url: '/contentPosting',
        method: 'GET',
        params,
      }),
      providesTags: ['ContentPost'],
    }),
    getPostsByUserId: builder.query<ContentPostingResponse, { userId: string } & ContentPostingRequest>({
      query: ({ userId, ...params }) => ({
        url: `/contentPosting/${userId}`,
        method: 'GET',
        params,
      }),
      providesTags: ['ContentPost'],
    }),
    getPostMe: builder.query<ContentPostingResponse, ContentPostingRequest>({
      query: (params) => ({
        url: '/contentPosting/me',
        method: 'GET',
        params,
      }),
      providesTags: ['ContentPost'],
    }),
    toggleLike: builder.mutation<{ likeCount: number }, string>({
      query: (contentId) => ({
        url: `/contentPosting/${contentId}/like`,
        method: 'POST',
      }),
      invalidatesTags: ['ContentPost'],
    }),
  }),
});

export const {
  useGetAllContentPostingQuery,
  useGetPostMeQuery,
  useGetPostsByUserIdQuery,
  useToggleLikeMutation,
} = contentPostingApi;
