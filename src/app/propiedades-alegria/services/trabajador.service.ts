import { Injectable, inject } from '@angular/core';
import { Trabajador } from '../models/trabajador.models';
import { HttpClient } from '@angular/common/http';
import { TipoTrabajador } from '../models/tipo-trabajador.models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TrabajadorService {
    private http = inject(HttpClient);

    getTrabajadores() {
        return this.http.get<Trabajador[]>(
            `${environment.apiUrl}/api/trabajador/`
        );
    }

    getTrabajadorById(id: number) {
        return this.http.get<Trabajador>(
            `${environment.apiUrl}/api/trabajador/${id}`
        );
    }

    createTrabajador(trabajador: Trabajador) {
        return this.http.post<Trabajador>(
            `${environment.apiUrl}/api/trabajador/`,
            trabajador
        );
    }

    getTipoDeTrabajadores() {
        return this.http.get<TipoTrabajador[]>(
            `${environment.apiUrl}/api/tipo_trabajador/`
        );
    }
}
