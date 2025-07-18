import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';

import { Icons } from '@/components/icons/icons';
import type { Campaign } from '@/features/common/common.type';
import { getStatusBadgeVariant, getStatusText } from '@/utils/helper.style';

const mockProgressData = {
  'campaign-1': [
    {
      id: '1',
      influencerId: 'inf-1',
      influencerName: 'Nguyễn Văn A',
      influencerAvatar: '/placeholder.svg',
      platform: 'TIKTOK',
      postType: 'video',
      contentIndex: 1,
      link: 'https://tiktok.com/@user/video/123',
      description: 'Video giới thiệu sản phẩm theo yêu cầu',
      status: 'approved',
      submittedAt: '2024-01-15T10:30:00Z',
      approvedAt: '2024-01-15T14:20:00Z',
    },
    {
      id: '2',
      influencerId: 'inf-1',
      influencerName: 'Nguyễn Văn A',
      influencerAvatar: '/placeholder.svg',
      platform: 'INSTAGRAM',
      postType: 'post',
      contentIndex: 1,
      link: 'https://instagram.com/p/ABC123',
      description: 'Post Instagram với hashtag theo yêu cầu',
      status: 'pending',
      submittedAt: '2024-01-16T09:15:00Z',
    },
  ],
};
interface ViewProgressDialogProps {
  campaign: Campaign;
}
const ViewProgressDialog = ({ campaign }: ViewProgressDialogProps) => {
  const campaignProgress =
    mockProgressData[campaign.campaignId as keyof typeof mockProgressData] || [];
  const totalRequirements =
    campaign.campaignRequirements?.reduce((sum, req) => sum + req.quantity, 0) || 0;
  const completedCount = campaignProgress.filter((p) => p.status === 'approved').length;
  const progressPercentage = totalRequirements > 0 ? (completedCount / totalRequirements) * 100 : 0;
  const handleApproveProgress = (progressId: string) => {
    console.log(`Approving progress with ID: ${progressId}`);
  };

  const handleRejectProgress = (progressId: string) => {
    console.log(`Rejecting progress with ID: ${progressId}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Icons.users className="h-4 w-4 mr-2" />
          Xem tiến độ
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icons.users className="h-5 w-5" />
            Tiến độ chiến dịch
          </DialogTitle>
          <DialogDescription>{campaign.campaignName}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overall Progress */}
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Tiến độ tổng quan</h3>
              <span className="text-sm text-muted-foreground">
                {completedCount}/{totalRequirements} nội dung
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-sm text-muted-foreground mt-1">
              {progressPercentage.toFixed(1)}% hoàn thành
            </p>
          </div>

          {/* Individual Progress */}
          <div className="space-y-4">
            <h3 className="font-medium">Chi tiết tiến độ</h3>

            {campaignProgress.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Icons.inbox className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Chưa có cập nhật tiến độ nào</p>
              </div>
            ) : (
              campaignProgress.map((progress) => (
                <div key={progress.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={progress.influencerAvatar || '/placeholder.svg'} />
                        <AvatarFallback>{progress.influencerName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{progress.influencerName}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="capitalize">
                            {progress.platform.toLowerCase()}
                          </Badge>
                          <Badge variant="secondary" className="capitalize">
                            {progress.postType}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Nội dung {progress.contentIndex}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={getStatusBadgeVariant(progress.status)}>
                      {getStatusText(progress.status)}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icons.link className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={progress.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        {progress.link}
                      </a>
                      <Icons.externalLink className="h-3 w-3 text-muted-foreground" />
                    </div>

                    {progress.description && (
                      <p className="text-sm text-muted-foreground pl-6">{progress.description}</p>
                    )}

                    <div className="flex items-center justify-between pl-6">
                      <span className="text-xs text-muted-foreground">
                        Gửi lúc: {new Date(progress.submittedAt).toLocaleString('vi-VN')}
                      </span>

                      {progress.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleApproveProgress(progress.id)}
                          >
                            <Icons.check className="h-4 w-4 mr-1" />
                            Duyệt
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRejectProgress(progress.id)}
                          >
                            <Icons.x className="h-4 w-4 mr-1" />
                            Từ chối
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <DialogClose asChild>
            <Button variant="outline">Đóng</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewProgressDialog;
