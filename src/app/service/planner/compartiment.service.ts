import { Injectable } from '@angular/core';
import { environnement } from '../../../environnement';
import { Compartiment } from '../../model/planner/compartiment.model';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { ResponseObject } from '../../model/response/responseObjectDto.model';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from '../../model/response/responseDto.model';
import { PlannerService } from './planner.service';
import { MessageService } from '../message.service';
import { Message } from '../../model/message.model';

@Injectable({
  providedIn: 'root'
})
export class CompartimentService {
  url: string = environnement.backEndUrl + 'task/utils/'
  $compartiment = new BehaviorSubject<Compartiment[]>([])
  
  constructor(private http: HttpClient, private _plannerService: PlannerService) { }

  private createCompartiment(compartiment: Compartiment): Observable<ResponseObject<Compartiment>>{
    return this.http.post<ResponseObject<Compartiment>>(this.url + 'create/compartiment', compartiment)
  }

  private deleteCompartiment(id: number):Observable<ResponseDto>{
    return this.http.get<ResponseDto>(this.url + 'delete/compartiment/' + id)
  }

  private updateCompartiment(compartiment: Compartiment): Observable<ResponseObject<Compartiment>>{
    return this.http.post<ResponseObject<Compartiment>>(this.url + 'update/compartiment', compartiment)
  }

  private getAllCompartiments(): Observable<ResponseObject<Compartiment[]>>{
    return this.http.get<ResponseObject<Compartiment[]>>(this.url + 'read/compartiments')
  }

  public newcompartiment(compartiment: Compartiment): Observable<ResponseObject<Compartiment>>{
    let compartiments: Compartiment[] = this.$compartiment.value
    return this.createCompartiment(compartiment).pipe(
      tap(data => {
        let comp = data.object as Compartiment
        compartiments.push(comp)
        this.$compartiment.next(compartiments)
      })
    )
  }

  public init(){
    let compartiments: Compartiment[] = this.$compartiment.value
    if(compartiments != null && compartiments.length > 0) {
      this.$compartiment.next(compartiments)
    }else{
      this.getAllCompartiments().subscribe(data => { 
        if(data.responseDto.executionStatus)
        this.$compartiment.next(data.object)
      })
    }
  }

  public update(compartiment: Compartiment): Observable<ResponseObject<Compartiment>>{
    let compartiments: Compartiment[] = this.$compartiment.value
    return this.updateCompartiment(compartiment).pipe(
      tap(data => {
        let compartiment = data.object
        compartiments.push(compartiment)
        this.$compartiment.next(compartiments)
      })
    )
  }

  public delete(id: number):Observable<ResponseDto>{
    let hasTaskArr = this._plannerService.getTasksByCompId(id)
    if(hasTaskArr && hasTaskArr.length>0){
      return of(new ResponseDto("This category contains tasks and can't be deleted.",false))
    }else{
      let compartiments: Compartiment[] = this.$compartiment.value
      return this.deleteCompartiment(id).pipe(tap(data => {
        if(data.executionStatus){
          this.$compartiment.next(compartiments.filter(item => item.compartimentId != id))
        }
      }))
    }
  }

  public getCompartimentById(id: number): Compartiment | undefined{
    let c = this.$compartiment.value.find((el) => el.compartimentId == id)
    return c
  }

}


