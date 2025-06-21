import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { useAppSelector } from '@/hooks/redux';
import type { RootState } from '@/redux/store';
import { formatLastTimeSentMessage, parseTimestampToDate } from '@/utils/format';

import type { IChatRoom } from '../chat-sheet.type';

export default function ChatCard({
  name,
  roomAvatarUrl,
  roomName,
  sendAt,
  lastMessage,
  chatRoomId,
  readBy,
}: IChatRoom) {
  const { id } = useAppSelector((state: RootState) => state.auth);
  return (
    <div
      key={chatRoomId}
      className="w-full h-[84px] px-6 py-3 flex items-center gap-4 border border-accent bg-background relative cursor-pointer hover:bg-muted dark:hover:bg-muted transition-colors duration-200"
    >
      <Avatar className="h-12 w-12 flex-shrink-0">
        <AvatarImage src={roomAvatarUrl || '/placeholder.svg'} alt={roomName} />
        <AvatarFallback>{roomName.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 flex flex-col min-w-0 items-start">
        <Tooltip>
          <TooltipTrigger>
            <h3 className="font-medium text-sm truncate w-[300px] line-clamp-1 text-left">
              {roomName}
            </h3>
          </TooltipTrigger>
          <TooltipContent
            className="bg-card-foreground backdrop-blur-sm "
            toolColor="bg-card-foreground fill-card-foreground"
          >
            <p className="font-medium text-xs">{roomName}</p>
          </TooltipContent>
        </Tooltip>
        <div className="flex items-center gap-2 text-background mt-0.5">
          <span className="text-xs truncate text-muted-foreground">{name}</span>
          <span className="w-1 h-1 bg-muted-foreground rounded-full inline-block" />
          <span className="text-xs truncate text-muted-foreground">
            {formatLastTimeSentMessage(parseTimestampToDate(sendAt))} trước
          </span>
        </div>
        <p className="text-sm text-muted-foreground truncate mt-1 w-full line-clamp-1 text-left">
          {lastMessage}
        </p>
      </div>
      {!readBy.includes(id!) && (
        <span className="absolute right-6 top-1/2 -translate-y-1/2 w-3 h-3 bg-destructive rounded-full" />
      )}
    </div>
  );
}
