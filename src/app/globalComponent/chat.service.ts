import { NgModel } from '@angular/forms/src/directives';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

export class ChatService {
    public url = environment.baseUrl;
    public socket;
    public rooms = [];
    constructor() {
        this.socket = io(this.url);
    }
    joinRoom(roomName: string) {
      this.socket.emit('join', roomName);
      if (!this.rooms.includes(roomName)) {
        this.rooms.push(roomName);
        console.log(this.rooms);
      }
    }
    sendMessage(message) {
      this.socket.emit('new-message', message);
    }
    getMessages() {
      const observable = new Observable(observer => {
        this.socket.on('new-message', (data) => {
          console.log(data);
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      });
      return observable;
    }
    admin() {
      const observable = new Observable<string>(observer => {
        this.socket.on('a-user-joined', (data) => {
          console.log(data);
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      });
      return observable;
    }
    disconnect(room: string) {
      this.socket.emit('discon', room);
    }
    disconnected() {
      const observable = new Observable<string>(observer => {
        this.socket.on('a-user-disconnected', (data) => {
          console.log(data);
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      });
      return observable;
    }
}
