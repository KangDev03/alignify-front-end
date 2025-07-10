import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AlertCircleIcon } from 'lucide-react';
import Stomp from 'stompjs';

import { Alert, AlertTitle } from '@/components/ui/alert';

import type { CommonPageableRequest, UserDTO } from '@/features/common/common.type';
import { getStompClient } from '@/lib/stom-client';
import type { RootState } from '@/redux/store';

import UserRow from './user-row';
import { useGetAllPermissionQuery } from '../../admin.service';
import type { Permission } from '../../admin.type';

interface NormalRowsProps {
  isInfluencerRole: boolean;
  isBanned: boolean;
}

const UserRows = ({ isInfluencerRole, isBanned }: NormalRowsProps) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const { data } = useGetAllPermissionQuery();
  const permissions: Permission[] = data ? data.data : [];
  const collections = isInfluencerRole ? 'influencers' : 'brands';
  const type = isBanned ? 'banned' : 'normal';
  const [users, setUsers] = useState<UserDTO[]>([]);
  useEffect(() => {
    if (!token) return;
    let subscription: any;
    getStompClient(token).then((client) => {
      subscription = client.subscribe(
        `/topic/users/${collections}/${type}`,
        (res: Stomp.Message) => {
          try {
            const received: UserDTO[] = JSON.parse(res.body);
            if (received) {
              setUsers(received);
            }
          } catch (error) {
            console.error('Error parsing STOMP message:', error);
          }
        },
      );
    });
    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, [token, collections, type]);

  useEffect(() => {
    if (token) {
      getStompClient(token!).then((client) => {
        if (client.connected) {
          const pageRequest: CommonPageableRequest = {
            pageNumber: 0,
            pageSize: 10,
          };
          client.send(
            `/app/users/${collections}/${type}`,
            { Authorization: `Bearer ${token}` },
            JSON.stringify(pageRequest),
          );
        }
      });
    }
  }, [token, collections, type]);

  return users && users.length && users.length > 0 ? (
    users.map((user) => (
      <UserRow
        key={user.userId}
        user={user}
        permissions={permissions}
        isBanned={isBanned}
        isInfluencerRole={isInfluencerRole}
      />
    ))
  ) : (
    <Alert variant="default">
      <AlertCircleIcon />
      <AlertTitle>Không có tài khoản Brand nào</AlertTitle>
    </Alert>
  );
};

export default UserRows;
