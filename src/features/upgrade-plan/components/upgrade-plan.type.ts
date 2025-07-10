import type { ApiReponseSuccess } from '@/features/common/common.type';

export interface Plan {
  planId: string;
  planName: string;
  description: string;
  roleId: string;
  permissionIds: string[];
  planPermissionIds: string[];
  price: number;
  discount: number;
  planType: string;
  planCount: number;
  feature: FearturePlan[] | [];
  createdAt: string;
  popular: boolean;
}
interface FearturePlan {
  name: string;
  amount: number;
}
export interface PlanResponse extends ApiReponseSuccess<Plan[]> {
  data: Plan[];
}
