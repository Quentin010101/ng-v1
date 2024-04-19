import { Component } from '@angular/core';
import { AdministrationService } from '../../../service/administration.service';
import { User } from '../../../model/auth/user.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
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
