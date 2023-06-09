import { Injectable, inject } from '@angular/core';

import {
  Externo,
  ExternoForm,
} from './externo.model';

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
export class ExternoService {
    private http = inject(HttpClient);
    private messageService = inject(MensajeService);

    private externoSubject = new BehaviorSubject<Externo[]>([]);
    private externoLoaded = false;

    // List
    getExternos() {
      if (this.externoLoaded) {
          return this.externoSubject.asObservable();
      }

      return this.http
          .get<Externo[]>(`${environment.apiUrl}/api/externo/`)
          .pipe(
              switchMap((data) => {
                  this.externoSubject.next(data);
                  this.externoLoaded = true;
                  return this.externoSubject;
              })
          );
    }

    // Retrieve
    getExternoById(id: number) {
      return this.http.get<Externo>(
          `${environment.apiUrl}/api/externo/${id}/`
      );
    }

    // Create
    crearExterno(externo: ExternoForm) {
      return this.http
          .post<Externo>(
              `${environment.apiUrl}/api/externo/`,
              externo
          )
          .pipe(
              tap((data) => {
                  this.externoSubject.next([
                      data,
                      ...this.externoSubject.value,
                  ]);
                  this.messageService.addMessage({
                      details: ['Trabajador externo registrado'],
                      role: 'success'
                  })
                  return data;
              }),
              catchError((error: HttpErrorResponse) => this.handleError(error))
          );
    }

    // Update
    actualizarExterno(externo: ExternoForm) {
      return this.http
          .put<Externo>(
              `${environment.apiUrl}/api/externo/${externo.id}/`,
              externo
          )
          .pipe(
              tap((data) => {
                  const filterData = this.externoSubject.value.map((d) => {
                      return d.id === data.id ? data : d;
                  });
                  this.externoSubject.next([...filterData]);
                  this.messageService.addMessage({
                      details: ['Trabajador externo actualizado'],
                      role: 'success'
                  })
                  return data;
              }),
              catchError((error: HttpErrorResponse) => this.handleError(error))
          );
    }

    // Partial Update
    patchValue(externo: Partial<ExternoForm>) {
      return this.http.patch<Externo>(
          `${environment.apiUrl}/api/externo/${externo.id}/`,
              externo
      ).pipe(
          tap((data) => {
              const filterData = this.externoSubject.value.map((d) => {
                  return d.id === data.id ? data : d;
              });
              this.externoSubject.next([...filterData]);
          }),
          catchError((error: HttpErrorResponse) => this.handleError(error))
      );
    }

    // Destroy
    eliminarExterno(externo: Externo) {
      return this.http
          .delete(`${environment.apiUrl}/api/externo/${externo.id}/`)
          .pipe(
              tap((_) => {
                  const filterData = this.externoSubject.value.filter(
                      (d) => d.id !== externo.id
                  );
                  this.externoSubject.next([...filterData]);
                  this.messageService.addMessage({
                      details: ['Trabajador externo eliminado'],
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
      this.externoLoaded = false
    }

    constructor() { 

    }
}
