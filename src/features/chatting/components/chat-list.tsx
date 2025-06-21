import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';

import ChatCard from './chat-card';
import ChatRoom from './chat-room';
import { useGetChatRoomQuery } from '../chat-sheet.service';

export default function ChatList() {
  const { data, isLoading } = useGetChatRoomQuery({ pageSize: 20, pageNumber: 0 });
  const rooms = data?.data || [];

  if (isLoading) {
    return (
      <div className="w-full h-[84px] px-6 py-3 flex items-center gap-4 border border-accent">
        <Skeleton className="h-12 w-12 rounded-full bg-border" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] bg-border" />
          <Skeleton className="h-4 w-[200px] bg-border" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0 overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground scrollbar-track-transparent">
      {rooms.map((room) => {
        return (
          <Sheet key={room.chatRoomId}>
            <SheetTrigger>
              <ChatCard {...room} />
            </SheetTrigger>
            <SheetContent className="w-[466px] gap-0 border-0" closeStyle="hidden">
              <SheetTitle className="hidden" />
              <ChatRoom roomName={room.roomName} chatRoomId={room.chatRoomId} />
            </SheetContent>
          </Sheet>
        );
      })}
    </div>
  );
}
