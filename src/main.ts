import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environnement } from './environnement';
import { inject } from '@angular/core';
import { UserConfigService } from './app/service/user-config.service';
import { AuthenticationService } from './app/service/authentication.service';
import {  Observable, combineLatestWith, of, timer } from 'rxjs';



export function initializeUserData() {
  const config = inject(UserConfigService)
  const auth = inject(AuthenticationService)
  let conf: Observable<any>

  if (auth.isAuthenticated) {
    conf = config.init()
  } else {
    conf = timer(0)
  }

  const source = timer(environnement.startAnimation.time)

  return () => source.pipe(
    combineLatestWith(conf)
  )
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
