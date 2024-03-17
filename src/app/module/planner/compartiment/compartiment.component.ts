import { Component, Input } from '@angular/core';
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
  tasks!: Task[]
  animState = true

  constructor(private _plannerService: PlannerService){
    this._plannerService.$tasks.subscribe(data =>  {
      this.tasks = this.filterTasks(data)
    })
  }

  ngOnInit(){
    this._plannerService.init()
    setTimeout(()=>{
      this.animState = false
    }, 1000)
  }

  private filterTasks(tasks: Task[]){
    return tasks.filter(task => task.compartiment.compartimentId === this.compartiment?.compartimentId)
  }


}
