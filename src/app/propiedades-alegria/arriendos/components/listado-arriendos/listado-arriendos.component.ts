import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { TablaArriendo } from '../../arriendo.model';
import { TagModule } from 'primeng/tag';


@Component({
  selector: 'app-listado-arriendos',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, TagModule],
  templateUrl: './listado-arriendos.component.html',
  styleUrls: ['./listado-arriendos.component.scss']
})
export class ListadoArriendosComponent {

  @Input() arriendos: TablaArriendo[] = [];

  @Output() registrarEvent = new EventEmitter()
  @Output() detalleEvent = new EventEmitter<number>()


  registrar() {
    this.registrarEvent.emit()
  }


  detalle(arriendo: TablaArriendo) {
    this.detalleEvent.emit(arriendo.arriendo_id)
  }
}
