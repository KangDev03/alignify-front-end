import type { ApiReponseSuccess } from '../common/common.type';

export interface NotificationSending {
  userId: string;
  content: string;
  name?: string;
  avatarUrl?: string;
}

export interface RecievedNotification {
  notificationId: string | null;
  userId: string;
  avatarUrl: string;
  name: string;
  content: string;
  createdAt: string;
  isRead: boolean;
}

export interface NotificationResponse extends ApiReponseSuccess<RecievedNotification[]> {
  data: RecievedNotification[];
}
