import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Banco, TipoCuenta } from "../models/banco.model";

@Injectable(
    { providedIn: 'root'}
)
export class BancoService {
    private http = inject(HttpClient)

    getBancos() {
        return this.http.get<Banco[]>(`${environment.apiUrl}/api/bancos/`);
    }

    getTipoCuentasBanco() {
        return this.http.get<TipoCuenta[]>(`${environment.apiUrl}/api/tipo_cuentas_bancos/`);
    }
}