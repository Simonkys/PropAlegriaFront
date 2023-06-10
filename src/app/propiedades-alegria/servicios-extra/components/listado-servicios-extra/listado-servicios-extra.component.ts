import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

import { ServiciosExtra } from '../../servicios-extra.model';


@Component({
  selector: 'app-listado-servicios-extra',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, TooltipModule],
  templateUrl: './listado-servicios-extra.component.html',
  styleUrls: ['./listado-servicios-extra.component.scss']
})
export class ListadoServiciosExtraComponent {

  @Input() serviciosExtra: ServiciosExtra[] = [];

  @Output() registrarEvent = new EventEmitter()
  @Output() detalleEvent = new EventEmitter<number>()


  registrar() {
    this.registrarEvent.emit()
  }

  detalle(serviciosExtra: ServiciosExtra) {
    this.detalleEvent.emit(serviciosExtra.id)
  }

}
