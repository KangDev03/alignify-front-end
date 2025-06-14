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
      <SheetContent className="w-[466px] gap-0">
        {/* xoa gap mac dinh cua SheetContent */}
        <SheetHeader className="flex flex-col items-start justify-center gap-4 p-6 border-b border-border">
          {/* them padding, them border bottom, them display flex */}
          <SheetTitle className="text-xl font-semibold leading-6">
            {/* them leading~line-height */}
            <h1>Tin nhắn</h1>
          </SheetTitle>
          <ChatSearch />
        </SheetHeader>
        <ChatList />
      </SheetContent>
    </Sheet>
  );
}
