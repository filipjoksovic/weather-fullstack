import { inject } from '@angular/core';
import { type CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/data/auth.service';
import { EnvironmentService } from '@core/services/environment.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const environmentService = inject(EnvironmentService);
  const router: Router = inject(Router);
  console.log('Guard called', environmentService.environment().isHeadless);

  if (environmentService.environment().isHeadless) {
    return true;
  } else if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
