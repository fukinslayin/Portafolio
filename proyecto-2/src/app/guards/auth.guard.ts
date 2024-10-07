import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';
import { AlertService } from '../services/message.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const alertService = inject(AlertService);

  return authService.isLoggedIn().pipe(
    map((isLoggedIn) => {
      if (!isLoggedIn) {
        alertService.showMessage(
          '¡Debes iniciar sesión para visualizar esta página!',
          'warn'
        );
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};
