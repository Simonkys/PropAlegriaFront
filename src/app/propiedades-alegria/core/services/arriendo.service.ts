import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Arriendo } from "../models/arriendo.model";

export class ArriendoService {
    private http = inject(HttpClient)
    private apiUrl = `${environment.apiUrl}/api/arriendo/`


    getArriendos() {
        return this.http.get<Arriendo>(this.apiUrl);
    }
}