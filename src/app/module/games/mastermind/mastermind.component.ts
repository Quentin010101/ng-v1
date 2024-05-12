import { Component, ElementRef, ViewChild } from '@angular/core';
import { CardComponent } from '../../../core/shared/card/card.component';
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { DotComponent } from './dot/dot.component';
import { GridComponent } from './grid/grid.component';
import { MastermindService } from './mastermind.service';

@Component({
  selector: 'app-mastermind',
  standalone: true,
  imports: [CardComponent,DragDropModule,DotComponent,GridComponent],
  templateUrl: './mastermind.component.html',
  styleUrl: './mastermind.component.scss'
})
export class MastermindComponent {


  constructor(private _mastermindService: MastermindService){}

}
