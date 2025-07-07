import { baseApi } from '@/redux/baseApi';

import type {
  BrandProfileResponse,
  ContentPostingResponse,
  InfluencerProfileResponse,
  ProfileRequest,
  TopInfluencerResponse,
} from './home.type';
import type { CommonPageableRequest } from '../common/common.type';
import type { CampaignResponse } from '../my-campaign/campaign.type';

export const getProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrandProfiles: builder.query<BrandProfileResponse, ProfileRequest>({
      query: (param) => ({
        url: '/profiles',
        method: 'GET',
        params: { roleId: param.roleId, pageSize: param.pageSize, pageNumber: param.pageNumber },
      }),
      providesTags: ['Home'],
    }),
    getInfluencerProfiles: builder.query<InfluencerProfileResponse, ProfileRequest>({
      query: (param) => ({
        url: '/profiles',
        method: 'GET',
        params: { roleId: param.roleId, pageSize: param.pageSize, pageNumber: param.pageNumber },
      }),
      providesTags: ['Home'],
    }),
    getCampaigns: builder.query<CampaignResponse, CommonPageableRequest>({
      query: (param) => ({
        url: '/campaigns',
        method: 'GET',
        params: param,
      }),
      providesTags: ['Home'],
    }),
    searchCampaigns: builder.query<
      CampaignResponse,
      { term: string; pageNumber?: number; pageSize?: number }
    >({
      query: ({ term, pageNumber = 0, pageSize = 10 }) => ({
        url: `/campaigns/search`,
        method: 'POST',
        params: { term, pageNumber, pageSize },
      }),
      providesTags: ['Common'],
    }),
    searchBrands: builder.query<
      BrandProfileResponse,
      { term: string; pageNumber?: number; pageSize?: number }
    >({
      query: ({ term, pageNumber = 0, pageSize = 10 }) => ({
        url: `/profiles/brands/search`,
        method: 'POST',
        params: { term, pageNumber, pageSize },
      }),
      providesTags: ['Common'],
    }),
    searchInfluencers: builder.query<
      InfluencerProfileResponse,
      { term: string; pageNumber?: number; pageSize?: number }
    >({
      query: ({ term, pageNumber = 0, pageSize = 10 }) => ({
        url: `/profiles/influencers/search`,
        method: 'POST',
        params: { term, pageNumber, pageSize },
      }),
      providesTags: ['Common'],
    }),
    searchForumContent: builder.query<
      any,
      { term: string; pageNumber?: number; pageSize?: number }
    >({
      query: ({ term, pageNumber = 0, pageSize = 10 }) => ({
        url: `/contentPosting/search`,
        method: 'POST',
        params: { term, pageNumber, pageSize },
      }),
      providesTags: ['Common'],
    }),
    getBrandByCategory: builder.query<BrandProfileResponse, CommonPageableRequest>({
      query: ({ categoryId, pageNumber, pageSize }) => ({
        url: `profiles/filterBrand/${categoryId}`,
        method: 'GET',
        params: { pageNumber, pageSize },
      }),
    }),
    getInfluencerByCategory: builder.query<InfluencerProfileResponse, CommonPageableRequest>({
      query: ({ categoryId, pageNumber, pageSize }) => ({
        url: `profiles/filterInfluencer/${categoryId}`,
        method: 'GET',
        params: { pageNumber, pageSize },
      }),
    }),
    getTopInfluencer: builder.query<TopInfluencerResponse, void>({
      query: () => ({
        url: '/profiles/topInfluencer',
        method: 'GET',
      }),
    }),
    getCampaignTop3: builder.query<CampaignResponse, void>({
      query: () => ({
        url: `campaigns/top`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetBrandProfilesQuery,
  useGetInfluencerProfilesQuery,
  useGetCampaignsQuery,
  useSearchCampaignsQuery,
  useSearchBrandsQuery,
  useSearchInfluencersQuery,
  useSearchForumContentQuery,
  useGetBrandByCategoryQuery,
  useGetInfluencerByCategoryQuery,
  useGetTopInfluencerQuery,
  useGetCampaignTop3Query,
} = getProfileApi;

export const contentPostingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllContentPosting: builder.query<ContentPostingResponse, CommonPageableRequest>({
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
    getPostByCategory: builder.query<ContentPostingResponse, CommonPageableRequest>({
      query: ({ categoryId, pageNumber, pageSize }) => ({
        url: `/contentPosting/filterByCategory/${categoryId}`,
        method: 'GET',
        params: { pageNumber, pageSize },
      }),
    }),
  }),
});
export const { useGetAllContentPostingQuery, useGetPostsByUserIdQuery, useGetPostByCategoryQuery } =
  contentPostingApi;
