import { useState } from 'react';
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
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
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

import { Icons } from '@/components/icons/icons';
import { useGetRolesQuery } from '@/features/common/common.service';
import {
  useEditPlanMutation,
  useGetPermissionQuery,
} from '@/features/upgrade-plan/components/upgrade-plan.service';
import type {
  Plan,
  PlanPermissionSubmitData,
  PlanSubmitData,
} from '@/features/upgrade-plan/components/upgrade-plan.type';
import { isApiResponseError } from '@/utils/format';
import { zodResolver } from '@hookform/resolvers/zod';

import { planSchema, type PlanValues } from '../../admin.schema';

export function EditPlanModal({ plan }: { plan: Plan }) {
  const { data: rolesRaw } = useGetRolesQuery();
  const { data: permissionData } = useGetPermissionQuery();
  const [updatePlan] = useEditPlanMutation();
  const [open, setOpen] = useState(false);
  const roles = rolesRaw?.data;

  const form = useForm<PlanValues>({
    mode: 'onSubmit',
    resolver: zodResolver(planSchema),
    defaultValues: {
      planName: plan.planName,
      description: plan.description,
      roleId: roles?.find((r) => r.roleId === plan.roleId)?.roleName ?? 'BRAND',
      permissionIds: plan.permissions.map((p) => p.permissionId) ?? [],
      planPermissions: {
        ...plan.planPermissions.reduce((acc, curr) => {
          acc[curr.planPermissionName] = curr.limited;
          return acc;
        }, {} as any),
      },
      price: plan.price,
      discount: plan.discount,
      planType: plan.planType,
      isActive: plan.isActive,
      isPopular: plan.isPopular,
    },
  });

  const onSubmit = async (values: PlanValues) => {
    try {
      const planPermissionsArray: PlanPermissionSubmitData[] = Object.entries(
        values.planPermissions,
      )
        .reduce((acc: PlanPermissionSubmitData[], [planPermissionName, limited]) => {
          if (typeof limited === 'number' && limited >= 0) {
            const matched = plan.planPermissions.find(
              (p) => p.planPermissionName === planPermissionName,
            );
            acc.push({
              planPermissionId: matched?.planPermissionId,
              planPermissionName,
              limited,
            });
          }
          return acc;
        }, [])

        .filter((item): item is PlanPermissionSubmitData => item !== undefined);

      const planSubmitData: PlanSubmitData = {
        ...values,
        roleId: roles!.find((role) => role.roleName === values.roleId)!.roleId,
        planPermissions: planPermissionsArray,
        isActive: values.isActive ?? false,
        isPopular: values.isPopular ?? false,
      };

      await updatePlan({ planId: plan.planId, ...planSubmitData }).unwrap();

      toast.success('Cập nhật gói thành công!');
      setOpen(false);
    } catch (err) {
      if (isApiResponseError(err)) {
        toast.error('Cập nhật thất bại. Vui lòng thử lại!');
      } else {
        toast.error('Cập nhật thất bại. Vui lòng thử lại!');
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Icons.edit className=" h-4 w-4" />
          Chỉnh sửa
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa gói</DialogTitle>
          <DialogDescription>Chỉnh sửa thông tin gói hiện tại</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="roleId"
                render={({ field }) => (
                  <FormItem className="col-span-2 w-full">
                    <FormLabel>Đối tượng</FormLabel>
                    <FormControl>
                      <div className="w-full flex items-center space-x-2">
                        <Switch
                          id="role"
                          checked={field.value === 'INFLUENCER'}
                          onCheckedChange={() => {
                            if (field.value === 'INFLUENCER') field.onChange('BRAND');
                            else field.onChange('INFLUENCER');
                          }}
                        />
                        <Label htmlFor="role" className="lowercase">
                          <p className="first-letter:uppercase">{field.value}</p>
                        </Label>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="planName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên gói</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên gói" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá (VNĐ)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Giá tiền" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập mô tả" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="permissionIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quyền</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {permissionData?.data?.map((perm) => {
                      if (
                        perm.permissionName === 'posting' ||
                        perm.permissionName === 'comment' ||
                        perm.permissionName === 'all'
                      )
                        return null;
                      return (
                        <label key={perm.permissionId} className="flex items-center space-x-2">
                          <Input
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
                      );
                    })}
                  </div>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              {form.watch('roleId') === 'BRAND' && (
                <>
                  <FormField
                    control={form.control}
                    name="planPermissions.campaign_invitation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lời mời tối đa</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Số lượng" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="planPermissions.campaign_members"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số influencers tối đa</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Số lượng" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </>
              )}

              {form.watch('roleId') === 'INFLUENCER' && (
                <FormField
                  control={form.control}
                  name="planPermissions.campaign_apply"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số ứng tuyển tối đa</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Số lượng" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="planPermissions.search_result"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số kết quả tìm kiếm trả về</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Số lượng" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giảm giá (%)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Phần trăm" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

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
                </FormItem>
              )}
            />

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

            <div className="flex justify-end space-x-2">
              <Button variant="outline" type="button">
                Hủy
              </Button>
              <Button type="submit">Lưu thay đổi</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
