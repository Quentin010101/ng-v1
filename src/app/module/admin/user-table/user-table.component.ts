import { Component, Input } from '@angular/core';
import { User } from '../../../model/auth/user.model';
import { CheckComponent } from '../../../core/shared/input/check/check.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CheckComponent, ReactiveFormsModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent {
  userForm!: FormGroup
  @Input() user!: User

  ngOnInit(){
    this.createForm()
  }

  private createForm(){
    this.userForm = new FormGroup({
      userId: new FormControl('')
    })
  }

}
