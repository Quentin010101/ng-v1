import { Injectable } from '@angular/core';
import { environnement } from '../../environnement';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseObject } from '../model/response/responseObjectDto.model';
import { User, UserCreate } from '../model/auth/user.model';
import { ResponseDto } from '../model/response/responseDto.model';
import { MessageService } from './utils/message.service';
import { Message } from '../model/utils/message.model';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {
  private url: string = environnement.backEndUrl + "administration/"

  $users = new BehaviorSubject<User[]>([])

  constructor(private http: HttpClient, private _messageService: MessageService) {}

  private getAllUsers(): Observable<ResponseObject<User[]>>{
    return this.http.get<ResponseObject<User[]>>(this.url + "user/all")
  }

  private updateUser(user: User): Observable<ResponseObject<User>>{
    return this.http.post<ResponseObject<User>>(this.url + "user/update", user)
  }

  private createUser(user: UserCreate): Observable<ResponseObject<User>>{
    return this.http.post<ResponseObject<User>>(this.url + "user/create", user)
  }

  private deleteUser(id: number): Observable<ResponseDto>{
    return this.http.get<ResponseDto>(this.url + "user/delete/" + id)
  }


  public update(user: User){
    let users = this.$users.getValue()
    this.updateUser(user).subscribe(data => {
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

  public delete(id: number){
    let users: User[] = this.$users.value
    this.deleteUser(id).subscribe(data => {
      if(data.executionStatus){
        let newUsers = users.filter((el)=> el.userId != id)
        this.$users.next(newUsers)
        this._messageService.$message.next(new Message(false,"User has been deleted."))
      }else{
        this._messageService.$message.next(new Message(true,"Something went wrong."))
      }
    })
  }

  public init(){
    let users: User[] = this.$users.value
    if(users != null && users.length > 0) {
      this.$users.next(users)
    }else{
      this.getAllUsers().subscribe(data => {
        if(data.responseDto.executionStatus)
        this.$users.next(this.setAccountOrder(data.object))
      })
    }
  }

  public newUser(userCreate: UserCreate){
    let users: User[] = this.$users.value
    this.createUser(userCreate).subscribe(data => {
      if(data.responseDto.executionStatus){
        users.push(data.object)
        this.$users.next(users)
        this._messageService.$message.next(new Message(false,"User has been created."))
      }else{
        this._messageService.$message.next(new Message(true,"Something went wrong."))
      }
    })
  }

  private setAccountOrder(users :User[]): User[]{
    return users.sort((a,b) => a.userId - b.userId)
  }

  public getUserById(id:number): User | null{
    let user = this.$users.getValue().find((u) => {
      return u.userId == id
    })
    if(user == undefined) return null
    return user
  }

}
