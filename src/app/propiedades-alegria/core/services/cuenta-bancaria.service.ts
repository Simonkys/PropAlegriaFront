import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CuentaBancaria } from '../models/cuenta-bancaria.models';

@Injectable({
    providedIn: 'root',
})
export class CuentaBancariaService {
    private http = inject(HttpClient);

    private apiUrl = `${environment.apiUrl}/api/cuenta`

    getCuentasBancarias() {
        return this.http.get<CuentaBancaria[]>(`${this.apiUrl}/`);
    }

    getCuentasBancariasByRut(rut: string) {
        return this.http.get<CuentaBancaria[]>(`${this.apiUrl}/?propietario_rut=${rut}`);
    }

}
