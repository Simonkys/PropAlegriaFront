import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';

export function TokenInterceptor(
    request: HttpRequest<unknown>,
    next: HttpHandlerFn
) {
    const authService = inject(AuthService);

    const token = authService.getAccessToken();
    request = request.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`,
        },
    });

    return next(request).pipe(
        catchError((error) => {
            return throwError(() => error);
        })
    );
}
