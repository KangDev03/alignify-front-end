import { baseApi } from '@/redux/baseApi';

import type { CategoriesResponse } from './common.type';

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesResponse, void>({
      query: () => ({
        url: '/categories',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
