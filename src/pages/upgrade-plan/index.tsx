'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Check,
  CreditCard,
  Crown,
  Gift,
  Globe,
  Headphones,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  X,
  Zap,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';

import PlanCard from '@/features/admin/components/plan-management/plan-card';
import type { RoleName } from '@/features/common/common.type';
import { useGetPlansByRoleQuery } from '@/features/upgrade-plan/components/upgrade-plan.service';
import type { Plan, PlanResponse } from '@/features/upgrade-plan/components/upgrade-plan.type';
import { formatPlanPermissionName } from '@/utils/format';

interface UpgradePlanProps {
  userRole: RoleName;
}
export const formatPlans = (userRole: RoleName, fetchedPlans: PlanResponse, isAnnual: boolean) => {
  if (!fetchedPlans?.data) return [];

  const filteredPlans = fetchedPlans.data.filter((plan: Plan) =>
    isAnnual ? plan.planType === 'one_year' : plan.planType === 'one_month',
  );

  const sortedPlans = [...filteredPlans].sort((a, b) => a.price - b.price);
  const middleIndex = Math.floor(sortedPlans.length / 2);

  return sortedPlans.map((plan, index) => {
    const isFree = plan.price === 0;
    const isPremium = index === sortedPlans.length - 1;
    const isMiddle = index === middleIndex;
    const isSuggested = fetchedPlans.data.some(
      (p: Plan) => p.planId === plan.planId && Boolean(p.isPopular),
    );

    let badge = '';
    let badgeColor = '';

    if (isFree) {
      badge = 'Hiện tại';
      badgeColor = 'bg-green-500';
    } else if (isMiddle) {
      badge = 'Phổ biến';
      badgeColor = 'bg-blue-500';
    } else if (isPremium) {
      badge = 'Cao cấp';
      badgeColor = 'bg-purple-500';
    }

    return {
      id: plan.planId,
      name: plan.planName,
      description: plan.description,
      price: plan.price,
      originalPrice:
        isAnnual && plan.discount ? Math.round(plan.price / (1 - plan.discount)) : undefined,
      planType: plan.planType === 'one_month' ? '/tháng' : '/năm',
      badge,
      badgeColor,
      popular: isSuggested,
      planPermission: plan.planPermissions.map((perm) => ({
        planPermissionId: perm.planPermissionId || '',
        roleId: perm.roleId || '',
        planPermissionName: perm.planPermissionName,
        limited: perm.limited,
      })),

      planCount: plan.planCount,
      createdAt: plan.createdAt,
      permission: plan.permissions.map((p) => ({
        permissionId: p.permissionId,
        permissionName: p.permissionName,
        permissionDescription: p.permissionDescription,
      })),
      isPopular: plan.isPopular,
      currentPlan: userRole === 'INFLUENCER' ? 'creator' : 'starter',
      buttonText: isFree ? 'Gói hiện tại' : isPremium ? 'Liên hệ tư vấn' : 'Nâng cấp ngay',
      buttonVariant: (isFree ? 'secondary' : isPremium ? 'outline' : 'default') as
        | 'link'
        | 'default'
        | 'secondary'
        | 'outline'
        | 'destructive'
        | 'ghost',
    };
  });
};

