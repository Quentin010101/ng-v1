import { Component } from '@angular/core';
import { CompartimentService } from '../../service/planner/compartiment.service';
import { Compartiment } from '../../model/planner/compartiment.model';
import { CompartimentComponent } from './compartiment/compartiment.component';
import { CreationComponent } from './compartiment/creation/creation.component';

@Component({
  selector: 'app-planner',
  standalone: true,
  imports: [CompartimentComponent, CreationComponent],
  templateUrl: './planner.component.html',
  styleUrl: './planner.component.scss'
})
export class PlannerComponent {
  compartiments: Compartiment[] | null = null

  constructor(private _compartimentService: CompartimentService){
      _compartimentService.$compartiment.subscribe(data=>{
        this.compartiments = data
      })
  }

  ngOnInit(){
    this._compartimentService.getAll().subscribe(data => {
      if(data.response.executionStatus){
        this.compartiments = data.object
      }
    })
  }


}
