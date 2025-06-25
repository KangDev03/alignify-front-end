import type { CommonPageableRequest } from '@/features/common/common.type';
import { baseApi } from '@/redux/baseApi';

import type { CampaignResponse } from './campaign.type';

export const campaignApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCampaigns: builder.query<CampaignResponse, CommonPageableRequest>({
      query: (data) => ({
        url: '/campaigns',
        method: 'GET',
        params: data,
      }),
      providesTags: ['Auth'],
    }),
    getAllCampaignsOfInfluencer: builder.query<CampaignResponse, CommonPageableRequest>({
      query: (data) => ({
        url: '/campaigns/influencer',
        method: 'GET',
        params: data,
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
    getAllCampaignsOfBrandNoPage: builder.query<CampaignResponse, void>({
      query: () => ({
        url: '/campaigns/brandNoPage',
        method: 'GET',
      }),
    }),
    getCampaignByCategory: builder.query<CampaignResponse, CommonPageableRequest>({
      query: ({ categoryId, pageNumber, pageSize }) => ({
        url: `campaigns/filterByCategory/${categoryId}`,
        method: 'GET',
        params: { pageNumber, pageSize },
      }),
    }),
    applyCampaign: builder.mutation<void, string>({
      query: (campaignId) => ({
        url: `/campaigns/${campaignId}/applications/apply`,
        method: 'POST',
      }),
      invalidatesTags: ['Campaign'],
    }),
    getCampaignTop3: builder.query<CampaignResponse, void>({
      query: () => ({
        url: `campaigns/top`,
        method: 'GET',
      }),
    }),
    changeStatus: builder.mutation<void, { campaignId: string; newStatus: string }>({
      query: ({ campaignId, newStatus }) => ({
        url: `/campaigns/${campaignId}/status`,
        method: 'PUT',
        body: { status: newStatus },
      }),
      invalidatesTags: ['Campaign'],
    }),
  }),
});
export const {
  useGetAllCampaignsQuery,
  useGetAllCampaignsOfInfluencerQuery,
  useGetAllCampaignsOfBrandQuery,
  useGetCampaignByCategoryQuery,
  useApplyCampaignMutation,
  useGetCampaignTop3Query,
  useGetAllCampaignsOfBrandNoPageQuery,
  useChangeStatusMutation,
} = campaignApi;
