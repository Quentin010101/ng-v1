import { Component, ElementRef, ViewChild } from '@angular/core';
import { PopupService } from '../../../service/utils/popup.service';
import { PopUp, PopUpResponse, PopUpType } from '../../../model/utils/popUp.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss'
})
export class PopUpComponent {
  @ViewChild('pop') popElement!: ElementRef
  popUp!: PopUp
  faClose = faClose

  constructor(private _popupService: PopupService){
  }

  ngOnInit(){
    this._popupService.$popUp.subscribe(data=>{
      if(data != null){
        this.popUp = data
        this.popElement.nativeElement.style.display = 'flex';
      }
    })
  }

  public onClose(){
    this.respond(PopUpResponse.CLOSE)
  }

  public onCancel(){
    this.respond(PopUpResponse.CANCEL)
  }

  public onValidate(){
    this.respond(PopUpResponse.VALIDATE)
  }

  private closePopUp(){
    this.popElement.nativeElement.style.display = 'none';
  }

  private respond(response: PopUpResponse){
    this.closePopUp()
    
    switch(this.popUp.type){
      case PopUpType.DEFAULT: this._popupService.$answer.next(response); break;
      case PopUpType.MASTERMIND: this._popupService.$answerMasterMind.next(response); break;
      case PopUpType.USERDELETE: this._popupService.$answerUserDelete.next(response); break;
    }
    
  }
}
