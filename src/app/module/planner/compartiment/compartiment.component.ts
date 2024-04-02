import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Compartiment } from '../../../model/planner/compartiment.model';
import { PlannerService } from '../../../service/planner/planner.service';
import { Task } from '../../../model/planner/task.model';
import { TaskComponent } from '../task/task.component';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { fadeIn } from '../../../z-other/transition';
import { DropComponent } from './drop/drop.component';
import { CompartimentService } from '../../../service/planner/compartiment.service';


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


  constructor(private _plannerService: PlannerService, private _compartimentService: CompartimentService){

  }

  public onDragStart(e:DragEvent){
    let dragging = this.getElementFromEvent(e);
    dragging.classList.add('dragging')
  }

  public onDragEnd(e:DragEvent){
    let dragging = this.getElementFromEvent(e);
    dragging.classList.remove('dragging')
  }

  // compartiment

  public onDragOver(e: DragEvent){
    e.preventDefault()
    let container = this.compartimentElement.nativeElement
    const afterElement = this.getDragAfterElement(container, e.clientY) as HTMLElement | null
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  }

  public onDrop(e: DragEvent){
    const draggable = document.querySelector('.dragging')
    
    if(draggable && draggable.getAttribute("id")){
      let newTask = this._plannerService.getTask(parseInt(draggable.getAttribute("id") as string))
      if(newTask){
        newTask.compartiment = this.compartiment as Compartiment
        this._plannerService.updateAfterDragEvent(newTask).subscribe()
      }else{
        throw new Error("Task not found")
      }
    }else{
      throw new Error("Missing id attribute on draggable element")
    }
  }

  private getElementFromEvent(e: DragEvent): HTMLElement{
    let element = e.target
    if(!(element instanceof HTMLElement)) throw new Error("This element is not en HTMLElement.");
    return element
  }
  


  private getDragAfterElement(container: HTMLElement, y:number) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')] as HTMLElement[]

    let value = -10000
    let closerElement: HTMLElement | null = null
    draggableElements.forEach((element)=>{
      const box = element.getBoundingClientRect()
      const offset = y - box.top - box.height / 2
      if (offset < 0 && offset > value) {
        value = offset
        closerElement = element
      }
    })
    return closerElement

  }

  private getContainerNbChildren(){
    let container = this.compartimentElement.nativeElement
    let nb = 0
    for (let i = 0; i < container.children.length; i++) {
      nb ++
    }
    return nb
  }

}





