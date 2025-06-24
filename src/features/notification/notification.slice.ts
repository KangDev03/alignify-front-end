import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type {
  NotificationResponse,
  NotificationSending,
  RecievedNotification,
} from './notification.type';

interface NotificationSlice {
  received: RecievedNotification[];
  sending: NotificationSending | null;
}

const initialState: NotificationSlice = {
  received: [],
  sending: null,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setReceivedNotification: (state, action: PayloadAction<NotificationResponse>) => {
      state.received = Array.isArray(action.payload?.data) ? action.payload.data : [];
    },
    addReceivedNotification: (state, action: PayloadAction<RecievedNotification>) => {
      state.received = [action.payload, ...state.received];
    },
    setNotificationSending: (state, action: PayloadAction<NotificationSending>) => {
      state.sending = action.payload;
    },
  },
});
export const { setReceivedNotification, addReceivedNotification, setNotificationSending } =
  notificationSlice.actions;
export default notificationSlice.reducer;
