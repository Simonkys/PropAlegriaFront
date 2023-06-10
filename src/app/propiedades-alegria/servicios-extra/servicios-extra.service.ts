import { Injectable, inject } from '@angular/core';

import {
    ServiciosExtra,
    ServiciosExtraForm,
} from './servicios-extra.model';

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
    providedIn: 'root'
    })
    export class ServiciosExtraService {
        private http = inject(HttpClient);
        private messageService = inject(MensajeService);
    
        private servicioExtraSubject = new BehaviorSubject<ServiciosExtra[]>([]);
        private servicioExtraLoaded = false;

    // List
    getServiciosExtra(query: {} = {}) {
        // if (this.servicioExtraLoaded) {
        //     return this.servicioExtraSubject.asObservable();
        // }
  
        return this.http
            .get<ServiciosExtra[]>(`${environment.apiUrl}/api/servicios_extras/`, {params: query})
            // .pipe(
            //     tap((data) => {
            //         this.servicioExtraSubject.next(data);
            //         this.servicioExtraLoaded = true;
            //         return this.servicioExtraSubject;
            //     })
            // );
    }

    // Retrieve
    getServicioExtraById(id: number) {
        return this.http.get<ServiciosExtra>(
            `${environment.apiUrl}/api/servicios_extras/${id}/`
        );
    }

    // Create
    crearServicioExtra(servicioExtra: ServiciosExtraForm) {
        return this.http
            .post<ServiciosExtra>(
                `${environment.apiUrl}/api/servicios_extras/`,
                servicioExtra
            )
            .pipe(
                tap((data) => {
                    this.servicioExtraSubject.next([
                        data,
                        ...this.servicioExtraSubject.value,
                    ]);
                    this.messageService.addMessage({
                        details: ['Servicio Extra registrado'],
                        role: 'success'
                    })
                    return data;
                }),
                catchError((error: HttpErrorResponse) => this.handleError(error))
            );
    }

    // Update
    actualizarServicioExtra(servicioExtra: ServiciosExtraForm) {
        return this.http
            .put<ServiciosExtra>(
                `${environment.apiUrl}/api/servicios_extras/${servicioExtra.id}/`,
                servicioExtra
            )
            .pipe(
                tap((data) => {
                    const filterData = this.servicioExtraSubject.value.map((d) => {
                        return d.id === data.id ? data : d;
                    });
                    this.servicioExtraSubject.next([...filterData]);
                    this.messageService.addMessage({
                        details: ['Servicio Extra actualizado'],
                        role: 'success'
                    })
                    return data;
                }),
                catchError((error: HttpErrorResponse) => this.handleError(error))
            );
    }

    // Partial Update
    patchValue(servicioExtra: Partial<ServiciosExtraForm>) {
        return this.http.patch<ServiciosExtra>(
            `${environment.apiUrl}/api/servicios_extras/${servicioExtra.id}/`,
            servicioExtra
        ).pipe(
            tap((data) => {
                const filterData = this.servicioExtraSubject.value.map((d) => {
                    return d.id === data.id ? data : d;
                });
                this.servicioExtraSubject.next([...filterData]);
            }),
            catchError((error: HttpErrorResponse) => this.handleError(error))
        );
    }

    // Destroy
    eliminarServicioExtra(servicioExtra: ServiciosExtra) {
        return this.http
            .delete(`${environment.apiUrl}/api/servicios_extras/${servicioExtra.id}/`)
            .pipe(
                tap((_) => {
                    const filterData = this.servicioExtraSubject.value.filter(
                        (d) => d.id !== servicioExtra.id
                    );
                    this.servicioExtraSubject.next([...filterData]);
                    this.messageService.addMessage({
                        details: ['Servicio Extra eliminado'],
                        role: 'info'
                    })
                })
            );
      }

    // Manejo de errores
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

    // Recarga
    reload() {
        this.servicioExtraLoaded = false
    }
  
    constructor() { 
  
    }

}
