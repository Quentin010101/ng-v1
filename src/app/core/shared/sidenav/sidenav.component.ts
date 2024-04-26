import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserConfigService } from '../../../service/user-config.service';
import { UserConfig } from '../../../model/admin/config.model';

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
    const conf: UserConfig | null = this._userConfig.$userConf.getValue()
    if(conf != null){
      this.routes = this.dashboardChildRoutes.filter((el) => {
        if(el.data && el.data['module']){
          let moduleId = parseInt(el.data['module'])
          if(conf.modules.find((module) =>  module.moduleId == moduleId) == undefined){
            return true
          }else{
            return false
          }
        }
        return true
      })
    }
  }
}
