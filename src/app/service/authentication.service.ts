import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AuthResponse } from '../model/auth/authResponse.model';
import { AuthRequest } from '../model/auth/authRequest.model';
import { environnement } from '../../environnement';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from './message.service';
import { Message } from '../model/message.model';
import { LogOutService } from './utils/log-out.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url: string = environnement.backEndUrl + "authentication/"

  private isAuth: boolean = false;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private _platformId: Object, private router: Router, private _messageService: MessageService, private _logOutService: LogOutService) { 
    this.initAuth()
  }

  private getTokenWithAuth(authRequest: AuthRequest):Observable<AuthResponse>{
     return this.http.post<AuthResponse>(this.url + "login", authRequest)
  }

  public login(authRequest: AuthRequest){
    this.clearLocalStorage()
    this.getTokenWithAuth(authRequest).subscribe({
      next: (data) => {
        this.handleToken(data)
        this.isAuth = true
        this.router.navigate(['dashboard/home', {m: "welcome"}])
      },
      error: (data) => {
        this.isAuth = false
          let m = new Message(true,"Wrong credentials")
          this._messageService.$message.next(m)
     }})
  }

  public logOut(){
    this.isAuth = false
    this.clearLocalStorage()
    this._logOutService.clearServicesData()
    this.router.navigate(['login'])
  }

  public getToken(): string | null{
    return localStorage.getItem("token")
  }

  private initAuth(): boolean{
    let d = new Date()
    if(this.verifLocalStorageData()){
      if(parseInt(localStorage.getItem('tokenExpDate') as string) > d.getTime()){
        this.isAuth = true
        return true
      }
    }
    return false;
  }

  get isAuthenticated(){
    return this.isAuth;
  }

  public getPseudo(){
    return localStorage.getItem("pseudo");
  }

  private handleToken(data: AuthResponse){
    if(isPlatformBrowser(this._platformId)){
      localStorage.setItem('pseudo', data.pseudo)
      localStorage.setItem('token', data.token)
      localStorage.setItem('tokenExpDate', data.expDateToken.toString())
    }
  }

  private clearLocalStorage(){
    localStorage.removeItem('pseudo')
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpDate')
  }

  private verifLocalStorageData(): boolean{
    if(localStorage.getItem("pseudo") == null) return false
    if(localStorage.getItem("token") == null) return false
    if(localStorage.getItem("tokenExpDate") == null) return false
    return true;
  }

}
