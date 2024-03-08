import { Component } from '@angular/core';
import { MessageService } from '../../service/message.service';
import { Message } from '../../model/message.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  duration: number = 10000
  messages: Message[] = []

  constructor(private _messageService: MessageService){
    this._messageService.$message.subscribe(data=>{
      let index = this.messages.length
      this.messages[index] = data
      this.removeMessage(index)
    })

  }

  private removeMessage(i: number){
    setTimeout(()=>{
      this.messages.slice(i, i+1)
    }, this.duration)
  }
}
