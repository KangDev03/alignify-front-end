import type { ApiReponseSuccess } from '../common/common.type';

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  passwordConfirm: string;
}

export interface ChangePasswordResponse extends ApiReponseSuccess<null> {
  data: null;
}
