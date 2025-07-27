import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { parseIsoToDateTime } from '@/utils/format';

import type { ChatMessage, IChatRoom } from './chat-sheet.type';

interface ChatSheetSlice {
  chatRooms: IChatRoom[] | [];
}

const initialState: ChatSheetSlice = {
  chatRooms: [],
};

export const chatSheetSlice = createSlice({
  name: 'chatSheetSlice',
  initialState,
  reducers: {
    setChatRoomsSlice: (state, action: PayloadAction<IChatRoom[]>) => {
      if (action.payload) {
        state.chatRooms = [...action.payload];
      }
    },
    setLastMsg: (state, action: PayloadAction<ChatMessage>) => {
      const { message, userDTO } = action.payload;
      const idx = state.chatRooms.findIndex((room) => room.chatRoomId === message.chatRoomId);
      if (idx !== -1 && idx >= 0) {
        state.chatRooms[idx].lastMessage = message.message;
        state.chatRooms[idx].name = userDTO.name;
        state.chatRooms[idx].sendAt = message.sendAt!;
        state.chatRooms = state.chatRooms.sort(
          (a, b) => parseIsoToDateTime(b.sendAt).valueOf() - parseIsoToDateTime(a.sendAt).valueOf(),
        );
      }
    },
  },
});
export const { setChatRoomsSlice, setLastMsg } = chatSheetSlice.actions;
