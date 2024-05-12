import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  DragDropModule,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DotComponent } from '../dot/dot.component';
import { PickerComponent } from '../picker/picker.component';
import { CommonModule } from '@angular/common';
import { MasterMindRow, MastermindService } from '../mastermind.service';
import { PopupService } from '../../../../service/utils/popup.service';
import { PopUp } from '../../../../model/utils/popUp.model';
import { SquareComponent } from '../square/square.component';

@Component({
  selector: 'app-row',
  standalone: true,
  imports: [DragDropModule, PickerComponent, DotComponent, CommonModule,SquareComponent],
  templateUrl: './row.component.html',
  styleUrl: './row.component.scss',
})
export class RowComponent {
  @Input() active: boolean = false;
  @Input() rowIndex!: number;
  @Input() row!: MasterMindRow;
  @Output() onNewItem = new EventEmitter<number>();
  rowValide: boolean = false

  constructor(
    private _masterMindService: MastermindService,
    private _popUpService: PopupService
  ) {}

  drop(event: CdkDragDrop<number[]>, id: number) {

    if(event.previousContainer.id === 'picker'){
      let item: any = event.previousContainer.data[event.previousIndex];
      this.onNewItem.emit(item);
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    let verify: boolean = true
    this.row.row.forEach((el) => {
      if(el.length != 1) verify = false
    });
    this.rowValide = verify
  }

  public isRowActive(bool: boolean, i: number) {
    let receptacleEmpty: boolean = this.row.row[i].length == 0;
    return function (drag: CdkDrag, drop: CdkDropList) {
      return bool && receptacleEmpty;
    };
  }

  public onCheck() {
    if(this.rowValide){
      this._masterMindService.check(this.row);
    }else{
      let popup = new PopUp("Row is not complete.");
      popup.warning = true
      this._popUpService.$popUp.next(popup)
    }
  }
}
