import { Component } from '@angular/core';
import { RowComponent } from '../row/row.component';
import { CommonModule } from '@angular/common';
import { PickerComponent } from '../picker/picker.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MasterMindGrid, MasterMindRow, MastermindService, State } from '../mastermind.service';
import { Subject } from 'rxjs';
import { SquareComponent } from '../square/square.component';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [RowComponent,CommonModule,PickerComponent,DragDropModule, SquareComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {
  grid!: MasterMindRow[]
  dotArray: number[] = [1,2,3,4,5,6,7,8]
  activeArray: boolean[] = new Array(8)
  state!: State
  gameStarted: boolean = false
  
  constructor(private _mestermindService: MastermindService){
    _mestermindService.$state.subscribe(data => {
      this.handleState(data)
    })
    _mestermindService.$grid.subscribe(data => {
      this.grid = data.grid
    })
  }

  ngOnInit(){
    this.activeArray.fill(false)
  }

  private handleState(state: State){
    this.state = state
    this.activeArray.fill(false)
    this.activeArray[state.row - 1] = true
  }

  public addToPicker(number:number){
    this.dotArray.splice(number, 0, number);
  }

  
  public onStartReset(){
    if(this.gameStarted){
      this._mestermindService.reset()
    }else{
      this._mestermindService.start()
    }
    this.gameStarted = !this.gameStarted
  }
}
