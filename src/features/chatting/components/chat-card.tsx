import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ChatCardProps {
  key: string;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  sendAt: Date;
  campaignName: string;
  status: 'read' | 'unread';
}

export default function ChatCard({
  userName,
  userAvatar,
  campaignName,
  sendAt,
  lastMessage,
  status,
  key,
}: ChatCardProps) {
  return (
    <div
      key={key}
      className="w-full h-[84px] px-6 py-3 flex items-center gap-4 border border-accent bg-background relative cursor-pointer"
    >
      {/* sua lai thanh border bottom */}
      <Avatar className="h-12 w-12 flex-shrink-0">
        <AvatarImage src={userAvatar || '/placeholder.svg'} alt={userName} />
        <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 flex flex-col min-w-0 items-start">
        <h3 className="font-medium text-sm truncate">{campaignName}</h3>
        <div className="flex items-center gap-2 text-background mt-0.5">
          <span className="text-xs truncate text-muted-foreground">{userName}</span>
          <span className="w-1 h-1 bg-muted-foreground rounded-full inline-block" />
          <span className="text-xs truncate text-muted-foreground">
            {sendAt.getHours()} giờ trước
          </span>
        </div>
        <p className="text-sm text-muted-foreground truncate mt-1">{lastMessage}</p>
      </div>
      {status === 'unread' && (
        <span className="absolute right-6 top-1/2 -translate-y-1/2 w-3 h-3 bg-destructive rounded-full" />
      )}
    </div>
  );
}
