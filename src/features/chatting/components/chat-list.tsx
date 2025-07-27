import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { useAppSelector } from '@/hooks/redux';
import { getStompClient } from '@/lib/stom-client';
import type { RootState } from '@/redux/store';

import ChatCard from './chat-card';
import ChatRoom from './chat-room';
import { setChatRoomsSlice } from '../chat-sheet.slice';
import type { IChatRoom } from '../chat-sheet.type';

export default function ChatList() {
  const dispatch = useDispatch();
  const { id: userId, token } = useAppSelector((state: RootState) => state.auth);
  const { chatRooms } = useAppSelector((state: RootState) => state.chatSheet);

  useEffect(() => {
    if (token) {
      getStompClient(token).then((client) => {
        if (client.connected) {
          client.send(
            `/app/rooms`,
            { Authorization: `Bearer ${token}` },
            JSON.stringify({ pageNumber: 0, pageSize: 20 }),
          );
        }
      });
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    let subRoom: any;
    getStompClient(token).then((client) => {
      subRoom = client.subscribe(`/topic/rooms/${userId}`, (res: any) => {
        try {
          const recievedRooms: IChatRoom[] = JSON.parse(res.body);
          dispatch(setChatRoomsSlice(recievedRooms));
        } catch (error) {
          console.error('Error parsing STOMP message:', error);
        }
      });
    });
    return () => {
      if (subRoom) subRoom.unsubscribe();
    };
  }, [token, userId, dispatch]);

  // if (isLoading) {
  //   return (
  //     <div className="w-full h-[84px] px-6 py-3 flex items-center gap-4 border border-accent">
  //       <Skeleton className="h-12 w-12 rounded-full bg-border" />
  //       <div className="space-y-2">
  //         <Skeleton className="h-4 w-[250px] bg-border" />
  //         <Skeleton className="h-4 w-[200px] bg-border" />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col gap-0 overflow-auto scrollbar-small">
      {chatRooms.map((room) => {
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
