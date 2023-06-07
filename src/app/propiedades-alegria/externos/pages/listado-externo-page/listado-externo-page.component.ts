import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MessagesModule } from 'primeng/messages';
import { finalize  } from 'rxjs';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';

import { ExternoService } from 'src/app/propiedades-alegria/externos/externo.service';
import { Externo } from 'src/app/propiedades-alegria/externos/externo.model';

@Component({
  selector: 'app-listado-externo-page',
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
  templateUrl: './listado-externo-page.component.html',
  styleUrls: ['./listado-externo-page.component.scss']
})
export class ListadoExternoPageComponent implements OnInit {

  router = inject(Router);
  externoService = inject(ExternoService);
  confimService = inject(ConfirmationService);
  
  externos$ =  this.externoService.getExternos()

  cols: { field: string; header: string }[] = [];

  globalFilterFields: string[] = ['rut', 'nombre', 'rol']

  ngOnInit(): void {
        
    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'rut', header: 'Rut' },
      { field: 'contacto', header: "Contacto"},
      { field: 'correo', header: 'Correo' },
      { field: 'rol', header: 'Rol' },
    ];
  }

  editarExterno(externo: Externo) {
    this.router.navigate(['externos', externo.id, 'actualizar'])
  }

  eliminarExterno(event: Event, externo: Externo) {
    this.confimService.confirm({
      target: event.target || new EventTarget(),
      message: `¿Estas segur@ de eliminar a ${externo.nombre}`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.externoService
            .eliminarExterno(externo)
            .pipe(finalize(() => {}))
            .subscribe();
      },
    });
  }

  detalleExterno(externo: Externo) {
    this.router.navigate(['externos', externo.id, 'detalle'])
  }

  goToRegistroExterno() {
    this.router.navigate(['externos/registro']);
  }

  clear(table: Table) {
    table.clear();
  }

}
