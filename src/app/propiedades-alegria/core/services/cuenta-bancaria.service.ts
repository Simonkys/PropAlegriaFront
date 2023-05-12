import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CuentaBancaria, CuentaBancariaForm } from '../models/cuenta-bancaria.models';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CuentaBancariaService {
    private http = inject(HttpClient);

    private apiUrl = `${environment.apiUrl}/api/cuenta`

    getCuentasBancarias(): Observable<CuentaBancaria[]> {
        return this.http.get<CuentaBancaria[]>(`${this.apiUrl}/`);
    }

    getCuentasBancariasByRut(rut: string): Observable<CuentaBancaria[]> {
        return this.http.get<CuentaBancaria[]>(`${this.apiUrl}/?propietario_rut=${rut}`);
    }

    createCuentaBancaria(cuentaBancaria: CuentaBancariaForm): Observable<CuentaBancaria> {
        return this.http.post<CuentaBancaria>(`${this.apiUrl}/`, cuentaBancaria);
    }

    eliminarCuentaBancaria(cuentaBancaria: CuentaBancaria) {
        return this.http.delete(`${this.apiUrl}/${cuentaBancaria.id}/`);
    }
 
}
