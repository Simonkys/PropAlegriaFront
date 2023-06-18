import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
})
export class ReporteeService {

    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/api/reportes`;

    getReporteArriendos(queryParams: {} = {}) {
        const headers = {'Content-type' : 'application/pdf'};

        return this.http.get(`${this.apiUrl}/`, {headers: headers, responseType: 'arraybuffer', params: queryParams},)
    }

}