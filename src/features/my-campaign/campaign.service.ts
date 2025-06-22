import { baseApi } from '@/redux/baseApi';

import type { CampaignRequest, CampaignResponse } from './campaign.type';

export const campaignApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCampaigns: builder.query<CampaignResponse, CampaignRequest>({
      query: () => ({
        url: '/campaigns',
        method: 'GET',
      }),
      providesTags: ['Auth'],
    }),
    getAllCampaignsOfInfluencer: builder.query<CampaignResponse, CampaignRequest>({
      query: () => ({
        url: '/campaigns/influencer',
        method: 'GET',
      }),
      providesTags: ['Auth'],
    }),
  }),
});
export const { useGetAllCampaignsQuery, useGetAllCampaignsOfInfluencerQuery } = campaignApi;
