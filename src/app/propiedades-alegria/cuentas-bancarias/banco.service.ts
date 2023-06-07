import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Banco, TipoCuenta } from "./banco.model";
import { distinctUntilChanged, of, shareReplay, tap } from "rxjs";

@Injectable(
    { providedIn: 'root'}
)
export class BancoService {
    private http = inject(HttpClient)

    private apiUrl = `${environment.apiUrl}/api`

    private bancos: Banco[] = [];
    private tipoCuentas: TipoCuenta[] = [];

    private bancosLoaded = false;
    private tipoCuentasLoaded = false;

    getBancos() {
        if(this.bancosLoaded) {
            return of(this.bancos);
        }
        return this.http.get<Banco[]>(`${this.apiUrl}/bancos/`).pipe(
            tap((bancos) => {
                this.bancos = bancos
                this.bancosLoaded = true
            })
        )
    }

    getTipoCuentasBanco() {
        if(this.tipoCuentasLoaded) {
            return of(this.tipoCuentas)
        }
        return this.http.get<TipoCuenta[]>(`${this.apiUrl}/tipo_cuentas_bancos/`).pipe(
            tap((tipoCuentas) => {
                this.tipoCuentas = tipoCuentas
                this.tipoCuentasLoaded = true
            })
        )
    }
}