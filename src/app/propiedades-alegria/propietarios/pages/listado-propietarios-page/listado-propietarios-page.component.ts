import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PropietarioService } from '../../propietario.service';

@Component({
  selector: 'app-listado-propietarios-page',
  standalone: true,
  imports: [CommonModule, RouterLink, TableModule, ButtonModule],
  templateUrl: './listado-propietarios-page.component.html',
  styleUrls: ['./listado-propietarios-page.component.scss']
})
export class ListadoPropietariosPageComponent {

  propietariosService = inject(PropietarioService)
  router = inject(Router)

  propietarios$ = this.propietariosService.getPropietarios();


}
