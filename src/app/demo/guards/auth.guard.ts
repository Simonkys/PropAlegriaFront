import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export function authGuard() {
    const router = inject(Router);
    const authService = inject(AuthService);

    if (!authService.isAuthenticated()) {
        router.navigate(['login'], { replaceUrl: true });
        return false;
    }

    return authService.isAuthenticated();
}
