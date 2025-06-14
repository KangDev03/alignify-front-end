import { Icons } from '@/components/icons/icons';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';

import CampaignPopUp from './popUp-campaign';
import ContentPopUp from './popUp-content';

const categories = [
  { id: '1', name: 'Thời gian' },
  { id: '2', name: 'Thể thao' },
  { id: '3', name: 'Làm đẹp' },
  { id: '4', name: 'Du lịch' },
  { id: '5', name: 'Ẩm thực' },
  { id: '6', name: 'Công nghệ' },
  { id: '7', name: 'Sức khỏe' },
  { id: '8', name: 'Giáo dục' },
  { id: '9', name: 'Kinh doanh' },
  { id: '10', name: 'Nghệ thuật' },
];

export default function PopUpTrigger() {
  return (
    <Dialog>
      <DialogTrigger className="fixed bottom-5 right-5 cursor-pointer">
        <div className="p-2 bg-primary rounded-full">
          <Icons.plus className="bg-primary rounded-full text-amber-50 w-6 h-6" />
        </div>
      </DialogTrigger>
      {/* <ContentPopUp categories={categories} /> */}
      <CampaignPopUp categories={categories} />
    </Dialog>
  );
}
