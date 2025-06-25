import type { ApiReponseSuccess } from '../common/common.type';

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  passwordConfirm: string;
}
export interface InfluencerProfileRequest {
  bio?: string;
  gender?: string;
  doB?: number[];
  avatarUrl?: string;
  categoryIds?: string[];
  socialMediaLinks?: { [key: string]: string };
  isPublic: boolean | true;
}
export interface BrandProfileRequest {
  bio?: string;
  contacts?: { [key: string]: string };
  socialMediaLinks?: { [key: string]: string };
  establishDate?: number[];
  avatarUrl?: string;
  categoryIds?: string[];
  isPublic: boolean | true;
}
export interface ChangePasswordResponse extends ApiReponseSuccess<null> {
  data: null;
}
