import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { finalize, map, switchMap } from 'rxjs';
import { TrabajadorService } from 'src/app/propiedades-alegria/trabajadores/trabajador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TrabajadorFormComponent } from '../trabajador-form/trabajador-form.component';
import { Trabajador } from '../trabajador.model';


@Component({
    selector: 'app-actualizar-trabajador',
    standalone: true,
    imports: [
        CommonModule,
        MessagesModule,
        TrabajadorFormComponent
    ],
    templateUrl: './actualizar-trabajador.component.html',
    styleUrls: ['./actualizar-trabajador.component.scss'],
})
export class ActualizarTrabajadorComponent {

    trabajadorService = inject(TrabajadorService);
    router = inject(Router);
    route = inject(ActivatedRoute)

    messages: Message[] = [];
    loading = false;

    trabajador$ = this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => this.trabajadorService.getTrabajadorById(id))
    )

    cancelar() {
        this.router.navigate(['trabajadores/listado']);
    }

    guardarTrabajador(trabajador: Trabajador) {
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
                error: (err) => {
                    this.messages = [
                        {
                            severity: 'error',
                            summary: 'Error',
                            detail: JSON.stringify(err.error),
                        },
                    ];
                },
            });
    }
}
