import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


export class DragInfo{
  constructor(before: boolean, id: string){
    this.before = before
    this.id = id
  }
  before!: boolean
  id!: string
}

@Injectable({
  providedIn: 'root'
})
export class DragDropService {

  $dragOverInfo = new Subject<DragInfo | null>()

  constructor() { }

  public setNewInfo(info:DragInfo){
    this.$dragOverInfo.next(info)
  }
}
