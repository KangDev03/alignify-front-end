import { useTranslation } from "react-i18next";

import { Badge } from "@/components/ui/badge";

import { Icons } from "@/components/icons/icons";

export const StatusBadge = (status: string) => {
  const { t } = useTranslation();

  switch (status) {
    case "PENDING":
      return (
        <Badge variant="pending">
          <Icons.clock4 size={12} className="mt-0.5" />
          <p className="leading-6">{t("applications.status.pending")}</p>
        </Badge>
      );
    case "ACCEPTED":
      return (
        <Badge variant="accepted">
          <Icons.circleCheckBig size={12} className="mt-0.5" />
          <p className="leading-6">{t("applications.status.accepted")}</p>
        </Badge>
      );
    case "REJECTED":
      return (
        <Badge variant="rejected">
          <Icons.circleX size={12} className="mt-0.5" />
          <p className="leading-6">{t("applications.status.rejected")}</p>
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