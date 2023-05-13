import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "src/environments/environment";
import { Propiedad, PropiedadForm } from "../models/propiedad.model";

@Injectable(
    { providedIn: 'root'}
)
export class PropiedadesService {
    private http = inject(HttpClient);
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
        return this.http.post<Propiedad>(`${this.apiUrl}/`, propiedadForm)
    }

}