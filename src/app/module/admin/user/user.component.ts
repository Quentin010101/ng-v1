import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../model/auth/user.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  user!: User

  constructor(private router: Router) {
    this.user = this.router.getCurrentNavigation()?.extras.state?.['user'];
   }
}
