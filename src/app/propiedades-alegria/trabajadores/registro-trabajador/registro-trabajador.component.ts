import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { TrabajadorService } from 'src/app/propiedades-alegria/trabajadores/trabajador.service';
import { Router } from '@angular/router';
import { TrabajadorFormComponent } from '../trabajador-form/trabajador-form.component';
import { Trabajador } from '../trabajador.model';

@Component({
    selector: 'app-registro-trabajador',
    standalone: true,
    imports: [CommonModule, TrabajadorFormComponent],
    templateUrl: './registro-trabajador.component.html',
    styleUrls: ['./registro-trabajador.component.scss'],
})
export class RegistroTrabajadorComponent {
    trabajadorService = inject(TrabajadorService);
    router = inject(Router);
    loading = false;

    ngOnInit(): void {}

    cancelar() {
        this.router.navigate(['trabajadores/listado']);
    }

    guardarTrabajador(trabajador: Trabajador) {
        this.loading = true;
        this.trabajadorService
            .crearTrabajador(trabajador)
            .pipe(
                finalize(() => {
                    window.scrollTo(0, 0);
                    this.loading = false;
                })
            )
            .subscribe({
                next: (res) => {
                    this.router.navigate(['trabajadores/listado']);
                },
                error: (err) => {},
            });
    }
}
