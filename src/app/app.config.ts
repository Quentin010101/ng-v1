import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { Router, provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { initializeUserData } from '../main';
import { AuthInterceptor } from './service/interceptor/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { UnhautorizedInterceptor } from './service/interceptor/unhautorized.interceptor';



export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withFetch(), withInterceptors([
      AuthInterceptor, UnhautorizedInterceptor
    ])),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeUserData,
      multi: true,
      deps: [HttpClient, Router],
    },
    provideRouter(routes, withViewTransitions())
  ],
  
};
