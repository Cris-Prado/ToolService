import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateChildFn } from '@angular/router';
import { Auth } from '../../core/services/auth';

export const authChildGuard: CanActivateChildFn = async () => {
  const authService = inject(Auth);
  const router = inject(Router);

  const user = await authService.getUser();

  if (user) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
