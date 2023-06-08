import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "src/environments/environment";
import { TipoPropiedad } from "../models/tipo-propiedad.model";
import { BehaviorSubject, tap } from "rxjs";


@Injectable(
    {
        providedIn: 'root',
    }
)
export class TipoPropiedadesService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/api/tipo_propiedad/`

    private tipoPropiedades = new BehaviorSubject<TipoPropiedad[]>([])
    private loaded = false;

    getTipoPropiedades() {
        if(this.loaded) {
            return this.tipoPropiedades.asObservable();
        }
        return this.http.get<TipoPropiedad[]>(this.apiUrl).pipe(
            tap((data) => {
                this.tipoPropiedades.next(data)
                this.loaded = true;
            })
        )
    }

    getTipoPropiedad(id:number){
        return this.http.get<TipoPropiedad>(`${this.apiUrl}${id}/`);
    }

}
