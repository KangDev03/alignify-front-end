import type { CommonPageableRequest } from '@/features/common/common.type';
import { baseApi } from '@/redux/baseApi';

import type { CampaignResponse, ContractSubmitData } from './campaign.type';
import type { ApplicationSubmitData } from '../application/application.type';
import type { CampaignPostingResponse, PostingRequest } from '../posting/posting.type';

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
    getAllCampaignsOfInfluencer: builder.query<CampaignResponse, void>({
      query: () => ({
        url: '/campaigns/influencer',
        method: 'GET',
      }),
      providesTags: ['Auth'],
    }),
    getAllCampaignsOfBrand: builder.query<CampaignResponse, void>({
      query: () => ({
        url: '/campaigns/brand',
        method: 'GET',
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
    applyCampaign: builder.mutation<void, ApplicationSubmitData>({
      query: (data) => ({
        url: `/campaigns/${data.campaignId}/applications/apply`,
        method: 'POST',
        body: data.CV,
      }),
      invalidatesTags: ['Application'],
    }),
    changeStatus: builder.mutation<void, { campaignId: string; newStatus: string }>({
      query: ({ campaignId, newStatus }) => ({
        url: `/campaigns/${campaignId}/status`,
        method: 'PUT',
        body: { status: newStatus },
      }),
      invalidatesTags: ['Campaign'],
    }),
    updateCampaignData: builder.mutation<CampaignPostingResponse, PostingRequest>({
      query: (data) => ({
        url: `/campaigns/${data.id}`,
        method: 'PUT',
        body: data.formData,
      }),
    }),
    uploadContract: builder.mutation<void, ContractSubmitData>({
      query: (data) => ({
        url: `/campaigns/${data.campaignId}/contract`,
        method: 'POST',
        body: data.contract,
      }),
    }),
    updateContract: builder.mutation<void, ContractSubmitData>({
      query: (data) => ({
        url: `/campaigns/${data.campaignId}/contract`,
        method: 'PUT',
        body: data.contract,
      }),
    }),
  }),
});
export const {
  useGetAllCampaignsQuery,
  useGetAllCampaignsOfInfluencerQuery,
  useGetAllCampaignsOfBrandQuery,
  useGetCampaignByCategoryQuery,
  useApplyCampaignMutation,
  useGetAllCampaignsOfBrandNoPageQuery,
  useChangeStatusMutation,
  useUpdateCampaignDataMutation,
  useUploadContractMutation,
  useUpdateContractMutation,
} = campaignApi;
