import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Arriendo, ArriendoForm } from "./arriendo.model";


@Injectable({
    providedIn: 'root'
})
export class ArriendoService {
    private http = inject(HttpClient)
    private apiUrl = `${environment.apiUrl}/api/arriendo`


    getArriendos() {
        return this.http.get<Arriendo[]>(`${this.apiUrl}/`);
    }

    createArriendo(arriendoForm: ArriendoForm) {
        return this.http.post<Arriendo>(`${this.apiUrl}/`, arriendoForm)
    }
}