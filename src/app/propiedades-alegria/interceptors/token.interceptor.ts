import {
    HttpErrorResponse,
    HttpHandlerFn,
    HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export function TokenInterceptor(
    request: HttpRequest<unknown>,
    next: HttpHandlerFn
) {
    const authService = inject(AuthService);

    const token = authService.getCurrentUser()?.Token;
    if (token) {
        request = request.clone({
            setHeaders: {
                Authorization: `Token ${token}`,
            },
        });
    }

    return next(request).pipe(
        catchError((error) => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                authService.logout();
                return throwError(() => {
                    return error;
                });
            } else {
                return throwError(() => {
                    return new Error(error);
                });
            }
        })
    );
}
