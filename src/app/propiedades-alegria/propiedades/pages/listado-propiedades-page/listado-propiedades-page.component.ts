import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ListadoPropiedadComponent } from '../../components/listado-propiedad/listado-propiedad.component';
import { PropiedadesService } from 'src/app/propiedades-alegria/propiedades/propiedades.service';

@Component({
    selector: 'app-listado-propiedades-page',
    standalone: true,
    imports: [ CommonModule, ListadoPropiedadComponent],
    templateUrl: "./listado-propiedades-page.component.html",
    styleUrls: ['./listado-propiedades-page.component.scss']
})
export class ListadoPropiedadesPageComponent {
    propiedadesService = inject(PropiedadesService);
    router = inject(Router);

    propiedades$ = this.propiedadesService.getPropiedades();

    registrarPropiedad() {
        this.router.navigate(['propiedades', 'registro'])
    }
}
