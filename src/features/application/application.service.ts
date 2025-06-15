import { baseApi } from '@/redux/baseApi';

import type { ApplicationBrandResponse } from './application.type';

export const applicationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getApplicationsByBrand: builder.query<ApplicationBrandResponse, void>({
            query: () =>({
                url: '/campaigns/applications/brand',
                method: 'GET'
            }),
            providesTags: ['Auth'],
        }),
    })
})

export const{
    useGetApplicationsByBrandQuery
} = applicationApi;