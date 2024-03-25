import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../model/planner/task.model';
import { TaskMenuComponent } from './task-menu/task-menu.component';
import { CommonModule } from '@angular/common';
import { TaskOpenService } from './task-open/task-open.component';


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [TaskMenuComponent, CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  @Input() task!: Task

  constructor(private _taskOpenService: TaskOpenService){}

  dragStart(e: DragEvent){
      e.dataTransfer?.setData("taskId", this.task.taskId.toString());
  }

  // dragOver(e: DragEvent){
  //   let element = (e.target as HTMLElement)
  //   e.preventDefault()
  //   if(element.closest('[data-type]="task"')){
  //     element.style.border ='solid red 5px'
  //   }
  // }

  showTask(){
    this._taskOpenService.$task.next(this.task)
  }
}


