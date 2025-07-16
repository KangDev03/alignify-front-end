import { baseApi } from '@/redux/baseApi';

import type { AssistantMessageResponse } from './assistant.type';

const assistantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAssistantMessage: builder.query<AssistantMessageResponse, void>({
      query: () => ({
        url: '/assistant/campaigns',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllAssistantMessageQuery } = assistantApi;
