import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Invitation, InvitationResponse } from './invitation.type';

interface InvitationSlice {
  invitations: Invitation[] | [];
}
const initial: InvitationSlice = {
  invitations: [],
};
export const invitationSlice = createSlice({
  name: 'invitationSlice',
  initialState: initial,
  reducers: {
    setInvitations: (state, action: PayloadAction<InvitationResponse>) => {
      if (action.payload.data && action.payload.data.length > 0)
        state.invitations = action.payload.data;
      else state.invitations = [];
    },
  },
});

export const { setInvitations } = invitationSlice.actions;
export default invitationSlice.reducer;
