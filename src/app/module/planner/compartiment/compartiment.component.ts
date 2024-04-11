import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Compartiment } from '../../../model/planner/compartiment.model';
import { Task } from '../../../model/planner/task.model';
import { TaskComponent } from '../task/task.component';
import { DropComponent } from './drop/drop.component';
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TaskOpenService } from '../task/task-open/task-open.component';
import { CommonModule } from '@angular/common';
import { TaskMenuComponent } from '../task/task-menu/task-menu.component';
import { DateComponent } from '../../../core/shared/input/date/date.component';
import { ShowChoiceComponent } from '../task/show-choice/show-choice.component';
import { PlannerService } from '../../../service/planner/planner.service';
import { TaskCreationComponent } from '../task/creation/creation.component';
import { SupressionComponent } from './supression/supression.component';

@Component({
  selector: 'app-compartiment',
  standalone: true,
  imports: [TaskComponent, DropComponent, DragDropModule,CommonModule,TaskMenuComponent,DateComponent,ShowChoiceComponent,TaskCreationComponent, SupressionComponent],
  templateUrl: './compartiment.component.html',
  styleUrl: './compartiment.component.scss',
  animations: []
})
export class CompartimentComponent {
  @ViewChild("compartimentElement") compartimentElement!: ElementRef
  @Input() compartiment!: Compartiment

  tasks: Task[] = []

  constructor(private _taskOpenService: TaskOpenService, private _taskService: PlannerService){
    _taskService.$tasksContainer.subscribe(data => {
      if(this.compartiment){
        this.tasks = _taskService.getTasksByCompIdOrdered(this.compartiment.compartimentId)
      }
    })
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this._taskService.handleReorderSingleReorder(event.container.data)
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      let newArr = this.resetCompartiment(event.container.data)
      this._taskService.handleMultipleReorder([newArr,event.previousContainer.data])
    }

  }

  private resetCompartiment(tasks: Task[]):Task[]{
    tasks.forEach((el)=>{
      el.compartiment = this.compartiment
    })
    return tasks
  }

  showTask(task: Task){
    this._taskOpenService.$task.next(task)
  }

  click(e: Event){
    e.stopPropagation()
  }

  log(tasks: Task[]){
    console.log("logging")
    tasks.forEach((el)=>{
      console.log(el.taskId)
    })
  }

}





