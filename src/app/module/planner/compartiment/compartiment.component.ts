import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Compartiment } from '../../../model/planner/compartiment.model';
import { PlannerService } from '../../../service/planner/planner.service';
import { Task } from '../../../model/planner/task.model';
import { TaskComponent } from '../task/task.component';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { fadeIn } from '../../../z-other/transition';
import { DropComponent } from './drop/drop.component';

class ElementActive{
  element!: HTMLElement
  closerToUp!: boolean
}

@Component({
  selector: 'app-compartiment',
  standalone: true,
  imports: [TaskComponent, DropComponent],
  templateUrl: './compartiment.component.html',
  styleUrl: './compartiment.component.scss',
  animations: [fadeInOnEnterAnimation(), fadeIn]
})
export class CompartimentComponent {
  @ViewChild('compartiment') compartimentElement!: ElementRef
  @Input() compartiment: Compartiment | null = null
  @Input() tasks!: Task[] | null
  tasksCompartiment: Task[] | null = []
  disableAnim:boolean = true
  init:boolean = false
  idTaskDragged!: string | null
  idTaskDraggedOver: string | null = null

  constructor(private _plannerService: PlannerService){
  }

  dragOver(e: DragEvent){
    let element = (e.target as HTMLElement)

    if(element.closest('[data-type]') && (element.closest('[data-type]')?.getAttribute("id") != this.idTaskDraggedOver)){
      console.log("ok")
      this.deleteTemp()
    }

    e.preventDefault()
    if(element.closest('[data-type]') && (element.closest('[data-type]')?.getAttribute("id") != this.idTaskDragged)){
      let elementDragedOver = element.closest('[data-type]') as HTMLElement
      let closerToUp:boolean = this.isDragCloserToUp(elementDragedOver,e)

      this.activeElement(elementDragedOver,closerToUp)
      this.setElement(elementDragedOver)
  
    }

  }

  private activeElement(activeElement: HTMLElement, before: boolean){
    if(activeElement){
      if(before){
        activeElement.classList.add("before")
      }else{
        activeElement.classList.add("after")
      }
    }
  }

  private deleteTemp(){
    let container = this.compartimentElement.nativeElement as HTMLElement
    const arr = Object.values(container.childNodes) as HTMLElement[]
    arr.forEach((el)=>{
      if(el instanceof HTMLElement){
        console.log(el)
        el.classList.remove('before')
        el.classList.remove('after')
      }
    })
  }

  private setElement(taskElement: HTMLElement){
    if(taskElement.getAttribute("id")){
      this.idTaskDraggedOver = taskElement.getAttribute("id")
    }
  }

  private isDragCloserToUp(taskElement: HTMLElement, e:DragEvent): boolean{
    
    let rect = taskElement.getBoundingClientRect()

    let cursorY = e.y
    let taskElementTop = rect.top
    let taskElementBottom = rect.bottom

    return Math.abs(taskElementTop - cursorY) < Math.abs(taskElementBottom - cursorY)
  }

  public leave(e:DragEvent){
    let element = (e.target as HTMLElement)
    if(element.getAttribute("temp")){
      this.deleteTemp()
    }
  }

  drop(e: DragEvent){
    let taskId = e.dataTransfer?.getData("taskId") as string;
    let taskDroped = this._plannerService.getTask(parseInt(taskId));
    if(taskDroped && this.compartiment){
      taskDroped.compartiment = this.compartiment
      this._plannerService.update(taskDroped, true).subscribe()
    }
    this.deleteTemp()
    this.idTaskDragged = null
  }


  dragStart(e: DragEvent){
    let element = (e.target as HTMLElement)
    let id = element.getAttribute("id")?.toString() as string
    this.idTaskDragged = id
    e.dataTransfer?.setData("taskId", id);
  }

  dragEnd(e: DragEvent){
    this.deleteTemp()
  }



}





