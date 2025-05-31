import type { ApiReponseSuccess } from '../common.type';

export interface ChangeAvatarRequest {
  id: string | null;
  formData: FormData;
}

export interface ChangeAvatarResponses extends ApiReponseSuccess<string> {
  data: string;
}
