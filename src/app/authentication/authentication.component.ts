import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { AuthRequest } from '../model/auth/authRequest.model';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private _authService: AuthenticationService) {
    this.loginForm = this.fb.group({
      pseudo: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public login(){
    console.log("login")
    if(!this.loginForm.invalid){
      console.log("login r")
      this._authService.login(this.buildAuthRequest())
    }
  }

  private buildAuthRequest(): AuthRequest{
    let auth: AuthRequest = new AuthRequest();
    auth.pseudo = this.loginForm.controls['pseudo'].value
    auth.password = this.loginForm.controls['password'].value
    return auth;

  }
}
