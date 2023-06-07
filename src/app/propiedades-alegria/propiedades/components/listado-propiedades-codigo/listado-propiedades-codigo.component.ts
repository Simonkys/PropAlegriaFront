import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Propiedad, PropiedadConCodigos } from 'src/app/propiedades-alegria/propiedades/propiedad.model';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-listado-propiedades-codigo',
  standalone: true,
  imports: [CommonModule, TableModule, RouterLink, ButtonModule, InputTextModule],
  templateUrl: './listado-propiedades-codigo.component.html',
  styleUrls: ['./listado-propiedades-codigo.component.scss']
})
export class ListadoPropiedadesCodigoComponent {
  @Input() propiedadesCod: PropiedadConCodigos[] = []

  @Output() detalleActionEvent = new EventEmitter<number>();

  router = inject(Router)

  filterFields: string[] = ['cod']

  clear(table: Table) {
    table.clear();
  }

  registrarPropiedad(cod: number) {
    this.router.navigate(['propiedades', 'registro'], {state: {cod: cod}})
  }


}
