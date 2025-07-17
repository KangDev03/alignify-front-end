'use client';

import { useMemo, useState } from 'react';

import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Icons } from '@/components/icons/icons';
import { useGetPlansByRoleQuery } from '@/features/upgrade-plan/components/upgrade-plan.service';
import { formatPlans } from '@/pages/upgrade-plan';

import PlanCard from './plan-management/plan-card';
import { PlanModal } from './plan-management/plan-modal';

export function SubscriptionPlans() {
  // const [_editingPlan, setEditingPlan] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<'BRAND' | 'INFLUENCER'>('BRAND');
  const [isAnnual, setIsAnnual] = useState(false);

  const { data: fetchedBrandPlans } = useGetPlansByRoleQuery('brand');
  const { data: fetchedInfluencerPlans } = useGetPlansByRoleQuery('influencer');
  const influencerPlans = useMemo(() => {
    if (!fetchedInfluencerPlans?.data) return [];
    return formatPlans('INFLUENCER', { ...fetchedInfluencerPlans }, isAnnual);
  }, [fetchedInfluencerPlans, isAnnual]);

  const brandPlans = useMemo(() => {
    if (!fetchedBrandPlans?.data) return [];
    return formatPlans('BRAND', { ...fetchedBrandPlans }, isAnnual);
  }, [fetchedBrandPlans, isAnnual]);

  // const handleEditPlan = (plan: any) => {
  //   setEditingPlan(plan);
  // };

  // const handleDeletePlan = (planId: string) => {
  //   console.log('Deleting plan:', planId);
  //   // Logic xóa gói
  // };

  // const handleTogglePlan = (planId: string, isActive: boolean) => {
  //   console.log('Toggling plan:', planId, isActive);
  //   // Logic bật/tắt gói
  // };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Quản lý gói đăng ký</h2>
          <p className="text-muted-foreground">
            Tạo và quản lý các gói đăng ký cho brand và influencer
          </p>
        </div>

        <PlanModal />
      </div>
      <div className="flex items-center justify-center space-x-4 mb-8">
        <span className={`text-sm ${isAnnual ? 'text-muted-foreground' : 'font-semibold'}`}>
          Hàng tháng
        </span>
        <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
        <span className={`text-sm ${isAnnual ? 'font-semibold' : 'text-muted-foreground'}`}>
          Hàng năm
        </span>
      </div>
      <Tabs
        value={selectedRole}
        onValueChange={(value) => setSelectedRole(value as 'BRAND' | 'INFLUENCER')}
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="BRAND" className="flex items-center space-x-2">
            <Icons.crown className="h-4 w-4" />
            <span>Gói Brand ({brandPlans.length})</span>
          </TabsTrigger>
          <TabsTrigger value="INFLUENCER" className="flex items-center space-x-2">
            <Icons.camera className="h-4 w-4" />
            <span>Gói Influencer ({influencerPlans.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="BRAND" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {brandPlans.map((plan) => (
              <PlanCard
                key={plan.id}
                {...plan}
                currentPlan={selectedRole === 'BRAND' ? 'creator' : 'starter'}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="INFLUENCER" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {influencerPlans.map((plan) => (
              <PlanCard
                key={plan.id}
                {...plan}
                currentPlan={selectedRole === 'INFLUENCER' ? 'creator' : 'starter'}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
