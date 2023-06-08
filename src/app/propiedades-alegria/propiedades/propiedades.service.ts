import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "src/environments/environment";
import { Propiedad, PropiedadConCodigos, PropiedadForm } from "./propiedad.model";
import { MensajeService } from "../core/services/message.service";
import { BehaviorSubject, catchError, of, tap, throwError } from "rxjs";

@Injectable(
    { providedIn: 'root'}
)
export class PropiedadesService {
   
    private http = inject(HttpClient);
    private messageService = inject(MensajeService);
    private apiUrl = `${environment.apiUrl}/api/propiedad`

    private propiedades = new BehaviorSubject<Propiedad[]>([])
    propiedadesLoaded = false

    private propiedadesConCodigos = new BehaviorSubject<PropiedadConCodigos[]>([])
    propiedadesConCodigosLoaded = false

    getPropiedades() {
        if(this.propiedadesLoaded) {
            return this.propiedades.asObservable();
        } 
        return this.http.get<Propiedad[]>(`${this.apiUrl}/`).pipe(
            tap((propiedades) => {
                this.propiedades.next(propiedades)
                this.propiedadesLoaded = true
            })
        )
    }

    getPropiedad(id: number) {
        return this.http.get<Propiedad>(`${this.apiUrl}/${id}/`);
    }


    getPropiedadesPorPropietario(propietarioId: number) {
        return this.http.get<Propiedad[]>(`${this.apiUrl}/?propietario=${propietarioId}`);
    }

    crearPropiedad(propiedadForm: PropiedadForm) {
        return this.http.post<Propiedad>(`${this.apiUrl}/`, propiedadForm).pipe(
            tap((nuevaPropiedad) => {
                this.messageService.addMessage({
                    details: ['Propiedad registrada exitosamente!'],
                    role: 'success'
                })
                this.propiedades.next([nuevaPropiedad, ...this.propiedades.value])
            }),
            catchError((error: HttpErrorResponse) => this.handleError(error))
        )
    }

    actualizarPropiedad(propiedadForm: PropiedadForm) {
        return this.http.put<Propiedad>(`${this.apiUrl}/${propiedadForm.id}/`, propiedadForm).pipe(
            tap((propiedadActualizada) => {
                this.messageService.addMessage({
                    details: ['Propiedad actualizada exitosamente!'],
                    role: 'success'
                })
                const propiedadesActualizadas = this.propiedades.value.map(propiedad => {
                    if(propiedadActualizada.id === propiedad.id) {
                        return propiedadActualizada
                    } else {
                        return propiedad
                    }
                })
                this.propiedades.next(propiedadesActualizadas)
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

            const propiedadesFiltradas = this.propiedades.value.filter(prop => prop.id !== propiedad.id)
            const propiedadesConCodigosFiltradas = this.propiedadesConCodigos.value.filter(prop => prop.propiedad?.propiedad_id !== propiedad.id)

            this.propiedades.next(propiedadesFiltradas)
            this.propiedadesConCodigos.next(propiedadesConCodigosFiltradas)
        }),
       )
    }

    getPropiedadesConCodigos() {
        if (this.propiedadesConCodigosLoaded)  {
            return this.propiedadesConCodigos.asObservable()
        }
        return this.http.get<PropiedadConCodigos[]>(`${this.apiUrl}/con_codigo/`).pipe(
            tap((propiedades) => {
                this.propiedadesConCodigos.next(propiedades)
                this.propiedadesConCodigosLoaded = true;
            })
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