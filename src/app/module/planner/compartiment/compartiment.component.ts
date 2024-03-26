import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Compartiment } from '../../../model/planner/compartiment.model';
import { PlannerService } from '../../../service/planner/planner.service';
import { Task } from '../../../model/planner/task.model';
import { TaskComponent } from '../task/task.component';
import { taskInT, taskOutT } from '../../../z-other/transition';

class ElementActive{
  element!: HTMLElement
  closerToUp!: boolean
}

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
  elementActive!: ElementActive

  constructor(private _plannerService: PlannerService){
  }

  dragOver(e: DragEvent){
    let element = (e.target as HTMLElement)
    console.log(e.dataTransfer?.types)
    console.log(e.dataTransfer?.getData("taskId"))
        let taskId = e.dataTransfer?.getData("taskId") as string;
    // console.log(element.closest('[data-type]')?.getAttribute("id"))
    e.preventDefault()
    if(element.closest('[data-type]') && ((element.closest('[data-type]')?.getAttribute("id") && element.closest('[data-type]')?.getAttribute("id") != taskId))){
      let elementDragedOver = element.closest('[data-type]') as HTMLElement

      let closerToUp:boolean = this.isDragCloserToUp(elementDragedOver,e)

      if(!this.tempActive){
        this.addElementTemp(elementDragedOver,closerToUp)
        this.setElement(elementDragedOver,closerToUp)
      }{
        if(this.elementActive.element == elementDragedOver && this.elementActive.closerToUp != closerToUp){
          this.deleteTemp()
          this.addElementTemp(elementDragedOver,closerToUp)
        }
        this.setElement(elementDragedOver,closerToUp)
      }

      
      
    }
    else if(this.tempActive && !element.getAttribute("temp")){
      this.deleteTemp()
    }
  }

  private deleteTemp(){
    let container = this.compartimentElement.nativeElement as HTMLElement
    const arr = Object.values(container.childNodes) as HTMLElement[]
    arr.forEach((el)=>{
      if(el instanceof HTMLElement)
      if(el.getAttribute("temp") == "ok"){
        container.removeChild(el)
      }
    })
    this.tempActive = false
  }

  private setElement(taskElement: HTMLElement, closerToUp:boolean){
    this.elementActive = new ElementActive()
    this.elementActive.closerToUp = closerToUp
    this.elementActive.element = taskElement
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


  private addElementTemp(elem: HTMLElement,before: boolean){
    let container = this.compartimentElement.nativeElement as HTMLElement
    let template = document.createElement('div')
    template.setAttribute("temp","ok")
    template.style.height = '150px'
    template.style.width = '100%'
    template.style.border = 'solid blue 3px'
    
    
    if(before){
      container.insertBefore(template, elem)
    }else{
      elem.parentElement?.insertBefore(template, elem.nextSibling)
    }
    template.addEventListener('drop', (e)=>{
      this.drop(e)
    }) 

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


  dragStart(e: DragEvent){
    let element = (e.target as HTMLElement)
    let id = element.getAttribute("id")?.toString() as string
    console.log(e.dataTransfer)
    e.dataTransfer?.setData("taskId", id);
    console.log(e.dataTransfer?.types)
    console.log(e.dataTransfer?.getData("taskId"))
  }

  dragEnd(e: DragEvent){
    this.deleteTemp()
  }



}





