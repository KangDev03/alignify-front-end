import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { Icons } from '@/components/icons/icons';

import ChatList from './chat-list';
import ChatSearch from './chat-search';

export default function ChatSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          <Icons.messageCircle className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[466px] gap-0" closeStyle="hidden">
        <SheetHeader className="flex flex-col items-start justify-center gap-4 p-6 border-b border-border">
          <SheetTitle className="flex flex-row w-full">
            <h1 className="text-xl font-semibold leading-6 flex-1">Tin nhắn</h1>
            <SheetClose title="x">
              <Icons.x className="h-5 w-5" />
            </SheetClose>
          </SheetTitle>
          <ChatSearch />
        </SheetHeader>
        <ChatList />
      </SheetContent>
    </Sheet>
  );
}
