import { Component } from '@angular/core';
import { AuthenticationService } from '../../../service/authentication.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  faPowerOff = faPowerOff

  constructor(private _authService: AuthenticationService){}

  public logOut(){
    this._authService.logOut()
  }
}
