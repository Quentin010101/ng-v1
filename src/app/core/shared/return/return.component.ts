import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft,faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'; 

@Component({
  selector: 'app-return',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './return.component.html',
  styleUrl: './return.component.scss'
})
export class ReturnComponent {
  faArrowLeft=faArrowLeft
  faArrowLeftLong=faArrowLeftLong
  mouseover: boolean = false

  @Output() onReturn = new EventEmitter<boolean>()

  public onClick(){
    this.onReturn.emit(true)
  }
}