export function UpgradePlan({ userRole }: UpgradePlanProps) {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const currentPlan = userRole === 'INFLUENCER' ? 'creator' : 'starter';
  const { data: fetchedPlans, isLoading } = useGetPlansByRoleQuery(userRole ?? '');

  useEffect(() => {
    if (!isLoading && fetchedPlans) {
      console.log('dataa: ', fetchedPlans);
    }
  }, [isLoading, fetchedPlans]);

  const plans = useMemo(
    () => formatPlans(userRole, fetchedPlans!, isAnnual),
    [fetchedPlans, isAnnual, userRole],
  );

  const handleUpgrade = (planId: string) => {
    if (planId === currentPlan) return;
    setSelectedPlan(planId);
    if (planId === 'agency' || planId === 'enterprise') {
      console.log('Redirecting to contact form...');
    } else {
      setShowPaymentDialog(true);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const selectedPlanData = plans.find((plan) => plan.id === selectedPlan);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      {}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Crown className="h-8 w-8 text-amber-500 mr-2" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Nâng cấp tài khoản
          </h1>
        </div>
        <p className="text-xl text-muted-foreground mb-6">
          {userRole === 'INFLUENCER'
            ? 'Mở khóa tiềm năng của bạn với các tính năng cao cấp'
            : 'Tăng cường sức mạnh marketing với các công cụ chuyên nghiệp'}
        </p>

        {/* Annual/Monthly Toggle */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <span className={`text-sm ${isAnnual ? 'text-muted-foreground' : 'font-semibold'}`}>
            Hàng tháng
          </span>
          <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
          <span className={`text-sm ${isAnnual ? 'font-semibold' : 'text-muted-foreground'}`}>
            Hàng năm
          </span>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <Gift className="h-3 w-3 mr-1" />
            Tiết kiệm 17%
          </Badge>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan) => (
          <PlanCard key={plan.id} {...plan} currentPlan={currentPlan} />
        ))}
      </div>

      {/* Features Comparison */}
      {plans.length > 0 && plans[0].planPermission && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">So sánh tính năng chi tiết</h2>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold">Tính năng</th>
                      {plans.map((plan) => (
                        <th key={plan.id} className="text-center p-4 font-semibold min-w-[150px]">
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {plans[0].planPermission.map((_: any, featureIndex: number) => (
                      <tr key={featureIndex} className="border-b hover:bg-muted/50">
                        <td className="p-4 font-medium">
                          {formatPlanPermissionName(
                            plans[0].planPermission[featureIndex].planPermissionName,
                          )}
                        </td>
                        {plans.map((plan) => (
                          <td key={plan.id} className="text-center p-4">
                            {plan.planPermission[featureIndex].limited === undefined ||
                            plan.planPermission[featureIndex].limited > 0 ? (
                              <div className="flex flex-col items-center">
                                <Check className="h-5 w-5 text-green-500" />
                                {plan.planPermission[featureIndex].limited !== undefined && (
                                  <span className="text-xs text-muted-foreground mt-1">
                                    {plan.planPermission[featureIndex].limited}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <X className="h-5 w-5 text-muted-foreground mx-auto" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Benefits Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="text-center p-6">
          <Zap className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Tăng hiệu suất</h3>
          <p className="text-sm text-muted-foreground">
            Công cụ tự động hóa giúp tiết kiệm thời gian
          </p>
        </Card>
        <Card className="text-center p-6">
          <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Bảo mật cao</h3>
          <p className="text-sm text-muted-foreground">
            Dữ liệu được bảo vệ với tiêu chuẩn enterprise
          </p>
        </Card>
        <Card className="text-center p-6">
          <Headphones className="h-12 w-12 text-purple-500 mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Hỗ trợ 24/7</h3>
          <p className="text-sm text-muted-foreground">
            Đội ngũ hỗ trợ chuyên nghiệp luôn sẵn sàng
          </p>
        </Card>
        <Card className="text-center p-6">
          <TrendingUp className="h-12 w-12 text-orange-500 mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Tăng trưởng</h3>
          <p className="text-sm text-muted-foreground">Analytics chi tiết giúp tối ưu hiệu quả</p>
        </Card>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Crown className="h-5 w-5 text-amber-500 mr-2" />
              Nâng cấp lên {selectedPlanData?.name}
            </DialogTitle>
            <DialogDescription>
              Hoàn tất thanh toán để kích hoạt gói {selectedPlanData?.name} của bạn
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Plan Summary */}
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{selectedPlanData?.name}</span>
                  <span className="font-bold">
                    {selectedPlanData?.price ? formatPrice(selectedPlanData.price) : 'Miễn phí'}
                    {selectedPlanData?.planType &&
                      selectedPlanData.price > 0 &&
                      selectedPlanData.planType}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{selectedPlanData?.description}</p>
                {isAnnual &&
                  selectedPlanData?.originalPrice &&
                  selectedPlanData.originalPrice > selectedPlanData.price && (
                    <div className="mt-2 text-sm text-green-600">
                      <Gift className="h-4 w-4 inline mr-1" />
                      Tiết kiệm{' '}
                      {formatPrice(selectedPlanData.originalPrice - selectedPlanData.price)} khi
                      thanh toán hàng năm
                    </div>
                  )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Phương thức thanh toán</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="card" id="card" />
                  <CreditCard className="h-4 w-4" />
                  <Label htmlFor="card">Thẻ tín dụng/ghi nợ</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="bank" id="bank" />
                  <Globe className="h-4 w-4" />
                  <Label htmlFor="bank">Chuyển khoản ngân hàng</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="momo" id="momo" />
                  <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
                  <Label htmlFor="momo">Ví MoMo</Label>
                </div>
              </RadioGroup>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cardName">Tên trên thẻ</Label>
                    <Input id="cardName" placeholder="Nguyễn Văn A" />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber">Số thẻ</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">MM/YY</Label>
                    <Input id="expiry" placeholder="12/25" />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
              Hủy
            </Button>
            <Button
              onClick={() => {
                console.log('Processing payment...');
                setShowPaymentDialog(false);
              }}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Xác nhận thanh toán
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
