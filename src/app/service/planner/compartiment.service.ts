import { Injectable } from '@angular/core';
import { environnement } from '../../../environnement';
import { Compartiment } from '../../model/planner/compartiment.model';
import { Observable, Subject, map, of, tap } from 'rxjs';
import { ResponseObject } from '../../model/response/responseObject.model';
import { HttpClient } from '@angular/common/http';
import { CacheService } from '../cache.service';
import { Response } from '../../model/response/response.model';

@Injectable({
  providedIn: 'root'
})
export class CompartimentService {
  url: string = environnement.backEndUrl + 'task/utils/'
  cacheName: string = 'compartiment'
  $compartiment = new Subject<Compartiment[]>()
  
  constructor(private http: HttpClient, private _cacheService: CacheService) { }

  private createCompartiment(compartiment: Compartiment): Observable<ResponseObject<Compartiment>>{
    return this.http.post<ResponseObject<Compartiment>>(this.url + 'create/compartiment', compartiment)
  }

  private deleteCompartiment(id: number):Observable<Response>{
    return this.http.get<Response>(this.url + 'delete/compartiment/' + id)
  }

  private updateCompartiment(compartiment: Compartiment): Observable<ResponseObject<Compartiment>>{
    return this.http.post<ResponseObject<Compartiment>>(this.url + 'update/compartiment', compartiment)
  }

  private getAllCompartiments(): Observable<ResponseObject<Compartiment[]>>{
    return this.http.get<ResponseObject<Compartiment[]>>(this.url + 'read/compartiments')
  }

  public newcompartiment(compartiment: Compartiment): Observable<ResponseObject<Compartiment>>{
    let compartiments: Compartiment[] = this._cacheService.get(this.cacheName) as Compartiment[]
    console.log(compartiments)
    return this.createCompartiment(compartiment).pipe(
      tap(data => {
        let comp = data.object as Compartiment
        compartiments.push(comp)
        this.updateCache(compartiments)
      })
    )
  }

  public getAll(): Observable<ResponseObject<Compartiment[]>>{
    let compartiment: Compartiment[] = this._cacheService.get(this.cacheName)
    if(compartiment != null && compartiment.length > 0) return of(new ResponseObject(new Response("", true), compartiment))
    return this.getAllCompartiments()
  }

  public update(compartiment: Compartiment): Observable<ResponseObject<Compartiment>>{
    let compartiments: Compartiment[] = this._cacheService.get(this.cacheName)
    return this.updateCompartiment(compartiment).pipe(
      tap(data => {
        let compartiment = data.object
        compartiments.push(compartiment)
        this.updateCache(compartiments)
      })
    )
  }

  public delete(id: number):Observable<Response>{
    let compartiments: Compartiment[] = this._cacheService.get(this.cacheName)
    return this.deleteCompartiment(id).pipe(tap(data => {
      if(data.executionStatus){
        compartiments.filter(item => item.compartimentId != id)
        this.updateCache(compartiments)
      }
    }))
  }

  private updateCache(compartiments: Compartiment[]){
    this._cacheService.clear(this.cacheName)
    this._cacheService.set(this.cacheName, compartiments)
    this.$compartiment.next(compartiments)
  }

  public getlastOrder(): Observable<number | null>{
    return this.getAll().pipe(map((data) => {
      if(data.object.length > 0){
        return data.object[data.object.length - 1].compartimentId
      }else{
        return 1
      }
    }
    )
    )
  }
}


