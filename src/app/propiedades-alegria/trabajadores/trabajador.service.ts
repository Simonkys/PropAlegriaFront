import { Injectable, inject } from '@angular/core';
import {
    TipoTrabajador,
    Trabajador,
    TrabajadorConTipo,
} from './trabajador.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
    BehaviorSubject,
    catchError,
    map,
    mergeMap,
    switchMap,
    tap,
    throwError,
} from 'rxjs';
import { MessageService } from '../mensajes/message.service';

@Injectable({
    providedIn: 'root',
})
export class TrabajadorService {
    private http = inject(HttpClient);
    private messageService = inject(MessageService);

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

    crearTrabajador(trabajador: Trabajador) {
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

    actualizarTrabajador(trabajador: Trabajador) {
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

    eliminarTrabajador(trabajadorId: number) {
        return this.http
            .delete(`${environment.apiUrl}/api/trabajador/${trabajadorId}/`)
            .pipe(
                tap((_) => {
                    const filterData = this.trabajadorSubject.value.filter(
                        (d) => d.id !== trabajadorId
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

    getTrabajadoresConTipo() {
        return this.getTrabajadores().pipe(
            mergeMap((trabajadores) =>
                this.getTipoDeTrabajadores().pipe(
                    map((tipoTrabajadores) => {
                        return trabajadores.map<TrabajadorConTipo>(
                            (trabajador) => {
                                const { tipo_trab, ...data } = trabajador;
                                const tipo = tipoTrabajadores.find(
                                    (t) => t.id === tipo_trab
                                )!;
                                return { ...data, tipo_trabajador: tipo.tipo };
                            }
                        );
                    })
                )
            )
        );
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
