import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, finalize, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private userKey = 'access_token';
    private http = inject(HttpClient);
    private router = inject(Router);

    private userSubject = new BehaviorSubject<Auth | null>(null);

    getCurrentUser() {
        return this.userSubject.value;
    }

    login(username: string, password: string) {
        return this.http
            .post<Auth>(`${environment.apiUrl}/login/`, {
                username: username,
                password: password,
            })
            .pipe(
                tap((auth) => {
                    this.setUser(auth);
                })
            );
    }

    setUser(auth: Auth) {
        localStorage.setItem(this.userKey, JSON.stringify(auth));
        this.userSubject.next(auth);
    }

    loadUserFromStorage() {
        const data = localStorage.getItem(this.userKey);
        if (data) {
            this.userSubject.next(JSON.parse(data) as Auth);
        } else {
            this.userSubject.next(null);
        }
    }

    logout() {
        return this.http
            .post(
                `${environment.apiUrl}/logout/?token=${
                    this.getCurrentUser()?.Token
                }`,
                {}
            )
            .pipe(
                finalize(() => {
                    localStorage.removeItem(this.userKey);
                    this.userSubject.next(null);
                    this.router.navigate(['auth/login'], { replaceUrl: true });
                })
            );
    }

    isAuthenticated(): boolean {
        return this.getCurrentUser() ? true : false;
    }
}
