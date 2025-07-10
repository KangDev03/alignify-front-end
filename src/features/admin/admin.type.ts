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
