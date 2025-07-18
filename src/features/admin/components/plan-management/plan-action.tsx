import { useCreatePlanMutation } from '@/features/upgrade-plan/components/upgrade-plan.service';
import type { Plan } from '@/features/upgrade-plan/components/upgrade-plan.type';

export function usePlanActions() {
  const [triggerCreatePlan, { isLoading, error }] = useCreatePlanMutation();

  // Hàm tạo kế hoạch đã được ánh xạ
  const handleCreateMappedPlan = async ({
    newPlan,
    isAnnual,
    onSuccess,
    onError,
  }: {
    newPlan: any;
    isAnnual: boolean;
    onSuccess?: () => void;
    onError?: (err: any) => void;
  }) => {
    try {
      const mappedPlan: Plan = {
        planId: '',
        planName: newPlan.name,
        description: newPlan.description,
        roleId: newPlan.targetRole.toUpperCase(),
        permissions: [],
        planPermissions: [
          {
            planPermissionId: '',
            roleId: newPlan.targetRole.toUpperCase(),
            planPermissionName: 'MAX_CAMPAIGNS',
            limited:
              newPlan.targetRole === 'brand'
                ? parseInt(newPlan.maxCampaigns || '0')
                : parseInt(newPlan.maxApplications || '0'),
          },
          {
            planPermissionId: '',
            roleId: newPlan.targetRole.toUpperCase(),
            planPermissionName: 'MAX_SEARCHES',
            limited: parseInt(newPlan.maxSearches || '0'),
          },
          ...(newPlan.targetRole === 'brand'
            ? [
                {
                  planPermissionId: '',
                  roleId: newPlan.targetRole.toUpperCase(),
                  planPermissionName: 'MAX_INFLUENCERS',
                  limited: parseInt(newPlan.maxInfluencers || '0'),
                },
              ]
            : []),
        ],
        price: parseInt(newPlan.price),
        discount: isAnnual ? 0.17 : 0,
        planType: isAnnual ? 'one_year' : 'one_month',
        planCount: 1,
        createdAt: new Date().toISOString(),
        isPopular: false,
        isActive: newPlan.isActive,
      };

      const formData = new FormData();
      formData.append('plan', JSON.stringify(mappedPlan));
      await triggerCreatePlan({ formData }).unwrap();
      onSuccess?.();
    } catch (err) {
      console.error('Lỗi khi tạo plan:', err);
      onError?.(err);
    }
  };

  return {
    handleCreateMappedPlan,
    isCreating: isLoading,
    createError: error,
  };
}
