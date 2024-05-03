import { Component } from '@angular/core';
import { MessageService } from '../../../service/utils/message.service';
import { Message } from '../../../model/utils/message.model';
import { CommonModule } from '@angular/common';
import { bounceInRightOnEnterAnimation, bounceOutRightOnLeaveAnimation, fadeInOnEnterAnimation } from 'angular-animations';



@Component({
  selector: 'app-message',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  animations: [fadeInOnEnterAnimation(),bounceOutRightOnLeaveAnimation(),bounceInRightOnEnterAnimation()]

})
export class MessageComponent {
  duration: number = 5000
  messages: Message[] = []

  constructor(private _messageService: MessageService){
  }

  ngOnInit(){
    this._messageService.$message.subscribe(data=>{
      if(data != null){
        this.messages.push(data)
        this.removeMessage()
      }
    })
  }

  private removeMessage(){
    setTimeout(()=>{
      this.messages.shift()
    }, this.duration)
  }
}
