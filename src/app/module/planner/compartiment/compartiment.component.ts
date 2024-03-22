import { Component, Input, SimpleChanges } from '@angular/core';
import { Compartiment } from '../../../model/planner/compartiment.model';
import { PlannerService } from '../../../service/planner/planner.service';
import { Task } from '../../../model/planner/task.model';
import { TaskComponent } from '../task/task.component';
import { taskInT, taskOutT } from '../../../z-other/transition';


@Component({
  selector: 'app-compartiment',
  standalone: true,
  imports: [TaskComponent],
  templateUrl: './compartiment.component.html',
  styleUrl: './compartiment.component.scss',
  animations: [taskInT, taskOutT]
})
export class CompartimentComponent {
  @Input() compartiment: Compartiment | null = null
  @Input() tasks!: Task[] | null
  tasksCompartiment: Task[] | null = []
  disableAnim:boolean = true
  init:boolean = false

  constructor(private _plannerService: PlannerService){
  }

  dragOver(e: Event){
    let element = (e.target as HTMLElement)
    if(element.dataset['element-type'] == 'task'){
      element.style.border ='solid red 5px'
    }
    e.preventDefault()
  }

  drop(e: DragEvent){

    let taskId = e.dataTransfer?.getData("taskId") as string;
    let taskDroped = this._plannerService.getTask(parseInt(taskId));
    if(taskDroped && this.compartiment){
      if(taskDroped.compartiment.compartimentId == this.compartiment.compartimentId){
        this._plannerService.update(taskDroped).subscribe()
      }else{
        this._plannerService.updateOnDrop(taskDroped, this.compartiment as Compartiment).subscribe()
      }
    }
  }

}
