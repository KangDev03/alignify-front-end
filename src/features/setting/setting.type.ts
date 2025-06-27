import type { ApiReponseSuccess } from '../common/common.type';

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  passwordConfirm: string;
}
export interface InfluencerProfileRequest {
  name?: string;
  bio?: string;
  gender?: string;
  doB?: string;
  avatarUrl?: string;
  categoryIds?: string[];
  socialMediaLinks?: { [key: string]: string };
  isPublic?: boolean;
}
export interface BrandProfileRequest {
  name?: string;
  bio?: string;
  contacts?: { [key: string]: string };
  socialMediaLinks?: { [key: string]: string };
  establishDate?: number[];
  avatarUrl?: string;
  categoryIds?: string[];
}
export interface ChangePasswordResponse extends ApiReponseSuccess<null> {
  data: null;
}
