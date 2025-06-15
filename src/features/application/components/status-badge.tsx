import { Badge } from "@/components/ui/badge";

import { Icons } from "@/components/icons/icons";

export const StatusBadge = (status: string) => {
  switch (status) {
    case "Chờ duyệt":
      return (
        <Badge variant="pending">
          <Icons.clock4 size={12} className="mt-0.5" />
          <p className="leading-6">{status}</p>
        </Badge>
      );
    case "Đã chấp nhận":
      return (
        <Badge variant="accepted">
          <Icons.circleCheckBig size={12} className="mt-0.5" />
          <p className="leading-6">{status}</p>
        </Badge>
      );
    case "Bị từ chối":
      return (
        <Badge variant="rejected">
          <Icons.circleX size={12} className="mt-0.5" />
          <p className="leading-6">{status}</p>
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