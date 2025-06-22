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
    getCampaignByCategory: builder.query<CampaignResponse, CampaignRequest>({
      query: ({ categoryId, pageNumber, pageSize }) => ({
        url: `campaigns/filterByCategory/${categoryId}`,
        method: 'GET',
        params: { pageNumber, pageSize },
      }),
    }),
  }),
});
export const {
  useGetAllCampaignsQuery,
  useGetAllCampaignsOfInfluencerQuery,
  useGetCampaignByCategoryQuery,
} = campaignApi;
