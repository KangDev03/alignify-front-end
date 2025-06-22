import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import type { BrandData, InfluencerData } from '../api/profile.types';

export interface ProfileInfoProps {
  profile: InfluencerData | BrandData;
}

export function ProfileInfo({ profile }: ProfileInfoProps) {
  return (
    <Card className="border-2 border-primary/20 bg-card shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Thông tin cá nhân</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Họ và tên</Label>
            <p className="text-sm mt-1">{profile.name}</p>
          </div>
          <div>
            <Label htmlFor="gender">Giới tính</Label>

            {'gender' in profile && (
              <p className="text-sm mt-1">
                {profile.gender === 'MALE'
                  ? 'Nam'
                  : profile.gender === 'NONE'
                    ? 'Không'
                    : profile.gender === 'FEMALE'
                      ? 'Nữ'
                      : 'Khác'}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="bio">Giới thiệu bản thân</Label>
          <p className="text-sm mt-1">{profile.bio}</p>
        </div>
      </CardContent>
    </Card>
  );
}
