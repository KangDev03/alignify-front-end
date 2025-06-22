import { CreditCard } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function BillingSection() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Thanh toán</h3>
        <p className="text-sm text-muted-foreground">
          Quản lý gói dịch vụ và phương thức thanh toán.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gói dịch vụ hiện tại</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Gói Premium</p>
              <p className="text-sm text-muted-foreground">
                Truy cập không giới hạn tất cả tính năng
              </p>
            </div>
            <Badge>Đang hoạt động</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Gia hạn vào</span>
            <span className="text-sm font-medium">15/02/2024</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Giá</span>
            <span className="text-sm font-medium">299,000 VNĐ/tháng</span>
          </div>
          <Separator />
          <div className="flex space-x-2">
            <Button variant="outline">Thay đổi gói</Button>
            <Button variant="outline">Hủy đăng ký</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Phương thức thanh toán</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                  VISA
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 1234</p>
                  <p className="text-sm text-muted-foreground">Hết hạn 12/26</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Chỉnh sửa
                </Button>
                <Button variant="outline" size="sm">
                  Xóa
                </Button>
              </div>
            </div>
          </div>
          <Button variant="outline">
            <CreditCard className="h-4 w-4 mr-2" />
            Thêm phương thức thanh toán
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lịch sử thanh toán</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {[
              { date: '15/01/2024', amount: '299,000 VNĐ', status: 'Thành công' },
              { date: '15/12/2023', amount: '299,000 VNĐ', status: 'Thành công' },
              { date: '15/11/2023', amount: '299,000 VNĐ', status: 'Thành công' },
            ].map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{payment.date}</p>
                  <p className="text-sm text-muted-foreground">Gói Premium</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{payment.amount}</p>
                  <Badge variant="secondary" className="text-xs">
                    {payment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full">
            Xem tất cả lịch sử
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
