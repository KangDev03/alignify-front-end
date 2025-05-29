import { Link, useLocation } from 'react-router';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function SignUpForm() {
    const query = useQuery();
    const role = query.get('role');

    if (role !== 'creator' && role !== 'brand') return null;

    const isCreator = role === 'creator';

    const formFields = isCreator ? (
        <div className="space-y-4">
            <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                    <Label htmlFor="lastName">Họ</Label>
                    <Input id="lastName" placeholder="Nguyễn" />
                </div>
                <div className="flex-1 space-y-2">
                    <Label htmlFor="firstName">Tên</Label>
                    <Input id="firstName" placeholder="Văn A" />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="example@example.com" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input id="password" type="password" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                <Input id="confirmPassword" type="password" />
            </div>
        </div>
    ) : (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="brandName">Tên nhãn hàng</Label>
                <Input id="brandName" placeholder="Tên nhãn hàng của bạn" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="example@example.com" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input id="password" type="password" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                <Input id="confirmPassword" type="password" />
            </div>
        </div>
    );

    const description = isCreator
        ? 'Đăng ký tài khoản nhà sáng tạo nội dung'
        : 'Đăng ký tài khoản nhãn hàng quảng cáo';

    return (
        <Card className="w-full max-w-md border-2 bg-card shadow-lg">
            <CardHeader className="text-center space-y-1">
                <CardTitle className="text-2xl font-bold text-primary">Đăng ký</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                {formFields}
                <Button type="submit" variant="default" className="w-full">
                    Đăng Ký
                </Button>
            </CardContent>

            <CardFooter className="justify-center text-sm text-muted-foreground">
                Đã có tài khoản?{' '}
                <Link to="/auth/login" className="ml-1 font-medium text-primary hover:text-primary/80">
                    Đăng nhập
                </Link>
            </CardFooter>
        </Card>
    )
}
