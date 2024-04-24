import { Component, Input } from '@angular/core';
import { User } from '../../../model/auth/user.model';
import { CheckComponent } from '../../../core/shared/input/check/check.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AdministrationService } from '../../../service/administration.service';
import { Validation } from '../../../../validation';
import { IconDeleteComponent } from '../../../core/shared/icon/delete/icon-delete.component';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CheckComponent, ReactiveFormsModule, IconDeleteComponent],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent {
  userForm!: FormGroup
  @Input() user!: User

  constructor(private _administrationService: AdministrationService){

  }

  ngOnInit(){
    this.createForm()
  }

  private createForm(){
    this.userForm = new FormGroup({
      userId: new FormControl(this.user.userId,Validation.input.user.userId),
      pseudo: new FormControl(this.user.pseudo,Validation.input.user.pseudo),
      role: new FormControl(this.user.role,Validation.input.user.role),
      accountNonLocked: new FormControl(this.user.accountNonLocked,Validation.input.user.accountNonLocked)

    })
  }

  public onStatusChange(boolean: boolean){
    this.userForm.controls['accountNonLocked'].setValue(!boolean)
    this.userForm.markAsDirty()
    if(!this.userForm.invalid){
      let user: User = Object.assign(new User(), this.userForm.value);
      console.log(user)
      this._administrationService.update(user)
    }
  }

  public onDelete(id: number){
    this._administrationService.delete(id)
  }



}
