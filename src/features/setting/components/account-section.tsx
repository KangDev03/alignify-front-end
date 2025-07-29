import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import { LanguageSelect } from '@/components/language-select';
import { changeActiveAcc, logout } from '@/features/auth/auth.slice';
import { baseApi } from '@/redux/baseApi';
import { persistor } from '@/redux/store';

import { useCloseAccountMutation } from '../setting.service';

export default function AccountSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [closeAccount] = useCloseAccountMutation();

  const handleLogout = useCallback(() => {
    dispatch(baseApi.util.resetApiState());
    dispatch(logout());
    persistor.purge();
    navigate('/');
  }, [dispatch, navigate]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t('account.title')}</h3>
        <p className="text-sm text-muted-foreground">
          {t('account.description')}
        </p>
      </div>

      {/* <Card>
        <CardHeader>
          <CardTitle>Thông tin đăng nhập</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Tên đăng nhập</Label>
            <Input id="username" defaultValue="nguyenthilan" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input id="phone" defaultValue="+84 901 234 567" />
          </div>
        </CardContent>
      </Card> */}

      <Card>
        <CardHeader>
          <CardTitle>{t('account.regionTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">{t('account.languageLabel')}</Label>
              <LanguageSelect variant="default" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">{t('account.dangerZone.title')}</CardTitle>
          <CardDescription>
            {t('account.dangerZone.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="destructive"
            onClick={async () => {
              dispatch(changeActiveAcc({ turn: false }));
              await closeAccount(false);
              handleLogout();
            }}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {t('account.dangerZone.deleteButton')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
