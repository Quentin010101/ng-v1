import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { CompartimentService } from '../../../../service/planner/compartiment.service';
import { MessageService } from '../../../../service/message.service';
import { Message } from '../../../../model/message.model';
import { TooltipComponent } from '../../../../core/shared/tooltip/tooltip.component';

@Component({
  selector: 'app-supression-compartiment',
  standalone: true,
  imports: [FontAwesomeModule, TooltipComponent],
  templateUrl: './supression.component.html',
  styleUrl: './supression.component.scss'
})
export class SupressionComponent {
  faTrashCan = faTrashCan
  @Input() id!: number
  @ViewChild("icon") icon!: ElementRef

  constructor(private _compartimentService: CompartimentService, private _messageService: MessageService){}

  deleteCompartiment(){
    if(this.id){
      this._compartimentService.delete(this.id).subscribe(data =>{
        if(!data.executionStatus){
          this._messageService.$message.next(new Message(true,data.message))
          this.icon.nativeElement.classList.add("wiggle")
          setTimeout(()=>{
            this.icon.nativeElement.classList.remove("wiggle")
          }, 500)
        }
      })
    }
  }
}
