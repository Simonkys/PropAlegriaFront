import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

import { TrabajadorService } from 'src/app/propiedades-alegria/core/services/trabajador.service';
import { TrabajadorFormComponent } from '../trabajador-form/trabajador-form.component';
import { TrabajadorForm } from '../../core/models/trabajador.model';


@Component({
    selector: 'app-registro-trabajador',
    standalone: true,
    imports: [CommonModule, TrabajadorFormComponent],
    templateUrl: './registro-trabajador.component.html',
    styleUrls: ['./registro-trabajador.component.scss'],
})
export class RegistroTrabajadorComponent {

    trabajadorService = inject(TrabajadorService);

    location = inject(Location);

    submit(trabajadorForm: TrabajadorForm) {
        this.trabajadorService.crearTrabajador(trabajadorForm)
            .pipe()
            .subscribe(() => this.location.back())
    }

    cancelar() {
        this.location.back()
    }
}
