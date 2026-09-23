import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { IUser } from '../interface/IAuth';
import { UserRole } from '../../enam/UserRole';

export const adminGuard: CanActivateFn = (route, state) => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.authorizedUser$.pipe(
    map((user: IUser | null) => {
      if (user?.role === UserRole.ADMIN) {
        return true;
      } else {
        return router.createUrlTree(['/']);
      }
    }),
  );
  
};
