import { Calendar, Clock9  } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

import ViewPending from './components/viewPending';

const pending = [
 {
    id: 'c1',
    name: 'Chiến dịch nước hoa mùa hè',
    description: 'Quảng bá sản phẩm nước hoa mới cho giới trẻ.',
    categories: ['Làm đẹp', 'Lifestyle'],
    avatar: '/images/perfume.jpg',
    brand: 'Scentify',
    createdDate: '01/06/2024',
    appliedDate: '07/06/2024',
    campaignRequirement: new Map([
      ['Lượt xem tối thiểu', 5000],
      ['Bài đăng bắt buộc', 2],
    ]),
    influencerRequirement: ['18-25 tuổi', 'Nữ', 'Sống tại TP.HCM'],
    status: 'pending',
  },
  {
    id: 'c2',
    name: 'Chiến dịch sức khỏe cộng đồng',
    description: 'Nâng cao nhận thức về ăn uống lành mạnh.',
    categories: ['Sức khỏe', 'Thực phẩm'],
    avatar: '/images/health.jpg',
    brand: 'GreenLife',
    createdDate: '03/05/2025',
    appliedDate: '08/05/2025',
    campaignRequirement: new Map([
      ['Bài viết Facebook', 1],
      ['Story Instagram', 3],
    ]),
    influencerRequirement: ['Quan tâm đến sức khỏe', 'Tối thiểu 10k followers'],
    status: 'pending',
  },
  {
    id: 'c3',
    name: 'Chiến dịch thời trang học đường',
    description: 'Giới thiệu bộ sưu tập thời trang học sinh mới.',
    categories: ['Thời trang', 'Giáo dục'],
    avatar: '/images/fashion.jpg',
    brand: 'UniWear',
    createdDate: '09/06/2025',
    appliedDate: '16/06/2025',
    campaignRequirement: new Map([
      ['Ảnh mặc sản phẩm', 5],
      ['Bài đăng TikTok', 1],
    ]),
    influencerRequirement: ['Học sinh, sinh viên', 'Sống tại Hà Nội'],
    status: 'pending',
  },
  {
    id: 'c4',
    name: 'Chiến dịch giới thiệu ứng dụng học tập',
    description: 'Khuyến khích sử dụng app học ngoại ngữ mới.',
    categories: ['Công nghệ', 'Giáo dục'],
    avatar: '/images/app.jpg',
    brand: 'LinguaGo',
    createdDate: '07/06/2025',
    appliedDate: '14/06/2025',
    campaignRequirement: new Map([
      ['Video review', 1],
      ['Thời lượng video', 60], 
    ]),
    influencerRequirement: ['Có kinh nghiệm review app', 'Trên 5k subscribers YouTube'],
    status: 'pending',
  },
];

export default function Pending() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
      {pending.map((item) => (
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
                  <Badge variant="pending" className='w-30'>
                    {' '}
                    <Clock9  />
                    Đang chờ duyệt
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
            <ViewPending campaign={item}/>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
