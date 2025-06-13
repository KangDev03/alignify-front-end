import { Input } from '@/components/ui/input';

import { Icons } from '@/components/icons/icons';

export default function ChatSearch() {
  return (
    <div className="px-3 py-3 relative">
      <Input
        placeholder="Tìm kiếm cuộc trò chuyện..."
        className="pl-9 text-base placeholder:text-base h-11"
      />
      <Icons.search className="absolute left-3 top-1/2 transform -translate-y-1/2 translate-x-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
    </div>
  );
}
