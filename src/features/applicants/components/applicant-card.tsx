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
  console.log(applicant);
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
          <p className="text-sm text-muted-foreground">{applicant.follower} followers</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
            <div className="flex items-center">
              <Star className="h-3 w-3 text-yellow-500 mr-1" />
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
              <Check className="h-4 w-4 mr-1" />
              Chấp nhận {isLoading && <span className="animate-pulse">...</span>}
            </Button>
            <Button onClick={() => handleConfirmApplicant(false)} size="sm" variant="destructive">
              <X className="h-4 w-4 mr-1" />
              Từ chối {isLoading && <span className="animate-pulse">...</span>}
            </Button>
          </>
        )}
        {status === 'accepted' && (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <Check className="h-3 w-3 mr-1" />
            Đã chấp nhận
          </Badge>
        )}
        {status === 'rejected' && (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            <X className="h-3 w-3 mr-1" />
            Đã từ chối
          </Badge>
        )}
      </div>
    </div>
  );
}
