import type { ApiReponseSuccess } from '../common/common.type';

export interface Permission {
  permissionId: string;
  permissionName: string;
  permissionDescription: string;
}

export interface PermissionResponse extends ApiReponseSuccess<Permission[]> {
  data: Permission[];
}

export interface PermissionBlockRequest {
  userId: string;
  permissionId: string;
  block: boolean;
}

export interface Reason {
  reasonId: string;
  title: string;
  description: string;
}

export interface ReasonResponse extends ApiReponseSuccess<Reason[]> {
  data: Reason[];
}

export type PlanPermisionType =
  | 'search_result'
  | 'campaign_members'
  | 'campaign_invitation'
  | 'campaign_apply';
