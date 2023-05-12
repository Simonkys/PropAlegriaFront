import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CuentaBancaria, CuentaBancariaForm } from '../models/cuenta-bancaria.models';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
    providedIn: 'root',
})
export class CuentaBancariaService {
    private http = inject(HttpClient);
    private messageService = inject(MessageService);

    private apiUrl = `${environment.apiUrl}/api/cuenta`

    getCuentasBancarias(): Observable<CuentaBancaria[]> {
        return this.http.get<CuentaBancaria[]>(`${this.apiUrl}/`);
    }

    getCuentasBancariasByRut(rut: string): Observable<CuentaBancaria[]> {
        return this.http.get<CuentaBancaria[]>(`${this.apiUrl}/?propietario_rut=${rut}`);
    }

    createCuentaBancaria(cuentaBancaria: CuentaBancariaForm): Observable<CuentaBancaria> {
        return this.http.post<CuentaBancaria>(`${this.apiUrl}/`, cuentaBancaria).pipe(
            tap(_ => {
                this.messageService.addMessage({
                    details: ['Cuenta registrada exitosamente!'],
                    role: 'success'
                })
            }),
            catchError((error: HttpErrorResponse) => this.handleError(error))
        )
    }

    eliminarCuentaBancaria(cuentaBancaria: CuentaBancaria) {
        return this.http.delete(`${this.apiUrl}/${cuentaBancaria.id}/`).pipe(
            tap(_ => {
                this.messageService.addMessage({
                    details: ['Cuenta eliminada exitosamente!'],
                    role: 'info'
                })
            })
        )
    }


    private handleError(error: HttpErrorResponse) {
        const msg = JSON.stringify(error.error);
        if (error.status == 400) {
            const errores = Object.values(error.error).map((msg) =>
                String(msg)
            );
            this.messageService.addMessage({
                details: errores,
                role: 'error',
            });
        }
        return throwError(() => new Error(msg));
    }
 
}
