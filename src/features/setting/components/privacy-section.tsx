import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import { changePublicAcc } from '@/features/auth/auth.slice';
import type { RootState } from '@/redux/store';

import { useChangePublicModeMutation } from '../setting.service';

export default function PrivacySection() {
  const dispatch = useDispatch();
  const { publicAcc, role } = useSelector((state: RootState) => state.auth);
  const [changePublicMode] = useChangePublicModeMutation();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Quyền riêng tư</h3>
        <p className="text-sm text-muted-foreground">
          Kiểm soát quyền riêng tư và dữ liệu cá nhân của bạn.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hiển thị hồ sơ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {role === 'INFLUENCER' && (
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Hồ sơ công khai</Label>
                <p className="text-sm text-muted-foreground">
                  Cho phép mọi người xem hồ sơ của bạn
                </p>
              </div>
              <Switch
                id="public"
                checked={publicAcc ?? true}
                onClick={async () => {
                  const newState = !(publicAcc ?? true);
                  dispatch(changePublicAcc({ turn: newState }));
                  await changePublicMode(newState);
                }}
              />
            </div>
          )}
          {/* <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Hiển thị thống kê</Label>
              <p className="text-sm text-muted-foreground">
                Hiển thị số followers và engagement rate
              </p>
            </div>
            <Switch defaultChecked />
          </div> */}
          {/* <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Cho phép liên hệ</Label>
              <p className="text-sm text-muted-foreground">Brands có thể gửi tin nhắn trực tiếp</p>
            </div>
            <Switch defaultChecked />
          </div> */}
        </CardContent>
      </Card>

      {/* <Card>
        <CardHeader>
          <CardTitle>Thu thập dữ liệu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Phân tích sử dụng</Label>
              <p className="text-sm text-muted-foreground">Giúp cải thiện trải nghiệm sử dụng</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Quảng cáo được cá nhân hóa</Label>
              <p className="text-sm text-muted-foreground">
                Hiển thị quảng cáo phù hợp với sở thích
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card> */}

      <Card>
        <CardHeader>
          <CardTitle>Quyền kiểm soát dữ liệu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Tải xuống dữ liệu của tôi
            </Button>
            {/* <Button variant="outline" className="w-full justify-start">
              Yêu cầu xóa dữ liệu
            </Button> */}
            {/* <Button variant="outline" className="w-full justify-start">
              Xem chính sách quyền riêng tư
            </Button> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
