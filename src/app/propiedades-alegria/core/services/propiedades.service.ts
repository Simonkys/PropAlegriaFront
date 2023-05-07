import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { MessageService } from "primeng/api";
import { BehaviorSubject, Observable, switchMap } from "rxjs";
import { environment } from "src/environments/environment";
import { Propiedad, TipoPropiedad } from "../models/propiedad.model";

@Injectable(
    {
        providedIn: 'root',
    }
)
export class PropiedadesService {
    private http = inject(HttpClient);
    private messageService = inject(MessageService);

    private propiedadesSubject = new BehaviorSubject<Propiedad[]>([]);
    private propiedadesLoaded = false;


    private tipoPropiedadesSubject = new BehaviorSubject<TipoPropiedad[]>([]);
    private tipoPropiedadesLoaded = false;


    getPropiedades(): Observable<Propiedad[]> {
        if (this.propiedadesLoaded) {
            return this.propiedadesSubject.asObservable();
        }

        return this.http
            .get<Propiedad[]>(`${environment.apiUrl}/api/propiedad/`)
            .pipe(
                switchMap((data) => {
                    this.propiedadesSubject.next(data);
                    this.propiedadesLoaded = true;
                    return this.propiedadesSubject;
                })
            );
    }

    getPropiedadById(id: number) {
        return this.http.get<Propiedad>(
            `${environment.apiUrl}/api/propiedad/${id}/`
        );
    }



    getTipoPropiedades(): Observable<TipoPropiedad[]> {
        if (this.tipoPropiedadesLoaded) {
            return this.tipoPropiedadesSubject.asObservable();
        }

        return this.http
            .get<TipoPropiedad[]>(`${environment.apiUrl}/api/tipo_propiedad/`)
            .pipe(
                switchMap((data) => {
                    this.tipoPropiedadesSubject.next(data);
                    this.tipoPropiedadesLoaded = true;
                    return this.tipoPropiedadesSubject;
                })
            );
    }
}