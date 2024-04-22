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

  constructor(private http: HttpClient) {}

  private getAllUsers(): Observable<ResponseObject<User[]>>{
    return this.http.get<ResponseObject<User[]>>(this.url + "user/all")
  }

  private updateUser(user: User): Observable<ResponseObject<User>>{
    return this.http.post<ResponseObject<User>>(this.url + "user/update", user)
  }

  public update(user: User){
    let users = this.$users.getValue()
    this.updateUser(user).subscribe(data => {
      console.log(data)
       let newUsers = users.filter((el)=> {
        if(data.object.userId != el.userId) {
          return el
        }else{
          return data.object
        }
    })
       this.$users.next(this.setAccountOrder(newUsers))
    })
  }

  public init(){
    let users: User[] = this.$users.value
    if(users != null && users.length > 0) {
      this.$users.next(users)
    }else{
      this.getAllUsers().subscribe(data => { 
        console.log(data)
        if(data.responseDto.executionStatus)
        this.$users.next(this.setAccountOrder(data.object))
      })
    }
  }

  private setAccountOrder(users :User[]): User[]{
    return users.sort((a,b) => a.userId - b.userId)
  }

}
