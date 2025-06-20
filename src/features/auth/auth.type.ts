import type { UserDTO } from '@/features/chatting/chat-sheet.type';

import type { ApiReponseError, ApiReponseSuccess, RoleName } from '../common/common.type';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface GoogleLoginRequest {
  code: string;
}

export interface LoginReponse {
  token: string;
  role: RoleName;
  user: UserDTO;
}

export interface LoginResponse extends ApiReponseSuccess<LoginReponse> {
  data: {
    user: any;
    id: string;
    token: string;
    role: RoleName;
  };
}

export type ApiError = ApiReponseError;
export interface Role {
  roleId: string;
  roleName: RoleName;
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
