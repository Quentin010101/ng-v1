import { Component, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../../../../model/planner/task.model';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '../../../../z-other/click-outside.directive';
import { ChoiceTagComponent } from '../choice-tag/choice-tag.component';
import { ChoiceComponent } from '../choice/choice.component';
import { EnumerationService } from '../../../../service/planner/enumeration.service';
import { Choices } from '../../../../model/planner/choice.model';

@Injectable({
  providedIn: 'root'
})
export class TaskOpenService {
  $task = new Subject<Task>()
}

@Component({
  selector: 'app-task-open',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective, ChoiceTagComponent, ChoiceComponent],
  templateUrl: './task-open.component.html',
  styleUrl: './task-open.component.scss'
})
export class TaskOpenComponent {
  task: Task | null = null
  init: boolean = false
  progressionsChoice: Choices = new Choices("Progression")
  importancesChoice: Choices = new Choices("Importance")

  constructor(private _taskOpenService: TaskOpenService, private _enumService: EnumerationService){
    this._taskOpenService.$task.subscribe(data => {
      this.task = data
      setTimeout(()=>{this.init = true}, 100)
    })
    this._enumService.$importances.subscribe(data => {
      console.log(data)
      this.importancesChoice.data = data
    })
    this._enumService.$progressions.subscribe(data => {
      this.progressionsChoice.data = data
    })
  }

  closeTask(){
    if(this.init){
      this.task = null
      this.init = false
    }
  }
}
