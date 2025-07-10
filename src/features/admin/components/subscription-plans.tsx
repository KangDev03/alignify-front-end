'use client';

import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Icons } from '@/components/icons/icons';
import { useGetPlansByRoleQuery } from '@/features/upgrade-plan/components/upgrade-plan.service';
import type { Plan } from '@/features/upgrade-plan/components/upgrade-plan.type';
import { formatPlans } from '@/pages/upgrade-plan';

import PlanCard from './plan-management/plan-card';

export function SubscriptionPlans() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  // const [_editingPlan, setEditingPlan] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<'brand' | 'influencer'>('brand');
  const [isAnnual, setIsAnnual] = useState(false);

  const [newPlan, setNewPlan] = useState({
    name: '',
    price: '',
    duration: 'monthly',
    description: '',
    features: [''],
    targetRole: 'brand' as 'brand' | 'influencer',
    maxCampaigns: '',
    maxInfluencers: '',
    maxApplications: '',
    portfolioItems: '',
    maxSearches: '',
    analyticsAccess: false,
    prioritySupport: false,
    customBranding: false,
    isActive: true,
  });

  const { data: fetchedPlans } = useGetPlansByRoleQuery('');

  const influencerPlans = useMemo(() => {
    if (!fetchedPlans?.data) return [];
    return formatPlans(
      {
        ...fetchedPlans,
        data: fetchedPlans.data.filter((plan: Plan) => plan.roleId === 'INFLUENCER'),
      },
      isAnnual,
    );
  }, [fetchedPlans, isAnnual]);

  const brandPlans = useMemo(() => {
    if (!fetchedPlans?.data) return [];
    return formatPlans(
      {
        ...fetchedPlans,
        data: fetchedPlans.data.filter((plan: Plan) => plan.roleId === 'BRAND'),
      },
      isAnnual,
    );
  }, [fetchedPlans, isAnnual]);

  const handleCreatePlan = () => {
    console.log('Creating plan:', newPlan);
    // Logic tạo gói mới
    setIsCreateDialogOpen(false);
    setNewPlan({
      name: '',
      price: '',
      duration: 'monthly',
      description: '',
      features: [''],
      targetRole: 'brand',
      maxCampaigns: '',
      maxInfluencers: '',
      maxApplications: '',
      portfolioItems: '',
      maxSearches: '',
      analyticsAccess: false,
      prioritySupport: false,
      customBranding: false,
      isActive: true,
    });
  };

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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Quản lý gói đăng ký</h2>
          <p className="text-muted-foreground">
            Tạo và quản lý các gói đăng ký cho brand và influencer
          </p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Icons.plus className="mr-2 h-4 w-4" />
              Tạo gói mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tạo gói đăng ký mới</DialogTitle>
              <DialogDescription>Tạo gói đăng ký mới cho brand hoặc influencer</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Tên gói</Label>
                  <Input
                    id="name"
                    value={newPlan.name}
                    onChange={(e) => setNewPlan((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Nhập tên gói"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="price">Giá (VNĐ)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newPlan.price}
                    onChange={(e) => setNewPlan((prev) => ({ ...prev, price: e.target.value }))}
                    placeholder="Nhập giá gói"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="targetRole">Đối tượng</Label>
                <Select
                  value={newPlan.targetRole}
                  onValueChange={(value) =>
                    setNewPlan((prev) => ({ ...prev, targetRole: value as 'brand' | 'influencer' }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn đối tượng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brand">Brand</SelectItem>
                    <SelectItem value="influencer">Influencer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* <div className="flex flex-col gap-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  value={newPlan.description}
                  onChange={(e) => setNewPlan((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Nhập mô tả gói"
                />
              </div> */}

              {/* Role-specific limits */}
              {newPlan.targetRole === 'brand' ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="maxCampaigns">Số chiến dịch tối đa</Label>
                    <Input
                      id="maxCampaigns"
                      type="number"
                      value={newPlan.maxCampaigns}
                      onChange={(e) =>
                        setNewPlan((prev) => ({ ...prev, maxCampaigns: e.target.value }))
                      }
                      placeholder="0 cho không giới hạn"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="maxInfluencers">Số influencers tối đa</Label>
                    <Input
                      id="maxInfluencers"
                      type="number"
                      value={newPlan.maxInfluencers}
                      onChange={(e) =>
                        setNewPlan((prev) => ({ ...prev, maxInfluencers: e.target.value }))
                      }
                      placeholder="0 cho không giới hạn"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="maxApplications">Số ứng tuyển tối đa</Label>
                  <Input
                    id="maxApplications"
                    type="number"
                    value={newPlan.maxApplications}
                    onChange={(e) =>
                      setNewPlan((prev) => ({ ...prev, maxApplications: e.target.value }))
                    }
                    placeholder="0 cho không giới hạn"
                  />
                </div>
              )}
              <div className="flex flex-col gap-2">
                <Label htmlFor="maxSearches">Số kết quả tìm kiếm</Label>
                <Input
                  id="maxSearches"
                  type="number"
                  value={newPlan.maxSearches}
                  onChange={(e) => setNewPlan((prev) => ({ ...prev, maxSearches: e.target.value }))}
                  placeholder="0 cho không giới hạn"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="isActive">Kích hoạt gói</Label>
                  <Switch
                    id="isActive"
                    checked={newPlan.isActive}
                    onCheckedChange={(checked) =>
                      setNewPlan((prev) => ({ ...prev, isActive: checked }))
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={handleCreatePlan}>Tạo gói</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {/* Annual/Monthly Toggle */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        <span className={`text-sm ${isAnnual ? 'text-muted-foreground' : 'font-semibold'}`}>
          Hàng tháng
        </span>
        <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
        <span className={`text-sm ${isAnnual ? 'font-semibold' : 'text-muted-foreground'}`}>
          Hàng năm
        </span>
      </div>
      {/* Role Tabs */}
      <Tabs
        value={selectedRole}
        onValueChange={(value) => setSelectedRole(value as 'brand' | 'influencer')}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="brand" className="flex items-center space-x-2">
            <Icons.crown className="h-4 w-4" />
            <span>Gói Brand ({brandPlans.length})</span>
          </TabsTrigger>
          <TabsTrigger value="influencer" className="flex items-center space-x-2">
            <Icons.camera className="h-4 w-4" />
            <span>Gói Influencer ({influencerPlans.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="brand" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {brandPlans.map((plan) => PlanCard(plan))}
          </div>
        </TabsContent>

        <TabsContent value="influencer" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {influencerPlans.map((plan) => PlanCard(plan))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
