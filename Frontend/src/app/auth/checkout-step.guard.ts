import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const checkoutStepGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const guestEmail = sessionStorage.getItem('guestEmail');
  const allowed = auth.isLoggedIn() || !!guestEmail;

  if (!allowed) return router.parseUrl('/checkout');
  return true;
};