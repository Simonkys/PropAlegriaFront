import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams, HttpParamsOptions } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Arriendo, ArriendoForm, TablaArriendo } from "./arriendo.model";
import { MensajeService } from "../core/services/message.service";
import { catchError, tap, throwError } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ArriendoService {
    private http = inject(HttpClient)
    private messageService = inject(MensajeService);
    private apiUrl = `${environment.apiUrl}/api/arriendo`


    getArriendos(query: {} = {}) {
        return this.http.get<TablaArriendo[]>(`${this.apiUrl}/`, {params: query});
    }


    getArriendo(id: number) {
        return this.http.get<Arriendo>(`${this.apiUrl}/${id}/`)
    }


    getArriendoByArrendatario(arrendatarioId: number) {
        return this.http.get<TablaArriendo[]>(`${this.apiUrl}/?arrendatario_id=${arrendatarioId}`);
    }

    createArriendo(arriendoForm: ArriendoForm) {
        return this.http.post<Arriendo>(`${this.apiUrl}/`, arriendoForm).pipe(
            tap(() => {
                this.messageService.addMessage({
                    details: ['Arriendo registrado exitosamente!'],
                    role: 'success'
                })
            }),
            catchError((error: HttpErrorResponse) => this.handleError(error))
        )
    }

    eliminarArriendo(arriendo: Arriendo) {
        return this.http.delete(`${this.apiUrl}/${arriendo.id}`).pipe(
            tap(() => {
                this.messageService.addMessage({
                    details: ['Arriendo eliminado exitosamente!'],
                    role: 'warn'
                })
            }),
            catchError((error: HttpErrorResponse) => this.handleError(error))
        )
    }


    private handleError(error: HttpErrorResponse) {
        const msg = JSON.stringify(error.error);
        if (error.status == 400 || error.status == 404) {
            const errores = Object.entries(error.error).map((msg) =>`${msg[0].toUpperCase()}: ${msg[1]}`);
            this.messageService.addMessage({
                details: errores,
                role: 'error',
            });
        }
        return throwError(() => new Error(msg));
    }

}