import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { CompartimentService } from '../../../../service/planner/compartiment.service';

@Component({
  selector: 'app-supression-compartiment',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './supression.component.html',
  styleUrl: './supression.component.scss'
})
export class SupressionComponent {
  faTrashCan = faTrashCan
  @Input() id!: number

  constructor(private _compartimentService: CompartimentService){}

  deleteCompartiment(){
    if(this.id){
      this._compartimentService.delete(this.id).subscribe()
    }
  }
}
