import { Component } from '@angular/core';
import { CompartimentService } from '../../service/planner/compartiment.service';
import { Compartiment } from '../../model/planner/compartiment.model';
import { CompartimentComponent } from './compartiment/compartiment.component';
import { CompartimentCreationComponent } from './compartiment/creation/creation.component';
import { TaskCreationComponent } from './task/creation/creation.component';
import { SupressionComponent } from './compartiment/supression/supression.component';
import { fadeInOut } from '../../z-other/transition';
import { fadeInAnimation, fadeInOnEnterAnimation } from 'angular-animations';
import { TaskOpenComponent } from './task/task-open/task-open.component';
import { EnumerationService } from '../../service/planner/enumeration.service';
import { PlannerService } from '../../service/planner/planner.service';
import { Task } from '../../model/planner/task.model';
import { TaskContainer, TaskContainerTot } from '../../model/planner/taskContainer.model';


@Component({
  selector: 'app-planner',
  standalone: true,
  imports: [CompartimentComponent,CompartimentCreationComponent,TaskCreationComponent, SupressionComponent,TaskOpenComponent],
  templateUrl: './planner.component.html',
  styleUrl: './planner.component.scss',
  animations: [fadeInAnimation(), fadeInOnEnterAnimation()]
})
export class PlannerComponent {
  compartiments: Compartiment[] | null = null
  taskContainer!: TaskContainerTot
  headerHover: boolean = false;
  hoverIndex: number | null = null
  animState: boolean = false

  constructor(private _compartimentService: CompartimentService, private _enumService: EnumerationService,private _taskService: PlannerService){
      _compartimentService.$compartiment.subscribe(data=>{
        this.compartiments = data
      })
      _taskService.$tasksContainer.subscribe(data => {
        this.taskContainer = data
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

}
