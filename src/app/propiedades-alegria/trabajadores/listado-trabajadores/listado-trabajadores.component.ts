import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { TrabajadorService } from 'src/app/propiedades-alegria/trabajadores/trabajador.service';
import { Trabajador, TrabajadorConTipo } from 'src/app/propiedades-alegria/trabajadores/trabajador.model';
import { ConfirmationService, Message } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MessagesModule } from 'primeng/messages';
import { finalize  } from 'rxjs';
import { MultiSelectModule } from 'primeng/multiselect';
import { MessageService } from '../../services/message.service';

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
        MultiSelectModule
    ],
    providers: [ConfirmationService],
    templateUrl: './listado-trabajadores.component.html',
    styleUrls: ['./listado-trabajadores.component.scss'],
})
export class ListadoTrabajadoresComponent implements OnInit {
    router = inject(Router);
    trabajadorService = inject(TrabajadorService);
    confimService = inject(ConfirmationService);
    messageService = inject(MessageService)

    messages: Message[] = [];
    trabajadores$ =  this.trabajadorService.getTrabajadoresConTipo()
    tipoTrabajadores$ = this.trabajadorService.getTipoDeTrabajadores()
    cols: { field: string; header: string }[] = [];

    ngOnInit(): void {
        
        this.cols = [
            { field: 'rut_trab', header: 'Rut' },
            { field: 'pri_nom_trab', header: 'Nombre' },
            { field: 'pri_ape_trab', header: "Apellido"},
            { field: 'tipo_trabajador', header: 'Tipo Trabajador' },
            { field: 'celular', header: 'Celular' },
        ];
    }

    editarTrabajador(trabajador: TrabajadorConTipo) {
        this.router.navigate(['trabajadores', trabajador.id, 'actualizar'])
    }

    eliminarTrabajador(event: Event, trabajador: TrabajadorConTipo) {
        this.confimService.confirm({
            target: event.target || new EventTarget(),
            message: `¿Estas segur@ de eliminar a ${trabajador.pri_nom_trab}`,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.trabajadorService
                    .eliminarTrabajador(trabajador.id!)
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

    verTrabajador(trabajador: Trabajador) {
        this.messageService.addMessage({details: 'Exito', 'role': 'success'})
    }

    goToRegistroTrabajador() {
        this.router.navigate(['trabajadores/registro']);
    }

    clear(table: Table) {
        table.clear();
    }
}
