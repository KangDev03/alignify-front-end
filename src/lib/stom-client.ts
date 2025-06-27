import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import { host } from '@/config';

let stompClient: Stomp.Client | null = null;
let isConnected = false;
let connectPromise: Promise<Stomp.Client> | null = null;

export function getStompClient(token: string): Promise<Stomp.Client> {
  if (stompClient && isConnected) {
    return Promise.resolve(stompClient);
  }
  if (connectPromise) return connectPromise;

  connectPromise = new Promise((resolve, reject) => {
    const socket = new SockJS(`${host}/ws`);
    const client = Stomp.over(socket);
    client.debug = () => { };
    client.connect(
      { Authorization: `Bearer ${token}` },
      () => {
        stompClient = client;
        isConnected = true;
        resolve(client);
      },
      (error) => {
        isConnected = false;
        connectPromise = null;
        reject(error);
      },
    );
  });
  return connectPromise;
}

export async function sendComment(contentId: string, content: string, token: string): Promise<void> {
  const client = await getStompClient(token);
  client.send(`/app/comment`, { Authorization: `Bearer ${token}` }, JSON.stringify({ contentId, content }));
}