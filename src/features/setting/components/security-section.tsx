import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
      toast.success(t('security.toast.success'));
    } catch (error) {
      console.error(error);
      toast.error(t('security.toast.error'));
    }
  }
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t('security.sectionTitle')}</h3>
        <p className="text-sm text-muted-foreground">
          {t('security.sectionDescription')}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('security.password.title')}</CardTitle>
        </CardHeader>
        <CardContent className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>{t('security.password.oldLabel')}</FormLabel>
                    <FormControl className="relative">
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder={t('security.password.placeholderOld')}
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
                    <FormLabel>{t('security.password.newLabel')}</FormLabel>
                    <FormControl className="relative">
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder={t('security.password.placeholderNew')}
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
                    <FormLabel>{t('security.password.confirmLabel')}</FormLabel>
                    <FormControl className="relative">
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder={t('security.password.placeholderConfirm')}
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
                    {t('security.password.updating')}
                  </>
                ) : (
                  t('security.password.updateButton')
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('security.2fa.title')}</CardTitle>
          <CardDescription>{t('security.2fa.description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="2fa-email">{t('security.2fa.emailLabel')}</Label>
              <p className="text-sm text-muted-foreground">{t('security.2fa.emailDesc')}</p>
            </div>
            <Switch
              id="2fa-email"
              checked={twoFA ?? false}
              onClick={async () => {
                const newTwoFAState = !(twoFA ?? false);
                dispatch(changeTwoFA({ turn: newTwoFAState }));
                await change2FA(newTwoFAState);
              }}
            />
          </div>
          {/* <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Ứng dụng xác thực</Label>
              <p className="text-sm text-muted-foreground">
                Sử dụng Google Authenticator hoặc ứng dụng tương tự
              </p>
            </div>
            <Switch />
          </div> */}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('security.sessions.title')}</CardTitle>
          <CardDescription>{t('security.sessions.description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Monitor className="h-5 w-5" />
                <div>
                  <p className="font-medium">{t('security.sessions.example.desktop')}</p>
                  <p className="text-sm text-muted-foreground">{t('security.sessions.example.locationNow')}</p>
                </div>
              </div>
              <Badge variant="secondary">{t('security.sessions.currentDevice')}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Smartphone className="h-5 w-5" />
                <div>
                  <p className="font-medium">{t('security.sessions.example.mobile')}</p>
                  <p className="text-sm text-muted-foreground">{t('security.sessions.example.locationPast')}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                {t('security.sessions.logout')}
              </Button>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            {t('security.sessions.logoutAll')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
