import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { Router, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { initializeUserData } from '../main';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeUserData,
      multi: true,
      deps: [HttpClient, Router],
    },
  ]
};
