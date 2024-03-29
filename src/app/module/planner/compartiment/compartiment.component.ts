import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Compartiment } from '../../../model/planner/compartiment.model';
import { PlannerService } from '../../../service/planner/planner.service';
import { Task } from '../../../model/planner/task.model';
import { TaskComponent } from '../task/task.component';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { fadeIn } from '../../../z-other/transition';
import { DropComponent } from './drop/drop.component';
import { DragDropService, DragOver, NewComp, StartInfo } from '../../../service/utils/drag-drop.service';


@Component({
  selector: 'app-compartiment',
  standalone: true,
  imports: [TaskComponent, DropComponent],
  templateUrl: './compartiment.component.html',
  styleUrl: './compartiment.component.scss',
  animations: [fadeInOnEnterAnimation(), fadeIn]
})
export class CompartimentComponent {
  @ViewChild("compartimentElement") compartimentElement!: ElementRef
  @Input() compartiment: Compartiment | null = null
  @Input() tasks!: Task[] | null


  constructor(private _dragAndDropService: DragDropService, private _plannerService: PlannerService){
    this._dragAndDropService.$onNewComp.subscribe((d)=>{
      if(d.newCompId == this.compartiment?.compartimentId){
        this.normalOpacity()
      }else{
        this.lowerOpacity()
      }
    })
    this._dragAndDropService.$normalOpacity.subscribe((d)=>{
      if(d){
        this.normalOpacity()
      }
    })
    this._dragAndDropService.$removeTemp.subscribe((d) =>{
      if(d){
        this._dragAndDropService.deleteTmpElement(this.compartimentElement.nativeElement)
      }
    })
  }

  private lowerOpacity(){
    this.compartimentElement.nativeElement.style.opacity = 0.7
  }

  private normalOpacity(){
    this.compartimentElement.nativeElement.style.opacity = 1
  }

  public onDrag(e:DragEvent, taskId: number){
    this._dragAndDropService.$isBeingDragged.next(taskId);
  }

  public onDragStart(e:DragEvent, taskId: number, compId: number){
    if(this.compartiment){
      this._dragAndDropService.$hasStartedBeingDragged.next(new StartInfo(this.compartiment.compartimentId as number, taskId));
      this._dragAndDropService.$onNewComp.next(new NewComp(compId, 0))
    }
  }

  public onDragEnd(e:DragEvent, taskId: number){
    this._dragAndDropService.$normalOpacity.next(true)
    this._dragAndDropService.$draggedEnd.next(taskId)
    this._dragAndDropService.$removeTemp.next(true)
  }

  // compartiment

  
  public onDragEnter(e: DragEvent, compId: number){
      this._dragAndDropService.$onEnter.next(compId)
  }

  public onDragLeave(e: DragEvent, compId: number){
  }

  public onDragOver(e: DragEvent, compId: number){
    this._dragAndDropService.$dragOver.next(new DragOver(this.compartimentElement.nativeElement,e))
  }

  public onDrop(e: DragEvent, compartiment: Compartiment){
    this._dragAndDropService.$removeTemp.next(true)
    if(compartiment && this._dragAndDropService.taskDraggedId){
      let tempElement = this._dragAndDropService.getTempElement(this.compartimentElement.nativeElement)
      let newOrder = tempElement?.getAttribute("order")
      this._plannerService.handleDroppedTask(this._dragAndDropService.taskDraggedId, compartiment, parseInt(newOrder as string))
    }
    this._dragAndDropService.reset()
  }




}





