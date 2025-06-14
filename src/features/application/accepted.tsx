import { BadgeCheckIcon, Calendar } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

import ViewAccepted from './components/viewAccepted';


const accepted = [
  {
     id: "1",
    name: "Chiến dịch mỹ phẩm xuân 2025",
    description: "Quảng bá dòng sản phẩm dưỡng da mới ra mắt cho mùa xuân.",
    categories: ["Làm đẹp", "Chăm sóc da"],
    avatar: "/images/campaigns/campaign1.jpg",
    brand: "GlowUp Cosmetics",
    createdDate: "01/03/2025",
    appliedDate: "05/02/2025",
    campaignRequirement: new Map([
      ["followers", 10000],
      ["posts", 3],
      ["story", 5],
    ]),
    influencerRequirement: ["Nữ", "18-30 tuổi", "Quan tâm đến skincare"],
    status: "accepted",
  },
  {
    id: "2",
    name: "Chiến dịch thời trang hè 2025",
    description: "Tìm kiếm influencer để quảng bá bộ sưu tập thời trang hè năng động.",
    categories: ["Thời trang", "Phong cách sống"],
    avatar: "/images/campaigns/campaign2.jpg",
    brand: "UrbanStyle",
    createdDate: "20/05/2025",
    appliedDate: "28/05/2025",
    campaignRequirement: new Map([
      ["followers", 5000],
      ["reels", 2],
      ["hashtag", 1],
    ]),
    influencerRequirement: ["Nam hoặc nữ", "Yêu thích phong cách đường phố", "Hoạt động trên Instagram"],
    status: "accepted",
  },
];

export default function Accepted() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
      {accepted.map((item) => (
        <Card key={item.id} className="border shadow-sm flex items-center justify-center">
          <CardContent className="h-fit flex flex-col justify-between px-6 py-4 gap-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12 mt-1">
                <AvatarImage src={item.avatar || "/placeholder.svg"} alt={item.name} />
                <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{item.name}</span>
                  <Badge variant="accepted" className='w-30'>
                    {' '}
                    <BadgeCheckIcon />
                    Đã chấp nhận
                  </Badge>
                </div>
                <div className="text-muted-foreground text-sm mt-1">
                  {item.brand} &bull; {item.createdDate}
                </div>
              </div>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2 text-primary" />
              <span>
                Ngày ứng tuyển: <span className=" font-medium">{item.appliedDate}</span>
              </span>
            </div>
              <ViewAccepted campaign={item}/>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
