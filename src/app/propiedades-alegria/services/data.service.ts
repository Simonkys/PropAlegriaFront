import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comuna, Region } from '../interfaces/locaciones.models';
import { Banco, TipoCuenta } from '../interfaces/banco.models';
import { HttpApiService } from './http-api.service';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private httpApi = inject(HttpApiService);

    getRegiones() {
        return this.httpApi.get<Region[]>('regiones');
    }

    getComunasByRegion(regionId: number) {
        return this.httpApi.getById<Comuna[]>('comunas', regionId);
    }

    getBancos() {
        return this.httpApi.get<Banco[]>('bancos');
    }

    getTipoCuentasBanco() {
        return this.httpApi.get<TipoCuenta[]>(`tipo_cuentas_bancos`);
    }
}
