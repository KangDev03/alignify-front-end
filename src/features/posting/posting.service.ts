import { baseApi } from '@/redux/baseApi';

import type {
  CampaignPostingRequest,
  CampaignPostingResponse,
  ContentPostingRequest,
} from './posting.type';
import type { ContentPostingResponse } from '../home/home.type';

export const postingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postCampaign: builder.mutation<CampaignPostingResponse, CampaignPostingRequest>({
      query: (formData) => ({
        url: '/campaigns',
        method: 'POST',
        body: formData.formData,
      }),
      invalidatesTags: ['Post'],
    }),
    postContent: builder.mutation<ContentPostingResponse, ContentPostingRequest>({
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
