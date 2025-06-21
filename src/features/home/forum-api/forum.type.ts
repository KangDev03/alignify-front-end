import type { ApiReponseSuccess } from "@/features/common/common.type";

export interface ContentPostingRequest {
  pageNumber: number | 0;
  pageSize: number | 10;
}

export interface ContentPosting {
  contentId: string;
  contentName: string;
  userId: string;
  userName: string;
  content: string;
  imageUrl: string;
  categories: Category[] | [];
  createdDate: number[];
  isPublic: boolean;
  commentCount: number;
  likeCount: number;
  userAvatar?: string | null;
}
interface Category {
  categoryId: string;
  categoryName: string;
}
export interface ContentPostingResponse extends ApiReponseSuccess<ContentPosting[]> {
  data: ContentPosting[];
}
