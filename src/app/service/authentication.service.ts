import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AuthResponse } from '../model/auth/authResponse.model';
import { AuthRequest } from '../model/auth/authRequest.model';
import { environnement } from '../../environnement';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url: string = environnement.backEndUrl + "authentication/"

  private isAuth: boolean = false;
  private pseudo!: string;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private _platformId: Object, private router: Router) { 
    this.initAuth()
  }

  private getTokenWithAuth(authRequest: AuthRequest):Observable<AuthResponse>{
     return this.http.post<AuthResponse>(this.url + "login", authRequest)
  }

  public login(authRequest: AuthRequest){
    this.getTokenWithAuth(authRequest).subscribe({
      next: (data) => {
        this.handleToken(data)
        this.isAuth = true
        this.router.navigate(['dashboard'])
      },
      error: (data) => {
        console.log("cant log with auth")
      }
     })
  }

  public getToken(): string | null{
    return localStorage.getItem("token")
  }

  public getTokenWithRefreshToken():void{
    let token = localStorage.getItem("refreshToken")
    let headers = new HttpHeaders()
    headers.set("Authorization", "Bearer " + token)
    this.http.get<AuthResponse>(this.url + "refreshToken", {headers}).subscribe({
     next: (data) => {
      console.log("refresh came")
      console.log(data)
      this.handleRefreshToken(data)
      this.isAuth = true
      this.router
     },
     error: (data) => {
      console.log("cant log with refreshtoken")
     }
    })

  }

  private initAuth(): boolean{
    let d = new Date()

    if(this.verifLocalStorageData()){
      console.log("token date: " + new Date(parseInt(localStorage.getItem('tokenExpDate') as string)))
      console.log("tokenRefresh date: " + new Date(parseInt(localStorage.getItem('refreshTokenExpDate') as string)))
      if(parseInt(localStorage.getItem('tokenExpDate') as string) > d.getTime()){
        this.isAuth = true
        return true
      }else{
        if(parseInt(localStorage.getItem('refreshTokenExpDate') as string) > d.getTime()){
          this.getTokenWithRefreshToken()
          return true
        }
      }
    }
    return false;
  }

  get isAuthenticated(){
    return this.isAuth;
  }

  private handleToken(data: AuthResponse){
    if(isPlatformBrowser(this._platformId)){
      localStorage.setItem('pseudo', data.pseudo)
      localStorage.setItem('token', data.token)
      localStorage.setItem('tokenExpDate', data.expDateToken.toString())
      localStorage.setItem('refreshToken', data.refreshToken)
      localStorage.setItem('refreshTokenExpDate', data.expDateRefreshToken.toString())
    }
  }

  private handleRefreshToken(data: AuthResponse){
    if(isPlatformBrowser(this._platformId) && this.verifRefreshTokenResponse(data)){
      localStorage.setItem('pseudo', data.pseudo)
      localStorage.setItem('token', data.token)
      localStorage.setItem('tokenExpDate', data.expDateToken.toString())
      localStorage.setItem('refreshToken', data.refreshToken)
      localStorage.setItem('refreshTokenExpDate', data.expDateRefreshToken.toString())
    }
  }

  private verifRefreshTokenResponse(data: AuthResponse): boolean{
    if(!this.verifLocalStorageData()) return false
    if(data.expDateRefreshToken != parseInt(localStorage.getItem("refreshTokenExpDate") as string)) return false
    if(data.refreshToken != localStorage.getItem("refreshToken") as string) return false
    return true
  }

  private verifLocalStorageData(): boolean{
    if(localStorage.getItem("pseudo") == null) return false
    if(localStorage.getItem("token") == null) return false
    if(localStorage.getItem("tokenExpDate") == null) return false
    if(localStorage.getItem("refreshTokenExpDate") == null) return false
    if(localStorage.getItem("refreshToken") == null) return false
    return true;
  }

}
