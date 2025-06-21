import type { ApiReponseSuccess } from '../common/common.type';

export interface ChangeAvatarRequest {
  image: FormData;
}

export interface ChangeAvatarResponses extends ApiReponseSuccess<string> {
  data: string;
}
