import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './user/user.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.isUserAuthenticated$.pipe(
    map((isAuthenticated) =>
      isAuthenticated ? true : router.createUrlTree(['/home/login'])
    )
  );
};
