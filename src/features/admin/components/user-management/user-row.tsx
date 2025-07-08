import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

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
import type { RootState } from '@/redux/store';
import { formatDate, parseIsoToDateTime } from '@/utils/format';

interface UserRowProps {
  user: UserDTO;
  isBanned: boolean;
  isInfluencerRole: boolean;
}

const UserRow = ({ user, isBanned, isInfluencerRole }: UserRowProps) => {
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.auth);

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
            <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                navigate(isInfluencerRole ? `/influencer/${user.userId}` : `/brand/${user.userId}`)
              }
            >
              <Icons.eye className="mr-2 h-4 w-4" />
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
                className="text-red-600 cursor-pointer"
                onClick={() => handleBanUser(user.userId)}
              >
                <Icons.ban className="mr-2 h-4 w-4" />
                Cấm tài khoản
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
