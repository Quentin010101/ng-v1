import { Component } from '@angular/core';
import { Compartiment } from '../../../model/planner/compartiment.model';
import { CompartimentService } from '../../../service/planner/compartiment.service';
import { CreationComponent } from './creation/creation.component';

@Component({
  selector: 'app-compartiment',
  standalone: true,
  imports: [],
  templateUrl: './compartiment.component.html',
  styleUrl: './compartiment.component.scss'
})
export class CompartimentComponent {

  constructor(private _compartimentServcie: CompartimentService) {
  }

  public creationCompartiment(compartiment: Compartiment){
    this._compartimentServcie.update(compartiment).subscribe()
  }
}
