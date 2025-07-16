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
  isActive: boolean;
}
export interface Permission {
  permissionId: string;
  permissionName: string;
  permissionDescription: string;
}

export interface PlanPermission {
  planPermissionId?: string;
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
  currentPlan: string;
}

export interface PlanRequest {
  formData: FormData;
}

export interface PlanPermissionSubmitData {
  planPermissionName: string;
  limited: number | undefined;
}
export interface PlanSubmitData {
  planName: string;
  description: string;
  roleId: string;
  permissionIds: string[];
  planPermissions?: PlanPermissionSubmitData[];
  price: number;
  discount: number;
  planType: string;
  isPopular: boolean;
  isActive: boolean;
}
export interface PermissionResponse extends ApiReponseSuccess<Permission[]> {
  data: Permission[];
}
export interface PlanResponse extends ApiReponseSuccess<Plan[]> {
  data: Plan[];
  id?: string;
}

export interface ConvertedPlanResponse extends ApiReponseSuccess<ConvertedPlan[]> {
  data: ConvertedPlan[];
}
