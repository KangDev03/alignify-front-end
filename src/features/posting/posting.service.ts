import { baseApi } from '@/redux/baseApi';

import type { CampaignPostingResponse, ForumPostingResponse, PostingRequest } from './posting.type';

export const postingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postCampaign: builder.mutation<CampaignPostingResponse, PostingRequest>({
      query: (formData) => ({
        url: '/campaigns',
        method: 'POST',
        body: formData.formData,
      }),
      invalidatesTags: ['Post'],
    }),
    postContent: builder.mutation<ForumPostingResponse, PostingRequest>({
      query: (formData) => ({
        url: '/contentPosting',
        method: 'POST',
        body: formData.formData,
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const { usePostCampaignMutation, usePostContentMutation } = postingApi;
