import { Monitor, Moon, Sun } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import { type Theme, useTheme } from '@/components/theme/theme-provider';

export default function AppearanceSection() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Giao diện</h3>
        <p className="text-sm text-muted-foreground">Tùy chỉnh giao diện và trải nghiệm sử dụng.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Chọn theme hiển thị cho ứng dụng.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="border-2 border-primary rounded-lg p-4 bg-background">
                <Sun className="h-6 w-6 mb-2" />
                <p className="text-sm font-medium">Sáng</p>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={theme === 'light'}
                  onChange={() => toggleTheme('light')}
                  className="cursor-pointer"
                />
                <Label>Theme sáng</Label>
              </div>
            </div>
            <div className="space-y-2">
              <div className="border rounded-lg p-4 bg-slate-900 text-white">
                <Moon className="h-6 w-6 mb-2" />
                <p className="text-sm font-medium">Tối</p>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={theme === 'dark'}
                  onChange={() => toggleTheme('dark')}
                  className="cursor-pointer"
                />
                <Label>Theme tối</Label>
              </div>
            </div>
            <div className="space-y-2">
              <div className="border rounded-lg p-4 bg-gradient-to-br from-background to-slate-100">
                <Monitor className="h-6 w-6 mb-2" />
                <p className="text-sm font-medium">Hệ thống</p>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="theme"
                  value="system"
                  checked={theme === 'system'}
                  onChange={() => toggleTheme('system')}
                  className="cursor-pointer"
                />
                <Label>Theo hệ thống</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* <Card>
        <CardHeader>
          <CardTitle>Màu chủ đạo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-6 gap-2">
            {[
              'bg-blue-500',
              'bg-green-500',
              'bg-purple-500',
              'bg-red-500',
              'bg-orange-500',
              'bg-pink-500',
            ].map((color, index) => (
              <button
                key={index}
                className={`w-8 h-8 rounded-full ${color} ${index === 0 ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
              />
            ))}
          </div>
        </CardContent>
      </Card> */}

      {/* <Card>
        <CardHeader>
          <CardTitle>Tùy chỉnh hiển thị</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Hiển thị avatar trong sidebar</Label>
              <p className="text-sm text-muted-foreground">
                Hiển thị ảnh đại diện trong thanh điều hướng
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Hiệu ứng chuyển động</Label>
              <p className="text-sm text-muted-foreground">
                Bật/tắt các hiệu ứng chuyển động trong giao diện
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
