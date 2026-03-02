import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const canActivateAuthRole: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const requiredRole = route.data?.['role'] as string | undefined;

  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  if (!requiredRole) return true;

  // wenn du hasRole hast, wird geprüft
  if (typeof (auth as any).hasRole === 'function') {
    const ok = (auth as any).hasRole(requiredRole);
    if (!ok) router.navigate(['/forbidden']);
    return ok;
  }

  // sonst erstmal durchlassen, damit nichts crasht
  return true;
};