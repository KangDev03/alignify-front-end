import { forwardRef } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

import type { UserDTO } from '@/features/common/common.type';
import { formatTime, parseTimestampToDate } from '@/utils/format';

import type { Message } from '../chat-sheet.type';

interface MessageCardProps {
  msg: Message;
  userdto: UserDTO;
  me?: boolean;
  isSending?: boolean;
}

const MessageCard = forwardRef<HTMLDivElement, MessageCardProps>(
  ({ msg, userdto, me = true, isSending = false }, ref) => {
    if (userdto.name === '#SYS')
      return <p className="text-center text-muted-foreground text-sm">{msg.message}</p>;
    return me! ? (
      <div ref={ref} className="flex items-start gap-2 justify-end">
        <div className="flex flex-col items-end text-sm">
          <div className="bg-primary rounded-xl p-2 text-sm text-destructive-foreground max-w-[320px] flex flex-col items-end">
            {msg.message}
          </div>
          <div className="flex items-center justify-end gap-1.5 text-muted-foreground">
            {isSending ? (
              <small>Đang gửi</small>
            ) : (
              msg.sendAt && <small>{formatTime(parseTimestampToDate(msg.sendAt))}</small>
            )}
          </div>
        </div>
        <HoverCard>
          <HoverCardTrigger>
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={userdto.avatarUrl!}
                alt={userdto.name}
                className="rounded-full object-cover h-8 w-8"
              />
              <AvatarFallback>{userdto.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </HoverCardTrigger>
          <HoverCardContent
            side="bottom"
            align="center"
            sideOffset={3}
            className="bg-card-foreground/90 rounded-lg border-none shadow-lg px-3 py-1 w-fit text-xs backdrop-blur-sm "
          >
            <div className="flex flex-col gap-2">
              <p className="text-card">{'Bạn'}</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    ) : (
      <div ref={ref} className="flex items-start gap-2">
        <HoverCard>
          <HoverCardTrigger>
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={userdto.avatarUrl || ''}
                alt={userdto.name}
                className="rounded-full object-cover h-8 w-8"
              />
              <AvatarFallback className="flex justify-center items-center">
                {userdto.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </HoverCardTrigger>
          <HoverCardContent
            side="left"
            align="center"
            sideOffset={3}
            className="bg-card-foreground/90 rounded-lg border-none shadow-lg px-3 py-1 w-fit text-xs backdrop-blur-sm "
          >
            <div className="flex flex-col gap-2">
              <p className="text-card">{userdto.name}</p>
            </div>
          </HoverCardContent>
        </HoverCard>

        <div className="flex flex-col items-start text-sm">
          <div className="bg-muted-foreground/25 rounded-xl p-2 text-sm text-accent-foreground max-w-[320px] flex flex-col items-end">
            {msg.message}
          </div>
          <div className="flex items-center justify-end gap-1.5 text-muted-foreground">
            {msg.sendAt && <small>{formatTime(parseTimestampToDate(msg.sendAt))}</small>}
          </div>
        </div>
      </div>
    );
  },
);

MessageCard.displayName = 'MessageCard';

export default MessageCard;
