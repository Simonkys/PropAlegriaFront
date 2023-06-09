import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { DetalleArriendo } from "../models/detalle-arriendo.model";
import { MensajeService } from "./message.service";
import { catchError, tap, throwError } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class DetalleArriendoService {
    private http = inject(HttpClient)
    private messageService = inject(MensajeService);
    
    private apiUrl = `${environment.apiUrl}/api/detalle_arriendo`


    getDetallesArriendo(params: {} = {}) {
        return this.http.get<DetalleArriendo[]>(`${this.apiUrl}/`, { params });
    }

    registrarDetalleArriendo(detalleArriendo: DetalleArriendo) {
        return this.http.put(`${this.apiUrl}/${detalleArriendo.id}/`, detalleArriendo).pipe(
            tap(() => {
                this.messageService.addMessage({
                    details: ['Pago registrado exitosamente!'],
                    role: 'success'
                })
            }),
            catchError((error: HttpErrorResponse) => this.handleError(error))
        )
    }

    


    private handleError(error: HttpErrorResponse) {
        const msg = JSON.stringify(error.error);
        if (error.status == 400 || error.status === 404)  {
            const errores = Object.entries(error.error).map((msg) =>`${msg[0].toUpperCase()}: ${msg[1]}`);
            this.messageService.addMessage({
                details: errores,
                role: 'error',
            });
        }
        return throwError(() => new Error(msg));
    }

    
}