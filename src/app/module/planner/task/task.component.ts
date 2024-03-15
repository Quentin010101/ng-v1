import { Component, Input } from '@angular/core';
import { Task } from '../../../model/planner/task.model';
import { TaskMenuComponent } from './task-menu/task-menu.component';
import { scaleE } from '../../../transition';


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [TaskMenuComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  animations: [scaleE]
})
export class TaskComponent {
  @Input() task!: Task
  animState: boolean = false

  ngOnInit(){
    setTimeout(()=>{
      this.animState = true
    },10)
  }
  
}


