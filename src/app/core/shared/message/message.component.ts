import { Component } from '@angular/core';
import { MessageService } from '../../../service/message.service';
import { Message } from '../../../model/message.model';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';


const enterTransition = transition(':enter', [
  style({
    opacity: 0,
  }),
  animate('1s ease-in', style({ opacity: 1})),
])
const exitTransition = transition(':leave', [
  style({
    opacity: 1
  }),
  animate('1s ease-in', style({ opacity: 0}))
])
const translateEnter = transition(':enter', [
  style({
    transform: 'translateX(100%)'
  }),
  animate('500ms ease-in', style({ transform: 'translateX(-10%)'})),
  animate('100ms ease-in', style({ transform: 'translateX( 0%)'})),
])
const translateLeave = transition(':leave', [
  style({
    transform: 'translateX(0%)'
  }),
  animate('100ms 400ms ease-in', style({ transform: 'translateX(-10%)'})),
  animate('500ms ease-in', style({ transform: 'translateX( 100%)'})),
])
const tEnter = trigger('tEnter', [translateEnter])
const tLeave = trigger('tLeave', [translateLeave])
const fadeIn = trigger('fadeIn', [enterTransition])
const fadeOut = trigger('fadeOut', [exitTransition])

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  animations: [fadeIn, fadeOut, tEnter, tLeave]
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
