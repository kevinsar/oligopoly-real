import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as socketIo from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../models/message.model';
import { MessageType } from '../enums/message-type.enum';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket;
  socketMessage;
  socketSubject;
  socketData;
  disconnectSubject;
  disconnectData;
  reconnectSubject;
  reconnectData;

  initSocket(serverUrl: string): void {
    console.log(`Server Url: ${serverUrl}`);

    this.socketSubject = new BehaviorSubject<Message>(null);
    this.socketData = this.socketSubject.asObservable();

    this.disconnectSubject = new BehaviorSubject<Message>({} as any);
    this.disconnectData = this.socketSubject.asObservable();

    this.reconnectSubject = new BehaviorSubject<Message>({} as any);
    this.reconnectData = this.socketSubject.asObservable();

    this.socket = socketIo.connect(serverUrl, {
      forceNew: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity
    });

    this.socket.on('connect', (data: Message) => {
      console.log('socket is now connected!');

      this.socket.on('message', (message: Message) => {
        console.log(message);
        this.socketSubject.next(message);
      });
    });

    this.socket.on('reconnect_attempt', () => {
      console.log('attempting to reconnect...');
      this.disconnectSubject.next({ disconnected: true });
    });

    this.socket.on('reconnect', e => {
      this.reconnectSubject.next({ disconnected: false });
    });
  }

  send(message: Message): void {
    console.log(' --- ');
    console.log('Message Being Sent is...');
    console.log(message);
    console.log(' --- ');
    this.socket.emit('message', message);
  }

  onMessage(): Observable<Message> {
    return this.socketData;
  }

  onDisconnect(): Observable<any> {
    return this.disconnectData;
  }

  onReconnect(): Observable<any> {
    return this.reconnectData;
  }

  onEvent(event: MessageType): Observable<any> {
    return new Observable<MessageType>(observer => {
      this.socket.on(event, data => {
        observer.next();
      });
    });
  }

  close() {
    this.socket.disconnect();
  }
}
