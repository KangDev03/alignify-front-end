import type { ApiReponseSuccess } from '@/features/common/common.type';

export interface Plan {
  planId: string;
  planName: string;
  description: string;
  roleId: string;
  permissions: Permission[] | [];
  planPermissions: PlanPermission[];
  price: number;
  discount: number;
  planType: string;
  planCount: number;
  createdAt: string;
  isPopular: boolean;
}
interface Permission {
  permissionId: string;
  permissionName: string;
  permissionDescription: string;
}

interface PlanPermission {
  planPermissionId: string;
  roleId: string;
  planPermissionName: string;
  limited: number | undefined;
}

export interface ConvertedPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number | undefined;
  planType: string;
  badge: string;
  badgeColor: string;
  popular: boolean;
  planPermission: PlanPermission[];
  permission: Permission[];
  planCount: number;
  buttonText: string;
  buttonVariant: string;
  createdAt: string;
}
export interface PlanResponse extends ApiReponseSuccess<Plan[]> {
  data: Plan[];
}
export interface ConvertedPlanResponse extends ApiReponseSuccess<ConvertedPlan[]> {
  data: ConvertedPlan[];
}
