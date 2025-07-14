import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Icons } from '@/components/icons/icons';
import type { ConvertedPlan } from '@/features/upgrade-plan/components/upgrade-plan.type';
import { formatPlanPermissonName, formatPrice } from '@/utils/format';

const PlanCard = (plan: ConvertedPlan) => {
  return (
    <Card key={plan.id} className={`relative`}>
      {plan.popular && (
        <div className="absolute top-2 right-2">
          <Badge className="bg-yellow-400 text-black">Được đề xuất</Badge>
        </div>
      )}
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* <Icon className="h-5 w-5" /> */}
            <CardTitle>{plan.name}</CardTitle>
            {/* <Badge className={plan.color}>{role === 'brand' ? 'Brand' : 'Influencer'}</Badge> */}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <Icons.moreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
              <DropdownMenuItem>
                <Icons.edit className="mr-2 h-4 w-4" />
                Chỉnh sửa
              </DropdownMenuItem>
              {/* <DropdownMenuItem >
                {plan.isActive ? (
                  <>
                    <Icons.x className="mr-2 h-4 w-4" />
                    Tạm dừng
                  </>
                ) : (
                  <>
                    <Icons.check className="mr-2 h-4 w-4" />
                    Kích hoạt
                  </>
                )}
              </DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Icons.trash2 className="mr-2 h-4 w-4" />
                Xóa gói
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold">{formatPrice(plan.price)}</div>
          <div className="text-sm text-muted-foreground">
            /{plan.planType === 'one_month' ? 'tháng' : 'năm'}
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icons.users className="h-4 w-4" />
            <span>{plan.planCount} </span>
          </div>
        </div>

        {/* Role-specific limits */}
        {/* <div className="space-y-2">
          <h4 className="font-medium">Giới hạn:</h4>
          <div className="text-sm space-y-1">
            {role === 'brand' ? (
              <>
                <div>
                  Chiến dịch:{' '}
                  {plan.maxCampaigns === -1 ? 'Không giới hạn' : plan.maxCampaigns}
                </div>
                <div>
                  Influencers:{' '}
                  {plan.maxInfluencers === -1 ? 'Không giới hạn' : plan.maxInfluencers}
                </div>
              </>
            ) : (
              <>
                <div>
                  Ứng tuyển:{' '}
                  {plan.maxApplications === -1 ? 'Không giới hạn' : plan.maxApplications}
                </div>
                <div>
                  Portfolio:{' '}
                  {plan.portfolioItems === -1 ? 'Không giới hạn' : plan.portfolioItems}
                </div>
              </>
            )}
          </div>
        </div> */}

        <div className="space-y-2">
          <h4 className="font-medium">Tính năng:</h4>
          <ul className="space-y-1">
            {plan.planPermission.slice(0, 4).map((planPermission, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm">
                <Icons.check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>
                  {formatPlanPermissonName(planPermission.planPermissionName)}
                  {typeof planPermission.limited === 'number'
                    ? ` tối đa ${planPermission.limited}`
                    : ''}
                </span>
              </li>
            ))}
            {plan.planPermission.length > 4 && (
              <li className="text-sm text-muted-foreground">
                +{plan.planPermission.length - 4} tính năng khác
              </li>
            )}
          </ul>
        </div>

        <div className="pt-4 border-t">
          <div className="text-xs text-muted-foreground">
            Tạo ngày: {new Date(plan.createdAt).toLocaleDateString('vi-VN')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default PlanCard;
