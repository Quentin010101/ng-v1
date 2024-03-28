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
  @Input() taskId!: number
  @ViewChild("dropComponent") dropComponent!: ElementRef

  constructor(private _dragAndDropService: DragDropService){
    this._dragAndDropService.$isBeingDragged.subscribe(data => {
      if(data){
        this.isBeingDragged(data)
      }
    })
    this._dragAndDropService.$draggedEnd.subscribe(data => {
      if(data){
        this.draggedEnd(data)
      }
    })
  }

  public isBeingDragged(id: number){
    if(this.taskId == id){
      this.dropComponent.nativeElement.style.display = 'none'
    }
  }
  
  public draggedEnd(id: number){
    if(this.taskId == id){
      this.dropComponent.nativeElement.style.display = 'block'
    }
  }
}
