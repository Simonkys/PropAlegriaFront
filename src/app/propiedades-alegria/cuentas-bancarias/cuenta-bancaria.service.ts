import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CuentaBancaria, CuentaBancariaForm } from './cuenta-bancaria.models';
import { BehaviorSubject, Observable, catchError, shareReplay, tap, throwError } from 'rxjs';
import { MensajeService } from '../core/services/message.service';

@Injectable({
    providedIn: 'root',
})
export class CuentaBancariaService {
    private http = inject(HttpClient);
    private messageService = inject(MensajeService);

    private apiUrl = `${environment.apiUrl}/api/cuenta`

    private cuentasBancariasSub = new BehaviorSubject<CuentaBancaria[]>([])
    cuentasBancarias$ = this.cuentasBancariasSub.asObservable().pipe(shareReplay(1))

    getCuentasBancarias(): Observable<CuentaBancaria[]> {
        return this.http.get<CuentaBancaria[]>(`${this.apiUrl}/`);
    }

    getCuentasBancariasByRut(rut: string): Observable<CuentaBancaria[]> {
        return this.http.get<CuentaBancaria[]>(`${this.apiUrl}/?propietario_rut=${rut}`).pipe(
            tap((cuentas) => {
                this.cuentasBancariasSub.next(cuentas)
            })
        )
    }

    registrarCuentaBancaria(cuentaBancaria: CuentaBancariaForm): Observable<CuentaBancaria> {
        return this.http.post<CuentaBancaria>(`${this.apiUrl}/`, cuentaBancaria).pipe(
            tap(nuevaCuenta => {
                this.messageService.addMessage({
                    details: ['Cuenta registrada exitosamente!'],
                    role: 'success'
                })
                this.cuentasBancariasSub.next([nuevaCuenta, ...this.cuentasBancariasSub.value])
            }),
            catchError((error: HttpErrorResponse) => this.handleError(error))
        )
    }

    actualizarCuentaBancaria(cuentaBancaria: CuentaBancariaForm) {
        return this.http.put<CuentaBancaria>(`${this.apiUrl}/${cuentaBancaria.id}/`, cuentaBancaria).pipe(
            tap(cuentaActualizada => {
                this.messageService.addMessage({
                    details: ['Cuenta actualizada exitosamente!'],
                    role: 'success'
                })

                const cuentasActualizadas = this.cuentasBancariasSub.value.map(c => {
                    if (c.id === cuentaActualizada.id) {
                        return cuentaActualizada
                    } else {
                        return c
                    }
                })
                this.cuentasBancariasSub.next(cuentasActualizadas)
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
                const cuentasfiltradas = this.cuentasBancariasSub.value.filter(c => c.id !== cuentaBancaria.id)
                this.cuentasBancariasSub.next(cuentasfiltradas)
            }),
            catchError((error: HttpErrorResponse) => this.handleError(error))
        )
    }


    private handleError(error: HttpErrorResponse) {
        const msg = JSON.stringify(error.error);
        if (error.status == 400) {
            const errores = Object.entries(error.error).map((msg) =>`${msg[0].toUpperCase()}: ${msg[1]}`);
            this.messageService.addMessage({
                details: errores,
                role: 'error',
            });
        }
        return throwError(() => new Error(msg));
    }
 
}
