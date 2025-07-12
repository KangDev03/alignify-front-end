'use client';

import { useSelector } from 'react-redux';

import BrandInvitations from '@/features/invitation/components/invitation-brand';
import InfluencerInvitations from '@/features/invitation/components/invitation-influencer';
import type { RootState } from '@/redux/store';

export default function Invitation() {
  const { role } = useSelector((state: RootState) => state.auth);

  return (
    <>
      {role === 'INFLUENCER' && <InfluencerInvitations />}
      {role === 'BRAND' && <BrandInvitations />}
    </>
  );
}
