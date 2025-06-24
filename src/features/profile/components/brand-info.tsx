import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import type { BrandData } from '@/features/profile/profile.type';

export interface BrandInfoProps {
  profile: BrandData;
}

export function BrandInfoCard({ profile }: BrandInfoProps) {
  return (
    <Card className="border-2 border-primary/20 bg-card shadow-lg">
      <CardHeader>
        <CardTitle>Thông tin công ty</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Tên thương hiệu</Label>
            <p className="text-sm mt-1">{profile.name}</p>
          </div>
          {/* <div>
            <Label>Ngành nghề</Label>
            <p className="text-sm mt-1">{profile.bio}</p>
          </div> */}
        </div>
        <div>
          <Label>Mô tả công ty</Label>
          <p className="text-sm mt-1">{profile.bio ? profile.bio : "Chưa có mô tả"}</p>
        </div>
      </CardContent>
    </Card>
  );
}
