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
  avatarUrl?: string | null;
  backgroundUrl?: string | null;
  doB?: number[] | null;
  gender: string;
  bio?: string | null;
  socialMediaLinks?: [{ key: string }, string] | [];
  rating?: number | 0;
  categories?: Category[] | null;
  follower?: number | 0;
  isPublic: boolean;
  completedCampaign?: number | 0;
}
export interface TopInfluencer {
  userId: string;
  name: string;
  avatarUrl?: string | null;
  follower?: number | 0;
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
export interface TopInfluencerResponse extends ApiReponseSuccess<TopInfluencer> {
  data: TopInfluencer;
}
export interface BrandProfileResponse extends ApiReponseSuccess<BrandData> {
  data: BrandData;
}
