import { Injectable } from '@angular/core';
import { environnement } from '../../environnement';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseObject } from '../model/response/responseObjectDto.model';
import { User } from '../model/auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {
  private url: string = environnement.backEndUrl + "administration/"

  $users = new BehaviorSubject<User[]>([])

  constructor(private http: HttpClient) {

  }

  private getAllUsers(): Observable<ResponseObject<User[]>>{
    return this.http.get<ResponseObject<User[]>>(this.url + "users/all")
  }

  public init(){
    let users: User[] = this.$users.value
    if(users != null && users.length > 0) {
      this.$users.next(users)
    }else{
      this.getAllUsers().subscribe(data => { 
        if(data.responseDto.executionStatus)
        this.$users.next(data.object)
      })
    }
  }

}
