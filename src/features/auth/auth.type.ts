import type { ApiReponseError, ApiReponseSuccess } from '../common.type';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface GoogleLoginRequest {
  code: string;
}

export interface LoginReponse {
  id: string;
  token: string;
  role: 'INFLUENCER' | 'BRAND' | 'ADMIN';
}

export interface LoginResponse extends ApiReponseSuccess<LoginReponse> {
  data: {
    id: string;
    token: string;
    role: 'INFLUENCER' | 'BRAND' | 'ADMIN';
  };
}

export type ApiError = ApiReponseError;
export interface Role {
  roleId: string;
  roleName: 'INFLUENCER' | 'BRAND' | 'ADMIN';
}

export type RolesResponse = ApiReponseSuccess<Role[]>;

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  roleId: string | null;
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
