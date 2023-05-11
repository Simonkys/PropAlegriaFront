import { Injectable, inject } from "@angular/core";
import { Propietario, PropietarioForm } from "../models/propietario.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { catchError, throwError } from "rxjs";
import { MessageService } from "./message.service";


@Injectable(
    { providedIn: 'root'}
)
export class PropietarioService {
    private http = inject(HttpClient)
    private messageService = inject(MessageService)
    private apiUrl = `${environment.apiUrl}/api/propietario`


    getPropietarios() {
        return this.http.get<Propietario[]>(`${this.apiUrl}/`);
    }

    getPropietario(id: number) {
        return this.http.get<Propietario>(`${this.apiUrl}/${id}/`);
    }

    createPropietario(propietario: PropietarioForm) {
        return this.http.post<Propietario>(`${this.apiUrl}/`, propietario).pipe(
            catchError((err: HttpErrorResponse) => this.handleError(err))
        )
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