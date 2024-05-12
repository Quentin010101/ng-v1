import { Component, Input } from '@angular/core';
import { MasterMindRow } from '../mastermind.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-square',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './square.component.html',
  styleUrl: './square.component.scss'
})
export class SquareComponent {
  @Input() row!: MasterMindRow;
  array = new Array(4)

  public setColor(index:number): string{
    let square = this.row.square
    let nbRed = square.red
    let nbWhite = square.white

    if(nbRed >= index + 1){
      return 'red'
    }
    if(nbRed + nbWhite >= index + 1){
      return 'white'
    }
    return ''
  }
}
