import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../model/auth/user.model';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../core/shared/card/card.component';
import { CheckComponent } from '../../../core/shared/input/check/check.component';
import { ReturnComponent } from '../../../core/shared/return/return.component';
import { IconDeleteComponent } from '../../../core/shared/icon/delete/icon-delete.component';
import { AdministrationService } from '../../../service/administration.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, CardComponent, CheckComponent, ReturnComponent, IconDeleteComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  user!: User

  constructor(private router: Router,  private _administrationService: AdministrationService) {
    let id = this.router.getCurrentNavigation()?.extras.state?.['id'];
    let u = _administrationService.getUserById(id)
    if(u) this.user = u

    _administrationService.$users.subscribe(data =>{
      let u = _administrationService.getUserById(id)
      if(u) this.user = u
    })
   }

   public onDelete(){
    this._administrationService.delete(this.user.userId)
    this.router.navigate(['dashboard/admin'])
   }



   public onLockedAcount(bool: boolean){
    this.user.accountNonLocked = !bool
    this._administrationService.update(this.user)
   }

}
