import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AlertCircleIcon } from 'lucide-react';
import Stomp from 'stompjs';

import { Alert, AlertTitle } from '@/components/ui/alert';

import type { CommonPageableRequest, UserDTO } from '@/features/common/common.type';
import { getStompClient } from '@/lib/stom-client';
import type { RootState } from '@/redux/store';

import UserRow from './user-row';
import { useGetAllPermissionQuery, useGetAllReasonForBannedQuery } from '../../admin.service';
import { setUsers } from '../../admin.slice';
import type { Permission, Reason } from '../../admin.type';

interface NormalRowsProps {
  isInfluencerRole: boolean;
  isBanned: boolean;
}

const UserRows = ({ isInfluencerRole, isBanned }: NormalRowsProps) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.usersManagment);
  const { token } = useSelector((state: RootState) => state.auth);
  const { data } = useGetAllPermissionQuery();
  const { data: reasonDataRaw } = useGetAllReasonForBannedQuery();
  const permissions: Permission[] = data ? data.data : [];
  const reasons: Reason[] = reasonDataRaw ? reasonDataRaw.data : [];
  const collections = isInfluencerRole ? 'influencers' : 'brands';
  const type = isBanned ? 'banned' : 'normal';
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
              dispatch(setUsers(received));
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
  }, [token, collections, type, dispatch]);

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
        reasons={reasons}
      />
    ))
  ) : (
    <Alert variant="default" className='mt-4'>
      <AlertCircleIcon />
      <AlertTitle>Không có tài khoản Brand nào</AlertTitle>
    </Alert>
  );
};

export default UserRows;
