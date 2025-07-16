import { useNavigate } from 'react-router';
import { Check, Star, X } from 'lucide-react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { Icons } from '@/components/icons/icons';
import type { Campaign } from '@/features/common/common.type';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useSendNotification } from '@/hooks/useSendNotification';
import type { RootState } from '@/redux/store';
import { formatNumber } from '@/utils/format';

import { useConfirmApplicationMutation } from '../applicant.service';
import { setConfirmApplicant } from '../applicant.slice';
import type { ApplicantByBrand } from '../applicant.type';

export function ApplicantCard({
  applicant,
  status,
}: {
  applicant: ApplicantByBrand;
  status: 'waiting' | 'accepted' | 'rejected';
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [confirmApplicant, { isLoading }] = useConfirmApplicationMutation();
  const { applicants: allAplicants, selectCapaignId } = useAppSelector(
    (state: RootState) => state.applicant,
  );
  const { name, id, avatarUrl } = useAppSelector((state: RootState) => state.auth);
  const sendNotification = useSendNotification();

  const campaign: Campaign | undefined = allAplicants?.find(
    (item) => item.campaignResponse.campaignId === selectCapaignId,
  )?.campaignResponse;

  const handleConfirmApplicant = async (accepted: boolean) => {
    try {
      await confirmApplicant({
        accepted: accepted,
        applicationId: applicant.applicationId,
      }).unwrap();
      sendNotification({
        userId: applicant.influencerId,
        content: accepted
          ? `Đã chấp nhận đơn của bạn\n${campaign?.campaignName}`
          : `Đã từ chối đơn của bạn\n${campaign?.campaignName}`,
        name: name!,
        avatarUrl: avatarUrl!,
      });
      sendNotification({
        userId: id!,
        content: accepted
          ? `Bạn đã chấp nhận đơn của ${applicant.influencerName}`
          : `Bạn đã từ chối đơn của ${applicant.influencerName}`,
        name: name!,
        avatarUrl: avatarUrl!,
      });
      dispatch(setConfirmApplicant({ applicationId: applicant.applicationId, accepted }));
      toast.success(`Xác nhận ứng viên ${applicant.influencerName} thành công!`);
    } catch (error) {
      console.error('Error confirming applicant:', error);
      toast.error('Xác nhận ứng viên thất bại. Vui lòng thử lại sau.');
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={applicant.avatarUrl || '/placeholder.svg'}
            alt={applicant.influencerName}
            className="object-cover"
          />
          <AvatarFallback>{applicant.influencerName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{applicant.influencerName}</p>
          <p className="text-sm text-muted-foreground">
            {formatNumber(applicant.follower ?? 0)} người theo dõi
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
            <div className="flex items-center font-semibold">
              <Star className="h-3 w-3 text-yellow-400 mr-1 fill-yellow-400" />
              {applicant.rating}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {status === 'waiting' && (
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate(`/influencer/${applicant.influencerId}`)}
            >
              <Icons.user className="h-4 w-4 mr-1" />
              Hồ sơ
            </Button>
            <Button onClick={() => handleConfirmApplicant(true)} size="sm" variant="default">
              {isLoading ? (
                <>
                  <Icons.loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Chấp nhận
                </>
              )}
            </Button>
            <Button onClick={() => handleConfirmApplicant(false)} size="sm" variant="destructive">
              {isLoading ? (
                <>
                  <Icons.loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                <>
                  <X className="h-4 w-4 mr-1" />
                  Từ chối
                </>
              )}
            </Button>
          </>
        )}
        {status === 'accepted' && (
          <Badge variant="accepted">
            <Check size={12} />
            Đã chấp nhận
          </Badge>
        )}
        {status === 'rejected' && (
          <Badge variant="rejected">
            <X size={12} />
            Đã từ chối
          </Badge>
        )}
      </div>
    </div>
  );
}
