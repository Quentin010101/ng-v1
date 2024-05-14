import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../model/auth/user.model';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../core/shared/card/card.component';
import { CheckComponent } from '../../../core/shared/input/check/check.component';
import { ReturnComponent } from '../../../core/shared/return/return.component';
import { IconDeleteComponent } from '../../../core/shared/icon/delete/icon-delete.component';
import { AdministrationService } from '../../../service/administration.service';
import { PopupService } from '../../../service/utils/popup.service';
import { PopUp, PopUpResponse, PopUpType } from '../../../model/utils/popUp.model';
import { UserConfigService } from '../../../service/user-config.service';
import { Module } from '../../../model/admin/config.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, CardComponent, CheckComponent, ReturnComponent, IconDeleteComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  user!: User
  modules!: Module[]

  constructor(private router: Router,  private _administrationService: AdministrationService,private _popUpService: PopupService, private _userConfigService: UserConfigService) {
    let id = this.router.getCurrentNavigation()?.extras.state?.['id'];
    let u = _administrationService.getUserById(id)
    if(u) this.user = u

    _administrationService.$users.subscribe(data =>{
      let u = _administrationService.getUserById(id)
      if(u) this.user = u
    })

    this.modules = this._userConfigService.modules

   }

   public onDelete(){
    let pop = new PopUp("Are you sure you want to delete user: " + this.user.pseudo)
    pop.type = PopUpType.USERDELETE
    this._popUpService.$popUp.next(pop)
    this._popUpService.$answerUserDelete.subscribe(data=>{
      if(data == PopUpResponse.VALIDATE){
        this._administrationService.delete(this.user.userId)
        this.router.navigate(['dashboard/admin'])
      }
    })
   }



   public onLockedAcount(bool: boolean){
    this.user.accountNonLocked = !bool
    this._administrationService.update(this.user)
   }

   public onReturn(){
    this.router.navigate(['dashboard/admin'])
   }

   public onModuleChecked(bool: boolean, moduleId: number){
    let module: Module | undefined = this.modules.find((el) => el.moduleId == moduleId) 
    let toSave: boolean = false
    if(bool && module){
      this.user.config.modules.push(module)
      toSave = true
    }else{
      this.user.config.modules = this.user.config.modules.filter((el)=> el.moduleId != moduleId)
      toSave = true
    }
    this._administrationService.update(this.user)
   }

   public hasModule(module: Module):boolean{
    return this.user.config.modules.find((m) =>  module.moduleId == m.moduleId) != undefined
   }

}
