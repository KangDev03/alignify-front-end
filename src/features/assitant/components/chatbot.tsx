import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Icons } from '@/components/icons/icons';
import { getStompClient } from '@/lib/stom-client';
import type { RootState } from '@/redux/store';

import { useGetAllAssistantMessageQuery } from '../assistant.service';
import type {
  AssistantMessage,
  AssistantRequest,
  AssistantResponse,
  CampaignRecommendation,
} from '../assistant.type';

export default function ChatBot() {
  const [message, setMessage] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const { token, id: userId } = useSelector((state: RootState) => state.auth);
  const {
    data: assistantMessagesRaw,
    isLoading: isAssistantLoading,
    isSuccess,
  } = useGetAllAssistantMessageQuery();
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const currentMessageRef = useRef<HTMLDivElement>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (messages.length === 0)
      setMessages([
        {
          roomId: userId!,
          content: 'Xin chào! Tôi có thể giúp gì cho bạn?',
          createdAt: DateTime.now().setZone('Asia/Ho_Chi_Minh').toISO()!,
          id: uuidv4(),
          messageType: 'TEXT',
          senderId: 'gemini_assistant',
          senderType: 'ASSISTANT',
        },
      ]);
  }, [messages, messages.length, userId]);

  useEffect(() => {
    if (assistantMessagesRaw && assistantMessagesRaw.data && assistantMessagesRaw.data.length > 0) {
      setMessages(assistantMessagesRaw.data);
    }
  }, [assistantMessagesRaw]);

  useEffect(() => {
    if (!token) return;
    let subMsg: any;
    getStompClient(token).then((client) => {
      subMsg = client.subscribe(`/topic/assistant/influencers/${userId}`, (res: any) => {
        try {
          const received: AssistantResponse = JSON.parse(res.body);
          console.log(received);
          if (received) {
            setMessages((prev) => {
              const newAssistMessagges = [...prev];
              const newData = received.data.filter(
                (msg) => !newAssistMessagges.some((amsg) => amsg.id === msg.id),
              );
              return [...prev, ...newData];
            });
          }
        } catch (error) {
          console.error('Error parsing STOMP message:', error);
        }
      });
    });
    return () => {
      if (subMsg) subMsg.unsubscribe();
    };
  }, [userId, token, messages]);
  const sendMessage = () => {
    if (message.trim() && token && userId) {
      getStompClient(token).then((client) => {
        if (client.connected) {
          const input: AssistantRequest = {
            question: message,
          };
          const newAssistMessagge: AssistantMessage = {
            roomId: userId!,
            content: message,
            createdAt: DateTime.now().setZone('Asia/Ho_Chi_Minh').toISO()!,
            id: uuidv4(),
            messageType: 'TEXT',
            senderId: userId!,
            senderType: 'USER',
          };
          setMessages((prev) => [...prev, newAssistMessagge]);
          setIsThinking(true);
          if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
          loadingTimeoutRef.current = setTimeout(() => {
            setIsThinking(false);
          }, 60000);
          client.send(
            `/app/assistant/influencers/${userId}`,
            { Authorization: `Bearer ${token}` },
            JSON.stringify(input),
          );
          setMessage('');
        }
      });
    }
  };

  const isLoading = isThinking || isAssistantLoading;

  useEffect(() => {
    if (isLoading && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.senderType === 'ASSISTANT') {
        setIsThinking(false);
        if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
      }
    }
  }, [messages, isLoading, assistantMessagesRaw]);

  useEffect(() => {
    currentMessageRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [messages, messages.length]);

  return (
    <>
      {!open && (
        <Button
          variant="default"
          className="fixed bottom-6 right-8 size-14 rounded-full flex justify-center items-center z-50 shadow-lg"
          onClick={() => setOpen(true)}
        >
          <Icons.bot className="size-6" />
        </Button>
      )}
      {open && (
        <div className="fixed bottom-6 right-8 w-1/3 h-[500px] rounded-xl shadow-2xl flex flex-col z-50 border border-muted-foreground bg-background">
          <div className="flex items-center justify-between px-4 py-2 border-b">
            <span className="font-bold text-primary">Chat Bot</span>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <Icons.x className="size-5" />
            </Button>
          </div>
          <div className="flex-1 flex flex-col gap-2 overflow-y-auto scrollbar-small p-3">
            {isSuccess &&
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderType === 'USER' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`rounded-lg text-sm max-w-[80%] wrap-anywhere ${
                      msg.senderType === 'USER'
                        ? 'bg-primary text-white'
                        : 'bg-background text-primary border border-muted-foreground'
                    }`}
                  >
                    <div className="">
                      {msg.messageType === 'TEXT' && (
                        <p className="px-3 py-2 whitespace-pre-wrap text-wrap break-words">
                          {msg.content.replace('[', '').replace(']', '')}
                        </p>
                      )}
                      {msg.messageType === 'CAMPAIGN_RECOMMENDATIONS' && (
                        <div className="flex flex-col gap-3">
                          {JSON.parse(msg.content).map((campaign: CampaignRecommendation) => (
                            <div
                              key={campaign.campaignId}
                              className="relative border rounded-lg shadow-sm flex gap-3 items-center overflow-hidden"
                            >
                              <div className="flex-1 relative z-10 p-3">
                                <div className="font-semibold text-primary text-sm mb-1 break-words">
                                  {campaign.campaignName}
                                </div>
                                <div className="text-xs text-muted-foreground mb-1">
                                  Brand: <span className="font-medium">{campaign.brandName}</span>
                                </div>
                                <div className="flex flex-wrap gap-1 mb-1">
                                  {campaign.categoryName.map((cat, idx) => (
                                    <p
                                      key={idx}
                                      className="bg-muted px-2 py-0.5 rounded text-xs capitalize break-words"
                                    >
                                      {cat}
                                    </p>
                                  ))}
                                </div>
                                <div className="text-xs text-gray-600 mb-2 break-words">
                                  {campaign.reasonForMatch}
                                </div>
                                <div className="w-full">
                                  <img
                                    src={campaign.imageUrl}
                                    alt={campaign.campaignName}
                                    className="object-cover rounded-md border shadow-sm"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-lg border bg-background shadow-sm p-3 max-w-[80%] animate-pulse flex items-center gap-2">
                  <Icons.bot className="size-5 text-primary" />
                  <span className="text-primary text-sm">
                    {isThinking ? 'Đang suy nghĩ ...' : 'Đang tải ...'}
                  </span>
                </div>
              </div>
            )}
            <div ref={currentMessageRef} />
          </div>
          <div className="flex gap-2 p-3 border-t">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Nhập tin nhắn..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage();
              }}
              className="flex-1"
            />
            <Button onClick={() => sendMessage()} variant="default">
              Gửi
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
