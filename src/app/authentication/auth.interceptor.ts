import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';



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
