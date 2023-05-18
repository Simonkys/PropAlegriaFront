import { Injectable, inject } from '@angular/core';
import {
    TipoTrabajador,
    Trabajador,
    TrabajadorForm,
} from './trabajador.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
    BehaviorSubject,
    catchError,
    switchMap,
    tap,
    throwError,
} from 'rxjs';
import { MensajeService } from '../core/services/message.service';

@Injectable({
    providedIn: 'root',
})
export class TrabajadorService {
    private http = inject(HttpClient);
    private messageService = inject(MensajeService);

    private trabajadorSubject = new BehaviorSubject<Trabajador[]>([]);
    private trabajadorLoaded = false;

    private tipoTrabajadorSubject = new BehaviorSubject<TipoTrabajador[]>([]);
    private tipoTrabajadorLoaded = false;

    getTrabajadores() {
        if (this.trabajadorLoaded) {
            return this.trabajadorSubject.asObservable();
        }

        return this.http
            .get<Trabajador[]>(`${environment.apiUrl}/api/trabajador/`)
            .pipe(
                switchMap((data) => {
                    this.trabajadorSubject.next(data);
                    this.trabajadorLoaded = true;
                    return this.trabajadorSubject;
                })
            );
    }

    getTrabajadorById(id: number) {
        return this.http.get<Trabajador>(
            `${environment.apiUrl}/api/trabajador/${id}/`
        );
    }

    crearTrabajador(trabajador: TrabajadorForm) {
        return this.http
            .post<Trabajador>(
                `${environment.apiUrl}/api/trabajador/`,
                trabajador
            )
            .pipe(
                tap((data) => {
                    this.trabajadorSubject.next([
                        data,
                        ...this.trabajadorSubject.value,
                    ]);
                    this.messageService.addMessage({
                        details: ['Trabajador registrado'],
                        role: 'success'
                    })
                    return data;
                }),
                catchError((error: HttpErrorResponse) => this.handleError(error))
            );
    }

    actualizarTrabajador(trabajador: TrabajadorForm) {
        return this.http
            .put<Trabajador>(
                `${environment.apiUrl}/api/trabajador/${trabajador.id}/`,
                trabajador
            )
            .pipe(
                tap((data) => {
                    const filterData = this.trabajadorSubject.value.map((d) => {
                        return d.id === data.id ? data : d;
                    });
                    this.trabajadorSubject.next([...filterData]);
                    this.messageService.addMessage({
                        details: ['Trabajador actualizado'],
                        role: 'success'
                    })
                    return data;
                }),
                catchError((error: HttpErrorResponse) => this.handleError(error))
            );
    }

    pathValue(trabajador: Partial<TrabajadorForm>) {
        return this.http.patch<Trabajador>(
            `${environment.apiUrl}/api/trabajador/${trabajador.id}/`,
                trabajador
        ).pipe(
            tap((data) => {
                const filterData = this.trabajadorSubject.value.map((d) => {
                    return d.id === data.id ? data : d;
                });
                this.trabajadorSubject.next([...filterData]);
            }),
            catchError((error: HttpErrorResponse) => this.handleError(error))
        );
    }

    eliminarTrabajador(trabajador: Trabajador) {
        return this.http
            .delete(`${environment.apiUrl}/api/trabajador/${trabajador.id}/`)
            .pipe(
                tap((_) => {
                    const filterData = this.trabajadorSubject.value.filter(
                        (d) => d.id !== trabajador.id
                    );
                    this.trabajadorSubject.next([...filterData]);
                    this.messageService.addMessage({
                        details: ['Trabajador eliminado'],
                        role: 'info'
                    })
                })
            );
    }

    getTipoDeTrabajadores() {
        if (this.tipoTrabajadorLoaded) {
            return this.tipoTrabajadorSubject.asObservable();
        }

        return this.http
            .get<TipoTrabajador[]>(`${environment.apiUrl}/api/tipo_trabajador/`)
            .pipe(
                switchMap((data) => {
                    this.tipoTrabajadorSubject.next(data);
                    this.tipoTrabajadorLoaded = true;
                    return this.tipoTrabajadorSubject;
                })
            );
    }


    private handleError(error: HttpErrorResponse) {
        if (error.status == 400) {
            const errores = Object.entries(error.error).map((msg) =>`${msg[0].toUpperCase()}: ${msg[1]}`);
            this.messageService.addMessage({
                details: errores,
                role: 'error',
            });
        }
        return throwError(() => error);
    }

    reload() {
        this.trabajadorLoaded = false
    }
}
