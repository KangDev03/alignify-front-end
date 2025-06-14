import { Calendar,CircleX } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

import ViewRejected from './components/viewRejected';

const rejected = [
  {
    id: 'r1',
    name: 'Chiến dịch khai trương nhà hàng Nhật Bản',
    description: 'Tìm kiếm influencer để giới thiệu ẩm thực Nhật.',
    categories: ['Ẩm thực', 'Du lịch'],
    avatar: '/images/japan-food.jpg',
    brand: 'TokyoBites',
    createdDate: '`15/05/2025`',
    appliedDate: '20/05/2025',
    campaignRequirement: new Map([
      ['Story Instagram', 2],
      ['Check-in địa điểm', 1],
    ]),
    influencerRequirement: ['Có follower từ 8k trở lên', 'Quan tâm ẩm thực'],
    status: 'rejected',
  },
  {
    id: 'r2',
    name: 'Chiến dịch công nghệ AI dành cho giáo dục',
    description: 'Giới thiệu nền tảng AI hỗ trợ học tập thông minh.',
    categories: ['Công nghệ', 'Giáo dục'],
    avatar: '/images/ai-edu.jpg',
    brand: 'EduAI',
    createdDate: '28/04/2025',
    appliedDate: '04/05/2025',
    campaignRequirement: new Map([
      ['Video hướng dẫn', 1],
      ['Bài đăng Facebook', 1],
    ]),
    influencerRequirement: ['Tốt nghiệp chuyên ngành giáo dục hoặc công nghệ', 'Tối thiểu 5k followers'],
    status: 'rejected',
  },
  {
    id: 'r3',
    name: 'Chiến dịch quảng bá mỹ phẩm hữu cơ',
    description: 'Nâng cao nhận thức về mỹ phẩm thiên nhiên không hóa chất.',
    categories: ['Làm đẹp', 'Sức khỏe'],
    avatar: '/images/natural-cosmetics.jpg',
    brand: 'EcoBeauty',
    createdDate: '10/05/2025',
    appliedDate: '17/05/2025',
    campaignRequirement: new Map([
      ['Bài đăng Instagram', 2],
      ['Hashtag bắt buộc', 1],
    ]),
    influencerRequirement: ['Có quan điểm sống xanh', 'Tối thiểu 3 bài về skincare'],
    status: 'rejected',
  },
];

export default function Rejected() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
      {rejected.map((item) => (
        <Card key={item.id} className="border shadow-sm flex items-center justify-center">
          <CardContent className="w-full h-fit flex flex-col gap-4">
            <div className="flex gap-4">
              <Avatar className="h-12 w-12 mt-1">
                <AvatarImage src={item.avatar || "/placeholder.svg"} alt={item.name} />
                <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="w-full">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground flex-1">{item.name}</span>
                  <Badge variant="destructive" className='w-30 rounded-full'>
                    {' '}
                    <CircleX />
                    Bị từ chối
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
            <ViewRejected campaign={item}/>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
