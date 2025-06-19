import { baseApi } from "@/redux/baseApi";

import type { ContentPostingRequest, ContentPostingResponse } from "./forum.type";

export const contentPostingApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        getAllContentPosting: builder.query<ContentPostingResponse, ContentPostingRequest>({
            query: (data) => ({
                url: '/contentPosting',
                method: 'GET',
                params: data,
            })
        }),
        getPostsByUserId: builder.query<ContentPostingResponse, ContentPostingRequest>({
            query: (data) =>({
                url: '/contentPosting/{userId}',
                method: 'GET',
                params: data,
            })
        }),
        getPostMe: builder.query<ContentPostingResponse, ContentPostingRequest>({
            query: (data) =>({
                url: '/contentPosting/me',
                method: 'GET',
                params: data,
            }),
            providesTags: ['Auth'],
        })
    })
})
export const {
    useGetAllContentPostingQuery,
    useGetPostMeQuery,
    useGetPostsByUserIdQuery
} = contentPostingApi