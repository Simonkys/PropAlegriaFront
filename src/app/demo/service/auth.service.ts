import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { delay, of, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private tokenAccessKey = 'access_token';
    private router = inject(Router);

    login(username: string, password: string) {
        return of(true).pipe(
            delay(2000),
            tap((response) => {})
        );
    }

    logout() {
        localStorage.removeItem(this.tokenAccessKey);
        this.router.navigate(['auth/login'], { replaceUrl: true });
    }

    isAuthenticated(): boolean {
        return true;
    }

    getAccessToken() {
        return localStorage.getItem(this.tokenAccessKey);
    }
}
