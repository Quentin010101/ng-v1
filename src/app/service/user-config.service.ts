import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environnement } from '../../environnement';
import { ResponseObject } from '../model/response/responseObjectDto.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../model/auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserConfigService {
  url:string = environnement.backEndUrl + 'administration/configuration'
  $actifUser = new BehaviorSubject<User | null>(null)

  constructor(private http: HttpClient) { }

  private readConf(): Observable<ResponseObject<User>>{
    return this.http.get<ResponseObject<User>>(this.url).pipe(
      tap((data) => this.$actifUser.next(data.object))
    );
  }

  public init(){
    return this.readConf()
  }

}
