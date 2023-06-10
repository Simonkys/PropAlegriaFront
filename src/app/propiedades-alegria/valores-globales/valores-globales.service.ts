import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
    BehaviorSubject,
    catchError,
    tap,
    throwError,
} from 'rxjs';
import { MensajeService } from '../core/services/message.service';

import {
    ValoresGlobales,
    ValoresGlobalesForm,
  } from './valores-globales.model';

@Injectable({
providedIn: 'root'
})
export class ValoresGlobalesService {
    private http = inject(HttpClient);
    private messageService = inject(MensajeService);

    private valoresGlobalesSubject = new BehaviorSubject<ValoresGlobales[]>([]);
    private valoresGlobalesLoaded = false;

    // List
    getValoresGlobales() {
        if (this.valoresGlobalesLoaded) {
            return this.valoresGlobalesSubject.asObservable();
        }
  
        return this.http
            .get<ValoresGlobales[]>(`${environment.apiUrl}/api/valores_globales/`)
            .pipe(
                tap((data) => {
                    this.valoresGlobalesSubject.next(data);
                    this.valoresGlobalesLoaded = true;
                })
            );
    }

    // Retrieve
    getValorGlobalById(id: number) {
        return this.http.get<ValoresGlobales>(
            `${environment.apiUrl}/api/valores_globales/${id}/`
        );
    }

    // Create
    crearValorGlobal(valoresGlobales: ValoresGlobalesForm) {
        return this.http
            .post<ValoresGlobales>(
                `${environment.apiUrl}/api/valores_globales/`,
                    valoresGlobales
            )
            .pipe(
                tap((data) => {
                    this.valoresGlobalesSubject.next([
                        data,
                        ...this.valoresGlobalesSubject.value,
                    ]);
                    this.messageService.addMessage({
                        details: ['Valor Global registrado'],
                        role: 'success'
                    })
                    return data;
                }),
                catchError((error: HttpErrorResponse) => this.handleError(error))
            );
    }

    // Update
    actualizarValorGlobal(valoresGlobales: ValoresGlobalesForm) {
        return this.http
            .put<ValoresGlobales>(
                `${environment.apiUrl}/api/valores_globales/${valoresGlobales.id}/`,
                    valoresGlobales
            )
            .pipe(
                tap((data) => {
                    const filterData = this.valoresGlobalesSubject.value.map((d) => {
                        return d.id === data.id ? data : d;
                    });
                    this.valoresGlobalesSubject.next([...filterData]);
                    this.messageService.addMessage({
                        details: ['Valor Global actualizado'],
                        role: 'success'
                    })
                    return data;
                }),
                catchError((error: HttpErrorResponse) => this.handleError(error))
            );
    }

    // Partial Update
    patchValue(valoresGlobales: Partial<ValoresGlobalesForm>) {
        return this.http.patch<ValoresGlobales>(
            `${environment.apiUrl}/api/valores_globales/${valoresGlobales.id}/`,
                valoresGlobales
        ).pipe(
            tap((data) => {
                const filterData = this.valoresGlobalesSubject.value.map((d) => {
                    return d.id === data.id ? data : d;
                });
                this.valoresGlobalesSubject.next([...filterData]);
            }),
            catchError((error: HttpErrorResponse) => this.handleError(error))
        );
    }

    // Destroy
    eliminarValorGlobal(valoresGlobales: ValoresGlobales) {
        return this.http
            .delete(`${environment.apiUrl}/api/valores_globales/${valoresGlobales.id}/`)
            .pipe(
                tap((_) => {
                    const filterData = this.valoresGlobalesSubject.value.filter(
                        (d) => d.id !== valoresGlobales.id
                    );
                    this.valoresGlobalesSubject.next([...filterData]);
                    this.messageService.addMessage({
                        details: ['Valor Global eliminado'],
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
        this.valoresGlobalesLoaded = false
      }
  
      constructor() { 
  
      }
}
