import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';

import { Icons } from '@/components/icons/icons';
import type { UserDTO } from '@/features/common/common.type';
import { getStompClient } from '@/lib/stom-client';
import { cn } from '@/lib/utils';
import type { RootState } from '@/redux/store';
import { formatDate, isApiResponseError, parseIsoToDateTime } from '@/utils/format';

import { useBlockPermissionMutation } from '../../admin.service';
import type { Permission } from '../../admin.type';

interface UserRowProps {
  user: UserDTO;
  isBanned: boolean;
  isInfluencerRole: boolean;
  permissions: Permission[];
}

const UserRow = ({ user, isBanned, isInfluencerRole, permissions }: UserRowProps) => {
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.auth);
  const [blockPermission] = useBlockPermissionMutation();
  const handleBanUser = (userId: string) => {
    if (token) {
      getStompClient(token!).then((client) => {
        if (client.connected) {
          client.send(`/app/ban/${userId}`, { Authorization: `Bearer ${token}` });
        }
      });
    }
  };

  const handleUnbanUser = (userId: string) => {
    if (token) {
      getStompClient(token!).then((client) => {
        if (client.connected) {
          client.send(`/app/unban/${userId}`, { Authorization: `Bearer ${token}` });
        }
      });
    }
  };

  const handleBlockPermission = async (userId: string, permissionId: string, block: boolean) => {
    try {
      await blockPermission({ userId, permissionId, block });
      toast.success('Xác nhận quyền thành công!');
    } catch (err) {
      if (isApiResponseError(err)) {
        toast.error(err.data.error);
      } else {
        toast.error('Xác nhận quyền thất bại. Vui lòng thử lại!');
      }
    }
  };

  return (
    <TableRow key={user.userId}>
      <TableCell>
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatarUrl || '/placeholder.svg'} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{user.name}</div>
            {/* <div className="text-sm text-muted-foreground">{user.email}</div> */}
          </div>
        </div>
      </TableCell>
      {/* <TableCell>{getStatusBadge(user.status)}</TableCell> */}
      {/* <TableCell>{getSubscriptionBadge(user.subscription)}</TableCell> */}
      <TableCell>{formatDate(parseIsoToDateTime(user.createdAt!))}</TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <Icons.moreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Cấp quyền người dùng</DropdownMenuLabel>
            <DropdownMenuItem
              className="cursor-pointer hover:text-blue-600 focus:text-blue-600"
              onClick={() =>
                navigate(isInfluencerRole ? `/influencer/${user.userId}` : `/brand/${user.userId}`)
              }
            >
              <Icons.eye className="h-4 w-4 hover:text-blue-600 focus:text-blue-600" />
              Xem hồ sơ
            </DropdownMenuItem>
            {/* <DropdownMenuItem>
              <Icons.mail className="mr-2 h-4 w-4" />
              Gửi email
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            {isBanned ? (
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleUnbanUser(user.userId)}
              >
                <Icons.userCheck className="mr-2 h-4 w-4" />
                Bỏ cấm
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                className="text-red-600 cursor-pointer focus:text-red-700 hover:text-red-700"
                onClick={() => handleBanUser(user.userId)}
              >
                <Icons.ban className="h-4 w-4 text-red-600" />
                Cấm tài khoản
              </DropdownMenuItem>
            )}
            {permissions &&
              permissions.map((permission) => {
                if (permission.permissionName === 'all') return;
                const hasPermission =
                  user.permissions?.findIndex(
                    (per) => per.permissionId === permission.permissionId,
                  ) !== -1;
                return (
                  <DropdownMenuItem
                    key={permission.permissionId}
                    className={cn(
                      'cursor-pointer',
                      hasPermission && 'text-red-600 focus:text-red-700 hover:text-red-700',
                    )}
                    onClick={() =>
                      handleBlockPermission(user.userId, permission.permissionId, hasPermission)
                    }
                  >
                    {hasPermission ? (
                      <Icons.ban className="h-4 w-4 text-red-600 focus:text-red-700 hover:text-red-700" />
                    ) : (
                      <Icons.userCheck className="mr-2 h-4 w-4 " />
                    )}
                    {permission.permissionDescription}
                  </DropdownMenuItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
