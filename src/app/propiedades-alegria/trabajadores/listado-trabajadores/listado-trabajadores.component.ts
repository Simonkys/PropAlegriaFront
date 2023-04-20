import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TrabajadorService } from 'src/app/propiedades-alegria/trabajadores/trabajador.service';
import { Trabajador } from 'src/app/propiedades-alegria/trabajadores/trabajador.model';
import { ConfirmationService, Message } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MessagesModule } from 'primeng/messages';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-listado-trabajadores',
    standalone: true,
    imports: [
        CommonModule,
        ToolbarModule,
        ButtonModule,
        TableModule,
        InputTextModule,
        ConfirmPopupModule,
        MessagesModule,
    ],
    providers: [ConfirmationService],
    templateUrl: './listado-trabajadores.component.html',
    styleUrls: ['./listado-trabajadores.component.scss'],
})
export class ListadoTrabajadoresComponent implements OnInit {
    router = inject(Router);
    trabajadorService = inject(TrabajadorService);
    confimService = inject(ConfirmationService);

    messages: Message[] = [];
    trabajadores: Trabajador[] = [];
    cols: { field: string; header: string }[] = [];

    ngOnInit(): void {
        this.trabajadorService.getTrabajadores().subscribe((trabajadores) => {
            this.trabajadores = trabajadores;
        });

        this.cols = [
            { field: 'rut_trab', header: 'Rut' },
            { field: 'pri_nom_trab', header: 'Nombre' },
            { field: 'celular', header: 'Celular' },
        ];
    }

    editarTrabajador(trabajador: Trabajador) {}

    eliminarTrabajador(event: Event, trabajador: Trabajador) {
        this.confimService.confirm({
            target: event.target || new EventTarget(),
            message: `¿Estas segur@ de eliminar a ${trabajador.pri_nom_trab}`,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.trabajadorService
                    .eliminarTrabajador(trabajador)
                    .pipe(finalize(() => {}))
                    .subscribe({
                        next: () => {
                            this.messages = [
                                {
                                    severity: 'success',
                                    summary: 'Operación exitosa',
                                    detail: 'Trabajador eliminado',
                                },
                            ];
                        },
                        error: () => {
                            this.messages = [
                                {
                                    severity: 'error',
                                    summary: 'Error',
                                    detail: 'La operación no puedo concretarse',
                                },
                            ];
                        },
                    });
            },
        });
    }

    verTrabajador(trabajador: Trabajador) {}

    goToRegistroTrabajador() {
        this.router.navigate(['trabajadores/registro']);
    }
}
