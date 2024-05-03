import { Injectable } from '@angular/core';
import { environnement } from '../../../environnement';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResponseObject } from '../../model/response/responseObjectDto.model';
import { MapNumberString } from '../../model/utils/utils.model';

@Injectable({
  providedIn: 'root'
})
export class EnumerationService {
  url: string = environnement.backEndUrl + 'enumeration/'
  $importances = new BehaviorSubject<MapNumberString[]>([])
  $progressions = new BehaviorSubject<MapNumberString[]>([])

  constructor(private http: HttpClient) { }

  private getAllImportance(): Observable<ResponseObject<MapNumberString[]>>{
    return this.http.get<ResponseObject<MapNumberString[]>>(this.url + 'importance');
  }

  private getAllProgression(): Observable<ResponseObject<MapNumberString[]>>{
    return this.http.get<ResponseObject<MapNumberString[]>>(this.url + 'progression');
  }

  public init(){
    let importances: MapNumberString[] = this.$importances.value
    let progressions: MapNumberString[] = this.$progressions.value

    if(importances != null && importances.length > 0){
      this.$importances.next(importances)
    }else{
      this.getAllImportance().subscribe(data => { 
        this.$importances.next(data.object)
      })
    }

    if(progressions != null && progressions.length > 0){
      this.$progressions.next(progressions)
    }else{
      this.getAllProgression().subscribe(data => { 
        this.$progressions.next(data.object)
      })
    }
  }


}
