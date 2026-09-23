import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IUser } from '../interface/IAuth';
import { map } from 'rxjs';

export const guestGuard: CanActivateFn = (route, state) => {

  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  return authService.authorizedUser$.pipe(
    map((user: IUser | null) => {
      if (!user) {
        return true;
      } else {
        return router.createUrlTree(['/']);
      }
    })
  );

};
