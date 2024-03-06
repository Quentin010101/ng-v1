import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthenticationService);
  const router = inject(Router);

  if(!auth.isAuthenticated) {
    router.navigateByUrl('/login')
    return false
  }

  return true
};
