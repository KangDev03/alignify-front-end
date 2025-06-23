import { baseApi } from '@/redux/baseApi';

import type {
  ChatRoomRequest,
  ChatRoomResponse,
  MessagesRequest,
  MessagesResponse,
} from './chat-sheet.type';

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChatRoom: builder.query<ChatRoomResponse, ChatRoomRequest>({
      query: (data) => ({
        url: '/messages/rooms',
        method: 'GET',
        params: { pageSize: data.pageSize, pageNumber: data.pageNumber },
      }),
      providesTags: ['ChatSheet'],
    }),

    getMessagesInRoom: builder.query<MessagesResponse, MessagesRequest>({
      query: (data) => ({
        url: `/messages/${data.roomId}`,
        method: 'GET',
        params: { pageSize: data.pageSize, pageNumber: data.pageNumber },
      }),
      providesTags: (_result, _error, { roomId }) => [{ type: 'ChatRoom', id: roomId }],
    }),
  }),
});

export const { useGetChatRoomQuery, useGetMessagesInRoomQuery } = chatApi;
