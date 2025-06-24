import { Mail, MapPin, Phone } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ContactInfoCardProps {
  email?: string;
  phone?: string;
  address?: string;
}

export function ContactInfoCard({ email, phone, address }: ContactInfoCardProps) {
  const contacts = [
    {
      label: 'Email',
      icon: Mail,
      value: email,
    },
    {
      label: 'Số điện thoại',
      icon: Phone,
      value: phone,
    },
    {
      label: 'Địa chỉ',
      icon: MapPin,
      value: address,
    },
  ];

  return (
    <Card className="border-2 border-primary/20 bg-card shadow-lg">
      <CardHeader>
        <CardTitle>Thông tin liên hệ</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {contacts.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="flex items-center justify-between p-3 border-2 border-primary/10 rounded-lg bg-card/50 hover:bg-card transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Icon className="h-5 w-5" />
                <div className="font-medium">{item.label}</div>
              </div>
              <div className="text-sm text-muted-foreground italic">{item.value || '—'}</div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
