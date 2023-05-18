import { Injectable, inject } from "@angular/core";
import { Propietario, PropietarioForm } from "./propietario.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { catchError, tap, throwError } from "rxjs";
import { MensajeService } from "../core/services/message.service";


@Injectable(
    { providedIn: 'root'}
)
export class PropietarioService {
    private http = inject(HttpClient)
    private messageService = inject(MensajeService)
    private apiUrl = `${environment.apiUrl}/api/propietario`


    getPropietarios() {
        return this.http.get<Propietario[]>(`${this.apiUrl}/`);
    }

    getPropietario(id: number) {
        return this.http.get<Propietario>(`${this.apiUrl}/${id}/`);
    }

    registrarPropietario(propietarioForm: PropietarioForm) {
        return this.http.post<Propietario>(`${this.apiUrl}/`, propietarioForm).pipe(
            tap( () => {
                this.messageService.addMessage({
                    details: ['Propietario registrado exitosamente!'],
                    role: 'success'
                })
            }),
            catchError((err: HttpErrorResponse) => this.handleError(err))
        )
    }

    actualizarPropietario(propietarioForm: PropietarioForm) {
        return this.http.put<Propietario>(`${this.apiUrl}/${propietarioForm.id}/`, propietarioForm).pipe(
            tap( () => {
                this.messageService.addMessage({
                    details: ['Propietario actualizado exitosamente!'],
                    role: 'success'
                })
            }),
            catchError((err: HttpErrorResponse) => this.handleError(err))
        )
    }

    eliminarPropietario(propietario: Propietario) {
        return this.http.delete<void>(`${this.apiUrl}/${propietario.id}/`).pipe(
            tap( () =>{
                this.messageService.addMessage({
                    details: ['Propietario eliminado exitosamente!'],
                    role: 'info'
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