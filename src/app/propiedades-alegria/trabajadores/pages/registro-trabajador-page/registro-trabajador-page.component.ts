import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

import { TrabajadorService } from 'src/app/propiedades-alegria/trabajadores/trabajador.service';
import { TrabajadorFormComponent } from '../../components/trabajador-form/trabajador-form.component';
import { TrabajadorForm } from '../../trabajador.model';


@Component({
    selector: 'app-registro-trabajador-page',
    standalone: true,
    imports: [CommonModule, TrabajadorFormComponent],
    templateUrl: './registro-trabajador-page.component.html',
    styleUrls: ['./registro-trabajador-page.component.scss'],
})
export class RegistroTrabajadorPageComponent {

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
