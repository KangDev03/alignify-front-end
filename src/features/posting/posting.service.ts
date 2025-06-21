import { baseApi } from '@/redux/baseApi';

import type { CampaignPostingRequest, CampaignPostingResponse } from './posting.type';

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
  }),
});

export const { usePostCampaignMutation } = postingApi;
