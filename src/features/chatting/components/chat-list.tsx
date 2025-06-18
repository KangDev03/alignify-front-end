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
    userAvatar:
      'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/291865434_559023185864527_5320074032470722453_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=8LnfIWPI49QQ7kNvwF-hZb4&_nc_oc=AdlQKl24jfU8OrwXXm3uzW3qzJdn4H5lPQGopMfXiZvucu1KxenIFh5UlTYpqw1KNcY&_nc_zt=23&_nc_ht=scontent.fdad3-5.fna&_nc_gid=8_s_6IGposvJYDu8kBHqDQ&oh=00_AfMGsHitbIhEg5a-jrLl-RqC8cbMsgAcwTn9sgqiqzVaow&oe=6852DE9E',
    campaignName: 'Chiến dịch trang sức',
    lastMessage: 'Chúng tôi rất hài lòng với kết quả chiến dịch!',
    sendAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    status: 'unread',
  },
  {
    id: '2',
    userName: 'Gucci.',
    userAvatar: '',
    campaignName: 'Chiến dịch tuần lễ thời trang mùa đông',
    lastMessage: 'Chúng tôi rất hài lòng với kết quả chiến dịch!',
    sendAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    status: 'unread',
  },
  {
    id: '3',
    userName: 'FM style.',
    userAvatar: 'https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-FM-yellow.png',
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
    <div className="flex flex-col gap-0">
      {chatList.map((chat) => {
        const { id, ...data } = chat;
        return (
          <Sheet key={id}>
            <SheetTrigger>
              <ChatCard key={id} {...data} />
            </SheetTrigger>
            <SheetContent className="w-[466px] gap-0 border-0" closeStyle="hidden">
              <ChatRoom />
            </SheetContent>
          </Sheet>
        );
      })}
    </div>
  );
}
