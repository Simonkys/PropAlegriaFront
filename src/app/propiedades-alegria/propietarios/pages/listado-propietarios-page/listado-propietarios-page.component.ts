import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { PropietarioService } from '../../propietario.service';
import { Propietario } from '../../propietario.model';

@Component({
  selector: 'app-listado-propietarios-page',
  standalone: true,
  imports: [CommonModule, RouterLink, TableModule, ButtonModule, InputTextModule],
  templateUrl: './listado-propietarios-page.component.html',
  styleUrls: ['./listado-propietarios-page.component.scss']
})
export class ListadoPropietariosPageComponent {

  propietariosService = inject(PropietarioService)
  router = inject(Router)

  propietarios$: Observable<Propietario[]> = this.propietariosService.getPropietarios();

  filterFields: string[] = ['rut_prop', 'pri_nom_prop', 'pri_ape_prop']

  clear(table: Table) {
    table.clear();
  }

}
