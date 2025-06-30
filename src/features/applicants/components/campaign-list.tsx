import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type { RootState } from '@/redux/store';

import { setSelectedCampaign } from '../applicant.slice';
import type { ApplicantsByBrand } from '../applicant.type';

export function CampaignList({
  applicationPlusCampaign,
}: {
  applicationPlusCampaign: ApplicantsByBrand[];
}) {
  const dispatch = useAppDispatch();
  const { selectCapaignId } = useAppSelector((state: RootState) => state.applicant);

  return (
    <div className="w-1/3 border rounded-lg py-4 bg-card pr-0">
      <h2 className="text-xl font-semibold mb-2 px-4">Danh sách chiến dịch</h2>
      <div className="space-y-3 overflow-auto scrollbar-thin h-[94%] px-4 py-2">
        {applicationPlusCampaign.map((appPlusCam) => {
          const campaign = appPlusCam.campaignResponse;
          return (
            <Card
              key={campaign.campaignId}
              className={`cursor-pointer transition-all hover:shadow-md py-6 ${selectCapaignId === campaign.campaignId ? 'ring-2 ring-primary' : ''
                }`}
              onClick={() => dispatch(setSelectedCampaign(campaign.campaignId))}
            >
              <CardContent className="px-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-sm leading-tight line-clamp-1">
                    {campaign.campaignName}
                  </h3>
                  <p className="text-sm text-muted-foreground">{campaign.brandName}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="recruiting" className="text-xs">
                      Đang tuyển
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {campaign.applicationTotal} ứng viên
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
