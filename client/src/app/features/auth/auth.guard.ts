import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

// export const authGuard: CanActivateFn = (route, state) =>
// {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   if (authService.isLoggedIn()) {
//     router.navigate(['myGroups']);
//     return true;
//   }
//   else {
//     router.navigate(['/auth/login']);
//     return false;
//   }
// };

export class  authGuard implements CanActivate {

  constructor(
    private authService:AuthService,
    private router:Router
    ){}
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const role = localStorage.getItem('role')
      if (role =='admin')
      {
        console.log('employee login succeeded')
        return true;
      }
      this.router.navigate(['/login']);
      return false;
  }
}

