import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Compartiment } from '../../../model/planner/compartiment.model';
import { PlannerService } from '../../../service/planner/planner.service';
import { Task } from '../../../model/planner/task.model';
import { TaskComponent } from '../task/task.component';
import { taskInT, taskOutT } from '../../../z-other/transition';


@Component({
  selector: 'app-compartiment',
  standalone: true,
  imports: [TaskComponent],
  templateUrl: './compartiment.component.html',
  styleUrl: './compartiment.component.scss',
  animations: [taskInT, taskOutT]
})
export class CompartimentComponent {
  @ViewChild('compartiment') compartimentElement!: ElementRef
  @Input() compartiment: Compartiment | null = null
  @Input() tasks!: Task[] | null
  tasksCompartiment: Task[] | null = []
  disableAnim:boolean = true
  init:boolean = false
  tempActive:boolean = false

  constructor(private _plannerService: PlannerService){
  }

  dragOver(e: DragEvent){
    let element = (e.target as HTMLElement)
    e.preventDefault()
    if(element.closest('[data-type]') && !this.tempActive){
      let taskElement = element.closest('[data-type]') as HTMLElement
      let parent = taskElement.parentElement

      let rect = taskElement.getBoundingClientRect()

      let cursorY = e.y
      let taskElementTop = rect.top
      let taskElementBottom = rect.bottom

      if(Math.abs(taskElementTop - cursorY) < Math.abs(taskElementBottom - cursorY)){
        this.makeSpace(taskElement)
      }
      
    }else if(element.getAttribute("temp") == "ok"){

    }
    else if(this.tempActive){
      this.deleteTemp()
    }
  }

  private deleteTemp(){
    let container = this.compartimentElement.nativeElement as HTMLElement
    const arr = Object.values(container.childNodes) as HTMLElement[]
    arr.forEach((el)=>{
      console.log(el)
      if(typeof el === "HTMLElement")
      if(el.getAttribute("temp") == "ok"){
        container.removeChild(el)
      }
    })
    this.tempActive = false
  }

  private makeSpace(elem: HTMLElement){
    let container = this.compartimentElement.nativeElement as HTMLElement
    let template = document.createElement('div')
    template.setAttribute("temp","ok")
    template.style.height = '100px'
    template.style.width = '100%'
    template.style.border = 'solid blue 3px'
    
    container.insertBefore(template, elem)

    this.tempActive = true
  }

  drop(e: DragEvent){

    let taskId = e.dataTransfer?.getData("taskId") as string;
    let taskDroped = this._plannerService.getTask(parseInt(taskId));
    if(taskDroped && this.compartiment){
      taskDroped.compartiment = this.compartiment
      this._plannerService.update(taskDroped, true).subscribe()
    }
    this.deleteTemp()
  }

}
