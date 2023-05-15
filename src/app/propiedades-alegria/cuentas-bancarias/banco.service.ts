import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Banco, TipoCuenta } from "./banco.model";

@Injectable(
    { providedIn: 'root'}
)
export class BancoService {
    private http = inject(HttpClient)

    private apiUrl = `${environment.apiUrl}/api`

    getBancos() {
        return this.http.get<Banco[]>(`${this.apiUrl}/bancos/`);
    }

    getTipoCuentasBanco() {
        return this.http.get<TipoCuenta[]>(`${this.apiUrl}/tipo_cuentas_bancos/`);
    }
}