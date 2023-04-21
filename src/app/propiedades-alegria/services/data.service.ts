import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comuna, Region } from '../interfaces/locaciones.models';
import { Banco, TipoCuenta } from '../interfaces/banco.models';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private http = inject(HttpClient);

    getRegiones() {
        return this.http.get<Region[]>(`${environment.apiUrl}/api/regiones/`).pipe(map(regiones => regiones.sort((a, b) => (a.orden - b.orden) )))
    }

    getComunasByRegion(regionId: number) {
        return this.http.get<Comuna[]>(`${environment.apiUrl}/api/comunas/${regionId}`);
    }

    getBancos() {
        return this.http.get<Banco[]>(`${environment.apiUrl}/api/bancos/`);
    }

    getTipoCuentasBanco() {
        return this.http.get<TipoCuenta[]>(`${environment.apiUrl}/api/tipo_cuentas_banco/`);
    }
}
