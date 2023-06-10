import { Injectable, inject } from '@angular/core';

import {
    ServiciosExtra,
    ServiciosExtraForm,
} from './servicios-extra.model';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
    catchError,
    map,
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
    
    // List
    getServiciosExtra(query: {} = {}) {

        return this.http
            .get<ServiciosExtra[]>(`${environment.apiUrl}/api/servicios_extras/`, {params: query}).pipe(
                map((servicios) => servicios.map(s => this._mapper(s)))
            )
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
                map(s => this._mapper(s)),
                tap((data) => {
                    this.messageService.addMessage({
                        details: ['Servicio registrado'],
                        role: 'success'
                    })
                }),
                catchError((error: HttpErrorResponse) => this.handleError(error))
            );
    }

    // Update
    actualizarServicioExtra(servicioExtra: ServiciosExtra, id: number) {
        return this.http
            .put<ServiciosExtra>(
                `${environment.apiUrl}/api/servicios_extras/${id}/`,
                servicioExtra
            )
            .pipe(
                map(s => this._mapper(s)),
                tap((data) => {
                    this.messageService.addMessage({
                        details: ['Servicio actualizado'],
                        role: 'success'
                    })
                }),
                catchError((error: HttpErrorResponse) => this.handleError(error))
            );
    }

    // Partial Update
    patchValue(servicioExtra: Partial<ServiciosExtraForm>, servicioExtraId: number) {
        return this.http.patch<ServiciosExtra>(
            `${environment.apiUrl}/api/servicios_extras/${servicioExtraId}/`,
            servicioExtra
        ).pipe(
            tap((data) => {}),
            catchError((error: HttpErrorResponse) => this.handleError(error))
        );
    }

    // Destroy
    eliminarServicioExtra(servicioExtra: ServiciosExtra) {
        return this.http
            .delete(`${environment.apiUrl}/api/servicios_extras/${servicioExtra.id}/`)
            .pipe(
                tap((_) => {
                    this.messageService.addMessage({
                        details: ['Servicio eliminado'],
                        role: 'info'
                    })
                })
            );
      }

    
    private _mapper(s: ServiciosExtra): ServiciosExtra {
        return {
            ...s, 
            fecha: new Date(s.fecha),
            pagado: s.contador_cuotas >= s.nro_cuotas,
            monto_cuotas: s.monto / s.nro_cuotas
        }
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


}
