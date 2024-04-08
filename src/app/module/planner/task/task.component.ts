import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../model/planner/task.model';
import { TaskMenuComponent } from './task-menu/task-menu.component';
import { CommonModule } from '@angular/common';
import { TaskOpenService } from './task-open/task-open.component';
import { DateComponent } from '../../../core/shared/input/date/date.component';
import { ShowChoiceComponent } from './show-choice/show-choice.component';


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [TaskMenuComponent, CommonModule,DateComponent,ShowChoiceComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  @Input() task!: Task

  constructor(private _taskOpenService: TaskOpenService){}

  showTask(){
    this._taskOpenService.$task.next(this.task)
  }

  click(e: Event){
    e.stopPropagation()
  }
}


