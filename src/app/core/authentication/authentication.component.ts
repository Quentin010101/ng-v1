import { Component, inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication.service';
import { AuthRequest } from '../../model/auth/authRequest.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent {
  loginForm!: FormGroup;
  message!: string | null;

  constructor(private fb: FormBuilder, private _authService: AuthenticationService) {
    this.loginForm = this.fb.group({
      pseudo: ['', Validators.required],
      password: ['', Validators.required],
      stayLogged: [false],
    });
    this.loginForm.touched
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


