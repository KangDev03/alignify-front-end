import { BadgeCheckIcon, Calendar, CircleX, Dot,Eye  } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type Campaign = {
  id: string;
  name: string;
  description: string;
  categories: string[];
  avatar: string;
  brand: string;
  createdDate: string;
  appliedDate: string;
  campaignRequirement: Map<string, number>;
  influencerRequirement: string[];
  status: string;
};

export default function ViewRejected({ campaign }: { campaign: Campaign }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Eye className="w-4 h-4 " />
          Xem chi tiết
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[637px] h-fit gap-4">
        <DialogTitle className="flex items-start gap-4 ">
          <Avatar className="h-12 w-12 ">
            <AvatarImage src={campaign.avatar || '/placeholder.svg'} alt={campaign.name} />
            <AvatarFallback>{campaign.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <span className="font-semibold text-foreground  ">{campaign.name}</span>
            <div className="text-muted-foreground text-sm mt-1">
              {campaign.brand} &bull; {campaign.createdDate}
            </div>
          </div>
        </DialogTitle>

        <div className="grid gap-3">
          <div>
            <span className="font-semibold text-foreground  ">Mô tả chiến dịch</span>
            <div className=" text-muted-foreground text-sm mt-1 ">{campaign.description}</div>
          </div>
          <div className="flex gap-3 ">
            <span className="font-semibold text-foreground  ">Danh mục:</span>
            {campaign.categories.map((category, index) => (
              <label className="bg-accent" key={index}>
                {category}
              </label>
            ))}
          </div>
          <hr></hr>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground  ">Trạng thái: </span>
            <Badge variant="destructive" className="w-30">
              {' '}
              <BadgeCheckIcon />
              Bị từ chối
            </Badge>
          </div>
          <div>
            <span className="font-semibold text-foreground  ">Thông tin ứng tuyển: </span>
            <div className="flex gap-4 w-[589px]">
              <div className="flex flex-1 items-center">
                <Calendar className="w-4 h-4 mr-2 text-primary" />
                <div>
                  <p className="text-muted-foreground text-sm mt-1">Ngày ứng tuyển:</p>
                  <p>{campaign.createdDate}</p>
                </div>
              </div>
              <div className="flex flex-1  items-center">
                <Calendar className="w-4 h-4 mr-2 text-primary" />
                <div>
                  <p className="text-muted-foreground text-sm mt-1">Phản hồi dự kiến:</p>
                  <p>{campaign.appliedDate}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-1 items-center">
              <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    {' '}
                    <span className="font-semibold text-foreground  ">Nội dung yêu cầu </span>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    {[...campaign.campaignRequirement.entries()].map(([key, value]) => (
                      <p className="text-muted-foreground text-sm mt-1 flex" key={key}>
                        <Dot />
                        <strong>{value}</strong>: {key}
                      </p>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Yêu cầu đối với influencer</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    {campaign.influencerRequirement.map((require,index)=>(
                        <p className="text-muted-foreground text-sm mt-1 flex" key={index}>
                            <Dot />
                            {require}
                            </p>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button  variant={'outline'}>
                Đóng</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
