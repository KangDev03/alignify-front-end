import { Camera, Save } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { useAppSelector } from '@/hooks/redux';
import type { RootState } from '@/redux/store';

export default function ProfileSection() {
  const { role: roleName } = useAppSelector((state: RootState) => state.auth);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Hồ sơ cá nhân</h3>
        <p className="text-sm text-muted-foreground">
          Cập nhật thông tin hồ sơ và ảnh đại diện của bạn.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ảnh đại diện</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder.svg?height=80&width=80" />
              <AvatarFallback>NL</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button size="sm">
                <Camera className="h-4 w-4 mr-2" />
                Thay đổi ảnh
              </Button>
              <p className="text-sm text-muted-foreground">JPG, GIF hoặc PNG. Tối đa 1MB.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin cơ bản</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Họ</Label>
              <Input id="firstName" defaultValue="Nguyễn Thị" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Tên</Label>
              <Input id="lastName" defaultValue="Lan" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="lan@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Giới thiệu bản thân</Label>
            <Textarea
              id="bio"
              defaultValue="Content creator chuyên về lifestyle và beauty."
              rows={3}
            />
          </div>
          {roleName === 'INFLUENCER' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="specialties">Lĩnh vực chuyên môn</Label>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Thời trang</Badge>
                  <Badge variant="secondary">Làm đẹp</Badge>
                  <Badge variant="secondary">Lifestyle</Badge>
                  <Button variant="outline" size="sm">
                    + Thêm
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="followers">Tổng số followers</Label>
                <Input id="followers" defaultValue="326,000" disabled />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Lưu thay đổi
        </Button>
      </div>
    </div>
  );
}
