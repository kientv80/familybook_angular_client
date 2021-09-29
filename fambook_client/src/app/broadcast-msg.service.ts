import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Message } from './schema/message';
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class BroadcastMsgService {

  constructor() { }
  private handler : Subject<Message> = new Subject<Message>();
  msg: Message;
  broadcast(type: String, payload: any = null): void{
    this.handler.next({ type, payload });
  }
  subscribe(type: string, callback: (payload: any) => void): Subscription {
    return this.handler
      .filter(message => message.type === type)
      .map(message => message.payload)
      .subscribe(callback);
  } 
}
