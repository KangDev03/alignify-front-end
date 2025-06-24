export interface NotificationSending {
  userId: string;
  content: string;
}

export interface RecievedNotification {
  notificationId: string | null;
  userId: string;
  avatarUrl: string;
  name: string;
  content: string;
  createdAt: number[];
  isRead: boolean;
}
