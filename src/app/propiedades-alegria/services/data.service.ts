import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comuna, Region } from '../models/locaciones.models';
import { Banco, TipoCuenta } from '../models/banco.models';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private http = inject(HttpClient);

    getRegiones() {
        return this.http.get<Region[]>(`${environment.apiUrl}/api/regiones/`);
    }

    getComunasByRegion(regionId: number) {
        return this.http.get<Comuna[]>(
            `${environment.apiUrl}/api/comunas/${regionId}`
        );
    }

    getBancos() {
        return this.http.get<Banco[]>(`${environment.apiUrl}/api/bancos/`);
    }

    getTipoCuentasBanco() {
        return this.http.get<TipoCuenta[]>(
            `${environment.apiUrl}/api/tipo_cuentas_bancos/`
        );
    }
}
