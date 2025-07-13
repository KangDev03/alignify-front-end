import { baseApi } from '@/redux/baseApi';

import type { PermissionResponse, Plan, PlanRequest, PlanResponse } from './upgrade-plan.type';

export const planApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlansByRole: builder.query<PlanResponse, string>({
      query: (roleId) => `/plans?roleId=${roleId}`,
    }),

    createPlan: builder.mutation<PlanResponse, PlanRequest>({
      query: (formData) => ({
        url: '/plans',
        method: 'POST',
        body: formData.formData,
      }),
    }),

    updatePlan: builder.mutation<PlanResponse, { planId: string; plan: Plan }>({
      query: ({ planId, plan }) => ({
        url: `/plans/${planId}`,
        method: 'PUT',
        body: plan,
      }),
    }),

    deletePlan: builder.mutation<void, string>({
      query: (planId) => ({
        url: `/plans/${planId}`,
        method: 'DELETE',
      }),
    }),
    getPermission: builder.query<PermissionResponse, void>({
      query: () => ({
        url: `/plans/permission`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetPlansByRoleQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} = planApi;
