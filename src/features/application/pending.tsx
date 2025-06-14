import { Calendar, Clock9 , Eye } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

const pending = [
  {
    id: '1',
    name: 'Chiến dịch thời trang tuần lễ thời trang',
    avatar: '/placeholder.svg?height=60&width=60',
    brand: 'Beauty Co.',
    createdDate: '5/6/2025',
    appliedDate: '6/6/2025',
    status: 'accepted',
  },
  {
    id: '2',
    name: 'Chiến dịch thời trang tuần lễ thời trang',
    avatar: '/placeholder.svg?height=60&width=60',
    brand: 'Beauty Co.',
    createdDate: '5/6/2025',
    appliedDate: '6/6/2025',
    status: 'accepted',
  },
];

export default function Pending() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
      {pending.map((item) => (
        <Card key={item.id} className="border shadow-sm flex items-center justify-center">
          <CardContent className="h-fit flex flex-col justify-between px-6 py-4 gap-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12 mt-1">
                <AvatarImage src={item.avatar || "/placeholder.svg"} alt={item.name} />
                <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground ">{item.name}</span>
                  <Badge variant="secondary" className='w-30'>
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
            <button className="flex items-center justify-center  gap-2 px-4 py-2 rounded-lg border border-border bg-[#f7f9fb] text-primary hover:bg-[#eef3fa] transition text-sm font-medium">
              <Eye className="w-4 h-4 " />
              <p className="">Xem chi tiết</p>
            </button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
