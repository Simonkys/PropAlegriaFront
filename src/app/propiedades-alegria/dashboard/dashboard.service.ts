import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { MensajeService } from "../core/services/message.service";
import { environment } from "src/environments/environment";
import { DashboardMetrics } from "./dashboard.model";


@Injectable({
    providedIn: 'root',
})
export class DashboardService {

    private http = inject(HttpClient)
    private messageService = inject(MensajeService)
    private apiUrl = `${environment.apiUrl}/api/dashboard`

    getDashboardMetrics() {
        return this.http.get<DashboardMetrics>(`${this.apiUrl}/info/`);
    }
}