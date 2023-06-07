import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PropiedadesService } from 'src/app/propiedades-alegria/propiedades/propiedades.service';
import { ListadoPropiedadesCodigoComponent } from '../../components/listado-propiedades-codigo/listado-propiedades-codigo.component';

@Component({
    selector: 'app-listado-propiedades-page',
    standalone: true,
    imports: [ CommonModule, ListadoPropiedadesCodigoComponent],
    templateUrl: "./listado-propiedades-page.component.html",
    styleUrls: ['./listado-propiedades-page.component.scss']
})
export class ListadoPropiedadesPageComponent {
    propiedadesService = inject(PropiedadesService);
    router = inject(Router);

    propiedades$ = this.propiedadesService.getPropiedadesConCodigos();


}
