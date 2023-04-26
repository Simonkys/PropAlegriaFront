import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { TrabajadorService } from '../../trabajadores/trabajador.service';
import { map } from 'rxjs';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-listado-usuarios',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ToolbarModule, ButtonModule, InputTextModule],
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss']
})
export class ListadoUsuariosComponent {

  usuarioService = inject(UsuarioService)
  authService = inject(AuthService)
  router = inject(Router)

  usuarios$ = this.usuarioService.getUsuarios().pipe()


  crearNuevaCuenta() {
    this.router.navigate(['usuarios/registro'])
  }

}
