'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BrandInvitations from '@/features/invitation/components/invitation-brand';
import InfluencerInvitations from '@/features/invitation/components/invitation-influencer';
import { useGetAllInvitationsQuery } from '@/features/invitation/invitation.service';
import { setInvitations } from '@/features/invitation/invitation.slice';
import type { RootState } from '@/redux/store';

export default function Invitation() {
  const dispatch = useDispatch();
  const { role } = useSelector((state: RootState) => state.auth);
  const { data: invitationsRaw } = useGetAllInvitationsQuery({ roleName: role! });
  useEffect(() => {
    if (invitationsRaw?.data) {
      dispatch(setInvitations(invitationsRaw));
    }
  }, [dispatch, invitationsRaw]);

  return (
    <>
      {role === 'INFLUENCER' && <InfluencerInvitations />}
      {role === 'BRAND' && <BrandInvitations />}
    </>
  );
}
