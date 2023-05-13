import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropiedadesService } from '../../core/services/propiedades.service';
import { ListadoPropiedadComponent } from '../../componentes/listado-propiedad/listado-propiedad.component';

@Component({
    selector: 'app-listado-propiedades',
    standalone: true,
    imports: [
        CommonModule, 
        ListadoPropiedadComponent,
    ],
    template: `
        <div class="card" >
            <app-listado-propiedad
                *ngIf="propiedades$ | async as propiedades"
                [propiedades]="propiedades"
            />
        </div>
`
})
export class ListadoPropiedadesComponent {
    propiedadesService = inject(PropiedadesService);
    propiedades$ = this.propiedadesService.getPropiedades();
}
