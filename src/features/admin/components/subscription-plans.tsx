'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
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
import {
  useCreatePlanMutation,
  useGetPlansByRoleQuery,
} from '@/features/upgrade-plan/components/upgrade-plan.service';
import type { Plan } from '@/features/upgrade-plan/components/upgrade-plan.type';
import { formatPlans } from '@/pages/upgrade-plan';
import { isApiResponseError } from '@/utils/format';
import { zodResolver } from '@hookform/resolvers/zod';

import PlanCard from './plan-management/plan-card';
import { planSchema, type PlanValues } from '../admin.schema';

export function SubscriptionPlans() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  // const [_editingPlan, setEditingPlan] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<'brand' | 'influencer'>('brand');
  const [isAnnual, setIsAnnual] = useState(false);

  //Get plan by Role
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

  // Create plan by admin
  const form = useForm<PlanValues>({
    mode: 'onSubmit',
    resolver: zodResolver(planSchema),
    defaultValues: {},
  });
  const [createPlan] = useCreatePlanMutation();

  const onSubmit = async (values: PlanValues) => {
    try {
      const formData = new FormData();

      formData.append('planName', values.planName);
      formData.append('description', values.description);
      formData.append('roleId', values.roleId);
      formData.append('price', values.price.toString());
      formData.append('discount', values.discount.toString());
      formData.append('planType', values.planType);
      formData.append('planCount', values.planCount.toString());
      formData.append('isPopular', values.isPopular.toString());
      formData.append('isActive', values.isActive.toString());

      values.permissionIds.forEach((id) => {
        formData.append('permissionIds', id);
      });

      formData.append('planPermissions', JSON.stringify(values.planPermissions));

      // Gọi API tạo plan
      await createPlan(formData).unwrap();

      toast.success('Tạo gói đăng ký thành công!');
      form.reset();
    } catch (err) {
      if (isApiResponseError(err)) {
        toast.error('Tạo gói thất bại!');
      } else {
        toast.error('Tạo gói thất bại. Vui lòng thử lại!');
      }
    }
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
            <Form {...form}>
              <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="planName">Tên gói</Label>
                    <Input {...form.register('planName')} placeholder="Nhập tên gói" />
                    {form.formState.errors.planName && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.planName.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="price">Giá (VNĐ)</Label>
                    <Input type="number" {...form.register('price', { valueAsNumber: true })} />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="roleId">Đối tượng</Label>
                  <Select
                    value={form.watch('roleId')}
                    onValueChange={(value) =>
                      form.setValue('roleId', value as 'brand' | 'influencer')
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn đối tượng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brand">Brand</SelectItem>
                      <SelectItem value="influencer">Influencer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {form.watch('roleId') === 'brand' && (
                    <>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="planCount">Số chiến dịch tối đa</Label>
                        <Input
                          type="number"
                          {...form.register('planCount', { valueAsNumber: true })}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="permissionIds">Số influencers tối đa</Label>
                        <Input
                          type="text"
                          {...form.register('permissionIds.0')}
                          placeholder="Nhập ID quyền 1"
                        />
                      </div>
                    </>
                  )}

                  {form.watch('roleId') === 'influencer' && (
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="planCount">Số ứng tuyển tối đa</Label>
                      <Input
                        type="number"
                        {...form.register('planCount', { valueAsNumber: true })}
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="discount">Giảm giá (%)</Label>
                  <Input type="number" {...form.register('discount', { valueAsNumber: true })} />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="planType">Loại gói (monthly/annual)</Label>
                  <Input {...form.register('planType')} />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isActive">Kích hoạt gói</Label>
                    <Switch
                      checked={form.watch('isActive')}
                      onCheckedChange={(checked) => form.setValue('isActive', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="isPopular">Phổ biến</Label>
                    <Switch
                      checked={form.watch('isPopular')}
                      onCheckedChange={(checked) => form.setValue('isPopular', checked)}
                    />
                  </div>
                </div>

                {/* Bạn có thể thêm phần quản lý permission nâng cao tại đây nếu cần */}
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Hủy
                  </Button>
                  <Button type="submit">Tạo gói</Button>
                </div>
              </form>
            </Form>
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
