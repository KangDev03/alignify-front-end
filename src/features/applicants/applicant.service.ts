import { baseApi } from '@/redux/baseApi';

import type {
  ApplicantByBrand,
  ApplicationByBrandResponse,
  ConfirmApplicantRequest,
} from './applicant.type';

export const applicantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getApplicantsByBrand: builder.query<ApplicationByBrandResponse, void>({
      query: () => ({
        url: '/campaigns/applications/brand',
        method: 'GET',
      }),
      providesTags: ['Application'],
    }),
    confirmApplication: builder.mutation<ApplicantByBrand, ConfirmApplicantRequest>({
      query: (data) => ({
        url: `/campaigns/applications/${data.applicationId}/confirm`,
        method: 'POST',
        params: { accepted: data.accepted ?? false },
      }),
    }),
  }),
});

export const { useGetApplicantsByBrandQuery, useConfirmApplicationMutation } = applicantApi;
