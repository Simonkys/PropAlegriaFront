import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Propiedad } from 'src/app/propiedades-alegria/propiedades/propiedad.model';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-listado-propiedad',
  standalone: true,
  imports: [CommonModule, TableModule, RouterLink, ButtonModule, InputTextModule],
  templateUrl: './listado-propiedad.component.html',
  styleUrls: ['./listado-propiedad.component.scss']
})
export class ListadoPropiedadComponent {

  @Input() propiedades: Propiedad[] = []

  @Input() crear: boolean = true;
  @Input() editar: boolean = false;
  @Input() eliminar: boolean = false;
  @Input() detalle: boolean = true;

  @Input() hidePropietario: boolean = false;

  @Output() crearActionEvent = new EventEmitter<void>();
  @Output() detalleActionEvent = new EventEmitter<number>();
  @Output() editarActionEvent = new EventEmitter<number>();
  @Output() eliminarActionEvent = new EventEmitter<number>();

  filterFields: string[] = ['cod']


  editarAction(propiedad: Propiedad) {
    this.editarActionEvent.emit(propiedad.id)
  }

  eliminarAction(propiedad: Propiedad) {
    this.eliminarActionEvent.emit(propiedad.id)
  }

  crearAction() {
    this.crearActionEvent.emit();
  }

  clear(table: Table) {
    table.clear();
}

}
