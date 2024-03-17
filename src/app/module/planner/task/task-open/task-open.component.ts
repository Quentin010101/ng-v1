import { Component, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../../../../model/planner/task.model';
import { CommonModule } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TaskOpenService {
  $task = new Subject<Task>()
}

@Component({
  selector: 'app-task-open',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-open.component.html',
  styleUrl: './task-open.component.scss'
})
export class TaskOpenComponent {
  task!: Task

  constructor(private _taskOpenService: TaskOpenService){
    this._taskOpenService.$task.subscribe(data => {
      this.task = data
    })
  }
}
