import { useLocation } from 'react-router';

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
import { useDeletePlanMutation } from '@/features/upgrade-plan/components/upgrade-plan.service';
import type { ConvertedPlan } from '@/features/upgrade-plan/components/upgrade-plan.type';
import { formatPlanPermissionName, formatPrice } from '@/utils/format';

const PlanCard = ({
  id,
  name,
  description,
  price,
  planType,
  badge,
  badgeColor,
  isPopular,
  planPermission,
  planCount,
  currentPlan,
  buttonText,
  buttonVariant,
}: ConvertedPlan & { currentPlan: string }) => {
  //Chức năng xóa Plan
  const [deletePlan] = useDeletePlanMutation();
  const handleDelete = async () => {
    try {
      await deletePlan(id).unwrap();
      console.log('Xóa thành công!');
    } catch (err) {
      console.error('Xóa thất bại:', err);
    }
  };

  const location = useLocation();
  return (
    <Card
      key={id}
      className={`relative transition-all duration-300 hover:shadow-lg ${
        isPopular ? 'ring-2 ring-primary shadow-lg scale-105' : ''
      } ${id === currentPlan ? 'border-green-500' : ''}`}
    >
      {badge && location.pathname !== '/dashboard' && (
        <div className="flex justify-center">
          <Badge className={`${badgeColor} text-white px-4 py-1 text-sm rounded-full shadow`}>
            {badge}
          </Badge>
        </div>
      )}
      {/* Đề xuất nổi phía trên (nếu có) */}
      {isPopular && location.pathname !== '/dashboard' && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full flex items-center shadow">
            <Icons.star className="h-4 w-4 mr-1" />
            Được Đề Xuất
          </div>
        </div>
      )}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full flex items-center shadow">
            <Icons.star className="h-4 w-4 mr-1" />
            Được Đề Xuất
          </div>
        </div>
      )}

      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex-1 flex flex-col items-center justify-center">
            <CardTitle className="text-2xl font-bold">{name}</CardTitle>
            <CardDescription className="first-letter:uppercase">{description}</CardDescription>
          </div>
          {location.pathname.endsWith('/dashboard') && (
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
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                  <Icons.trash2 className="mr-2 h-4 w-4" />
                  Xóa gói
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="text-center">
          <div className="text-3xl font-bold">{formatPrice(price)}</div>
          <div className="text-sm text-muted-foreground">{planType}</div>
        </div>

        <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icons.users className="h-4 w-4" />
            <span>{planCount} </span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Tính năng:</h4>
          <ul className="space-y-1">
            {planPermission.slice(0, 4).map((planPermission, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm">
                <Icons.check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>
                  {formatPlanPermissionName(planPermission.planPermissionName)}
                  {typeof planPermission.limited === 'number'
                    ? ` tối đa ${planPermission.limited}`
                    : ''}
                </span>
              </li>
            ))}
            {planPermission.length > 4 && (
              <li className="text-sm text-muted-foreground">
                +{planPermission.length - 4} tính năng khác
              </li>
            )}
          </ul>
        </div>

        <div className="pt-4 border-t">
          <div className="text-xs text-muted-foreground">
            {/* Tạo ngày: {new Date(createdAt).toLocaleDateString('vi-VN')} */}
          </div>
        </div>

        {location.pathname !== '/dashboard' && (
          <Button
            className={`w-full mt-4 py-2 text-base font-semibold rounded-xl ${
              buttonVariant === 'secondary'
                ? 'bg-[#232c4b] text-white'
                : buttonVariant === 'default'
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : buttonVariant === 'outline'
                    ? 'border border-blue-400 text-blue-400 bg-transparent'
                    : ''
            }`}
            disabled={buttonVariant === 'secondary'}
          >
            {buttonText}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PlanCard;
