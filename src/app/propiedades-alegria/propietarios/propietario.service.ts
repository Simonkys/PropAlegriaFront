import { Injectable, inject } from "@angular/core";
import { Propietario, PropietarioForm } from "./propietario.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { catchError, of, tap, throwError } from "rxjs";
import { MensajeService } from "../core/services/message.service";


@Injectable(
    { providedIn: 'root'}
)
export class PropietarioService {
    private http = inject(HttpClient)
    private messageService = inject(MensajeService)
    private apiUrl = `${environment.apiUrl}/api/propietario`

    propietarios: Propietario[] = [] 
    propietariosLoaded = false


    getPropietarios() {
        if(this.propietariosLoaded) {
            return of(this.propietarios)
        }
        return this.http.get<Propietario[]>(`${this.apiUrl}/`).pipe(
            tap((propietarios => {
                this.propietarios = propietarios
                this.propietariosLoaded = true
            }))
        );
    }

    getPropietario(id: number) {
        return this.http.get<Propietario>(`${this.apiUrl}/${id}/`);
    }

    registrarPropietario(propietarioForm: PropietarioForm) {
        return this.http.post<Propietario>(`${this.apiUrl}/`, propietarioForm).pipe(
            tap( (nuevoPropietario) => {
                this.messageService.addMessage({
                    details: ['Propietario registrado exitosamente!'],
                    role: 'success'
                })
                this.propietarios = [nuevoPropietario, ...this.propietarios]
            }),
            catchError((err: HttpErrorResponse) => this.handleError(err))
        )
    }

    actualizarPropietario(propietarioForm: PropietarioForm) {
        return this.http.put<Propietario>(`${this.apiUrl}/${propietarioForm.id}/`, propietarioForm).pipe(
            tap( (propietarioActualizado) => {
                this.messageService.addMessage({
                    details: ['Propietario actualizado exitosamente!'],
                    role: 'success'
                })
                this.propietarios = this.propietarios.map(p => {
                    if(p.id === propietarioActualizado.id) {
                        return propietarioActualizado
                    } else {
                        return p
                    }
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
                this.propietarios = this.propietarios.filter(p => p.id !== propietario.id)

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