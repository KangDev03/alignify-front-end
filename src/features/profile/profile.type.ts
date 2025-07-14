import type { ApiReponseSuccess } from '../common/common.type';
import type { Contact, SocialMedia } from '../setting/setting.type';

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
  doB?: string | null;
  gender: string;
  bio?: string | null;
  socialMediaLinks?: SocialMedia[];
  rating?: number | 0;
  categories?: Category[] | null;
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
  contacts: Contact[];
  socialMediaLinks: SocialMedia[];
  establishDate: string;
  totalCampaign: number | 0;
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
