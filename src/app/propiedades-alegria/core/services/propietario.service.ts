import { Injectable, inject } from "@angular/core";
import { Propietario } from "../models/propietario.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";


@Injectable(
    { providedIn: 'root'}
)
export class PropietarioService {
    private http = inject(HttpClient)
    private apiUrl = `${environment.apiUrl}/api/propietario`


    getPropietarios() {
        return this.http.get<Propietario[]>(`${this.apiUrl}/`);
    }

    getPropietario(id: number) {
        return this.http.get<Propietario>(`${this.apiUrl}/${id}/`);
    }
}