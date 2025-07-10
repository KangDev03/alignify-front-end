import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { UserDTO } from '../common/common.type';

interface UserState {
  users: UserDTO[] | [];
}

const intitialUserState: UserState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'admin-users',
  initialState: intitialUserState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserDTO[]>) => {
      if (action.payload && action.payload.length > 0) state.users = action.payload;
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.userId !== action.payload);
    },
  },
});

export const { setUsers, removeUser } = usersSlice.actions;
export default usersSlice.reducer;
