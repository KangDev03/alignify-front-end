import { BarChart3, Calendar } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

import type { BrandData } from '@/features/profile/profile.type';

interface BrandHeaderProps {
  profile: BrandData;
  campaignCompleted: number;
}

export function BrandHeaderCard({ profile, campaignCompleted }: BrandHeaderProps) {
  return (
    <Card className="border-2 border-primary/20 bg-card shadow-lg">
      <CardContent>
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profile.avatarUrl || '/placeholder.svg'} alt={profile.name} />
            <AvatarFallback className="text-2xl">{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <h1 className="text-2xl font-bold m-0">{profile.name}</h1>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground mt-1">
              <Calendar className="h-4 w-4" />
              <span>
                Thành lập {profile.establishDate ? profile.establishDate : '(chưa cung cấp)'}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.categories && profile.categories.length > 0 ? (
                profile.categories.map((category: { categoryId: string; categoryName: string }) => (
                  <Badge key={category.categoryId} variant="outline" className="text-xs">
                    {category.categoryName}
                  </Badge>
                ))
              ) : (
                <Badge variant="outline" className="text-xs text-muted-foreground">
                  Chưa có danh mục
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <BarChart3 className="h-4 w-4 text-blue-500" />
              <span>{campaignCompleted ?? 0} chiến dịch</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
