import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "src/environments/environment";
import { Propiedad } from "../models/propiedad.model";

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

}