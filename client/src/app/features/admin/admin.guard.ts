import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAdmin = (authService.getRole() === 'admin');

  if (isAdmin) {
    router.navigate(['/myGroups']);
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
