import type { ApiReponseError, ApiReponseSuccess, RoleName, UserDTO } from '../common/common.type';

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

export interface LoginResponse extends ApiReponseSuccess<ILoginReponse> {
  data: ILoginReponse;
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

// Gửi yêu cầu quên mật khẩu

export type ForgotPasswordRequest = {
  email: string;
};

export type ForgotPasswordResponse = {
  success: boolean;
  message: string;
};

// Đặt lại mật khẩu mới

export type ResetPasswordRequest = {
  password: string;
  passwordConfirm: string;
  token: string; // token từ email
};

export type ResetPasswordResponse = {
  success: boolean;
  message: string;
};
