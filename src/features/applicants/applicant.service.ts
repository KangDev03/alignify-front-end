import { baseApi } from '@/redux/baseApi';

import type {
  ApplicantByBrand,
  ApplicationByBrandResponse,
  ConfirmApplicantRequest,
} from './applicant.type';
import type { CommonPageableRequest } from '../common/common.type';

export const applicantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getApplicantsByBrand: builder.query<ApplicationByBrandResponse, CommonPageableRequest>({
      query: (data) => ({
        url: '/campaigns/applications/brand',
        method: 'GET',
        params: data,
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
