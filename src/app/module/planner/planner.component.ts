import { Component } from '@angular/core';
import { CompartimentService } from '../../service/planner/compartiment.service';
import { Compartiment } from '../../model/planner/compartiment.model';
import { CompartimentComponent } from './compartiment/compartiment.component';
import { CompartimentCreationComponent } from './compartiment/creation/creation.component';
import { SupressionComponent } from './compartiment/supression/supression.component';
import { fadeInAnimation, fadeInOnEnterAnimation } from 'angular-animations';
import { TaskOpenComponent } from './task/task-open/task-open.component';
import { EnumerationService } from '../../service/planner/enumeration.service';
import { PlannerService } from '../../service/planner/planner.service';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { PageComponent } from '../../core/shared/page/page.component';

@Component({
  selector: 'app-planner',
  standalone: true,
  imports: [CompartimentComponent,CompartimentCreationComponent,TaskOpenComponent,DragDropModule,PageComponent],
  templateUrl: './planner.component.html',
  styleUrl: './planner.component.scss',
  animations: [fadeInAnimation(), fadeInOnEnterAnimation()]
})
export class PlannerComponent {
  compartiments: Compartiment[] | null = null
  headerHover: boolean = false;
  hoverIndex: number | null = null

  constructor(private _compartimentService: CompartimentService, private _enumService: EnumerationService,private _taskService: PlannerService){
      _compartimentService.$compartiment.subscribe(data=>{
        this.compartiments = data
      })
      
      this._compartimentService.init()
      this._taskService.init()
      this._enumService.init()
  }

}
