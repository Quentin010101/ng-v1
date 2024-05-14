import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PopupService } from '../../../service/utils/popup.service';
import { PopUp, PopUpType } from '../../../model/utils/popUp.model';

@Injectable({
  providedIn: 'root'
})
export class MastermindService {
  $state = new BehaviorSubject<State>(new State)
  $grid = new BehaviorSubject<MasterMindGrid>(new MasterMindGrid)
  resultRow: MasterMindRow = new MasterMindRow()

  constructor(private _popupService: PopupService) { }

  public start(){
    this.reset()
    let state = new State()
    state.row = 1
    this.$state.next(state)
    this.createResultRow()
  }

  public reset(){
    this.$grid.next(new MasterMindGrid)
    this.$state.next(new State)
    this.resultRow = new MasterMindRow()

  }

  private createResultRow(){
    let arr: number[] = []
    for(let i = 0; i < 4; i++){
      let value = 0;
      while(arr.includes(value) || value == 0){
        value = Math.floor(Math.random()*9) 
      }
      arr.push(value)
    }
    let arr2:number[][] = [[],[],[],[]]
    for(let i = 0; i < 4; i++){
      arr2[i].push(arr[i])
    }
    
    this.resultRow.row = arr2
  }

  public check(row: MasterMindRow){
    let state = this.$state.getValue()
    let rowIndex = state.row
    if(this.isWin(row)){
      let popup = new PopUp("YOU WIN! CONGRATULATION.")
      popup.warning = true
      popup.type = PopUpType.MASTERMIND
      this._popupService.$popUp.next(popup)
      this._popupService.$answerMasterMind.subscribe((data)=> this.reset())
    }else if(rowIndex == 10){
      let popup = new PopUp("YOU LOOSE! TRY AGAIN.")
      popup.warning = true
      popup.type = PopUpType.MASTERMIND
      this._popupService.$popUp.next(popup)
      this._popupService.$answerMasterMind.subscribe((data)=> this.reset())
    }else{
      
      
      state.row = rowIndex + 1
      this.$state.next(state)
      this.gridAddRow(row,rowIndex)
    }
  }

  private isWin(row: MasterMindRow){
    if(this.checkValueRed(row.row, this.resultRow.row) == 4){
      return true
    }
    return false
  }

  private comparator(row: MasterMindRow, grid: MasterMindGrid, index: number){
    let actifRow = row.row
    let result = this.resultRow.row

    let nbWhite = this.checkValueWhite(actifRow, result)
    let nbRed = this.checkValueRed(actifRow, result)

    grid.grid[index - 1].square.red = nbRed
    grid.grid[index - 1].square.white = nbWhite - nbRed
  }

  private checkValueWhite(actifRow: number[][], result: number[][]): number{
    let nbWhite = 0
    for(let i = 0; i < actifRow.length; i++){
      for(let j = 0; j < result.length; j++){
        if(result[j].includes(actifRow[i][0])) nbWhite ++

      }
    }
    return nbWhite
  }

  private checkValueRed(actifRow: number[][], result: number[][]): number{
    let nbRed = 0;
    for(let i = 0; i < actifRow.length; i++){
      if(actifRow[i][0] == result[i][0]) nbRed ++
    }
    return nbRed
  }

  private gridAddRow(row: MasterMindRow, rowIndex: number){
    let grid: MasterMindGrid = this.$grid.getValue()
    grid.grid[rowIndex - 1] = row
    this.comparator(row, grid,rowIndex)
    this.$grid.next(grid)
  }

}

export class MasterMindGrid{
  constructor(){
    this.grid = []
    for(let i = 0; i < 10; i++){
      this.grid.push(new MasterMindRow())
    }
  }
  grid!: MasterMindRow[]
}

export class MasterMindRow{
  constructor(){
    this.row = [[], [], [], []]
  }
  row!: number[][]
  square: Square = new Square()
}

export class State{
  row!: number
}

export class Square{
  red: number = 0
  white: number = 0
}


