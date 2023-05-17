import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "src/environments/environment";
import { Propiedad, PropiedadForm } from "./propiedad.model";
import { MessageService } from "../core/services/message.service";
import { catchError, tap, throwError } from "rxjs";

@Injectable(
    { providedIn: 'root'}
)
export class PropiedadesService {
   
    private http = inject(HttpClient);
    private messageService = inject(MessageService);
    private apiUrl = `${environment.apiUrl}/api/propiedad`

    getPropiedades() {
        return this.http.get<Propiedad[]>(`${this.apiUrl}/`);
    }

    getPropiedad(id: number) {
        return this.http.get<Propiedad>(`${this.apiUrl}/${id}/`);
    }


    getPropiedadesPorPropietario(propietarioId: number) {
        return this.http.get<Propiedad[]>(`${this.apiUrl}/?propietario=${propietarioId}`);
    }

    crearPropiedad(propiedadForm: PropiedadForm) {
        return this.http.post<Propiedad>(`${this.apiUrl}/`, propiedadForm).pipe(
            tap(() => {
                this.messageService.addMessage({
                    details: ['Propiedad registrada exitosamente!'],
                    role: 'success'
                })
            }),
            catchError((error: HttpErrorResponse) => this.handleError(error))
        )
    }

    actualizarPropiedad(propiedadForm: PropiedadForm) {
        return this.http.put<Propiedad>(`${this.apiUrl}/${propiedadForm.id}/`, propiedadForm).pipe(
            tap(() => {
                this.messageService.addMessage({
                    details: ['Propiedad actualizada exitosamente!'],
                    role: 'success'
                })
            }),
            catchError((error: HttpErrorResponse) => this.handleError(error))
        )
    }

    eliminarPropiedad(propiedad: Propiedad) {
       return this.http.delete<void>(`${this.apiUrl}/${propiedad.id}/`).pipe(
        tap(() => {
            this.messageService.addMessage({
                details: ['Propiedad eliminar exitosamente!'],
                role: 'info'
            })
        }),
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