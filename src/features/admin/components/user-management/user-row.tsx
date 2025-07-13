import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TableCell, TableRow } from '@/components/ui/table';

import { Icons } from '@/components/icons/icons';
import type { UserDTO } from '@/features/common/common.type';
import { useSendNotification } from '@/hooks/useSendNotification';
import { getStompClient } from '@/lib/stom-client';
import { cn } from '@/lib/utils';
import type { RootState } from '@/redux/store';
import { formatDate, isApiResponseError, parseIsoToDateTime } from '@/utils/format';
import { zodResolver } from '@hookform/resolvers/zod';

import { bannedReasonFormSchema, type BannedReasonFormValues } from '../../admin.schema';
import { useBlockPermissionMutation } from '../../admin.service';
import { removeUser } from '../../admin.slice';
import type { Permission, Reason } from '../../admin.type';

interface UserRowProps {
  user: UserDTO;
  isBanned: boolean;
  isInfluencerRole: boolean;
  permissions: Permission[];
  reasons: Reason[];
}

const UserRow = ({ user, isBanned, isInfluencerRole, permissions, reasons }: UserRowProps) => {
  const dispatch = useDispatch();
  const sendNotification = useSendNotification();
  const navigate = useNavigate();
  const { token, id: userId } = useSelector((state: RootState) => state.auth);
  const [blockPermission] = useBlockPermissionMutation();
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  const form = useForm<BannedReasonFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(bannedReasonFormSchema),
    defaultValues: {
      reason: '',
    },
  });

  const handleBanUser = (values: BannedReasonFormValues) => {
    dialogCloseRef.current?.click();
    const reason = reasons.find((item) => item.reasonId === values.reason);
    if (token && reason) {
      getStompClient(token!).then((client) => {
        if (client.connected) {
          client.send(
            `/app/ban/${user.userId}`,
            { Authorization: `Bearer ${token}` },
            JSON.stringify(reason),
          );
        }
      });
      dispatch(removeUser(user.userId));
      sendNotification({
        userId: userId!,
        content: 'Bạn đã cấm người dùng này!',
        name: user.name,
        avatarUrl: user.avatarUrl,
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
      dispatch(removeUser(user.userId));
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
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <Icons.moreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Cấp quyền người dùng</DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer flex items-center gap-2 hover:text-blue-600 focus:text-blue-600"
                onClick={() =>
                  navigate(
                    isInfluencerRole ? `/influencer/${user.userId}` : `/brand/${user.userId}`,
                  )
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
                  className="cursor-pointer flex items-center gap-2"
                  onClick={() => handleUnbanUser(user.userId)}
                >
                  <Icons.userCheck className="h-4 w-4" />
                  Bỏ cấm
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem className="text-red-600 cursor-pointer focus:text-red-700 hover:text-red-700">
                  <DialogTrigger asChild>
                    <div className="flex w-full items-center gap-2">
                      <Icons.ban className="h-4 w-4 text-red-600" />
                      Cấm tài khoản
                    </div>
                  </DialogTrigger>
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
                        'cursor-pointer flex items-center gap-2',
                        hasPermission && 'text-red-600 focus:text-red-700 hover:text-red-700',
                      )}
                      onClick={() =>
                        handleBlockPermission(user.userId, permission.permissionId, hasPermission)
                      }
                    >
                      {hasPermission ? (
                        <Icons.ban className="h-4 w-4 text-red-600 focus:text-red-700 hover:text-red-700" />
                      ) : (
                        <Icons.userCheck className="h-4 w-4 " />
                      )}
                      {permission.permissionDescription}
                    </DropdownMenuItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>Lý do cấm người dùng này ?</DialogTitle>
              <DialogDescription>
                Hành động này sẽ ảnh hưởng trực tiếp đến người dùng và có hiệu lực ngay lập tức.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form className="space-y-4" onSubmit={form.handleSubmit(handleBanUser)}>
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="hidden">Lý do cấm người dùng này?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            console.log('Selected reason:', value);
                            field.onChange(value);
                          }}
                          value={field.value}
                        >
                          {reasons &&
                            reasons.map((reason) => {
                              return (
                                <div key={reason.reasonId} className="flex items-center space-x-2">
                                  <RadioGroupItem value={reason.reasonId} id={reason.reasonId} />
                                  <Label
                                    htmlFor={reason.reasonId}
                                    className="flex flex-col items-start cursor-pointer"
                                  >
                                    <span className="font-medium">{reason.title}</span>
                                    <span className="text-sm text-muted-foreground">
                                      {reason.description}
                                    </span>
                                  </Label>
                                </div>
                              );
                            })}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between">
                  <DialogClose name="close" ref={dialogCloseRef}>
                    <Button type="reset">Thoát</Button>
                  </DialogClose>
                  <Button type="submit" variant="destructive">
                    Cấm
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
