import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Eye } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import type { ApplicationByInfluencer } from '@/features/application/application.type';
import ApplicationDetail from '@/features/application/components/application-detail';
import { StatusBadge } from '@/features/application/components/status-badge';
import type { Campaign } from '@/features/common/common.type';
import { formatDate, formatLastTimeSentMessage, parseIsoToDateTime } from '@/utils/format';

interface ApplicationCardProps {
  application: ApplicationByInfluencer;
  campaignInfo: Campaign;
}
export default function ApplicationCard({ application, campaignInfo }: ApplicationCardProps) {
  const { t } = useTranslation();
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  return (
    <Card
      key={application.applicationId}
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <CardContent className="px-6">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={campaignInfo.brandAvartar || '/placeholder.svg'}
              alt={campaignInfo.brandName}
            />
            <AvatarFallback>
              {campaignInfo.imageUrl ? campaignInfo.imageUrl.charAt(0) : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex flex-row items-center justify-center">
              <h3 className="flex-1 font-semibold text-lg line-clamp-1">
                {campaignInfo.campaignName}
              </h3>
              {StatusBadge(application.status)}
            </div>
            <p className="text-sm text-muted-foreground">
              {campaignInfo.brandName} • {formatDate(campaignInfo.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Calendar className="w-4 h-4 mr-2 text-primary" />
          <span>
            {application.status === 'PENDING'
              ? `${t("applications.applied")} ${formatLastTimeSentMessage(parseIsoToDateTime(application.createdAt))} ${t("applications.ago")}`
              : `${t("applications.appliedOn")}: ${formatDate(application.createdAt)}`}
          </span>
        </div>

        <div className="flex justify-center">
          <Dialog
            open={openDialog === application.applicationId}
            onOpenChange={(open) => setOpenDialog(open ? application.applicationId : null)}
          >
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center w-full">
                <Eye className="h-4 w-4 mr-2" />
                {t("applications.viewApplication")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] sm:max-h-[85%] gap-0 p-0 pb-4" showCloseButton={false}>
              <DialogHeader className='h-fit border-b-2 border-border p-0 m-0 py-3'>
                <DialogTitle className='font-semibold text-xl text-center'>{t("applications.campaignPostBy")} {campaignInfo.brandName}</DialogTitle>
                <DialogDescription className='hidden'></DialogDescription>
              </DialogHeader>
              <ApplicationDetail application={application} campaignInfo={campaignInfo} />
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
