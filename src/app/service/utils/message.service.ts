import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../../model/utils/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  $message: Subject<Message> = new Subject<Message>

  constructor() { }


}
