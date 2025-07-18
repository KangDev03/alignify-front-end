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
  useCreatePlanMutation,
  useGetPermissionQuery,
} from '@/features/upgrade-plan/components/upgrade-plan.service';
import type {
  PlanPermissionSubmitData,
  PlanSubmitData,
} from '@/features/upgrade-plan/components/upgrade-plan.type';
import { isApiResponseError } from '@/utils/format';
import { zodResolver } from '@hookform/resolvers/zod';

import { planSchema, type PlanValues } from '../../admin.schema';

export function PlanModal() {
  const { data: rolesRaw } = useGetRolesQuery();
  const roles = rolesRaw?.data;
  const { data: permissionData } = useGetPermissionQuery();
  const [createPlan] = useCreatePlanMutation();
  const form = useForm<PlanValues>({
    mode: 'onSubmit',
    resolver: zodResolver(planSchema),
    defaultValues: {
      planName: '',
      description: '',
      roleId: 'BRAND',
      permissionIds: [],
      planPermissions: {
        campaign_apply: undefined,
        campaign_invitation: undefined,
        campaign_members: undefined,
        search_result: undefined,
      },
      price: undefined,
      discount: undefined,
      planType: 'one_month',
      isActive: true,
      isPopular: false,
    },
  });

  const onSubmit = async (values: PlanValues) => {
    try {
      const planPermissionsArray: PlanPermissionSubmitData[] = Object.entries(
        values.planPermissions,
      )
        .map(([planPermissionName, limited]) => {
          if (typeof limited === 'number' && limited >= 0)
            return {
              planPermissionName,
              limited,
            } as PlanPermissionSubmitData;
          return undefined;
        })
        .filter((item): item is PlanPermissionSubmitData => item !== undefined);

      const planSubmitData: PlanSubmitData = {
        ...values,
        roleId: roles!.find((role) => role.roleName === values.roleId)!.roleId,
        planPermissions: planPermissionsArray,
        isActive: values.isActive ?? false,
        isPopular: values.isPopular ?? false,
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

  return (
    <Dialog>
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
                    <FormMessage />
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
                    <FormMessage />
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
                      <Input placeholder="Giá tiền" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
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
                  <FormMessage />
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
                        return;
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
                  <FormMessage />
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
                          <Input placeholder="Số lượng" type="number" {...field} />
                        </FormControl>
                        <FormMessage />
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
                          <Input placeholder="Số lượng" type="number" {...field} />
                        </FormControl>
                        <FormMessage />
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
                        <Input placeholder="Số lượng" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
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
                      <Input placeholder="Số lượng" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
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
                    <FormMessage />
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
                  <FormMessage />
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
              <Button type="submit">Tạo gói</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
