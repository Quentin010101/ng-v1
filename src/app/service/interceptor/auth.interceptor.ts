import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../authentication.service';



export function AuthInterceptor(req: HttpRequest<unknown>,
  next: HttpHandlerFn) {
  const auth = inject(AuthenticationService)
  if(auth.isAuthenticated){
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${auth.getToken()}`)
    });
  }
  return next(req);
}
