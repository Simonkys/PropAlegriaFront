import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comuna, Region } from '../models/ubicaciones.model';
import { map, of, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UbicacionService {
    private http = inject(HttpClient);

    regiones: Region[] = []
    regionesLoaded = false

    comunas: Comuna[] = []

    getRegiones() {
        if(this.regionesLoaded) {
            return of(this.regiones)
        } else {
            return this.http.get<Region[]>(`${environment.apiUrl}/api/regiones/`).pipe(
                map(regiones => regiones.sort((a, b) => (a.orden - b.orden) )),
                tap((regiones => {
                    this.regiones = regiones
                    this.regionesLoaded = true
                }))
            )
        }
    }

    getComunasByRegion(regionId: number) {
        const comunasPorRegion = this.comunas.filter(c => c.reg_id.id === regionId)
        if (comunasPorRegion.length === 0) {
            return this.http.get<Comuna[]>(`${environment.apiUrl}/api/comunas/?reg_id=${regionId}`).pipe(
                tap(comunas => {
                    this.comunas = [...comunas, ...this.comunas]
                })
            );
        } else {
            return of(comunasPorRegion)
        }
    }

    getComunaById(comunaId: number) {
        const comuna = this.comunas.find(c => c.id === comunaId);
        if (!comuna) {
            return this.http.get<Comuna>(`${environment.apiUrl}/api/comunas/${comunaId}`)
        } else {
            return of(comuna)
        }
    }

}
