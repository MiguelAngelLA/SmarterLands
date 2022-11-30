import { Injectable } from '@angular/core';
import { Subject, Observer, Observable } from 'rxjs';;

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {
  constructor() { }

  private subject!: Subject<MessageEvent>;

  public connect(url: any): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
    }
    return this.subject;
  }

  private create(url: any): Subject<any> {
    let ws = new WebSocket(url);

    let observable = Observable.create(
      (obs: Observer<any>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
        return ws.close.bind(ws);
      })
    let observer = {
      next: (data: any) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(data);
        }
      }
    }
    return Subject.create(observer, observable);
  }

}
