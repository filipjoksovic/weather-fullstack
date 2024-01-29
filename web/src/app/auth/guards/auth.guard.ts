import { inject } from '@angular/core';
import { type CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    return router.navigate(['/login']);
  }
};
