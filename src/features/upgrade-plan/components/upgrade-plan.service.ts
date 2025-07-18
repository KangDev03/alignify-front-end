import { baseApi } from '@/redux/baseApi';

import type { PermissionResponse, PlanResponse, PlanSubmitData } from './upgrade-plan.type';

export const planApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getPlansByRole: builder.query<PlanResponse, string>({
      query: (role) => `/plans/${role}`,
      providesTags: ['Plan'],
    }),

    createPlan: builder.mutation<PlanResponse, PlanSubmitData>({
      query: (data) => ({
        url: '/plans',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Plan'],
    }),

    editPlan: builder.mutation<PlanResponse, PlanSubmitData>({
      query: (data) => ({
        url: `/plans/${data.planId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Plan'],
    }),

    deletePlan: builder.mutation<void, string>({
      query: (planId) => ({
        url: `/plans/${planId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Plan'],
    }),
    getPermission: builder.query<PermissionResponse, void>({
      query: () => ({
        url: `/plans/permission`,
        method: 'GET',
      }),
      providesTags: ['Plan'],
    }),
  }),
});

export const {
  useGetPlansByRoleQuery,
  useCreatePlanMutation,
  useDeletePlanMutation,
  useGetPermissionQuery,
  useEditPlanMutation,
} = planApi;
