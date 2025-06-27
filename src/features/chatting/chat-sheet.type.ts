import type { ApiReponseSuccess, UserDTO } from '../common/common.type';

export interface IChatRoom {
  chatRoomId: string;
  roomName: string;
  roomAvatarUrl: string;
  name: string;
  lastMessage: string;
  readBy: string[];
  sendAt: string;
}

export interface ChatRoomRequest {
  pageSize?: number;
  pageNumber?: number;
}

export interface ChatRoomResponse extends ApiReponseSuccess<IChatRoom[]> {
  data: IChatRoom[];
}

export interface Message {
  messageId?: string | null;
  userId: string;
  chatRoomId: string;
  message: string;
  sendAt?: string;
  tempId?: string | null;
  readBy: string[];
}

export interface ChatMessage {
  message: Message;
  userDTO: UserDTO;
}

export interface MessagesRequest {
  roomId: string;
  pageSize?: number;
  pageNumber?: number;
}

export interface MessagesResponse extends ApiReponseSuccess<ChatMessage[]> {
  data: ChatMessage[];
}
