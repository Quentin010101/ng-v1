import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication.service';
import { AuthRequest } from '../../model/auth/authRequest.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../service/message.service';
import { Message } from '../../model/message.model';

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

  constructor(private fb: FormBuilder, private _authService: AuthenticationService, private route: ActivatedRoute, private router: Router, private _messageService: MessageService) {
    this.loginForm = this.fb.group({
      pseudo: ['', Validators.required],
      password: ['', Validators.required],
      stayLogged: [false, Validators.required],
    });
  }

  ngOnInit(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.message = this.route.snapshot.paramMap.get('message');
    if(this.message != null && this.message != ''){
      let m = new Message()
      m.error = true
      m.message = this.message
      this._messageService.$message.next(m)
    }
  }
  

  get pseudo(){
    return this.loginForm.get('pseudo')
  }

  get password(){
    return this.loginForm.get('password')
  }


  public login(){
    if(!this.loginForm.invalid){
      console.log("login r")
      this._authService.login(this.buildAuthRequest())
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
