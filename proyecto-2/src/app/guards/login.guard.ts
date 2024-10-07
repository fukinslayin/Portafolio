import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.isLoggedIn().pipe(
    map((isLoggedIn) => {
      if (!isLoggedIn) {
        return true;
      }
      return false;
    })
  );
};
