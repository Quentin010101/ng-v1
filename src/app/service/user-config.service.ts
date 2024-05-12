import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environnement } from '../../environnement';
import { ResponseObject } from '../model/response/responseObjectDto.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../model/auth/user.model';
import { Module } from '../model/admin/config.model';

@Injectable({
  providedIn: 'root'
})
export class UserConfigService {
  url:string = environnement.backEndUrl + 'configuration'
  $actifUser = new BehaviorSubject<User | null>(null)
  modules!: Module[]

  constructor(private http: HttpClient) { }

  private getAllModules(): Observable<ResponseObject<Module[]>>{
    return this.http.get<ResponseObject<Module[]>>(this.url + "/modules")
  }

  private readConf(): Observable<ResponseObject<User>>{
    return this.http.get<ResponseObject<User>>(this.url).pipe(
      tap((data) => this.$actifUser.next(data.object))
    );
  }

  public init(){
    this.initModules()
    return this.readConf()
  }

  private initModules(){
    this.getAllModules().subscribe(data => {
      this.modules = data.object
    })
  }

}
