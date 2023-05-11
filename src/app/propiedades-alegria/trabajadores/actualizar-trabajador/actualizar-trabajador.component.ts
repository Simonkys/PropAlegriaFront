import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize, map, switchMap } from 'rxjs';
import { TrabajadorService } from 'src/app/propiedades-alegria/core/services/trabajador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TrabajadorFormComponent } from '../trabajador-form/trabajador-form.component';
import { TrabajadorForm } from '../../core/models/trabajador.model';
import { MessageService } from '../../core/services/message.service';


@Component({
    selector: 'app-actualizar-trabajador',
    standalone: true,
    imports: [
        CommonModule,
        TrabajadorFormComponent
    ],
    templateUrl: './actualizar-trabajador.component.html',
    styleUrls: ['./actualizar-trabajador.component.scss'],
})
export class ActualizarTrabajadorComponent {

    trabajadorService = inject(TrabajadorService);
    messageService = inject(MessageService)
    router = inject(Router);
    route = inject(ActivatedRoute)

    loading = false;

    trabajador$ = this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => this.trabajadorService.getTrabajadorById(id))
    )

    cancelar() {
        this.router.navigate(['trabajadores/listado']);
    }

    guardarTrabajador(trabajador: TrabajadorForm) {
        this.loading = true;
        this.trabajadorService
            .actualizarTrabajador(trabajador)
            .pipe(
                finalize(() => {
                    window.scrollTo(0, 0);
                    this.loading = false;
                })
            )
            .subscribe({
                next: (res) => {
                    this.router.navigate(['trabajadores/listado'])
                },
                error: (err) => {},
            });
    }
}
