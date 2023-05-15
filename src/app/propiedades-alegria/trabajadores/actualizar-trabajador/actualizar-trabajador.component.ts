import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { map, switchMap } from 'rxjs';
import { TrabajadorService } from 'src/app/propiedades-alegria/core/services/trabajador.service';
import { ActivatedRoute } from '@angular/router';
import { TrabajadorFormComponent } from '../trabajador-form/trabajador-form.component';
import { TrabajadorForm } from '../../core/models/trabajador.model';


@Component({
    selector: 'app-actualizar-trabajador',
    standalone: true,
    imports: [CommonModule, TrabajadorFormComponent],
    templateUrl: './actualizar-trabajador.component.html',
    styleUrls: ['./actualizar-trabajador.component.scss'],
})
export class ActualizarTrabajadorComponent {

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
