import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';

import { TrabajadorService } from 'src/app/propiedades-alegria/trabajadores/trabajador.service';
import { TrabajadorFormComponent } from '../../components/trabajador-form/trabajador-form.component';
import { TrabajadorForm } from '../../trabajador.model';


@Component({
    selector: 'app-actualizar-trabajador-page',
    standalone: true,
    imports: [CommonModule, TrabajadorFormComponent],
    templateUrl: './actualizar-trabajador-page.component.html',
    styleUrls: ['./actualizar-trabajador-page.component.scss'],
})
export class ActualizarTrabajadorPageComponent {

    trabajadorService = inject(TrabajadorService)
    location = inject(Location)
    route = inject(ActivatedRoute)

    trabajador$ = this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => this.trabajadorService.getTrabajadorById(id))
    )

    submit(trabajadorForm: TrabajadorForm) {
        this.trabajadorService.actualizarTrabajador(trabajadorForm)
            .pipe()
            .subscribe(() => this.location.back());
    }

    cancelar() {
        this.location.back()
    }
}
