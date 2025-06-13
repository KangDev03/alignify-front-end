import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { Icons } from '@/components/icons/icons';

import ChatList from './chat-list';
import ChatSearch from './chat-search';

export default function ChatSheet() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="sm">
          <Icons.messageCircle className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[466px]">
        <SheetHeader>
          <SheetTitle className="text-2xl md:text-2xl font-bold p-2.5 mt-4.0" asChild>
            <h1>Tin nhắn</h1>
          </SheetTitle>
          <ChatSearch />
        </SheetHeader>
        {/* <ChatCard
          userName="TLee."
          userAvatar="/avatar-chat.jpg"
          campaignName="Chiến dịch tuần lễ thời trang"
          lastMessage="Chúng tôi rất hài lòng với kết quả chiến dịch!"
          sendAt={new Date(Date.now() - 1000 * 60 * 60 * 2)}
          status="unread"
        /> */}
        <ChatList />
      </SheetContent>
    </Sheet>
  );
}
