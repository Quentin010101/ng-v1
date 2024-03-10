import { Component } from '@angular/core';
import { AuthenticationService } from '../../../service/authentication.service';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

  constructor(private _authService: AuthenticationService){}

  public logOut(){
    this._authService.logOut()
  }
}
