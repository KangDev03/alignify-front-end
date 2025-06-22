import { baseApi } from '@/redux/baseApi';

import type {
  BrandProfileResponse,
  ContentPostingResponse,
  InfluencerProfileResponse,
  ProfileRequest,
} from './home.type';
import type { CommonPageableRequest } from '../common/common.type';
import type { CampaignResponse } from '../my-campaign/campaign.type';

export const getProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrandProfiles: builder.query<BrandProfileResponse, ProfileRequest>({
      query: (param) => ({
        url: '/profiles',
        method: 'GET',
        params: { roleId: param.roleId },
      }),
      providesTags: ['Home'],
    }),
    getInfluencerProfiles: builder.query<InfluencerProfileResponse, ProfileRequest>({
      query: (param) => ({
        url: '/profiles',
        method: 'GET',
        params: { roleId: param.roleId },
      }),
      providesTags: ['Home'],
    }),
    getCampaigns: builder.query<CampaignResponse, CommonPageableRequest | void>({
      query: () => ({
        url: '/campaigns',
        method: 'GET',
      }),
      providesTags: ['Home'],
    }),
  }),
});

export const { useGetBrandProfilesQuery, useGetInfluencerProfilesQuery, useGetCampaignsQuery } =
  getProfileApi;

export const contentPostingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllContentPosting: builder.query<ContentPostingResponse, CommonPageableRequest | undefined>({
      query: (data) => ({
        url: '/contentPosting',
        method: 'GET',
        params: data,
      }),
    }),
    getPostsByUserId: builder.query<ContentPostingResponse, CommonPageableRequest | undefined>({
      query: (data) => ({
        url: '/contentPosting/{userId}',
        method: 'GET',
        params: data,
      }),
    }),
    getPostMe: builder.query<ContentPostingResponse, CommonPageableRequest | undefined>({
      query: (data) => ({
        url: '/contentPosting/me',
        method: 'GET',
        params: data,
      }),
      providesTags: ['Auth'],
    }),
  }),
});
export const { useGetAllContentPostingQuery, useGetPostMeQuery, useGetPostsByUserIdQuery } =
  contentPostingApi;
