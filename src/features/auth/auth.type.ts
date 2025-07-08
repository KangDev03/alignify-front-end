import type { ApiReponseSuccess, RoleName, UserDTO } from '../common/common.type';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface GoogleLoginRequest {
  code: string;
}

interface ILoginReponse {
  token: string;
  role: RoleName;
  user: UserDTO;
}

export type LoginResponse = ApiReponseSuccess<ILoginReponse>;

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

export type ForgotPasswordRequest = {
  email: string;
  url: string;
};

export type ForgotPasswordResponse = ApiReponseSuccess<null>;

export type ResetPasswordRequest = {
  password: string;
  passwordConfirm: string;
  token: string;
};

export type ResetPasswordResponse = {
  success: boolean;
  message: string;
};

export interface UserBan {
  userId: string;
  reasonId: string;
  createdAt: string;
}
