import {  inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserConfigService } from '../service/user-config.service';
import { Config, Module } from '../model/admin/config.model';
import { User } from '../model/auth/user.model';

export const plannerGuard: CanActivateFn = (route, state) => {
  const configService = inject(UserConfigService)
  if(configService.$actifUser != null && configService.$actifUser.getValue() != null){
    let user = configService.$actifUser.getValue() as User
    let config = user.config as Config
    if(hasModule(config.modules,"Planner")){
      return true;
    }
    console.log("test")
  }
  return false
};

function hasModule(modules: Module[], str: string):boolean{
  console.log(modules)
  let result = modules.find(el => el.name === str)
  if(result != null && result != undefined){
    return true
  }
  return false
}