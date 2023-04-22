import { Injectable, inject } from '@angular/core';
import { TipoTrabajador, Trabajador } from './trabajador.model';
import { HttpClient } from '@angular/common/http';
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

    crearTrabajador(trabajador: Trabajador) {
        return this.http.post<Trabajador>(
            `${environment.apiUrl}/api/trabajador/`,
            trabajador
        );
    }

    eliminarTrabajador(trabajador: Trabajador) {
        return this.http.delete( `${environment.apiUrl}/api/trabajador/${trabajador.id}/`)
    }

    getTipoDeTrabajadores() {
        return this.http.get<TipoTrabajador[]>(
            `${environment.apiUrl}/api/tipo_trabajador/`
        );
    }
}
