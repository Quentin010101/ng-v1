import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserConfig } from '../model/admin/config.model';
import { environnement } from '../../environnement';

@Injectable({
  providedIn: 'root'
})
export class UserConfigService {
  url:string = environnement.backEndUrl + 'configuration/'
  $userConf = new BehaviorSubject<UserConfig | null>(null)

  constructor(private http: HttpClient) { }

  public readConf(): Observable<UserConfig>{
    return this.http.get<UserConfig>(this.url + 'read');
  }
}
