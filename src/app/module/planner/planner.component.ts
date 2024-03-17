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
  headerHover: boolean = false;
  hoverIndex: number | null = null
  animState: boolean = false

  constructor(private _compartimentService: CompartimentService){
      _compartimentService.$compartiment.subscribe(data=>{
        this.compartiments = data
      })
  }

  ngOnInit(){
    this._compartimentService.init()
    setTimeout(()=>{
      this.animState = true
    }, 1000)
  }

  setHeaderHover(i :number){
    console.log(i)
    this.hoverIndex = i
  }

  unsetHeaderHover(i: number){
    this.hoverIndex = null
  }



}
