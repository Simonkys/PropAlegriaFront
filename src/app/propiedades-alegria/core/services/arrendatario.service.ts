import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Arrendatario } from "../models/arrendatario.model";


@Injectable(
    { providedIn: 'root'}
)
export class ArrendatarioService {
    private http = inject(HttpClient)
    private apiUrl = `${environment.apiUrl}/api/arrendatario/`


    getArrendatarios() {
        return this.http.get<Arrendatario[]>(this.apiUrl);
    }
}