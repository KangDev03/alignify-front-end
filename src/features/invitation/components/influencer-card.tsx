import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

import { Icons } from '@/components/icons/icons';
import { formatNumber } from '@/utils/format';

export function InfluencerCard() {
  return (
    <Card
      key={influencer.id}
      className="border-2 border-primary/20 bg-card shadow-lg hover:shadow-xl transition-all py-2"
    >
      <CardContent className="flex items-center justify-between gap-4">
        <Checkbox
          checked={selectedInfluencers.includes(influencer.id)}
          disabled={selectedCampaign === undefined}
          onCheckedChange={() => handleInfluencerSelect(influencer.id)}
          className="cursor-pointer"
        />

        <div className="flex items-center space-x-4 flex-1">
          <Avatar className="h-14 w-14">
            <AvatarImage
              src={influencer.avatarUrl || '/placeholder.svg'}
              alt={influencer.name}
              className="object-cover"
            />
            <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">{influencer.name}</h3>
            {/* {influencer?.category && (
                                    <p className="text-sm text-muted-foreground capitalize">
                                      {influencer.category
                                        .map((cat: any) => cat.categoryName)
                                        .join(', ')}
                                    </p>
                                  )} */}
            <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icons.users className="h-4 w-4" />
                <span>{formatNumber(influencer.follower ?? 0)} followers</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icons.star className="h-4 w-4" />
                <span>{influencer.rating}</span>
              </div>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/influencer/${influencer.id}`)}
        >
          Xem hồ sơ
        </Button>
      </CardContent>
    </Card>
  );
}
