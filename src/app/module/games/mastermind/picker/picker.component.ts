import { Component, Input } from '@angular/core';
import { DotComponent } from '../dot/dot.component';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';
import { MasterMindGrid, MasterMindRow, State } from '../mastermind.service';

@Component({
  selector: 'app-picker',
  standalone: true,
  imports: [ DragDropModule, DotComponent],
  templateUrl: './picker.component.html',
  styleUrl: './picker.component.scss'
})
export class PickerComponent {
  @Input() dotArray!: number[]
  @Input() grid!: MasterMindRow[]
  @Input() state!: State

  drop(event:  CdkDragDrop<number[]>) {
    
  }
  disable(nb:number): boolean{
    if(this.state && this.state.row){
      let activeRowIndex: number = this.state.row
      let activeRow = this.grid[activeRowIndex - 1]
      console.log(activeRow)
      if(activeRow.row){
        for(let i = 0 ; i < activeRow.row.length; i++){
          if(activeRow.row[i][0] == nb) return true
        }
      }
    }
    return false
  }

  public noDrop(){
    return false
  }

}
