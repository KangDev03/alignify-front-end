'use client';
import { useTranslation } from "react-i18next";

import { useState } from 'react';

import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Icons } from '@/components/icons/icons';
import PlanCard from '@/features/admin/components/plan-management/plan-card';
import { useGetPlansByRoleQuery } from '@/features/upgrade-plan/components/upgrade-plan.service';

export function LandingPricing() {
  const { t } = useTranslation();
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'BRAND' | 'INFLUENCER'>('BRAND');

  const { data: fetchedBrandPlans } = useGetPlansByRoleQuery('brand');
  const { data: fetchedInfluencerPlans } = useGetPlansByRoleQuery('influencer');
  const influencerPlans = fetchedInfluencerPlans?.data;
  const brandPlans = fetchedBrandPlans?.data;
  console.log(influencerPlans);

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("landing.pricing.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("landing.pricing.description")}
          </p>
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
              <span>
                Gói Brand (
                {brandPlans?.filter(
                  (plan) => plan.planType === (isAnnual ? 'one_year' : 'one_month'),
                ).length || 0}
                )
              </span>{' '}
            </TabsTrigger>
            <TabsTrigger value="INFLUENCER" className="flex items-center space-x-2">
              <Icons.camera className="h-4 w-4" />
              <span>
                Gói Influencer (
                {influencerPlans?.filter(
                  (plan) => plan.planType === (isAnnual ? 'one_year' : 'one_month'),
                ).length || 0}
                )
              </span>{' '}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="BRAND" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {brandPlans &&
                brandPlans
                  .filter((plan) => plan.planType === (isAnnual ? 'one_year' : 'one_month'))
                  .map((plan) => (
                    <PlanCard
                      key={plan.planId}
                      plan={plan}
                      currentPlan={selectedRole === 'BRAND' ? 'creator' : 'starter'}
                    />
                  ))}
            </div>
          </TabsContent>

          <TabsContent value="INFLUENCER" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {influencerPlans &&
                influencerPlans
                  .filter((plan) => plan.planType === (isAnnual ? 'one_year' : 'one_month'))
                  .map((plan) => (
                    <PlanCard
                      key={plan.planId}
                      plan={plan}
                      currentPlan={selectedRole === 'INFLUENCER' ? 'creator' : 'starter'}
                    />
                  ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
