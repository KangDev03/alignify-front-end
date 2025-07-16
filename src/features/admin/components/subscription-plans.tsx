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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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
  useGetPermissionQuery,
  useGetPlansByRoleQuery,
} from '@/features/upgrade-plan/components/upgrade-plan.service';
import type { Plan, PlanSubmitData } from '@/features/upgrade-plan/components/upgrade-plan.type';
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
  const { data: permissionData } = useGetPermissionQuery();

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
    defaultValues: {
      planName: '',
      description: '',
      roleId: 'brand',
      permissionIds: [],
      planPermissions: {
        roleId: 'brand',
        planPermissionName: '',
        limited: 0,
      },
      price: 0,
      discount: 0,
      planType: 'one_month',
      isActive: true,
      isPopular: false,
    },
  });
  const [createPlan] = useCreatePlanMutation();

  const onSubmit = async (values: PlanValues) => {
    console.log('Submitting with values:', values);

    try {
      const planSubmitData: PlanSubmitData = {
        ...values,
        isActive: values.isActive ?? false,
        isPopular: values.isPopular ?? false,
        planPermissions: Array.isArray(values.planPermissions)
          ? values.planPermissions
          : values.planPermissions
            ? [values.planPermissions]
            : [],
      };

      await createPlan(planSubmitData).unwrap();

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
                  {/* Tên gói */}
                  <FormField
                    control={form.control}
                    name="planName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên gói</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập tên gói" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Giá */}
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giá (VNĐ)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Mô tả */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập mô tả" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Permission */}
                <FormField
                  control={form.control}
                  name="permissionIds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quyền</FormLabel>
                      <div className="grid grid-cols-2 gap-2">
                        {permissionData?.data?.map((perm) => (
                          <label key={perm.permissionId} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={field.value?.includes(perm.permissionId)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  field.onChange([...field.value, perm.permissionId]);
                                } else {
                                  field.onChange(
                                    field.value.filter((id) => id !== perm.permissionId),
                                  );
                                }
                              }}
                            />
                            <span>{perm.permissionName}</span>
                          </label>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Đối tượng */}
                <FormField
                  control={form.control}
                  name="roleId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Đối tượng</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn đối tượng" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="brand">Brand</SelectItem>
                            <SelectItem value="influencer">Influencer</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Dynamic Fields */}
                {form.watch('roleId') === 'brand' && (
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="planPermissions.limited"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Số chiến dịch tối đa</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="planPermissions.limited"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Số influencers tối đa (ID quyền)</FormLabel>
                          <FormControl>
                            <Input placeholder="Nhập ID quyền 1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {form.watch('roleId') === 'influencer' && (
                  <FormField
                    control={form.control}
                    name="planPermissions.limited"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số ứng tuyển tối đa</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Giảm giá */}
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giảm giá (%)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Loại gói */}
                <FormField
                  control={form.control}
                  name="planType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loại gói</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn loại gói" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="one_month">Hàng tháng</SelectItem>
                            <SelectItem value="one_year">Hàng năm</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Switches */}
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>Kích hoạt gói</FormLabel>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isPopular"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>Phổ biến</FormLabel>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit button */}
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
