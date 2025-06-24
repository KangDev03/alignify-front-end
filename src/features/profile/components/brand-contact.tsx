import { Mail, MapPin, Phone } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  email: string;
  phone: string;
  address: string;
}

export function ContactInfoCard({ email, phone, address }: Props) {
  return (
    <Card className="border-2 border-primary/20 bg-card shadow-lg">
      <CardHeader>
        <CardTitle>Thông tin liên hệ</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ContactItem icon={<Mail />} label="Email" value={email} />
        <ContactItem icon={<Phone />} label="Số điện thoại" value={phone} />
        <ContactItem icon={<MapPin />} label="Địa chỉ" value={address} />
      </CardContent>
    </Card>
  );
}

function ContactItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center space-x-3 p-3 border-2 border-primary/10 rounded-lg bg-card/50 hover:bg-card transition-colors">
      {icon}
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}
