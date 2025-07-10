import { baseApi } from '@/redux/baseApi';

import type { Plan, PlanResponse } from './upgrade-plan.type';

export const planApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlansByRole: builder.query<PlanResponse, string>({
      query: (roleId) => `/plans?roleId=${roleId}`,
    }),

    createPlan: builder.mutation<PlanResponse, Plan>({
      query: (newPlan) => ({
        url: '/plans',
        method: 'POST',
        body: newPlan,
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
  }),
});

export const {
  useGetPlansByRoleQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} = planApi;
