import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserConfig } from '../model/admin/config.model';
import { environnement } from '../../environnement';
import { ResponseObject } from '../model/response/responseObjectDto.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserConfigService {
  url:string = environnement.backEndUrl + 'configuration/'
  $userConf = new BehaviorSubject<UserConfig | null>(null)

  constructor(private http: HttpClient) { }

  private readConf(): Observable<ResponseObject<UserConfig>>{
    return this.http.get<ResponseObject<UserConfig>>(this.url + 'read').pipe(
      tap((data) => this.$userConf.next(data.object))
    );
  }

  public init(){
    return this.readConf()
  }

}
