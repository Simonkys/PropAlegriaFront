import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Arrendatario, ArrendatarioArriendo, ArrendatarioForm } from "./arrendatario.model";
import { catchError, map, tap, throwError } from "rxjs";
import { MensajeService } from "../core/services/message.service";


@Injectable(
    { providedIn: 'root'}
)
export class ArrendatarioService {
    private http = inject(HttpClient)
    private messageService = inject(MensajeService)
    private apiUrl = `${environment.apiUrl}/api/arrendatario`



    getArrendatarioArriendo(id: number) {
        return this.http.get<ArrendatarioArriendo>(`${this.apiUrl}/${id}/detalle/`);
    }

    getArrendatarios() {
        return this.http.get<Arrendatario[]>(`${this.apiUrl}/`);
    }

    getArrendatario(id: number) {
        return this.http.get<Arrendatario>(`${this.apiUrl}/${id}/`);
    }

    registrarArrendatario(arrendatarioForm: ArrendatarioForm) {
        return this.http.post<Arrendatario>(`${this.apiUrl}/`, arrendatarioForm).pipe(
            tap(() => {
                this.messageService.addMessage({
                    details: ['Arrendatario registrado exitosamente!'],
                    role: 'success'
                })
            }),
            catchError((err: HttpErrorResponse) => this.handleError(err))
        )
    }

    actualizarArrendatario(arrendatarioForm: ArrendatarioForm) {
        return this.http.put<Arrendatario>(`${this.apiUrl}/${arrendatarioForm.id}/`, arrendatarioForm).pipe(
            tap(() => {
                this.messageService.addMessage({
                    details: ['Arrendatario actualizado exitosamente!'],
                    role: 'success'
                })
            }),
            catchError((err: HttpErrorResponse) => this.handleError(err))
        )
    }


    eliminarArrendatario(arrendatario: Arrendatario) {
        return this.http.delete(`${this.apiUrl}/${arrendatario.id}/`).pipe(
            tap( () =>{
                this.messageService.addMessage({
                    details: ['Arrendatario eliminado exitosamente!'],
                    role: 'warn'
                })
            }),
            catchError((err: HttpErrorResponse) => this.handleError(err))
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