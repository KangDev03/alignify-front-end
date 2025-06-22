import { Badge } from '@/components/ui/badge';

import { Icons } from '@/components/icons/icons';

export const StatusBadge = (status: string) => {
  switch (status) {
    case 'PENDING':
      return (
        <Badge variant="pending">
          <Icons.clock4 size={12} className="mt-0.5" />
          <p className="leading-6">Chưa bắt đầu</p>
        </Badge>
      );
    case 'RECRUITING':
      return (
        <Badge variant="default">
          <Icons.circleCheckBig size={12} className="mt-0.5" />
          <p className="leading-6">Đang diễn ra</p>
        </Badge>
      );
    case 'COMPLETED':
      return (
        <Badge variant="accepted">
          <Icons.circleX size={12} className="mt-0.5" />
          <p className="leading-6">Đã kết thúc</p>
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="rounded-full">
          {status}
        </Badge>
      );
  }
};
