import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DragDropService } from '../../../../service/utils/drag-drop.service';

@Component({
  selector: 'app-drop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drop.component.html',
  styleUrl: './drop.component.scss'
})
export class DropComponent {
  @ViewChild("dropComponent") dropComponent!: ElementRef
  @Input() id!: number
  taskId!: string
  before!: boolean

  constructor(private _dragAndDropService: DragDropService){
    this._dragAndDropService.$dragOverInfo.subscribe(data => {
      if(data){
        this.before = data?.before
        this.taskId = data?.id
        this.setAction()
      }
    })
  }

  private setAction(){
    if(this.id == parseInt(this.taskId)){
      if(this.before){
        this.dropComponent.nativeElement.classList.add("before")
        this.dropComponent.nativeElement.classList.remove("after")
      }else{
        this.dropComponent.nativeElement.classList.add("after")
        this.dropComponent.nativeElement.classList.remove("before")
      }
    }else{
      this.dropComponent.nativeElement.classList.remove("after")
      this.dropComponent.nativeElement.classList.remove("before")
    }
  }
}
