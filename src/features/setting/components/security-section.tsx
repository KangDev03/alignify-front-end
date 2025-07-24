import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff, Key, Monitor, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Switch } from '@/components/ui/switch';

import { Icons } from '@/components/icons/icons';
import { changeTwoFA } from '@/features/auth/auth.slice';
import type { RootState } from '@/redux/store';
import { zodResolver } from '@hookform/resolvers/zod';

import { type ChangepasswordFormValues, changepasswordSchema } from '../setting.schema';
import { useChange2FAMutation, useChangePasswordMutation } from '../setting.service';

export default function SecuritySection() {
  const dispatch = useDispatch();
  const { twoFA } = useSelector((state: RootState) => state.auth);
  const [change2FA] = useChange2FAMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const form = useForm<ChangepasswordFormValues>({
    resolver: zodResolver(changepasswordSchema),
    defaultValues: {
      newPassword: '',
      oldPassword: '',
      passwordConfirm: '',
    },
  });

  async function onSubmit(values: ChangepasswordFormValues) {
    try {
      await changePassword(values).unwrap();
      toast.success('Đổi mật khẩu thành công!');
    } catch (error) {
      console.error(error);
      toast.error('Đổi mật khẩu thất bại');
    }
  }
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Bảo mật</h3>
        <p className="text-sm text-muted-foreground">
          Quản lý mật khẩu và các tùy chọn bảo mật tài khoản.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Đổi mật khẩu</CardTitle>
        </CardHeader>
        <CardContent className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Mật khẩu hiện tại</FormLabel>
                    <FormControl className="relative">
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Nhập mật khẩu hiện tại"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* New password */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Mật khẩu mới</FormLabel>
                    <FormControl className="relative">
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Nhập mật mới"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* passwordConfirm */}
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                    <FormControl className="relative">
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Nhập lại mật khẩu mới"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" disabled={isLoading === true}>
                <Key className="h-4 w-4 mr-2" />
                {isLoading ? (
                  <>
                    <Icons.loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang cập nhật mật khẩu...
                  </>
                ) : (
                  'Cập nhật mật khẩu'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Xác thực hai yếu tố (2FA)</CardTitle>
          <CardDescription>Thêm lớp bảo mật bổ sung cho tài khoản của bạn.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="2fa-email">Xác thực qua email</Label>
              <p className="text-sm text-muted-foreground">Nhận mã xác thực qua email</p>
            </div>
            <Switch
              id="2fa-email"
              checked={twoFA ?? false}
              onClick={async () => {
                dispatch(changeTwoFA({ turn: !(twoFA ?? false) }));
                await change2FA(twoFA!);
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Ứng dụng xác thực</Label>
              <p className="text-sm text-muted-foreground">
                Sử dụng Google Authenticator hoặc ứng dụng tương tự
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Phiên đăng nhập</CardTitle>
          <CardDescription>Quản lý các thiết bị đã đăng nhập vào tài khoản.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Monitor className="h-5 w-5" />
                <div>
                  <p className="font-medium">Chrome trên Windows</p>
                  <p className="text-sm text-muted-foreground">Hoạt động hiện tại • TP. HCM</p>
                </div>
              </div>
              <Badge variant="secondary">Hiện tại</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Smartphone className="h-5 w-5" />
                <div>
                  <p className="font-medium">Safari trên iPhone</p>
                  <p className="text-sm text-muted-foreground">2 giờ trước • TP. HCM</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Đăng xuất
              </Button>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            Đăng xuất tất cả thiết bị khác
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
