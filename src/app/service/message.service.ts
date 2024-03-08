import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../model/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  $message!: Subject<Message>

  constructor() { }


}
