import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserConfigService } from '../../../service/user-config.service';
import { Config } from '../../../model/admin/config.model';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  @Input() dashboardChildRoutes!: Routes
  routes!: Routes

  constructor(private _userConfig: UserConfigService){

  }

  ngOnInit(){
    const conf: Config | undefined = this._userConfig.$actifUser.getValue()?.config
    if(conf != null){
      this.routes = this.dashboardChildRoutes.filter((el) => {
        if(el.path == 'admin' && !this._userConfig.$actifUser.value?.role.includes('ADMIN')){
          return false
        }
        if(el.data && el.data['module']){
          let moduleId = parseInt(el.data['module'])
          if(conf.modules.find((module) =>  module.moduleId == moduleId) == undefined){
            return false
          }else{
            return true
          }
        }
        return true
      })
    }
  }
}
