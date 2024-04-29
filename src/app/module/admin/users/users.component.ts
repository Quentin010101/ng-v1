import { Component } from '@angular/core';
import { UserTableComponent } from './user-table/user-table.component';
import { CreationUserComponent } from './creation-user/creation-user.component';
import { User } from '../../../model/auth/user.model';
import { AdministrationService } from '../../../service/administration.service';
import { CardComponent } from '../../../core/shared/card/card.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UserTableComponent,CreationUserComponent,CardComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users: User[] = []

  constructor(private _administrationService: AdministrationService){
    this._administrationService.$users.subscribe(data => this.users = data)
    this._administrationService.init()
  }
}
