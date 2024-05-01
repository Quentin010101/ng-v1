import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Validation } from '../../../../../validation';
import { TextComponent } from '../../../../core/shared/input/text/text.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserCheck,faUser, faLockOpen, faLock } from '@fortawesome/free-solid-svg-icons';
import { UserCreate } from '../../../../model/auth/user.model';
import { AdministrationService } from '../../../../service/administration.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-creation-user',
  standalone: true,
  imports: [ReactiveFormsModule,TextComponent,FontAwesomeModule],
  templateUrl: './creation-user.component.html',
  styleUrl: './creation-user.component.scss'
})
export class CreationUserComponent {
  newUserForm!: FormGroup
  faUserCheck=faUserCheck; faUser = faUser; faLockOpen=faLockOpen; faLock=faLock
  resetInput= new Subject<boolean>()

  constructor(private _administrationService: AdministrationService){}

  ngOnInit(){
    this.newUserForm = new FormGroup({
      pseudo: new FormControl('', Validation.input.user.pseudo),
      password: new FormControl('', Validation.input.user.password),
    })
  }

  public onPseudoChange(str:string){
    this.pseudo?.setValue(str)
  }

  public onPasswordChange(str:string){
    this.password?.setValue(str)
  }

  get pseudo(){
    return this.newUserForm.get('pseudo')
  }

  get password(){
    return this.newUserForm.get('password')
  }

  public onSubmit(){
    if(!this.newUserForm.invalid){
      let newUser: UserCreate = Object.assign(new UserCreate, this.newUserForm.value) 
      this._administrationService.newUser(newUser)
      this.resetInput.next(true)
      this.newUserForm.reset()
    }
  }
}
