import {  inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserConfigService } from '../service/user-config.service';
import { Module, UserConfig } from '../model/admin/config.model';

export const plannerGuard: CanActivateFn = (route, state) => {
  const configService = inject(UserConfigService)
  console.log(1)
  if(configService.$userConf != null && configService.$userConf.getValue() != null){
    console.log(2)
    let config = configService.$userConf.getValue() as UserConfig
    if(hasModule(config.modules,"planner")){
      console.log(3)
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