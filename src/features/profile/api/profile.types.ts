import type { ApiReponseSuccess } from '@/features/common/common.type';

export interface ProfileRequest {
  roleId: string;
}

export interface InfluencerProfile {
  userId: string;
  name: string;
  email: string;
  roleId: string;
  avartarUrl: string;
  backgroundUrl: string;
  Dob: number[];
  gender: string;
  bio: string;
  socialMediaLinks: [{ key: string }, string];
  rating: number;
  categories: Category[];
  follower: number;
  isPublic: boolean;
}

export interface BrandProfile {
  userId: string;
  name: string;
  email: string;
  roleId: string;
  avartarUrl: string;
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
export interface InfluencerProfileResponse extends ApiReponseSuccess<InfluencerProfile> {
  data: InfluencerProfile;
}
export interface BrandProfileResponse extends ApiReponseSuccess<BrandProfile> {
  data: BrandProfile;
}
