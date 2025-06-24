import { baseApi } from '@/redux/baseApi';

import type { Campaign, CategoriesResponse, RolesResponse } from './common.type';

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesResponse, void>({
      query: () => ({
        url: '/categories',
        method: 'GET',
      }),
      providesTags: ['Common'],
    }),
    getRoles: builder.query<RolesResponse, void>({
      query: () => ({
        url: '/roles',
        method: 'GET',
      }),
      providesTags: ['Common'],
    }),
    searchCampaigns: builder.query<{ campaigns: Campaign[]; currentPage: number; totalPages: number; totalItems: number }, { term: string; pageNumber?: number; pageSize?: number }>({
      query: ({ term, pageNumber = 0, pageSize = 10 }) => ({
        url: `/campaigns/search`,
        method: 'POST',
        params: { term, pageNumber, pageSize },
      }),
      providesTags: ['Common'],
    }),
  }),
});

export const { useGetCategoriesQuery, useGetRolesQuery, useSearchCampaignsQuery } = categoryApi;
