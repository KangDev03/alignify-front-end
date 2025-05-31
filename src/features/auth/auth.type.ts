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
  roleId: string | null;
  name: string;
}

export interface RegisterResponse {
  message: string;
}

export type RequestOTPResponse = ApiReponseSuccess<null>;

export interface RequestOTPRequest {
  email: string;
}

export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export type VerifyOTPResponse = ApiReponseSuccess<null>;
