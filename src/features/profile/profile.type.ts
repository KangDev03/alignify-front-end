import type { ApiReponseSuccess } from '../common/common.type';

export interface ChangeAvatarRequest {
  image: FormData;
}

export interface ChangeAvatarResponses extends ApiReponseSuccess<string> {
  data: string;
}

export interface InfluencerData {
  userId: string;
  name: string;
  email: string;
  roleId: string;
  avatarUrl: string;
  backgroundUrl: string;
  doB: number[];
  gender: string;
  bio: string;
  socialMediaLinks: [{ key: string }, string];
  rating?: number | 0;
  categories: Category[];
  follower?: number | 0;
  isPublic: boolean;
  completedCampaign?: number | 0;
}

export interface ProfileRequest {
  roleId: string;
}
export interface BrandData {
  userId: string;
  name: string;
  email: string;
  roleId: string;
  avatarUrl: string;
  backgroundUrl: string;
  bio: string;
  categories: Category[];
  contacts: [{ key: string }, string];
  socialMediaLinks: [{ key: string }, string];
  establishDate: number[];
}
interface Category {
  categoryId: string;
  categoryName: string;
}
export interface EditableComponentProps {
  isEditing: boolean;
  onSave?: () => void;
}
export interface InfluencerProfileResponse extends ApiReponseSuccess<InfluencerData> {
  data: InfluencerData;
}
export interface BrandProfileResponse extends ApiReponseSuccess<BrandData> {
  data: BrandData;
}
