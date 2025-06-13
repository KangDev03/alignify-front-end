import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import ChatCard from './chat-card';
import ChatRoom from './chat-room';

type ChatStatus = 'unread' | 'read';

interface ChatListItem {
  id: string;
  userName: string;
  userAvatar: string;
  campaignName: string;
  lastMessage: string;
  sendAt: Date;
  status: ChatStatus;
}

const chatList: ChatListItem[] = [
  {
    id: '1',
    userName: 'TLee.',
    userAvatar: '/avatar-chat.jpg',
    campaignName: 'Chiến dịch tuần lễ thời trang',
    lastMessage: 'Chúng tôi rất hài lòng với kết quả chiến dịch!',
    sendAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    status: 'unread',
  },
  {
    id: '2',
    userName: 'Gucci.',
    userAvatar: '/avatar-chat.jpg',
    campaignName: 'Chiến dịch tuần lễ thời trang mùa đông',
    lastMessage: 'Chúng tôi rất hài lòng với kết quả chiến dịch!',
    sendAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    status: 'unread',
  },
  {
    id: '3',
    userName: 'FM style.',
    userAvatar: '/avatar-chat.jpg',
    campaignName: 'Chiến dịch tuần lễ thời trang mùa hè',
    lastMessage: 'Chúng tôi rất hài lòng với kết quả chiến dịch!',
    sendAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    status: 'unread',
  },
  {
    id: '4',
    userName: 'Dior.',
    userAvatar: '/avatar-chat.jpg',
    campaignName: 'Chiến dịch tuần lễ thời trang mùa thu',
    lastMessage: 'Chúng tôi rất hài lòng với kết quả chiến dịch!',
    sendAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    status: 'unread',
  },
];

export default function ChatList() {
  return (
    <div className="flex flex-col gap-0 divide-y divide-[#64748B33]">
      {chatList.map((chat) => {
        const { id, ...data } = chat;
        return (
          <Sheet key={id}>
            <SheetTrigger>
              <ChatCard key={id} {...data} />
            </SheetTrigger>
            <SheetContent className="w-[466px]" closeStyle="hidden">
              <ChatRoom />
            </SheetContent>
          </Sheet>
        );
      })}
    </div>
  );
}
