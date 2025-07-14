import { useNavigate } from 'react-router';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

import { Icons } from '@/components/icons/icons';
import type { Campaign } from '@/features/common/common.type';
import { formatNumber } from '@/utils/format';

interface InfluencerCardProps {
  id: string;
  selectedInfluencers?: string[] | undefined;
  selectedCampaign?: Campaign | undefined;
  avatarUrl: string;
  name: string;
  follower: number;
  rating: number;
  handleInfluencerSelect: (id: string) => void;
}

export function CandidateCard({
  avatarUrl,
  follower,
  id,
  name,
  rating,
  selectedInfluencers,
  selectedCampaign,
  handleInfluencerSelect,
}: InfluencerCardProps) {
  const navigate = useNavigate();
  return (
    <Card
      key={id}
      className="border-2 border-primary/20 bg-card shadow-lg hover:shadow-xl transition-all py-2"
    >
      <CardContent className="flex items-center justify-between gap-4">
        <Checkbox
          checked={selectedInfluencers && selectedInfluencers.includes(id)}
          disabled={selectedCampaign === undefined}
          onCheckedChange={() => handleInfluencerSelect(id)}
          className="cursor-pointer"
        />

        <div className="flex items-center space-x-4 flex-1">
          <Avatar className="h-14 w-14">
            <AvatarImage
              src={avatarUrl || '/placeholder.svg'}
              alt={name}
              className="object-cover"
            />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">{name}</h3>
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
                <span>{formatNumber(follower ?? 0)} followers</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icons.star className="h-4 w-4" />
                <span>{rating}</span>
              </div>
            </div>
          </div>
        </div>

        <Button variant="outline" size="sm" onClick={() => navigate(`/influencer/${id}`)}>
          Xem hồ sơ
        </Button>
      </CardContent>
    </Card>
  );
}
