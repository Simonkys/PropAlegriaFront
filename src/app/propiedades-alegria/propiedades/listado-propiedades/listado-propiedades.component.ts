import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropiedadesService } from '../../core/services/propiedades.service';
import { ListadoPropiedadComponent } from '../../componentes/listado-propiedad/listado-propiedad.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-listado-propiedades',
    standalone: true,
    imports: [
        CommonModule, 
        ListadoPropiedadComponent,
    ],
    template: `
        <div class="card" >
            <h4>Propiedades</h4>
            <app-listado-propiedad
                *ngIf="propiedades$ | async as propiedades"
                [propiedades]="propiedades"
                (crearActionEvent)="crearPropiedad()"
            />
        </div>
`
})
export class ListadoPropiedadesComponent {
    propiedadesService = inject(PropiedadesService);
    router = inject(Router);

    propiedades$ = this.propiedadesService.getPropiedades();

    crearPropiedad() {
        this.router.navigate(['propiedades', 'registro'])
    }
}
