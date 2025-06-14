import { Button } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';

import { Icons } from '@/components/icons/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

interface Message {
  id: string;
  sender: 'me' | 'other';
  avatar: string;
  name: string;
  time: string;
  content: string;
}

const messages: Message[] = [
  {
    id: '1',
    sender: 'other',
    avatar: 'https://avatars.githubusercontent.com/u/12345678?v=4',
    name: 'Beauty Co.',
    time: '10:01',
    content: 'Xin chào! Tôi có thể giúp gì cho bạn?',
  },
  {
    id: '2',
    sender: 'other',
    avatar: 'https://avatars.githubusercontent.com/u/12345678?v=4',
    name: 'Beauty Co.',
    time: '10:03',
    content: 'Hãy trao đổi trực tiếp trong này nha',
  },
  {
    id: '3',
    sender: 'me',
    avatar: 'https://avatars.githubusercontent.com/u/12345678?v=4',
    name: 'Bạn',
    time: '10:10',
    content: 'Hãy trao đổi trực tiếp trong này nha',
  },
];

export default function ChatRoom() {
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

      <div className="flex-1 px-6 py-3 space-y-4 overflow-y-auto h-fit border-b gap-2.5">
        {messages.map((msg) =>
          msg.sender === 'other' ? (
            <div key={msg.id} className="flex items-start gap-2">
              <Avatar className="flex flex-col h-8 w-8 gap-[10px]">
                <AvatarImage src={msg.avatar} alt={msg.name} className="rounded-full" />
                <AvatarFallback>{msg.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="rounded-[8px] px-4 py-2 text-sm text-accent-foreground w-[284px] flex flex-col bg-muted">
                <div className="flex items-center justify-start">
                  <span className="text-xs font-normal text-muted-foreground">{msg.name}</span>
                  <Icons.dot className="h-6 w-6" />
                  <span className="text-xs font-normal leading-4 text-muted-foreground">
                    {msg.time}
                  </span>
                </div>
                {msg.content}
              </div>
            </div>
          ) : (
            <div key={msg.id} className="flex items-start gap-2 justify-end">
              <div className="flex flex-col items-end rounded-[8px] text-sm">
                <div className="bg-primary rounded-lg px-4 py-2 text-sm text-destructive-foreground max-w-[320px] flex flex-col">
                  <div className="flex items-center justify-end">
                    <span className="text-xs font-normal leading-4">{msg.name}</span>
                    <Icons.dot />
                    <span className="text-xs font-normal">{msg.time}</span>
                  </div>
                  {msg.content}
                </div>
              </div>
              <Avatar className="flex flex-col h-8 w-8 gap-[10px]">
                <AvatarImage src={msg.avatar} alt={msg.name} className="rounded-full" />
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
            </div>
          ),
        )}
      </div>
      {/* Input */}
      <form className="flex items-center px-6 py-4 border-t border-border rounded-[6px]">
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          className="flex-1 rounded-lg border border-border px-3 py-2 h-[40px] text-base placeholder:text-base focus:outline-none focus:ring-2 focus:ring-primary bg-muted"
        />
        <Button type="submit" className="ml-2 px-3 py-2 h-[40px] w-[40px] rounded-[6px] gap-[10px]">
          <Icons.send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
