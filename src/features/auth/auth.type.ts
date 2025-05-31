import type { ApiReponseError, ApiReponseSuccess } from '../common.type';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse extends ApiReponseSuccess<{ id: string; token: string }> {
  data: {
    id: string;
    token: string;
  };
}

export type ApiError = ApiReponseError;
export interface Role {
  roleId: string;
  roleName: 'INFLUENCER' | 'BRAND' | 'ADMIN';
}

export type RolesResponse = ApiReponseSuccess<Role[]>;

export interface RegisterRequest {
  email: string;
  password: string;
  roleId: string;
  name: string;
}

export interface RegisterResponse {
  message: string;
}

export interface RequestOTPResponse {
  message: string;
}

export interface RequestOTPRequest {
  email: string;
}
