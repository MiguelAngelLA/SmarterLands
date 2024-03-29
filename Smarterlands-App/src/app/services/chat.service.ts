import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { WebsocketsService } from './websockets.service';

const CHAT_URL = 'ws://192.168.248.252:5003/ws';



@Injectable({
  providedIn: 'root'
})



export class ChatService {
  public messages: Subject<any>;

  constructor(wsService: WebsocketsService) {
    this.messages = <Subject<any>>wsService
      .connect(CHAT_URL)
      .pipe(map((response: MessageEvent): any => {
        let data = response.data
        return {
          data
        }
      }));
  }

}
