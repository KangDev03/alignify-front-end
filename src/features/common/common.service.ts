import { baseApi } from '@/redux/baseApi';

import type { CategoriesResponse, RolesResponse } from './common.type';

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
  }),
});

export const { useGetCategoriesQuery, useGetRolesQuery } = categoryApi;
