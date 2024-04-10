import { Component, Inject } from '@angular/core';
import { CompartimentService } from '../../service/planner/compartiment.service';
import { Compartiment } from '../../model/planner/compartiment.model';
import { CompartimentComponent } from './compartiment/compartiment.component';
import { CompartimentCreationComponent } from './compartiment/creation/creation.component';
import { TaskCreationComponent } from './task/creation/creation.component';
import { SupressionComponent } from './compartiment/supression/supression.component';
import { fadeInAnimation, fadeInOnEnterAnimation } from 'angular-animations';
import { TaskOpenComponent } from './task/task-open/task-open.component';
import { EnumerationService } from '../../service/planner/enumeration.service';
import { PlannerService } from '../../service/planner/planner.service';
import { Task } from '../../model/planner/task.model';
import {CdkDragDrop, DragDropModule} from '@angular/cdk/drag-drop';
import { TaskComponent } from './task/task.component';

@Component({
  selector: 'app-planner',
  standalone: true,
  imports: [CompartimentComponent,CompartimentCreationComponent,TaskCreationComponent, SupressionComponent,TaskOpenComponent,DragDropModule, TaskComponent],
  templateUrl: './planner.component.html',
  styleUrl: './planner.component.scss',
  animations: [fadeInAnimation(), fadeInOnEnterAnimation()]
})
export class PlannerComponent {
  compartiments: Compartiment[] | null = null
  taskContainer: Map<number, Task[]> | null = null
  headerHover: boolean = false;
  hoverIndex: number | null = null
  animState: boolean = false

  constructor(private _compartimentService: CompartimentService, private _enumService: EnumerationService,private _taskService: PlannerService){
      _compartimentService.$compartiment.subscribe(data=>{
        this.compartiments = data
      })
      _taskService.$tasksContainer.subscribe(data => {
        this.taskContainer = null
        setTimeout(()=>{
          this.taskContainer = data
        })
      })
  }

  ngOnInit(){
    this._compartimentService.init()
    this._taskService.init()
    this._enumService.init()
    
    setTimeout(()=>{
      this.animState = true
    }, 1000)
  }

  setHeaderHover(i :number){
    this.hoverIndex = i
  }

  unsetHeaderHover(i: number){
    this.hoverIndex = null
  }

  public sorteAndReturnTaskArray(taskContainer: Map<number, Task[]>, compId: number): Task[]{
    let arr = taskContainer.get(compId);
    if(!arr) arr = []
    let newArr = arr.sort((a,b)=> a.taskorder - b.taskorder)
    console.log(newArr)
    return newArr
  }

  public onDragOver(e: DragEvent){
    e.preventDefault()
    let container = this.getContainer(e)
    if(container){
      const afterElement = this.getDragAfterElement(container, e.clientY) as HTMLElement | null
      const draggable = document.querySelector('.dragging') as HTMLElement
      if (afterElement == null) {
        container.appendChild(draggable)
      } else{
        container.insertBefore(draggable, afterElement)
      }
    }
  }

  public drop(e:CdkDragDrop<Task[]>){

  }

  public onDrop(e: DragEvent, compartiment: Compartiment){
      this.handleOrder(e)
      const draggable = document.querySelector('.dragging') as HTMLElement
      let id = draggable.getAttribute("id")
      let order = draggable.getAttribute("order")
  
      if(id && order && compartiment){
        let taskToBeUpdated = this._taskService.getTaskById(parseInt(id))
        if(taskToBeUpdated){
          taskToBeUpdated.taskorder = parseInt(order)
          taskToBeUpdated.compartiment = compartiment
          this._taskService.updateDrag(taskToBeUpdated).subscribe()
        }else{
          throw new Error("Task not found.")
        }
      }else{
        throw new Error("Task id not found.")
      }
  }

  private getContainer(e : DragEvent): HTMLElement | null{
    let response: HTMLElement | null = null
    let eventTarget = e.target 
    if(eventTarget instanceof HTMLElement){
      response = eventTarget.closest(".task-container") as HTMLElement | null
    } 
    return response
  }

  
  private getDragAfterElement(container: HTMLElement, y:number) {
    const draggableElements = Array.from(container.querySelectorAll('.draggable:not(.dragging)')) as HTMLElement[]

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

  private handleOrder(e: DragEvent){
    let container = this.getContainer(e)
    if(container){
      let children = container.children
   
      let index = 1
      for(let i = 0; i < children.length; i++){
        if(children[i] instanceof HTMLElement && children[i].getAttribute("order")){
         children[i].setAttribute("order", index.toString())
          index ++;
        }
      }

    }

  }

}
