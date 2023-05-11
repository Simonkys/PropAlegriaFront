import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PropietarioService } from '../../core/services/propietario.service';
import { Propietario } from '../../core/models/propietario.model';

@Component({
  selector: 'app-listado-propietarios',
  standalone: true,
  imports: [CommonModule, RouterLink, TableModule, ButtonModule],
  templateUrl: './listado-propietarios.component.html',
  styleUrls: ['./listado-propietarios.component.scss']
})
export class ListadoPropietariosComponent {

  propietariosService = inject(PropietarioService)
  router = inject(Router)

  propietarios$ = this.propietariosService.getPropietarios();


  detail(propiedad: Propietario) {
    this.router.navigate(['propietarios', propiedad.id, 'detalle']);
  }

}
