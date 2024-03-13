import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../../service/authentication.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  faPowerOff = faPowerOff
  auth = inject(AuthenticationService)
  pseudo = this.auth.getPseudo()
  transitionOn: boolean = true

  constructor(private route: ActivatedRoute, private _authService: AuthenticationService){

  }

  ngOnInit(){
    setTimeout(()=>{
      this.transitionOn = false
    }, 100)
  }

  public logOut(){
    this._authService.logOut()
  }
}
