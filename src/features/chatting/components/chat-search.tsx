import { Input } from '@/components/ui/input';

import { Icons } from '@/components/icons/icons';
import { cn } from '@/lib/utils';

export default function ChatSearch({ className }: { className?: string }) {
  return (
    <div className="w-[418px] relative">
      <Input
        placeholder="Tìm kiếm tin nhắn hoặc tên người dùng..."
        className={cn(
          'px-[9px] py-2 pl-11 placeholder:text-base h-10 leading-6 gap-[17px] rounded-[6px] font-semibold placeholder:font-normal placeholder: text-base',
          className,
        )}
      />
      <Icons.search className="absolute left-1 top-1/2 transform -translate-y-1/2 translate-x-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
    </div>
  );
}
