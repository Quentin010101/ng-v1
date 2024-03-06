import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AuthResponse } from '../model/auth/authResponse.model';
import { AuthRequest } from '../model/auth/authRequest.model';
import { environnement } from '../../environnement';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url: string = environnement.backEndUrl + "authentication/"

  private isAuth: boolean = false;
  private pseudo!: string;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private _platformId: Object) { }

  public getTokenWithAuth(authRequest: AuthRequest):void{
     this.http.post<AuthResponse>(this.url + "login", authRequest).subscribe({
      next: (data) => {
        this.handleToken(data)
        this.isAuth = true
      },
      error: (data) => {
        console.log("cant log with auth")
      }
     })
  }

  public getTokenWithRefreshToken():void{
    let token = localStorage.getItem("refreshToken")
    let headers = new HttpHeaders()
    headers.set("Authorization", "Bearer " + token)
    this.http.get<AuthResponse>(this.url + "refreshToken", {headers}).subscribe({
     next: (data) => {
      this.handleRefreshToken(data)
      this.isAuth = true
     },
     error: (data) => {
      console.log("cant log with refreshtoken")
     }
    })

  }

  public initAuth(): boolean{
    let d = new Date()

    if(this.verifLocalStorageData()){
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
      localStorage.setItem('tokenExpDate', data.expDateToken.getTime().toString())
      localStorage.setItem('refreshToken', data.refreshToken)
      localStorage.setItem('refreshTokenExpDate', data.expDateRefreshToken.getTime().toString())
    }
  }

  private handleRefreshToken(data: AuthResponse){
    if(isPlatformBrowser(this._platformId) && this.verifRefreshTokenResponse(data)){
      localStorage.setItem('pseudo', data.pseudo)
      localStorage.setItem('token', data.token)
      localStorage.setItem('tokenExpDate', data.expDateToken.getTime().toString())
      localStorage.setItem('refreshToken', data.refreshToken)
      localStorage.setItem('refreshTokenExpDate', data.expDateRefreshToken.getTime().toString())
    }
  }

  private verifRefreshTokenResponse(data: AuthResponse): boolean{
    if(!this.verifLocalStorageData()) return false
    if(data.expDateRefreshToken.getTime() != parseInt(localStorage.getItem("refreshTokenExpDate") as string)) return false
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
