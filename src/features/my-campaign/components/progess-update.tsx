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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Icons } from '@/components/icons/icons';
import type { Campaign } from '@/features/common/common.type';
import { cn } from '@/lib/utils';

interface ProgressUpdateDialogProps {
  campaign: Campaign;
}
const ProgressUpdateDialog = ({ campaign }: ProgressUpdateDialogProps) => {
  const handleSubmitProgress = () => {};
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          <Icons.upload className="h-4 w-4 mr-2" />
          Cập nhật tiến độ
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto scrollbar-thin">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icons.upload className="h-5 w-5" />
            Cập nhật tiến độ chiến dịch
          </DialogTitle>
          <DialogDescription>{campaign.campaignName}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {campaign.campaignRequirements?.map((req, reqIndex) => {
            let style = '';
            const platform = req.platform.toLowerCase();
            switch (platform) {
              case 'facebook': {
                style = 'bg-blue-500';
                break;
              }
              case 'youtube': {
                style = 'bg-red-500';
                break;
              }
              case 'instagram': {
                style = 'bg-gradient-to-br from-purple-700 via-pink-500 to-yellow-400';
                break;
              }
              case 'tiktok': {
                style = 'bg-black';
                break;
              }
              default:
                break;
            }
            const Icon = Icons[req.platform.toLowerCase() as keyof typeof Icons];

            return (
              <div key={reqIndex} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <Badge
                    key={req.platform + reqIndex}
                    variant="outline"
                    className={cn('lowercase text-white', style)}
                  >
                    <Icon className={cn(platform === 'tiktok' && 'stroke-3')} />
                    <span className="first-letter:capitalize text-white">{req.platform}</span>
                  </Badge>
                  <Badge variant="secondary" className="capitalize">
                    {req.post_type}
                  </Badge>
                  <span>•</span>
                  <span className="text-sm text-muted-foreground">{req.quantity} nội dung</span>
                </div>

                {Array.from({ length: req.quantity }, (_, contentIndex) => {
                  const key = `${reqIndex}-${contentIndex}`;
                  const detail = req.details[contentIndex];

                  return (
                    <div key={contentIndex} className="bg-muted/30 rounded-lg px-3 py-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium capitalize">
                          {req.post_type} {contentIndex + 1}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          {detail?.like > 0 && (
                            <div className="flex items-center gap-1">
                              <Icons.heart className="h-4 w-4 text-red-500" />
                              <span>{detail.like}+ likes</span>
                            </div>
                          )}
                          {detail?.comment > 0 && (
                            <div className="flex items-center gap-1">
                              <Icons.messageCircle className="h-4 w-4 text-blue-500" />
                              <span>{detail.comment}+ comments</span>
                            </div>
                          )}
                          {detail?.share > 0 && (
                            <div className="flex items-center gap-1">
                              <Icons.share2 className="h-4 w-4 text-green-500" />
                              <span>{detail.share}+ shares</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`link-${key}`}>Liên kết *</Label>
                        <Input
                          id={`link-${key}`}
                          placeholder={`https://www.${req.platform.toLowerCase()}.com/${req.post_type}/..`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <DialogClose asChild>
            <Button variant="outline">Hủy</Button>
          </DialogClose>
          <Button>Gửi cập nhật</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProgressUpdateDialog;
