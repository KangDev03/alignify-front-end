import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SheetClose } from '@/components/ui/sheet';

import { Icons } from '@/components/icons/icons';
import { useAppSelector } from '@/hooks/redux';
import type { RootState } from '@/redux/store';
import { formatDateToTimestamp } from '@/utils/format';

import MessageCard from './message-card';
import { chatApi, useGetMessagesInRoomQuery } from '../chat-sheet.service';
import type { ChatMessage, Message } from '../chat-sheet.type';

interface ChatRoomProps {
  chatRoomId: string;
}

interface ReadStatusUpdate {
  messageId: string;
  readBy: string[];
}

interface ChatMessageState extends ChatMessage {
  isSending?: boolean;
}

export default function ChatRoom({ chatRoomId }: ChatRoomProps) {
  const [message, setMessage] = useState<string>('');
  const stompClientRef = useRef<Stomp.Client | null>(null);
  const { id: userId, token } = useAppSelector((state: RootState) => state.auth);
  const { data } = useGetMessagesInRoomQuery({ roomId: chatRoomId });
  const [messages, setMessages] = useState<ChatMessageState[]>([]);
  const messageRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const dispatch = useDispatch();
  const currentMessageRef = useRef<HTMLDivElement>(null);

  if (stompClientRef.current) {
    stompClientRef.current.debug = () => {};
  }

  useEffect(() => {
    if (data?.data) {
      setMessages(data?.data);
    }
  }, [data]);

  useEffect(() => {
    if (stompClientRef.current || !token) return;

    // const socket = new SockJS(`http://localhost:8080/ws`);
    const socket = new SockJS(`https://alignify-backend.onrender.com/ws`);
    const client = Stomp.over(socket);
    client.debug = () => {};
    stompClientRef.current = client;
    client.connect(
      { Authorization: `Bearer ${token}` },
      () => {
        client.subscribe(`/topic/messages/${chatRoomId}`, (res: Stomp.Message) => {
          try {
            const receivedMessage: ChatMessage = JSON.parse(res.body);
            setMessages((prev) => {
              const updatedMessages = prev.map((msg) =>
                msg.message.tempId === receivedMessage.message.tempId
                  ? { ...receivedMessage, isSending: false }
                  : msg,
              );
              if (!prev.some((msg) => msg.message.tempId === receivedMessage.message.tempId)) {
                updatedMessages.push(receivedMessage);
              }
              return updatedMessages;
            });
            dispatch(
              chatApi.util.invalidateTags(['ChatSheet', { type: 'ChatRoom', id: chatRoomId }]),
            );
          } catch (error) {
            console.error('Error parsing STOMP message:', error);
          }
        });
        client.subscribe(`/topic/read/${chatRoomId}`, (res: Stomp.Message) => {
          try {
            const update: ReadStatusUpdate = JSON.parse(res.body);
            setMessages((prev) =>
              prev.map((msg) =>
                msg.message.messageId === update.messageId
                  ? { ...msg, message: { ...msg.message, readBy: update.readBy } }
                  : msg,
              ),
            );
          } catch (error) {
            console.error('Error parsing STOMP read update:', error);
          }
        });
      },
      (error) => {
        console.error('STOMP connection error:', error);
      },
    );
    return () => {
      if (client.connected) {
        client.disconnect(() => {
          console.log('Disconnected');
        });
      }
      stompClientRef.current = null;
    };
  }, [chatRoomId, token, dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && stompClientRef.current && stompClientRef.current.connected) {
            const messageId = entry.target.getAttribute('data-message-id');
            if (
              messageId &&
              !messages
                .find((msg) => msg.message.messageId === messageId)
                ?.message.readBy.includes(userId!)
            ) {
              stompClientRef.current.send(
                `/app/read/${chatRoomId}`,
                {},
                JSON.stringify({ messageId }),
              );
            }
          }
        });
      },
      { threshold: 0.5 },
    );

    messageRefs.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [messages, chatRoomId, userId]);

  useEffect(() => {
    currentMessageRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [messages, data]);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (
      message.trim() &&
      stompClientRef.current &&
      stompClientRef.current.connected &&
      chatRoomId
    ) {
      const tempId = uuidv4();
      const input: Message = {
        chatRoomId,
        userId: userId ?? '',
        message,
        readBy: [userId!],
        tempId: tempId,
      };
      const currentMessage: ChatMessageState = {
        message: {
          chatRoomId,
          userId: userId!,
          message,
          readBy: [userId!],
          sendAt: formatDateToTimestamp(new Date()),
          tempId,
        },
        userDTO: {
          userId: userId!,
          name: 'Minh',
          avatarUrl:
            'https://res.cloudinary.com/dwnbcpg87/image/upload/v1750155800/alignify/images/878caae2-4a32-4a85-855f-44a40fce0073.jpg',
        },
        isSending: true,
      };
      setMessages((prev) => {
        if (prev.some((msg) => msg.message.tempId === tempId)) {
          return prev;
        }
        return [...prev, currentMessage];
      });
      stompClientRef.current.send(`/app/chat/${chatRoomId}`, {}, JSON.stringify(input));
      setMessage('');
      dispatch(chatApi.util.invalidateTags(['ChatSheet', { type: 'ChatRoom', id: chatRoomId }]));
    }
  };

  return (
    <div className="flex flex-col h-full w-[466px] rounded-lg overflow-hidden border-2 border-border bg-background">
      <div className="flex items-center justify-between h-16 px-6 border-b border-border">
        <SheetClose title="arrow-left">
          <Icons.arrowleft className="h-4 w-4" />
        </SheetClose>
        <h2 className="text-lg font-bold w-fit">Chiến dịch thời trang tuần lễ thời trang</h2>
        <SheetClose title="x">
          <Icons.x className="h-6 w-6" />
        </SheetClose>
      </div>
      <div className="flex-1 px-6 py-3 space-y-4 overflow-y-auto h-fit border-b gap-2.5 overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground scrollbar-track-transparent">
        {messages.map((msg) => (
          <MessageCard
            key={msg.message.messageId || msg.message.tempId}
            msg={msg.message}
            userdto={msg.userDTO}
            me={msg.userDTO.userId === userId}
            isSending={msg.isSending}
            ref={(el) => {
              if (el && msg.message.messageId) {
                messageRefs.current.set(msg.message.messageId, el);
                el.setAttribute('data-message-id', msg.message.messageId);
              }
            }}
          />
        ))}
        <div ref={currentMessageRef} />
      </div>
      <form className="flex items-center px-6 py-4 border-t border-border rounded-[6px]">
        <Input
          value={message}
          onChange={handleMessageChange}
          className="flex-1 rounded-lg border border-border px-3 py-2 h-[40px] text-base placeholder:text-base"
          placeholder="Nhập tin nhắn..."
        />
        <Button
          disabled={!message.trim()}
          onClick={sendMessage}
          type="submit"
          className="ml-2 px-3 py-2 h-[40px] w-[40px] rounded-[6px] gap-[10px]"
        >
          <Icons.send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
