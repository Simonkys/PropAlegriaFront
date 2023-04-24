import {
    HttpErrorResponse,
    HttpHandlerFn,
    HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { AuthService } from '../usuarios/auth.service';

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
        tap(),
        catchError((err) => {
            console.log(err)
            if(err instanceof HttpErrorResponse && err.status === 403 ) {
                authService.logout().subscribe()
                return next(request)
            } else {
                return throwError(() => err);
            }
        })
    );
}
