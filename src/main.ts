import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Router } from '@angular/router';
import { AuthenticationService } from './app/service/authentication.service';
import { inject } from '@angular/core';


export function initializeUserData(router: Router) {
  const auth = inject(AuthenticationService);

  return () => true


}
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
