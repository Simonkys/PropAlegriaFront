import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export function TokenInterceptor(
    request: HttpRequest<unknown>,
    next: HttpHandlerFn
) {
    const authService = inject(AuthService);

    const token = authService.getCurrentUser()?.Token;
    request = request.clone({
        setHeaders: {
            Authorization: `Token ${token}`,
        },
    });

    return next(request).pipe(
        catchError((error) => {
            return throwError(() => {
                authService.logout();
                return new Error(error);
            });
        })
    );
}
