import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CoreService } from './core.service';

export const authGuard: CanActivateFn = (route, state) => {

  const coreService = inject(CoreService);
  const router = inject(Router);

  const isLogged = coreService.getIsLoggedIn();
  const userID = coreService.getUserID();

  if (coreService.isAuthenticated()){
    return true;
  }

  router.navigate(['']);
  return false;
};
