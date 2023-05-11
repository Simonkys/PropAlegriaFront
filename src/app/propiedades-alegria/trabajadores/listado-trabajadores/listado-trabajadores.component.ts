import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { TrabajadorService } from 'src/app/propiedades-alegria/core/services/trabajador.service';
import { Trabajador } from 'src/app/propiedades-alegria/core/models/trabajador.model';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MessagesModule } from 'primeng/messages';
import { finalize  } from 'rxjs';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-listado-trabajadores',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ToolbarModule,
        ButtonModule,
        TableModule,
        InputTextModule,
        ConfirmPopupModule,
        MessagesModule,
        MultiSelectModule,
    ],
    providers: [ConfirmationService],
    templateUrl: './listado-trabajadores.component.html',
    styleUrls: ['./listado-trabajadores.component.scss'],
})
export class ListadoTrabajadoresComponent implements OnInit {

    router = inject(Router);
    trabajadorService = inject(TrabajadorService);
    confimService = inject(ConfirmationService);
    
    trabajadores$ =  this.trabajadorService.getTrabajadores()

    cols: { field: string; header: string }[] = [];

    ngOnInit(): void {
        
        this.cols = [
            { field: 'rut_trab', header: 'Rut' },
            { field: 'pri_nom_trab', header: 'Nombre' },
            { field: 'pri_ape_trab', header: "Apellido"},
            { field: 'tipo_trab', header: 'Tipo Trabajador' },
            { field: 'celular', header: 'Celular' },
        ];
    }

    editarTrabajador(trabajador: Trabajador) {
        this.router.navigate(['trabajadores', trabajador.id, 'actualizar'])
    }

    eliminarTrabajador(event: Event, trabajador: Trabajador) {
        this.confimService.confirm({
            target: event.target || new EventTarget(),
            message: `¿Estas segur@ de eliminar a ${trabajador.pri_nom_trab}`,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.trabajadorService
                    .eliminarTrabajador(trabajador.id!)
                    .pipe(finalize(() => {}))
                    .subscribe();
            },
        });
    }

    detalleTrabajador(trabajador: Trabajador) {
        this.router.navigate(['trabajadores', trabajador.id,'detalle'])
    }

    goToRegistroTrabajador() {
        this.router.navigate(['trabajadores/registro']);
    }

    clear(table: Table) {
        table.clear();
    }
}
