import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../model/auth/user.model';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../core/shared/card/card.component';
import { CheckComponent } from '../../../core/shared/input/check/check.component';
import { ReturnComponent } from '../../../core/shared/return/return.component';
import { IconDeleteComponent } from '../../../core/shared/icon/delete/icon-delete.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, CardComponent, CheckComponent, ReturnComponent, IconDeleteComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  user!: User

  constructor(private router: Router) {
    this.user = this.router.getCurrentNavigation()?.extras.state?.['user'];
   }

   public onDelete(){
    
   }
}
