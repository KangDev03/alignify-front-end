import type { CommonPageableRequest } from '@/features/common/common.type';
import { baseApi } from '@/redux/baseApi';

import type {
  CampaignResponse,
  CampaignTrackingResponse,
  ContractSubmitData,
  OneCampaignResponse,
  PostDetailsSubmitData,
  PostDetailStatsResponse,
  StatsRequest,
} from './campaign.type';
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
    getCampaignById: builder.query<OneCampaignResponse, string>({
      query: (campaignId) => ({
        url: `/campaigns/${campaignId}`,
        method: 'GET',
      }),
    }),
    getCampaignTrackingById: builder.query<CampaignTrackingResponse, string>({
      query: (campaignId) => ({
        url: `/campaigns/${campaignId}/trackings`,
        method: 'GET',
      }),
    }),
    uploadPostDetails: builder.mutation<void, PostDetailsSubmitData>({
      query: (data) => ({
        url: `/campaigns/${data.campaignId}/trackings/${data.trackingId}/posts`,
        method: 'POST',
        body: { postDetailsTrackings: data.postDetails },
      }),
    }),
    getStatsFromPost: builder.query<PostDetailStatsResponse, StatsRequest>({
      query: (data) => {
        let platformEndpoint = '';
        if (data.platform === 'tiktok') {
          platformEndpoint = `tiktok/video/${data.postId}/statsV2`;
        } else if (data.platform === 'youtube') {
          platformEndpoint = `youtube/${data.postId}`;
        } else if (data.platform === 'facebook') {
          platformEndpoint = `facebook/post/${data.postId}`;
        } else if (data.platform === 'instagram') {
          platformEndpoint = `instagram/post_or_reel_or_stories_or_TV_post/${data.postId}`;
        }
        return {
          url: `/rapidapi/${platformEndpoint}`,
          method: 'GET',
        };
      },
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
  useGetCampaignByIdQuery,
  useGetCampaignTrackingByIdQuery,
  useUploadPostDetailsMutation,
  useGetStatsFromPostQuery,
} = campaignApi;
