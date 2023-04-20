import { Injectable, inject } from '@angular/core';
import { Trabajador } from './trabajador.model';
import { HttpClient } from '@angular/common/http';
import { TipoTrabajador } from '../interfaces/tipo-trabajador.models';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

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

    crearTrabajador(trabajador: Trabajador) {
        return this.http.post<Trabajador>(
            `${environment.apiUrl}/api/trabajador/`,
            trabajador
        );
    }

    eliminarTrabajador(trabajador: Trabajador) {
        return this.http.delete( `${environment.apiUrl}/api/trabajador/${trabajador.rut_trab}`)
    }

    getTipoDeTrabajadores() {
        return this.http.get<TipoTrabajador[]>(
            `${environment.apiUrl}/api/tipo_trabajador/`
        );
    }
}
