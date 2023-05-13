import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Propiedad } from '../../core/models/propiedad.model';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-listado-propiedad',
  standalone: true,
  imports: [CommonModule, TableModule, RouterLink, ButtonModule],
  templateUrl: './listado-propiedad.component.html',
  styleUrls: ['./listado-propiedad.component.scss']
})
export class ListadoPropiedadComponent {

  @Input() propiedades: Propiedad[] = []

  @Input() crear: boolean = true;
  @Input() editar: boolean = true;
  @Input() eliminar: boolean = false;
  @Input() detalle: boolean = true;

  @Input() hidePropietario: boolean = false;


  editarAction(propiedad: Propiedad) {}

  eliminarAction(propiedad: Propiedad) {}

  crearAction() {}

}
