import { Component, Input } from '@angular/core';
import { User } from '../../../../model/auth/user.model';
import { CheckComponent } from '../../../../core/shared/input/check/check.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AdministrationService } from '../../../../service/administration.service';
import { Validation } from '../../../../../validation';
import { IconDeleteComponent } from '../../../../core/shared/icon/delete/icon-delete.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CheckComponent, ReactiveFormsModule, IconDeleteComponent],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent {
  userForm!: FormGroup
  @Input() users!: User[]

  constructor(private router: Router,private activatedRoute: ActivatedRoute){

  }

  userClick(user: User){
    this.router.navigate(['user'], {relativeTo: this.activatedRoute, state:{
      user: user
    }});
  }

}
