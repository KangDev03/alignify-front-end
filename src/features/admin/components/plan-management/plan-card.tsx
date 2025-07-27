import { useLocation } from 'react-router';

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
import type { Plan } from '@/features/upgrade-plan/components/upgrade-plan.type';
import { formatPlanPermissionName, formatPlanType, formatPrice } from '@/utils/format';

import { EditPlanModal } from './plan-edit';

type PlanCardProps = {
  plan: Plan;
  currentPlan: string;
  children?: React.ReactNode;
};

const PlanCard = ({ plan, currentPlan, children }: PlanCardProps) => {
  const location = useLocation();

  const [deletePlan] = useDeletePlanMutation();
  const handleDelete = async () => {
    try {
      await deletePlan(plan.planId).unwrap();
      console.log('Xóa thành công!');
    } catch (err) {
      console.error('Xóa thất bại:', err);
    }
  };

  return (
    <Card
      key={plan.planId}
      className={`relative transition-all duration-300 hover:shadow-lg ${
        plan.isPopular && !location.pathname.endsWith('/dashboard')
          ? 'ring-2 ring-primary shadow-lg scale-105'
          : plan.isPopular
            ? 'ring-2 ring-primary shadow-lg'
            : ''
      } ${plan.planId === currentPlan ? 'border-green-500' : ''}`}
    >
      {/* {badge && location.pathname !== '/dashboard' && (
        <div className="flex justify-center">
          <Badge className={`${badgeColor} text-white px-4 py-1 text-sm rounded-full shadow`}>
            {badge}
          </Badge>
        </div>
      )} */}
      {/* Đề xuất nổi phía trên (nếu có) */}
      {plan.isPopular && location.pathname !== '/dashboard' && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full flex items-center shadow">
            <Icons.star className="h-4 w-4 mr-1" />
            Được Đề Xuất
          </div>
        </div>
      )}
      {plan.isPopular && (
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
            <CardTitle className="text-2xl font-bold">{plan.planName}</CardTitle>
            <CardDescription className="first-letter:uppercase">{plan.description}</CardDescription>
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
                <DropdownMenuItem asChild>
                  <EditPlanModal plan={plan} />
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
          <div className="text-3xl font-bold">{formatPrice(plan.price)}</div>
          <div className="text-sm text-muted-foreground">{formatPlanType(plan.planType)}</div>
        </div>

        <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icons.users className="h-4 w-4" />
            <span>{plan.planCount} </span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Tính năng:</h4>
          <ul className="space-y-1">
            {plan.planPermissions.slice(0, 4).map((planPermission, index) => (
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
            {plan.planPermissions.length > 4 && (
              <li className="text-sm text-muted-foreground">
                +{plan.planPermissions.length - 4} tính năng khác
              </li>
            )}
          </ul>
        </div>

        <div className="pt-4 border-t">
          <div className="text-xs text-muted-foreground">
            {/* Tạo ngày: {new Date(createdAt).toLocaleDateString('vi-VN')} */}
          </div>
        </div>
        {children}
      </CardContent>
    </Card>
  );
};

export default PlanCard;
