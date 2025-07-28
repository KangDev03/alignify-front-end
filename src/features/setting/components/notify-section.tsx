import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import { changeSoundMode } from '@/features/auth/auth.slice';
import type { RootState } from '@/redux/store';

import { useChangeSoundModeMutation } from '../setting.service';

export default function NotificationsSection() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { sound } = useSelector((state: RootState) => state.auth);
  const [turnSound] = useChangeSoundModeMutation();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t('notifications.title')}</h3>
        <p className="text-sm text-muted-foreground">
          {t('notifications.description')}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('notifications.email.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t('notifications.email.campaign.label')}</Label>
              <p className="text-sm text-muted-foreground">{t('notifications.email.campaign.description')}</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t('notifications.email.message.label')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('notifications.email.message.description')}
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t('notifications.email.system.label')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('notifications.email.system.description')}
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('notifications.push.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t('notifications.push.sound.label')}</Label>
              <p className="text-sm text-muted-foreground">{t('notifications.push.sound.description')}</p>
            </div>
            <Switch
              id="sound"
              checked={sound}
              onClick={async () => {
                const newSoundState = !sound;
                dispatch(changeSoundMode({ turn: newSoundState }));
                await turnSound(newSoundState);
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* <Card>
        <CardHeader>
          <CardTitle>Tần suất thông báo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="frequency">Tần suất email tổng hợp</Label>
            <Select defaultValue="daily">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">Ngay lập tức</SelectItem>
                <SelectItem value="daily">Hàng ngày</SelectItem>
                <SelectItem value="weekly">Hàng tuần</SelectItem>
                <SelectItem value="never">Không bao giờ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
