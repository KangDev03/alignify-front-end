import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { changeActiveAcc, logout } from '@/features/auth/auth.slice';
import { baseApi } from '@/redux/baseApi';
import { persistor } from '@/redux/store';

import { useCloseAccountMutation } from '../setting.service';

export default function AccountSection() {
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
        <h3 className="text-lg font-medium">Tài khoản</h3>
        <p className="text-sm text-muted-foreground">
          Quản lý thông tin tài khoản và tùy chọn đăng nhập.
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
          <CardTitle>Tùy chọn khu vực</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Ngôn ngữ</Label>
              <Select defaultValue="vi">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vi">Tiếng Việt</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Múi giờ</Label>
              <Select defaultValue="asia/ho_chi_minh">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asia/ho_chi_minh">GMT+7 (Hồ Chí Minh)</SelectItem>
                  <SelectItem value="asia/bangkok">GMT+7 (Bangkok)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Vùng nguy hiểm</CardTitle>
          <CardDescription>
            Các hành động này không thể hoàn tác. Hãy cân nhắc kỹ trước khi thực hiện.
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
            Xóa tài khoản
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
