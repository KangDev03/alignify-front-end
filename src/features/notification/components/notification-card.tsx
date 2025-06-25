import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { cn } from '@/lib/utils';
import { formatLastTimeSentMessage, parseTimestampToDate } from '@/utils/format';

import type { RecievedNotification } from '../notification.type';

export default function NotificationCard({ notification }: { notification: RecievedNotification }) {
  const [title, description] = notification.content.split('\n');
  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 transition-colors cursor-pointer group border border-border h-[100px]',
        notification.isRead
          ? 'bg-muted-foreground/20 hover:bg-muted-foreground/30'
          : 'hover:bg-muted-foreground/35',
      )}
    >
      <div className="relative">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={notification.avatarUrl || '/logo192.png'}
            alt="avatar"
            className="object-cover"
          />
          <AvatarFallback>{notification.name.charAt(0) ?? 'U'}</AvatarFallback>
        </Avatar>
        {notification.isRead && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-white" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-foreground">{title}</div>
        {description && (
          <div className="text-xs text-muted-foreground line-clamp-2">{description}</div>
        )}
        <div className="text-xs text-muted-foreground mt-1">
          {formatLastTimeSentMessage(parseTimestampToDate(notification.createdAt))} trước
        </div>
      </div>
    </div>
  );
}
