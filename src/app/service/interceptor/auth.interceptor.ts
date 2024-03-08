import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../authentication.service';



export function AuthInterceptor(req: HttpRequest<unknown>,
  next: HttpHandlerFn) {
  const auth = inject(AuthenticationService)
  req = req.clone({
    setHeaders: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
      'Authorization': `Bearer ${auth.getToken()}`,
    },
  });
  return next(req);
}
