export interface ApiReponseSuccess<T> {
  status: number | string;
  message: string;
  data: T | null;
  timestamp: Date;
  path?: string;
}

export interface ApiReponseError {
  status: number | string;
  error: string;
  timestamp: Date;
  path?: string;
}
