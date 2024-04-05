import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Compartiment } from '../../../model/planner/compartiment.model';
import { Task } from '../../../model/planner/task.model';
import { TaskComponent } from '../task/task.component';
import { DropComponent } from './drop/drop.component';


@Component({
  selector: 'app-compartiment',
  standalone: true,
  imports: [TaskComponent, DropComponent],
  templateUrl: './compartiment.component.html',
  styleUrl: './compartiment.component.scss',
  animations: []
})
export class CompartimentComponent {
  @ViewChild("compartimentElement") compartimentElement!: ElementRef
  @Input() compartiment: Compartiment | null = null
  @Input('tasks') set _tasks(tasks: Task[] | null){
    if(tasks)
    this.tasks = tasks
  }
  tasks!: Task[]


  constructor(){

  }

  public onDragStart(e:DragEvent){
      let dragging = this.getElementFromEvent(e);
      dragging.classList.add('dragging')
  }

  public onDragEnd(e:DragEvent){
    let dragging = this.getElementFromEvent(e);
    dragging.classList.remove('dragging')
  }


  private getElementFromEvent(e: DragEvent): HTMLElement{
    let element = e.target
    if(!(element instanceof HTMLElement)) throw new Error("This element is not en HTMLElement.");
    return element
  }
  





}





