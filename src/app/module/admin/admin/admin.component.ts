import { Component } from '@angular/core';
import { AdministrationService } from '../../../service/administration.service';
import { User } from '../../../model/auth/user.model';
import { CheckComponent } from '../../../core/shared/input/check/check.component';
import { FormControl, FormGroup } from '@angular/forms';
import { UserTableComponent } from '../user-table/user-table.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CheckComponent, UserTableComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  users: User[] = []

  constructor(private _administrationService: AdministrationService){
    this._administrationService.$users.subscribe(data => this.users = data)
    this._administrationService.init()
  }


}
