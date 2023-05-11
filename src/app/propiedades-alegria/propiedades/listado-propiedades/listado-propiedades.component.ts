import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Propiedad } from 'src/app/propiedades-alegria/core/models/propiedad.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PropiedadesService } from '../../core/services/propiedades.service';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-listado-propiedades',
    standalone: true,
    imports: [CommonModule, RouterLink, TableModule, ButtonModule],
    templateUrl: './listado-propiedades.component.html',
    styleUrls: ['./listado-propiedades.component.scss'],
})
export class ListadoPropiedadesComponent {
    propiedadesService = inject(PropiedadesService);
    router = inject(Router);

    propiedades$ = this.propiedadesService.getPropiedades();


    detail(propiedad: Propiedad) {
        this.router.navigate(['propiedades', propiedad.id, 'detalle']);
    }
}
