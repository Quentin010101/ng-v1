import {  inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserConfigService } from '../service/user-config.service';
import { Module, UserConfig } from '../model/admin/config.model';

export const plannerGuard: CanActivateFn = (route, state) => {
  const configService = inject(UserConfigService)
  if(configService.$userConf != null && configService.$userConf.getValue() != null){
    let config = configService.$userConf.getValue() as UserConfig
    if(hasModule(config.modules,"planner")){
      return true;
    }
  }
  return false
};

function hasModule(modules: Module[], str: string):boolean{
  let result = modules.find(el => el.name === str)
  if(result != null && result != undefined){
    return true
  }
  return false
}