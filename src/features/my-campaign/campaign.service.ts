import type { CommonPageableRequest } from '@/features/common/common.type';
import { baseApi } from '@/redux/baseApi';

import type { CampaignResponse } from './campaign.type';

export const campaignApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCampaigns: builder.query<CampaignResponse, CommonPageableRequest>({
      query: (data) => ({
        url: '/campaigns',
        method: 'GET',
      }),
      providesTags: ['Auth'],
    }),
    getAllCampaignsOfInfluencer: builder.query<CampaignResponse, CommonPageableRequest>({
      query: (data) => ({
        url: '/campaigns/influencer',
        method: 'GET',
      }),
      providesTags: ['Auth'],
    }),
    getAllCampaignsOfBrand: builder.query<CampaignResponse, CommonPageableRequest>({
      query: (data) => ({
        url: '/campaigns/brand',
        method: 'GET',
        params: data,
      }),
      providesTags: ['Auth'],
    }),
  }),
});
export const {
  useGetAllCampaignsQuery,
  useGetAllCampaignsOfInfluencerQuery,
  useGetAllCampaignsOfBrandQuery,
} = campaignApi;
