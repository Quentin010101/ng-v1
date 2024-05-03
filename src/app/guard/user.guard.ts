import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { inject } from '@angular/core';
import { MessageService } from '../service/utils/message.service';
import { Message } from '../model/utils/message.model';

export const userGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthenticationService);
  const router = inject(Router);
  const message = inject(MessageService);

  if(!auth.isAuthenticated) {
    let m = new Message(true, "You need to log into your account to access this page.")
    message.$message.next(m)
    router.navigateByUrl('/login')
    return false
  }

  return true
};
