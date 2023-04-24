import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Banco, TipoCuenta } from './cuentas-bancarias.models';

@Injectable({
    providedIn: 'root',
})
export class BancoService {
    private http = inject(HttpClient);

    getBancos() {
        return this.http.get<Banco[]>(`${environment.apiUrl}/api/bancos/`);
    }

    getTipoCuentasBanco() {
        return this.http.get<TipoCuenta[]>(`${environment.apiUrl}/api/tipo_cuentas_banco/`);
    }
}
