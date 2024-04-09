import { Component, inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication.service';
import { AuthRequest } from '../../model/auth/authRequest.model';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { TextComponent } from '../shared/input/text/text.component';
import { CheckComponent } from '../shared/input/check/check.component';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FontAwesomeModule, TextComponent, CheckComponent],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent {
  loginForm!: FormGroup;
  message!: string | null;
  faUser=faUser;
  faLock=faLock

  constructor(private fb: FormBuilder, private _authService: AuthenticationService) {
    this.loginForm = this.fb.group({
      pseudo: ['', Validators.required],
      password: ['', Validators.required],
      stayLogged: [false],
    });
    this.loginForm.touched
  }

  onPasswordChange(str: string){
    this.loginForm.controls['password'].setValue(str)
  }

  onPseudoChange(str: string){
    this.loginForm.controls['pseudo'].setValue(str)
  }

  onStayLogged(bool: boolean){
    console.log(bool)
    console.log("action")
    this.loginForm.controls['stayLogged'].setValue(bool)
  }
  
  get pseudo(){
    return this.loginForm.get('pseudo')
  }

  get password(){
    return this.loginForm.get('password')
  }


  public login(){
    if(!this.loginForm.invalid){
      this._authService.login(this.buildAuthRequest())
      this.loginForm.reset()
    }
  }

  private buildAuthRequest(): AuthRequest{
    let auth: AuthRequest = new AuthRequest();
    auth.pseudo = this.loginForm.controls['pseudo'].value
    auth.password = this.loginForm.controls['password'].value
    auth.stayLogged = this.loginForm.controls['stayLogged'].value
    return auth;

  }
}


